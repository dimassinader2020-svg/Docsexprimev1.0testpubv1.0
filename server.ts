import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Clinical Chatbot will fall back to simulated clinical advice.");
}

// In-Memory Database Store
interface ForumReply {
  id: string;
  authorName: string;
  isProfessional: boolean;
  professionalTitle?: string;
  content: string;
  timestamp: string;
}

interface ForumQuestion {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  content: string;
  viewsCount: number;
  isSolved: boolean;
  createdAt: string;
  answers: ForumReply[];
}

interface AnonymousSubmission {
  id: string;
  type: "question" | "testimonial";
  content: string;
  category: string;
  governorate: string;
  status: "pending" | "approved" | "rejected";
  timestamp: string;
}

// Clinical Seed Data
const forumQuestions: ForumQuestion[] = [
  {
    id: "fq-1",
    title: "Est-ce que le médecin peut informer mes parents ?",
    category: "Droits & Confidentialité",
    categoryKey: "droits",
    content: "Bonjour, j'ai 17 ans et je voudrais consulter un médecin pour une contraception. Est-ce que le secret médical s'applique même si je suis mineure en Tunisie ? J'ai peur que mes parents le découvrent.",
    viewsCount: 142,
    isSolved: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    answers: [
      {
        id: "fa-1",
        authorName: "Dr. Ben Amara",
        isProfessional: true,
        professionalTitle: "Gynécologue-Obstétricien",
        content: "Bonjour. En Tunisie, le secret médical est une obligation légale et déontologique absolue (consacrée par l'article 254 du Code Pénal). Les mineurs ont le droit d'être écoutés, conseillés et soignés en toute confidentialité. Tu peux te rendre dans un centre de l'ONFP (Office National de la Famille et de la Population) ou un Espace Conseil Jeunes. L'accueil y est 100% anonyme, gratuit, et aucun accord parental n'est requis pour obtenir une contraception.",
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: "fq-2",
    title: "Acné et hormones à la puberté",
    category: "Puberté & Corps",
    categoryKey: "puberte",
    content: "Je suis un garçon de 15 ans et j'ai énormément d'acné sur le visage et le dos. Mes copains se moquent de moi et ça me stresse. Est-ce que c'est lié aux hormones de la puberté, et comment s'en débarrasser ?",
    viewsCount: 89,
    isSolved: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    answers: [
      {
        id: "fa-2",
        authorName: "Dr. Cherif",
        isProfessional: true,
        professionalTitle: "Dermatologue",
        content: "Bonjour. Oui, l'acné est très fréquente à la puberté. Elle est due à la poussée des hormones androgènes qui stimulent la production de sébum par les glandes sébacées. Ce sébum obstrue les pores et favorise la prolifération bactérienne. Je te conseille d'éviter de percer les boutons (risque de cicatrices), de nettoyer ta peau avec un gel doux sans savon matin et soir, et de consulter un médecin ou dermatologue pour obtenir un traitement local adapté.",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: "fq-3",
    title: "Retard de règles et stress",
    category: "Contraception & Grossesse",
    categoryKey: "securite",
    content: "Bonjour, j'ai un retard de règles de 5 jours. Mon dernier rapport était protégé par préservatif mais j'ai peur qu'il y ait eu un problème. Est-ce que le stress des examens peut bloquer les règles ?",
    viewsCount: 214,
    isSolved: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    answers: []
  }
];

const anonymousSubmissions: AnonymousSubmission[] = [
  {
    id: "sub-1",
    type: "testimonial",
    content: "Grâce à l'Espace Conseil Jeunes de Sousse, j'ai pu obtenir des conseils gynécologiques formidables et une contraception gratuite en toute discrétion. Merci pour ce service incroyable !",
    category: "Contraception & Grossesse",
    governorate: "Sousse",
    status: "approved",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "sub-2",
    type: "testimonial",
    content: "En Tunisie, beaucoup de jeunes ignorent qu'ils ont le droit d'aller à l'ONFP sans tuteur. J'y suis allée seule à Tunis et j'ai été accueillie chaleureusement, sans aucun jugement moral.",
    category: "Droits & Confidentialité",
    governorate: "Tunis",
    status: "approved",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "sub-3",
    type: "question",
    content: "Comment se déroule un dépistage du VIH dans un centre de planification ?",
    category: "Infections Sexuellement Transmissibles (IST)",
    governorate: "Sfax",
    status: "pending",
    timestamp: new Date().toISOString()
  }
];

// API Routes

// 1. Chatbot Clinical Assistant with Gemini
app.post("/api/chat", async (req, res) => {
  const { messages, lang } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages format is invalid." });
  }

  const systemInstruction = `
You are the authorized clinical orientation assistant of Docsexprime.tn, a clinical and educational sexology platform in Tunisia. 
Your goal is to provide accurate, science-based, and compassionate reproductive health guidance to Tunisian youth and medical practitioners.
You MUST strictly adhere to these clinical guidelines:
1. NEVER perform direct medical diagnoses or prescribe medications. 
2. Actively guide users to consult with medical practitioners and provide practical resources. Refer them to the ONFP (Office National de la Famille et de la Population) centers and Espaces Conseil Jeunes across Tunisia.
3. Guarantee total medical privacy and anonymity. Do not ask for personal identifiers.
4. Keep the tone warm, highly scientific, respectful, non-judgmental, and secure.
5. Support Tunisian cultural contexts while maintaining medical objectivity.
6. Support the language requested by the user: French, Arabic (specifically Tunisian Derja or standard Arabic), or English.
`;

  try {
    if (ai) {
      // Map message roles to Gemini format
      const formattedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Je m'excuse, je ne parviens pas à formuler une réponse pour le moment.";
      return res.json({ content: responseText });
    } else {
      // Fallback response when Gemini API Key is missing
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      let fallbackText = "Bonjour! Je suis l'assistant d'orientation clinique de Docsexprime.tn. ";
      
      if (lang === "ar") {
        fallbackText = "مرحباً! أنا المساعد الطبي الإرشادي لمنصة Docsexprime.tn. للحصول على استشارة متكاملة، يرجى تزويدنا بمفتاح Gemini API في لوحة التحكم. كبديل، يمكنك الاتصال بالديوان الوطني للأسرة والبريد البشري (ONFP) أو زيارة أقرب مركز إرشادي للحصول على رعاية سرية ومجانية.";
      } else if (lang === "en") {
        fallbackText += "For complete clinical assistant responses, please provide a Gemini API Key in the Secrets panel. For immediate clinical care, you can visit any ONFP center in Tunisia which offers 100% free, confidential guidance.";
      } else {
        fallbackText += "Pour bénéficier de l'assistant clinique intelligent, veuillez renseigner votre clé Gemini API dans l'onglet Secrets. En attendant, sachez que l'Office National de la Famille et de la Population (ONFP) garantit un accès anonyme et gratuit à la contraception et au dépistage dans toute la Tunisie.";
      }
      return res.json({ content: fallbackText });
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Erreur lors de la communication avec l'IA clinique : " + error.message });
  }
});

// 2. Get clinical forum questions
app.get("/api/forum", (req, res) => {
  res.json(forumQuestions);
});

// 3. Post a new question to the forum
app.post("/api/forum/question", (req, res) => {
  const { title, category, categoryKey } = req.body;
  if (!title || !category || !categoryKey) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const newQuestion: ForumQuestion = {
    id: `fq-${Date.now()}`,
    title: title,
    category: category,
    categoryKey: categoryKey,
    content: "Sujet ouvert de discussion médicale confidentielle.",
    viewsCount: 1,
    isSolved: false,
    createdAt: new Date().toISOString(),
    answers: []
  };

  forumQuestions.unshift(newQuestion);
  res.json(newQuestion);
});

// 4. Post a reply to a forum question
app.post("/api/forum/reply", (req, res) => {
  const { questionId, authorName, isProfessional, professionalTitle, content } = req.body;
  if (!questionId || !content) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const question = forumQuestions.find(q => q.id === questionId);
  if (!question) {
    return res.status(404).json({ error: "Question not found." });
  }

  const newReply: ForumReply = {
    id: `fa-${Date.now()}`,
    authorName: authorName || "Utilisateur anonyme",
    isProfessional: !!isProfessional,
    professionalTitle: professionalTitle,
    content: content,
    timestamp: new Date().toISOString()
  };

  question.answers.push(newReply);
  question.isSolved = true;
  res.json(newReply);
});

// 5. Get approved anonymous submissions (Testimonials)
app.get("/api/submissions", (req, res) => {
  const approved = anonymousSubmissions.filter(s => s.status === "approved");
  res.json(approved);
});

// 6. Post a new anonymous submission
app.post("/api/submissions", (req, res) => {
  const { type, content, category, governorate } = req.body;
  if (!content || !category || !governorate) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const newSubmission: AnonymousSubmission = {
    id: `sub-${Date.now()}`,
    type: type === "question" ? "question" : "testimonial",
    content: content,
    category: category,
    governorate: governorate,
    status: "pending", // Always pending moderation initially
    timestamp: new Date().toISOString()
  };

  anonymousSubmissions.unshift(newSubmission);
  res.json(newSubmission);
});

// 7. Admin: Get all submissions (moderator panel)
app.get("/api/admin/submissions", (req, res) => {
  res.json(anonymousSubmissions);
});

// 8. Admin: Approve a submission
app.post("/api/admin/submissions/:id/approve", (req, res) => {
  const sub = anonymousSubmissions.find(s => s.id === req.params.id);
  if (!sub) {
    return res.status(404).json({ error: "Submission not found." });
  }
  sub.status = "approved";
  res.json(sub);
});

// 9. Admin: Reject a submission
app.post("/api/admin/submissions/:id/reject", (req, res) => {
  const sub = anonymousSubmissions.find(s => s.id === req.params.id);
  if (!sub) {
    return res.status(404).json({ error: "Submission not found." });
  }
  sub.status = "rejected";
  res.json(sub);
});

// 10. Admin: Delete a submission
app.delete("/api/admin/submissions/:id", (req, res) => {
  const idx = anonymousSubmissions.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: "Submission not found." });
  }
  anonymousSubmissions.splice(idx, 1);
  res.json({ success: true });
});

// Serve frontend with Vite in development and static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
