// Multi-language translations and clinical data for Docsexprime.tn
import {
  BookOpen,
  Bot,
  Heart,
  Lock,
  MapPin,
  MessageSquare,
  PhoneCall,
  Phone,
  Plus,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Trash2,
  AlertTriangle,
  User,
  Users,
  X,
  ArrowLeft,
  ArrowRight,
  Award,
  Compass,
  FileText,
  Check,
  ChevronRight,
  CircleCheck,
  CircleAlert,
  Clock
} from 'lucide-react';

export const translations: any = {
    fr: {
      appName: "Docsexprime.tn",
      badge: "🇹🇳 Master Sexologie Clinique",
      heroTitle: "Ta santé sexuelle, tes droits, ton avenir 🇹🇳",
      heroSubtitle:
        "Une plateforme d’éducation sexuelle médicale et confidentielle conçue pour les jeunes tunisiens et les professionnels de santé. Accompagnée par notre IA d’orientation clinique.",
      exploreBtn: "🤖 Consulter l’Assistant IA Clinique",
      stats: [
        { number: "100%", label: "Confidentiel & Anonyme" },
        { number: "24/7", label: "IA d’orientation active" },
        { number: "ONFP", label: "Partenaire de prévention" },
      ],
      exploreTitle: "Thématiques de Santé Sexuelle",
      exploreSubtitle:
        "Des contenus scientifiques validés par des experts en sexologie clinique",
      categoriesTitle: "Thématiques d’Apprentissage",
      categoriesSubtitle:
        "Explorez nos guides basés sur les recommandations de l’OMS et de l’UNFPA",
      articlesLabel: "🔬 Guides Cliniques",
      readingTime: "min de lecture",
      level: "Éducatif & Médical",
      scientificNoteLabel: "🔬 Validation Clinique",
      forumSearch: "Rechercher une question ou un thème...",
      forumTabs: ["📅 Récent", "🔥 Populaire", "✅ Résolus"],
      forumAnswers: "réponses",
      emergencyTitle: "Aide & Urgences Médicales",
      emergencyNumber: "☎️ 190",
      emergencyDesc: "SAMU Tunisie - Appel gratuit 24h/24",
      resourcesInfo:
        "Toutes les structures référencées garantissent le secret médical absolu conformément au code de déontologie tunisien.",
      profileAnonymous: "Utilisateur Anonyme",
      memberSince: "Session active",
      anonymousMode: "Anonymat Total Garanti",
      anonymousDesc:
        "Aucune donnée nominative n’est stockée. Vos questions au forum et à l’IA sont cryptées.",
      active: "Actif",
      progressTitle: "📚 Progression Académique",
      progressText: "Progression dans le programme d’éducation sexuelle",
      tabs: ["Accueil", "Thèmes", "Forum", "Urgences & ONFP", "Mon Espace"],
      searchPlaceholder: "Rechercher par mot-clé...",
      viewArticle: "Lire l’article complet",
      back: "Retour",
      askQuestionBtn: "Posez votre question anonymement",
      questionTitlePlaceholder:
        "Ex: Quelle est la différence entre préservatif interne et externe ?",
      questionCategoryLabel: "Sélectionnez le thème",
      submit: "Publier",
      cancel: "Annuler",
      noReplies:
        "Pas encore de réponse clinique. Un professionnel de santé va vous répondre.",
      replyBtn: "Répondre",
      replyPlaceholder:
        "Écrivez votre réponse professionnelle ou de soutien...",
      professionalMode: "Mode Professionnel de Santé",
      professionalDesc:
        "Activez ce mode si vous êtes sexologue, médecin, sage-femme ou psychologue pour certifier vos réponses.",
      proBadge: "🔬 Praticien Certifié",
      unlockedCert: "Félicitations ! Vous avez validé tous les quiz cliniques.",
      quizCompleted: "Quiz Validé !",
      correct: "Correct !",
      incorrect: "Incorrect.",
      next: "Suivant",
      restartQuiz: "Recommencer",
      score: "Votre Score",
      governorateFilter: "Filtrer par Gouvernorat",
      allGovs: "Tous les Gouvernorats",
      takeQuizBtn: "Commencer le Quiz Clinique",
      scientificNote: "Note scientifique",
      aboutApp: "À propos de Docsexprime.tn",
      aboutText:
        "Ce projet a été développé dans le cadre d’un projet de fin d’études de Master en Sexologie Clinique à la Faculté de Médecine de Tunisie. Il a pour but de lever les tabous et de faciliter l’accès à l’information médicale validée.",
      submissionsTitle: "Soumissions Anonymes & Témoignages",
      submissionsSubtitle:
        "Exprimez-vous en toute sécurité. Vos témoignages et questions cliniques sont validés de manière confidentielle avant publication.",
      submissionsPlaceholder:
        "Écrivez votre témoignage ou votre question intime ici en toute confidentialité... (Aucune coordonnée ou identité ne sera stockée)",
      submissionsSubmitBtn: "Soumettre anonymement",
      submissionsSuccessMsg:
        "Soumission envoyée avec succès ! Elle sera examinée confidentiellement par notre équipe clinique avant d’être publiée de manière totalement anonyme.",
      submissionsIntroText:
        "Cet espace est conçu pour libérer la parole de manière saine, sûre et entièrement confidentielle. Vos écrits sont protégés par le secret médical.",
      submissionsSelectType: "Type de soumission",
      submissionsTypeQuestion: "❓ Question clinique",
      submissionsTypeTestimonial: "💬 Témoignage / Vécu",
      submissionsSecuredNote:
        "🔒 Vos données ne sont jamais enregistrées. Votre adresse IP et vos informations d’identité ne sont pas stockées sur nos serveurs conformément aux garanties éthiques de la Faculté de Médecine de Tunis.",
      submissionsCategoryLabel: "Catégorie de la soumission",
      submissionsGovLabel: "Gouvernorat d’origine (Optionnel)",
      serviceFilterLabel: "Filtrer par type de service",
      allServices: "Tous les Services",
      serviceContraception: "💊 Contraception",
      serviceDepistage: "🔬 Dépistage IST",
      serviceConseil: "☎️ Conseil & Écoute",
      serviceSuivi: "🩺 Suivi Gynécologique",
      searchResourcePlaceholder:
        "Rechercher une clinique, un centre ou un service...",
      adminPanelTitle: "Espace Modération & Validation",
      adminCodeLabel: "Entrez le code d’accès praticien / modérateur",
      adminUnlockBtn: "Déverrouiller l’espace",
      pendingTab: "📥 En attente de validation",
      approvedTab: "✅ Publiés",
      rejectedTab: "❌ Refusés",
      approveAction: "Valider & Publier",
      rejectAction: "Refuser",
      deleteAction: "Supprimer",
      noSubmissions: "Aucune soumission trouvée.",
    },
    ar: {
      appName: "Docsexprime.tn",
      badge: "🇹🇳 ماجستير الطب الجنسي الإكلينيكي",
      heroTitle: "صحتك الجنسية، حقوقك، مستقبلك 🇹🇳",
      heroSubtitle:
        "منصة تونسية للتثقيف الجنسي الطبي والسرّي، مخصصة للشباب والمختصين في الصحة. مدعومة بمستشارنا الافتراضي للتوجيه السريري.",
      exploreBtn: "🤖 استشارة المساعد الطبي الذكي",
      stats: [
        { number: "100%", label: "سرّي ومجهول تماماً" },
        { number: "24/7", label: "مساعد ذكي نشط" },
        { number: "ONFP", label: "شريك الوقاية الوطني" },
      ],
      exploreTitle: "محاور الصحة الجنسية",
      exploreSubtitle:
        "محتويات علمية معتمدة من قبل أخصائيي الطب الجنسي السريري",
      categoriesTitle: "محاور التعلّم والتثقيف",
      categoriesSubtitle:
        "استكشف أدلتنا الطبية المعتمدة على توصيات منظمة الصحة العالمية",
      articlesLabel: "🔬 أدلة طبية سريرية",
      readingTime: "دقائق قراءة",
      level: "مستوى طبي مبسط",
      scientificNoteLabel: "🔬 المصادقة العلمية",
      forumSearch: "ابحث عن سؤال أو محور...",
      forumTabs: ["📅 الأحدث", "🔥 الأكثر تفاعلاً", "✅ أسئلة مجابة"],
      forumAnswers: "إجابات",
      emergencyTitle: "المساعدة والطوارئ الطبية",
      emergencyNumber: "☎️ 190",
      emergencyDesc: "النجدة الطبية بتونس - مكالمة مجانية 24/24",
      resourcesInfo:
        "جميع الهياكل المدرجة تضمن السرية الطبية المطلقة وفقاً لمجلة أخلاقيات الطب التونسية.",
      profileAnonymous: "مستخدم مجهول الاسم",
      memberSince: "الجلسة نشطة",
      anonymousMode: "سرية تامة مضمونة",
      anonymousDesc:
        "لا يتم تخزين أي بيانات شخصية. أسئلتك للمنتدى وللذكاء الاصطناعي مشفرة بالكامل.",
      active: "نشط",
      progressTitle: "📚 مستوى التقدم الأكاديمي",
      progressText: "التقدم في برنامج الثقافة الجنسية والعلمية",
      tabs: [
        "الرئيسية",
        "المواضيع",
        "المنتدى",
        "الطوارئ والديوان",
        "فضائي الخاص",
      ],
      searchPlaceholder: "ابحث بكلمة مفتاحية...",
      viewArticle: "اقرأ المقال كاملاً",
      back: "رجوع",
      askQuestionBtn: "اطرح سؤالك دون الكشف عن هويتك",
      questionTitlePlaceholder:
        "مثال: ما الفرق بين الواقي الذكري والواقي الأنثوي؟",
      questionCategoryLabel: "اختر المحور المناسب",
      submit: "نشر",
      cancel: "إلغاء",
      noReplies:
        "لا توجد إجابات سريرية بعد. سيقوم أحد المختصين بالرد عليك قريباً.",
      replyBtn: "إضافة رد",
      replyPlaceholder: "اكتب ردك المهني أو الطبي لمساعدة السائل...",
      professionalMode: "حساب أخصائي صحي",
      professionalDesc:
        "قم بتفعيل هذا الوضع إذا كنت طبيباً، قابلة، أخصائي نفساني أو أخصائي جنسي لتوثيق إجاباتك.",
      proBadge: "🔬 ممارس صحي معتمد",
      unlockedCert: "تهانينا! لقد نجحت في اجتياز جميع الاختبارات الطبية بنجاح.",
      quizCompleted: "تم اجتياز الاختبار بنجاح!",
      correct: "إجابة صحيحة!",
      incorrect: "إجابة خاطئة.",
      next: "التالي",
      restartQuiz: "إعادة المحاولة",
      score: "نتيجتك",
      governorateFilter: "تصفية حسب الولاية",
      allGovs: "كل الولايات",
      takeQuizBtn: "ابدأ الاختبار الطبي السريري",
      scientificNote: "ملاحظة علمية",
      aboutApp: "حول منصة Docsexprime.tn",
      aboutText:
        "تم تطوير هذا المشروع كجزء من مشروع تخرج ماجستير في الطب الجنسي الإكلينيكي بكلية الطب بتونس. يهدف إلى كسر الحواجز وتسهيل الوصول إلى معلومات طبية موثوقة وعلمية.",
      submissionsTitle: "المشاركات والشهادات مجهولة الهوية",
      submissionsSubtitle:
        "عبر عن نفسك بكل أمان وسرية. تخضع مشاركاتك وأسئلتك الطبية للمراجعة السرية قبل نشرها لضمان كتمان الهوية التامة.",
      submissionsPlaceholder:
        "اكتب شهادتك أو سؤالك الخاص هنا بكل سرية... (لن يتم تخزين أي بيانات شخصية أو هوية على خوادمنا)",
      submissionsSubmitBtn: "إرسال مجهول الهوية",
      submissionsSuccessMsg:
        "تم إرسال مشاركتك بنجاح! سيقوم فريقنا الطبي بمراجعتها بسرية تامة قبل نشرها دون الكشف عن هويتك على الإطلاق.",
      submissionsIntroText:
        "تم تصميم هذا الفضاء للتعبير بحرية وأمان وبسرية تامة. كتاباتك محمية بموجب السر المهني والطبي التونسي.",
      submissionsSelectType: "نوع المشاركة",
      submissionsTypeQuestion: "❓ سؤال طبي / سريري",
      submissionsTypeTestimonial: "💬 شهادة / تجربة شخصية",
      submissionsSecuredNote:
        "🔒 بياناتك لا تُسجل أبداً. لا يتم حفظ عنوان الـ IP الخاص بك أو أي معلومات تعريفية على خوادمنا تماشياً مع الضمانات الأخلاقية لكلية الطب بتونس.",
      submissionsCategoryLabel: "فئة المشاركة",
      submissionsGovLabel: "الولاية المصدر (اختياري)",
      serviceFilterLabel: "تصفية حسب نوع الخدمة",
      allServices: "كل الخدمات",
      serviceContraception: "💊 منع الحمل وتنظيم الأسرة",
      serviceDepistage: "🔬 تقصي الأمراض المنقولة جنسياً",
      serviceConseil: "☎️ إصغاء وتوجيه نفسي",
      serviceSuivi: "🩺 متابعة أمراض النساء والتوليد",
      searchResourcePlaceholder: "ابحث عن عيادة، مركز أو خدمة صحية...",
      adminPanelTitle: "فضاء المراقبة والمصادقة الطبية",
      adminCodeLabel: "أدخل رمز وصول الأخصائي / المراقب",
      adminUnlockBtn: "فتح الفضاء المغلق",
      pendingTab: "📥 في انتظار المراجعة",
      approvedTab: "✅ مقبول ومنشور",
      rejectedTab: "❌ مرفوض",
      approveAction: "مصادقة ونشر",
      rejectAction: "رفض",
      deleteAction: "حذف",
      noSubmissions: "لم يتم العثور على أي مشاركات.",
    },
    en: {
      appName: "Docsexprime.tn",
      badge: "🇹🇳 Master of Clinical Sexology",
      heroTitle: "Your Sexual Health, Rights & Future 🇹🇳",
      heroSubtitle:
        "A confidential, medical sexual education platform designed for Tunisian youth and health professionals. Backed by our clinical guidance AI assistant.",
      exploreBtn: "🤖 Consult the Clinical AI Assistant",
      stats: [
        { number: "100%", label: "Confidential & Anonymous" },
        { number: "24/7", label: "AI Guidance Active" },
        { number: "ONFP", label: "Prevention Partner" },
      ],
      exploreTitle: "Sexual Health Topics",
      exploreSubtitle:
        "Scientific content validated by clinical sexology experts",
      categoriesTitle: "Educational Themes",
      categoriesSubtitle:
        "Explore our evidence-based medical guides in line with WHO and UNFPA recommendations",
      articlesLabel: "🔬 Clinical Guides",
      readingTime: "min read",
      level: "Educational & Medical",
      scientificNoteLabel: "🔬 Clinical Validation",
      forumSearch: "Search a question or topic...",
      forumTabs: ["📅 Recent", "🔥 Popular", "✅ Solved"],
      forumAnswers: "answers",
      emergencyTitle: "Help & Medical Emergencies",
      emergencyNumber: "☎️ 190",
      emergencyDesc: "SAMU Tunisia - Free call 24/7",
      resourcesInfo:
        "All referenced healthcare structures guarantee absolute medical secrecy under Tunisian law and code of ethics.",
      profileAnonymous: "Anonymous User",
      memberSince: "Active session",
      anonymousMode: "Full Anonymity Guaranteed",
      anonymousDesc:
        "No personal data is collected. Your messages to the forum and AI are fully encrypted.",
      active: "Active",
      progressTitle: "📚 Academic Progress",
      progressText: "Progress in our comprehensive sexual education syllabus",
      tabs: ["Home", "Themes", "Forum", "Help & ONFP", "My Space"],
      searchPlaceholder: "Search by keyword...",
      viewArticle: "Read full article",
      back: "Back",
      askQuestionBtn: "Ask your question anonymously",
      questionTitlePlaceholder:
        "E.g., What is the difference between internal and external condoms?",
      questionCategoryLabel: "Select the topic",
      submit: "Publish",
      cancel: "Cancel",
      noReplies:
        "No clinical responses yet. A healthcare professional will answer shortly.",
      replyBtn: "Reply",
      replyPlaceholder: "Write your clinical or supportive response...",
      professionalMode: "Healthcare Professional Mode",
      professionalDesc:
        "Activate this mode if you are a sexologist, doctor, midwife, or psychologist to certify your replies.",
      proBadge: "🔬 Certified Practitioner",
      unlockedCert:
        "Congratulations! You have successfully passed all clinical quizzes.",
      quizCompleted: "Quiz Completed!",
      correct: "Correct!",
      incorrect: "Incorrect.",
      next: "Next",
      restartQuiz: "Try Again",
      score: "Your Score",
      governorateFilter: "Filter by Governorate",
      allGovs: "All Governorates",
      takeQuizBtn: "Start the Clinical Quiz",
      scientificNote: "Scientific Note",
      aboutApp: "About Docsexprime.tn",
      aboutText:
        "This project was developed as part of a Master’s degree graduation project in Clinical Sexology at the Faculty of Medicine of Tunis, Tunisia. It aims to raise awareness and facilitate access to reliable medical data.",
      submissionsTitle: "Anonymous Submissions & Testimonials",
      submissionsSubtitle:
        "Express yourself safely. Your testimonials and clinical questions are confidentially validated before being published to guarantee your anonymity.",
      submissionsPlaceholder:
        "Write your testimonial or intimate question here in full confidentiality... (No contact details or identity will be stored)",
      submissionsSubmitBtn: "Submit anonymously",
      submissionsSuccessMsg:
        "Submission successfully sent! It will be reviewed confidentially by our clinical team before being published with total anonymity.",
      submissionsIntroText:
        "This space is designed to help you speak out in a healthy, safe, and fully confidential environment. Your entries are protected by medical secrecy.",
      submissionsSelectType: "Submission Type",
      submissionsTypeQuestion: "❓ Clinical Question",
      submissionsTypeTestimonial: "💬 Testimonial / Experience",
      submissionsSecuredNote:
        "🔒 Your data is never recorded. Your IP address and identity details are not stored on our servers, in line with the ethical guarantees of the Faculty of Medicine of Tunis.",
      submissionsCategoryLabel: "Submission Category",
      submissionsGovLabel: "Governorate of Origin (Optional)",
      serviceFilterLabel: "Filter by Service Type",
      allServices: "All Services",
      serviceContraception: "💊 Contraception",
      serviceDepistage: "🔬 STI Testing",
      serviceConseil: "☎️ Counseling & Helpline",
      serviceSuivi: "🩺 Gynecological Follow-up",
      searchResourcePlaceholder: "Search for a clinic, center, or service...",
      adminPanelTitle: "Clinical Moderation & Approval Board",
      adminCodeLabel: "Enter practitioner / moderator access code",
      adminUnlockBtn: "Unlock Board",
      pendingTab: "📥 Pending Approval",
      approvedTab: "✅ Published",
      rejectedTab: "❌ Rejected",
      approveAction: "Approve & Publish",
      rejectAction: "Reject",
      deleteAction: "Delete",
      noSubmissions: "No submissions found.",
    },
  };

export const categories: any[] = [
    {
      id: "puberte",
      title: {
        fr: "Puberté & Corps",
        ar: "البلوغ والجسم",
        en: "Puberty & Anatomy",
      },
      desc: {
        fr: "Les transformations anatomiques, physiologiques et psychologiques de l’adolescence.",
        ar: "التحولات الجسدية، الفسيولوجية والنفسية في مرحلة المراهقة.",
        en: "Anatomical, physiological, and emotional transformations during adolescence.",
      },
      icon: "body",
      color: "#8b5cf6",
      count: 24,
    },
    {
      id: "relations",
      title: {
        fr: "Relations & Consentement",
        ar: "العلاقات والموافقة",
        en: "Relationships & Consent",
      },
      desc: {
        fr: "Construire des relations saines, mutuellement respectueuses et comprendre le consentement.",
        ar: "بناء علاقات صحية قائمة على الاحترام المتبادل وفهم الموافقة الحرة.",
        en: "Building healthy, respectful relationships and understanding voluntary consent.",
      },
      icon: "heart",
      color: "#ec4899",
      count: 18,
    },
    {
      id: "securite",
      title: {
        fr: "Santé & Prévention",
        ar: "الصحة والوقاية",
        en: "Health & Prevention",
      },
      desc: {
        fr: "Méthodes de contraception, dépistage des IST, et préservation de la fertilité.",
        ar: "وسائل منع الحمل، تقصي الأمراض المنقولة جنسياً، وحماية الخصوبة.",
        en: "Contraception methods, STI screenings, and reproductive health preservation.",
      },
      icon: "shield",
      color: "#ef4444",
      count: 31,
    },
    {
      id: "genres",
      title: {
        fr: "Genres & Identités",
        ar: "الهوية الجندرية",
        en: "Gender & Identity",
      },
      desc: {
        fr: "Comprendre le genre, démonter les stéréotypes et respecter la diversité humaine.",
        ar: "فهم الجندر والمفاهيم المرتبطة به، محاربة الصور النمطية واحترام التنوع البشري.",
        en: "Understanding gender concepts, breaking stereotypes, and respecting human diversity.",
      },
      icon: "users",
      color: "#3b82f6",
      count: 15,
    },
    {
      id: "orientations",
      title: {
        fr: "Orientations Sexuelles",
        ar: "التوجهات الجنسية",
        en: "Sexual Orientations",
      },
      desc: {
        fr: "L’attirance affective et sexuelle, l’acceptation de soi et la lutte contre les discriminations.",
        ar: "الانجذاب العاطفي والجنسي، تقبل الذات ومكافحة الوصم والتمييز.",
        en: "Affective and sexual attraction, self-acceptance, and fighting stigma or discrimination.",
      },
      icon: "star",
      color: "#10b981",
      count: 12,
    },
    {
      id: "droits",
      title: {
        fr: "Droits & Législation",
        ar: "الحقوق والتشريعات",
        en: "Rights & Legislation",
      },
      desc: {
        fr: "Connaître les droits sexuels et reproductifs en Tunisie, le secret médical et l’accès légal aux soins.",
        ar: "معرفة الحقوق الجنسية والإنجابية في تونس، السر الطبي والوصول القانوني للرعاية.",
        en: "Understanding sexual and reproductive rights under Tunisian law, medical privacy, and care access.",
      },
      icon: "file-text",
      color: "#f59e0b",
      count: 16,
    },
  ];

export const articles: any[] = [
    {
      id: "art-puberte-1",
      categoryId: "puberte",
      title: {
        fr: "Comprendre la Puberté : Changements Corporels et Hormonaux",
        ar: "فهم مرحلة البلوغ: التحولات الجسدية والهرمونية",
        en: "Understanding Puberty: Physical and Hormonal Changes",
      },
      duration: { fr: "6 min", ar: "6 دقائق", en: "6 min" },
      excerpt: {
        fr: "Guide clinique décrivant les mécanismes neuroendocriniens de la puberté chez l’homme et la femme.",
        ar: "دليل سريري يشرح آليات الغدد الصماء العصبية للبلوغ لدى الذكور والإناث.",
        en: "A clinical guide describing the neuroendocrine mechanisms of puberty in males and females.",
      },
      content: {
        fr: [
          "La puberté est une période de transition neuroendocrinienne majeure, caractérisée par la réactivation de l’axe hypothalamo-hypophyso-gonadique (axe gonadotrope). Ce processus entraîne le développement des caractères sexuels secondaires, l’accélération de la croissance staturale et l’acquisition de la fonction de reproduction.",
          "Chez les filles, la puberté commence généralement entre 8 et 13 ans par la thélarche (apparition du bourgeon mammaire), sous l’effet des œstrogènes. S’ensuit la pubarche (pilosité pubienne) puis la ménarche (premières règles), survenant en moyenne 2 ans après le début du développement mammaire.",
          "Chez les garçons, le premier signe clinique est l’augmentation du volume testiculaire (supérieur ou égal à 4 ml), survenant habituellement entre 9 et 14 ans sous l’effet de la testostérone. Elle est suivie de la croissance pénienne, de l’apparition de la pilosité pubienne, faciale et corporelle, ainsi que de la mue de la voix.",
          "Il est essentiel d’accompagner les adolescents sur le plan psychologique. Les fluctuations hormonales s’accompagnent de remaniements cérébraux (notamment au niveau du cortex préfrontal) influençant la régulation des émotions et l’affirmation de soi.",
        ],
        ar: [
          "البلوغ هو فترة انتقالية هرمونية وعصبية كبرى، تتميز بإعادة تنشيط المحور الهيبوثلامي-النخامي-التناسلي. تؤدي هذه العملية إلى ظهور الصفات الجنسية الثانوية، تسارع النمو الطولي، واكتساب القدرة على الإنجاب.",
          "عند الإناث، يبدأ البلوغ عادة بين سن 8 و 13 عاماً بظهور برعم الثدي تحت تأثير هرمون الإستروجين. تلي ذلك زيادة شعر العانة ثم بدء الدورة الشهرية، والتي تحدث في المتوسط بعد عامين من بدء نمو الثدي.",
          "عند الذكور، فإن أول علامة سريرية هي زيادة حجم الخصيتين (أكبر من أو يساوي 4 مل)، ويحدث ذلك عادة بين سن 9 و 14 عاماً تحت تأثير هرمون التستوستيرون. ويتبع ذلك نمو العضو الذكري، وظهور شعر العانة والوجه والجسم، وتغير نبرة الصوت.",
          "من الضروري مرافقة المراهقين نفسياً في هذه المرحلة. فالتقلبات الهرمونية تتزامن مع تغيرات هيكلية في الدماغ تؤثر بشكل مباشر على تنظيم المشاعر وتطور الشخصية.",
        ],
        en: [
          "Puberty is a major neuroendocrine transitional period, characterized by the reactivation of the hypothalamo-pituitary-gonadal axis. This process leads to the development of secondary sexual characteristics, rapid skeletal growth, and the attainment of reproductive capacity.",
          "In girls, puberty generally begins between ages 8 and 13 with thelarche (the onset of breast development), driven by estrogens. This is followed by pubarche (pubic hair growth) and eventually menarche (first menstruation), which occurs on average 2 years after breast development begins.",
          "In boys, the first clinical sign is testicular enlargement (greater than or equal to 4 ml), typically occurring between ages 9 and 14 under the influence of testosterone. This is followed by penile growth, pubic, facial, and body hair development, and voice deepening.",
          "Providing psychological support to adolescents during this phase is essential. Hormonal fluctuations are accompanied by brain remodeling (particularly in the prefrontal cortex) that affects emotional regulation and self-identity.",
        ],
      },
      scientificNote: {
        fr: "Selon l’OMS, l’éducation complète à la sexualité (ECS) permet de réduire les grossesses précoces et améliore l’estime de soi.",
        ar: "وفقاً لمنظمة الصحة العالمية، يساهم التثقيف الجنسي الشامل في الحد من الحمل المبكر وتعزيز تقدير الذات لدى المراهقين.",
        en: "According to the WHO, comprehensive sexuality education (CSE) reduces adolescent pregnancies and improves self-esteem.",
      },
    },
    {
      id: "art-securite-1",
      categoryId: "securite",
      title: {
        fr: "Les Méthodes Contraceptives Disponibles en Tunisie",
        ar: "وسائل منع الحمل المتوفرة في تونس وطرق استخدامها",
        en: "Contraceptive Methods Available in Tunisia",
      },
      duration: { fr: "8 min", ar: "8 دقائق", en: "8 min" },
      excerpt: {
        fr: "Inventaire scientifique des méthodes contraceptives, de leur efficacité théorique et pratique, et de leur accès gratuit via l’ONFP.",
        ar: "قائمة علمية لوسائل منع الحمل، كفاءتها النظرية والعملية، والوصول المجاني إليها عبر الديوان الوطني للأسرة والبريد البشري.",
        en: "A scientific overview of contraceptive methods, their theoretical and practical efficacy, and free access through the ONFP.",
      },
      content: {
        fr: [
          "La contraception regroupe l’ensemble des moyens mis en œuvre pour prévenir une grossesse de façon temporaire et réversible. L’efficacité d’une méthode s’évalue par l’indice de Pearl (pourcentage de grossesses accidentelles sur un an d’utilisation). On distingue l’efficacité théorique (utilisation parfaite) et l’efficacité pratique (vie réelle).",
          "1. Le Préservatif Masculin et Féminin : C’est la seule méthode qui offre une double protection : contraception (efficacité pratique de 85% à 98%) et barrière physique efficace contre la majorité des Infections Sexuellement Transmissibles (IST), y compris le VIH, la syphilis et les hépatites.",
          "2. La Contraception Hormonale (Pilule, Implant, Injection) : La pilule œstroprogestative ou progestative pure bloque l’ovulation et modifie la glaire cervicale. L’implant sous-cutané libère un progestatif en continu pendant 3 ans. Ces méthodes affichent une efficacité théorique supérieure à 99% mais ne protègent pas des IST.",
          "3. Le Dispositif Intra-Utérin (DIU ou Stérilet) : Au cuivre (effet spermicide par inflammation stérile locale) ou hormonal (libérant de la lévonorgestrel), il offre une efficacité à long terme supérieure à 99% sans contrainte d’observance quotidienne.",
          "En Tunisie, l’Office National de la Famille et de la Population (ONFP) garantit l’accès libre et gratuit à ces méthodes contraceptives dans tous ses centres régionaux, de manière anonyme pour les jeunes et sans obligation de consentement parental.",
        ],
        ar: [
          "تتضمن وسائل منع الحمل كافة الطرق المستخدمة لمنع الحمل بصفة مؤقتة وقابلة للتراجع. يتم تقييم كفاءة الوسيلة الطبية عبر مؤشر بيرل (نسبة الحمل غير المقصود خلال سنة). ونميز بين الكفاءة النظرية (الاستخدام المثالي) والكفاءة العملية (الواقع اليومي).",
          "1. الواقي الذكري والأنثوي: هي الوسيلة الوحيدة التي توفر حماية مزدوجة: منع الحمل (كفاءة عملية بين 85% و98%) وحاجز فيزيائي فعال ضد الأمراض المنقولة جنسياً (IST)، بما في ذلك السيدا والزهري والتهاب الكبد.",
          "2. وسائل منع الحمل الهرمونية (الحبوب، الغرسة، الحقن): تعمل الحبوب على منع الإباضة وتغيير مخاط عنق الرحم. توفر الغرسة حماية مستمرة لمدة 3 سنوات. تتجاوز كفاءتها النظرية 99% لكنها لا تحمي من الأمراض المنقولة جنسياً.",
          "3. اللولب الرحمي (الآلة): نحاسي أو هرموني، يوضع في الرحم ليوفر حماية طويلة المدى تتجاوز 99% دون الحاجة لتذكر الاستخدام اليومي.",
          "في تونس، يضمن الديوان الوطني للأسرة والبريد البشري (ONFP) الوصول المجاني والمجهول لوسائل منع الحمل في كافة مراكزه دون اشتراط موافقة الأولياء للشباب.",
        ],
        en: [
          "Contraception encompasses all temporary and reversible methods used to prevent pregnancy. Method efficacy is evaluated using the Pearl Index (the percentage of accidental pregnancies over one year of use). We differentiate between theoretical efficacy (perfect use) and practical efficacy (typical use).",
          "1. Male and Female Condoms: This is the only method offering dual protection: contraception (typical efficacy 85% to 98%) and an effective physical barrier against most Sexually Transmitted Infections (STIs), including HIV, syphilis, and hepatitis.",
          "2. Hormonal Contraception (Pills, Implants, Injections): Combination or progesterone-only pills prevent ovulation and alter cervical mucus. The subdermal implant releases progestin continuously for up to 3 years. These methods offer over 99% theoretical efficacy but do not protect against STIs.",
          "3. Intrauterine Device (IUD): Available in copper (spermicidal effect via local sterile inflammation) or hormonal (releasing levonorgestrel), it provides long-term efficacy over 99% without requiring daily user compliance.",
          "In Tunisia, the National Office for Family and Population (ONFP) guarantees free and confidential access to these contraceptive methods in all its regional clinics, anonymously for young adults and without parental consent requirements.",
        ],
      },
      scientificNote: {
        fr: "En Tunisie, la contraception d’urgence (pilule du lendemain) est accessible en pharmacie sans ordonnance. Elle doit être prise idéalement dans les 12h à 72h après un rapport non protégé.",
        ar: "في تونس، تتوفر وسائل منع الحمل الطارئة (حبة اليوم التالي) في الصيدليات بدون وصفة طبية. يجب تناولها في غضون 12 إلى 72 ساعة من الجماع غير المحمي.",
        en: "In Tunisia, emergency contraception (the morning-after pill) is available in pharmacies without a prescription. It should ideally be taken within 12 to 72 hours after unprotected intercourse.",
      },
    },
    {
      id: "art-droits-1",
      categoryId: "droits",
      title: {
        fr: "Le Secret Médical et les Droits des Mineurs en Tunisie",
        ar: "السر الطبي وحقوق القاصرين في الرعاية الصحية بتونس",
        en: "Medical Secrecy and Minors Rights in Tunisian Healthcare",
      },
      duration: { fr: "5 min", ar: "5 دقائق", en: "5 min" },
      excerpt: {
        fr: "Analyse légale du cadre juridique tunisien sur le secret médical, la confidentialité et l’accès autonome des adolescents aux soins de santé sexuelle.",
        ar: "تحليل قانوني للإطار التشريعي التونسي حول السر الطبي والسرية الطبية وحق المراهقين في الوصول المستقل لخدمات الصحة الجنسية.",
        en: "A legal analysis of the Tunisian regulatory framework on medical secrecy, confidentiality, and autonomous access for youth to sexual healthcare.",
      },
      content: {
        fr: [
          "Le secret médical est une obligation légale et déontologique absolue en Tunisie, consacrée par l’article 254 du Code Pénal et par le Code de Déontologie Médicale. Il s’impose à tout médecin, sage-femme, pharmacien ou étudiant hospitalier sous peine de sanctions pénales sévères.",
          "La confidentialité s’applique de façon stricte à la santé sexuelle et reproductive. Les jeunes célibataires et les mineurs ont le droit d’être écoutés, conseillés et soignés sans que leurs tuteurs légaux ne soient informés sans leur accord préalable.",
          "Les structures spécialisées, telles que les Espaces Conseil Jeunes de l’ONFP et les centres de planification, ont été conçues spécifiquement pour offrir un accueil bienveillant, gratuit, et sans jugement. L’accès au dépistage anonyme du VIH et aux préservatifs est garanti par l’État tunisien.",
          "Pour les professionnels de santé, le respect de ce droit à la confidentialité est une clé essentielle pour établir une relation de confiance et assurer une prévention efficace auprès de la population jeune.",
        ],
        ar: [
          "يعتبر السر الطبي واجباً قانونياً وأخلاقياً مطلقاً في تونس، ينص عليه الفصل 254 من المجلة الجزائية ومجلة أخلاقيات الطب. وهو ملزم لكل طبيب وقابلة وصيدلي وإطار شبه طبي تحت طائلة العقوبات الجزائية.",
          "تنطبق السرية بشكل صارم على الصحة الجنسية والإنجابية. يحق للشباب العازبين والقصر الاستماع إليهم ونصيحتهم وعلاجهم دون إبلاغ أوليائهم دون موافقة مسبقة منهم.",
          "تم تصميم هياكل متخصصة، مثل فضاءات صديقة للشباب التابعة لديوان الأسرة ومراكز التخطيط العائلي، خصيصاً لتقديم استقبال لائق ومجاني وخالٍ من الأحكام المسبقة. تضمن الدولة التونسية تقصي فيروس السيدا مجاناً وبسرية تامة.",
          "بالنسبة لمهنيي الصحة، يمثل احترام السرية مفتاحاً أساسياً لبناء علاقة ثقة وضمان وقاية فعالة في صفوف فئة الشباب.",
        ],
        en: [
          "Medical secrecy is an absolute legal and ethical obligation in Tunisia, enshrined in Article 254 of the Penal Code and the Medical Code of Ethics. It applies to all physicians, midwives, pharmacists, and medical students under threat of strict legal penalties.",
          "Confidentiality applies rigorously to sexual and reproductive health. Unmarried youth and minors have the right to receive counseling, clinical assessments, and medical treatments without their legal guardians being notified without their prior consent.",
          "Specialized structures, such as the Youth Counseling Centers of the ONFP and family planning clinics, are designed specifically to provide a supportive, free, and non-judgmental environment. Access to anonymous HIV testing and condoms is guaranteed by the Tunisian state.",
          "For healthcare professionals, respecting this right to privacy is crucial to establishing a trusting relationship and delivering effective clinical prevention to the youth population.",
        ],
      },
      scientificNote: {
        fr: "La Tunisie est signataire de plusieurs conventions internationales protégeant le droit à la santé sexuelle et reproductive et à la confidentialité pour les adolescents.",
        ar: "صادقت تونس على عدة اتفاقيات دولية تحمي الحق في الصحة الجنسية والإنجابية والسرية التامة للمراهقين.",
        en: "Tunisia is a signatory to several international conventions protecting the right to sexual and reproductive health and confidentiality for adolescents.",
      },
    },
  ];

export const resources: any[] = [
    {
      id: "res-onfp-tunis",
      name: {
        fr: "ONFP - Centre de Tunis (La Fayette)",
        ar: "ديوان الأسرة - مركز تونس (لافاييت)",
        en: "ONFP - Tunis Center (La Fayette)",
      },
      type: "onfp",
      phone: "71 789 900",
      address: {
        fr: "138 Avenue de la Liberté, La Fayette, Tunis",
        ar: "138 شارع الحرية، لافاييت، تونس",
        en: "138 Avenue de la Liberté, La Fayette, Tunis",
      },
      governorate: "Tunis",
      hours: {
        fr: "Lun-Ven : 8h00 - 16h00 | Sam : 8h00 - 13h00",
        ar: "الاثنين - الجمعة: 8:00 - 16:00 | السبت: 8:00 - 13:00",
        en: "Mon-Fri: 8:00 AM - 4:00 PM | Sat: 8:00 AM - 1:00 PM",
      },
      description: {
        fr: "Distribution gratuite de préservatifs, pilules contraceptives, implants, DIU. Consultation médicale gynécologique et dépistage confidentiel des IST.",
        ar: "توزيع مجاني للواقي، حبوب منع الحمل، الغرسات، واللولب. عيادات طبية نسائية وتقصي الأمراض المنقولة جنسياً بكل سرية.",
        en: "Free distribution of condoms, contraceptive pills, implants, IUDs. Gynecological medical consultation and confidential STI testing.",
      },
      services: ["contraception", "depistage", "suivi", "conseil"],
    },
    {
      id: "res-onfp-sousse",
      name: {
        fr: "ONFP - Centre Régional de Sousse",
        ar: "ديوان الأسرة - المركز الجهوي بسوسة",
        en: "ONFP - Sousse Regional Center",
      },
      type: "onfp",
      phone: "73 226 155",
      address: {
        fr: "Avenue de la République, Sousse",
        ar: "شارع الجمهورية، سوسة",
        en: "Avenue de la République, Sousse",
      },
      governorate: "Sousse",
      hours: {
        fr: "Lun-Ven : 8h00 - 16h00",
        ar: "الاثنين - الجمعة: 8:00 - 16:00",
        en: "Mon-Fri: 8:00 AM - 4:00 PM",
      },
      description: {
        fr: "Planification familiale, contraception gratuite pour jeunes et célibataires, écoute et suivi gynécologique par des professionnels qualifiés.",
        ar: "التخطيط العائلي، منع الحمل المجاني للشباب وغير المتزوجين، الإرشاد والمتابعة الطبية من قبل أخصائيين مؤهلين.",
        en: "Family planning, free contraception for youth and unmarried individuals, counseling, and gynecological care by qualified experts.",
      },
      services: ["contraception", "suivi", "conseil"],
    },
    {
      id: "res-onfp-sfax",
      name: {
        fr: "ONFP - Centre Régional de Sfax",
        ar: "ديوان الأسرة - المركز الجهوي بصفاقس",
        en: "ONFP - Sfax Regional Center",
      },
      type: "onfp",
      phone: "74 220 544",
      address: {
        fr: "Route de Téniour, Km 1, Sfax",
        ar: "طريق تنيور، كلم 1، صفاقس",
        en: "Teniour Road, Km 1, Sfax",
      },
      governorate: "Sfax",
      hours: {
        fr: "Lun-Ven : 8h00 - 16h00",
        ar: "الاثنين - الجمعة: 8:00 - 16:00",
        en: "Mon-Fri: 8:00 AM - 4:00 PM",
      },
      description: {
        fr: "Information, orientation, pilule du lendemain, suivi gynécologique, insertion de stérilet et dépistage gratuit de la syphilis et du VIH.",
        ar: "الإرشاد والتوجيه، حبة منع الحمل الطارئة، متابعة أمراض النساء، تركيب اللولب الرحمي وتقصي الزهري والسيدا مجاناً.",
        en: "Information, guidance, emergency contraception, gynecological follow-up, IUD insertion, and free screening for syphilis and HIV.",
      },
      services: ["contraception", "depistage", "suivi", "conseil"],
    },
    {
      id: "res-onfp-monastir",
      name: {
        fr: "ONFP - Centre Régional de Monastir",
        ar: "ديوان الأسرة - المركز الجهوي بالمنستير",
        en: "ONFP - Monastir Regional Center",
      },
      type: "onfp",
      phone: "73 462 100",
      address: {
        fr: "Avenue de la Liberté, Monastir",
        ar: "شارع الحرية، المنستير",
        en: "Avenue de la Liberté, Monastir",
      },
      governorate: "Monastir",
      hours: {
        fr: "Lun-Ven : 8h00 - 16h00",
        ar: "الاثنين - الجمعة: 8:00 - 16:00",
        en: "Mon-Fri: 8:00 AM - 4:00 PM",
      },
      description: {
        fr: "Accompagnement psychologique, éducation sexuelle clinique, prescription et distribution gratuite de contraceptifs de dernière génération.",
        ar: "المرافقة النفسية، التثقيف الجنسي السريري، ووصف وتوزيع وسائل منع الحمل الحديثة مجاناً لجميع الفئات.",
        en: "Psychological support, clinical sexuality education, prescription and free distribution of modern birth control methods.",
      },
      services: ["contraception", "conseil"],
    },
    {
      id: "res-onfp-gafsa",
      name: {
        fr: "ONFP - Centre Régional de Gafsa",
        ar: "ديوان الأسرة - المركز الجهوي بقفصة",
        en: "ONFP - Gafsa Regional Center",
      },
      type: "onfp",
      phone: "76 221 340",
      address: {
        fr: "Rue Farhat Hached, Gafsa",
        ar: "نهج فرحات حشاد، قفصة",
        en: "Farhat Hached Street, Gafsa",
      },
      governorate: "Gafsa",
      hours: {
        fr: "Lun-Ven : 8h00 - 16h00",
        ar: "الاثنين - الجمعة: 8:00 - 16:00",
        en: "Mon-Fri: 8:00 AM - 4:00 PM",
      },
      description: {
        fr: "Consultations de santé reproductive, accès gratuit aux préservatifs, dépistage anonyme rapide et orientation vers des praticiens locaux.",
        ar: "عيادات الصحة الإنجابية، الحصول المجاني على الواقي، تقصي سريع ومجهول للعدوى، والتوجيه نحو الأخصائيين المحليين.",
        en: "Reproductive health consultations, free access to condoms, rapid anonymous testing, and referral to local practitioners.",
      },
      services: ["contraception", "depistage", "conseil"],
    },
    {
      id: "res-onfp-bizerte",
      name: {
        fr: "ONFP - Centre Régional de Bizerte",
        ar: "ديوان الأسرة - المركز الجهوي ببنزرت",
        en: "ONFP - Bizerte Regional Center",
      },
      type: "onfp",
      phone: "72 431 822",
      address: {
        fr: "Avenue Hassan Nouri, Bizerte",
        ar: "شارع حسن النوري، بنزرت",
        en: "Hassan Nouri Avenue, Bizerte",
      },
      governorate: "Bizerte",
      hours: {
        fr: "Lun-Ven : 8h00 - 16h00",
        ar: "الاثنين - الجمعة: 8:00 - 16:00",
        en: "Mon-Fri: 8:00 AM - 4:00 PM",
      },
      description: {
        fr: "Espace Jeunes pour l’éducation à la santé reproductive, conseils intimes confidentiels, contraception orale et d’urgence gratuite.",
        ar: "فضاء صديق للشباب للتثقيف حول الصحة الإنجابية، استشارات حميمية وسرية، وحبوب منع الحمل العادية والطارئة مجاناً.",
        en: "Youth Space for reproductive health education, confidential intimate counseling, free oral and emergency birth control.",
      },
      services: ["contraception", "conseil"],
    },
    {
      id: "res-helpline",
      name: {
        fr: "Ligne Écoute Jeunes - ONFP (Numéro Vert)",
        ar: "الرقم الأخضر للإصغاء للشباب - ديوان الأسرة",
        en: "Youth Listening Helpline - ONFP (Toll-Free)",
      },
      type: "helpline",
      phone: "80 100 100",
      address: {
        fr: "Appel gratuit depuis toute la Tunisie",
        ar: "مكالمة مجانية من كامل تراب الجمهورية التونسية",
        en: "Toll-free call from anywhere in Tunisia",
      },
      governorate: "National",
      hours: {
        fr: "7j/7 - 24h/24",
        ar: "كامل أيام الأسبوع - 24/24",
        en: "7 days a week - 24/7",
      },
      description: {
        fr: "Ligne téléphonique nationale gratuite et anonyme assurant écoute, soutien psychologique et réponses aux questions de sexualité des adolescents.",
        ar: "خط هاتفي وطني مجاني ومجهول الهوية يقدم الإصغاء، الدعم النفسي والإجابات الشافية عن أسئلة الجنسانية والمراهقة للشباب.",
        en: "National free and anonymous hotline providing professional active listening, emotional support, and answers to youth sexual health questions.",
      },
      services: ["conseil"],
    },
    {
      id: "res-atp-sida",
      name: {
        fr: "ATP+ (Association Tunisienne de Prévention du SIDA)",
        ar: "الجمعية التونسية للوقاية من السيدا (+ATP)",
        en: "ATP+ (Tunisian Association for HIV Prevention)",
      },
      type: "association",
      phone: "71 332 500",
      address: {
        fr: "Rue de Palestine, Tunis",
        ar: "نهج فلسطين، تونس",
        en: "Palestine Street, Tunis",
      },
      governorate: "Tunis",
      hours: {
        fr: "Lun-Ven : 9h00 - 17h00",
        ar: "الاثنين - الجمعة: 9:00 - 17:00",
        en: "Mon-Fri: 9:00 AM - 5:00 PM",
      },
      description: {
        fr: "Soutien communautaire, tests TROD VIH/Syphilis rapides (15 mins) et anonymes, sensibilisation et accompagnement des personnes vivant avec le VIH.",
        ar: "دعم مجتمعي، تحاليل سريعة ومجهولة للـ VIH والزهري (15 دقيقة)، التوعية والمرافقة الشاملة للمتعايشين مع الفيروس.",
        en: "Community support, rapid and anonymous HIV/Syphilis rapid tests (15 mins), raising awareness and supporting people living with HIV.",
      },
      services: ["depistage", "conseil"],
    },
    {
      id: "res-atl-mst",
      name: {
        fr: "ATL MST SIDA Tunis",
        ar: "الجمعية التونسية لمكافحة الأمراض المنقولة جنسيا والسيدا",
        en: "ATL MST SIDA Tunis",
      },
      type: "association",
      phone: "71 353 720",
      address: {
        fr: "7 Rue du Liban, Tunis",
        ar: "7 neج لبنان، تونس",
        en: "7 Lebanon Street, Tunis",
      },
      governorate: "Tunis",
      hours: {
        fr: "Lun-Ven : 8h30 - 16h30",
        ar: "الاثنين - الجمعة: 8:30 - 16:30",
        en: "Mon-Fri: 8:30 AM - 4:30 PM",
      },
      description: {
        fr: "Prévention médicale active, conseil anonyme, distribution de supports éducatifs et de préservatifs, dépistage volontaire rapide.",
        ar: "وقاية طبية نشطة، استشارات سرية، توزيع وسائل الوقاية ومطويات التثقيف، وتقصي طوعي وسريع للأمراض المنقولة.",
        en: "Active medical prevention, anonymous counseling, distribution of education guides and condoms, and voluntary rapid testing.",
      },
      services: ["depistage", "conseil"],
    },
    {
      id: "res-clinic-sexo-tunis",
      name: {
        fr: "Cabinet de Sexologie Clinique & Thérapie de Couple",
        ar: "عيادة الطب الجنسي والعلاج الزوجي بتونس",
        en: "Clinical Sexology & Couple Therapy Clinic",
      },
      type: "cabinet",
      phone: "55 120 450",
      address: {
        fr: "Centre Médical Ibn Khaldoun, Tunis",
        ar: "المركب الطبي ابن خلدون، تونس",
        en: "Ibn Khaldoun Medical Center, Tunis",
      },
      governorate: "Tunis",
      hours: {
        fr: "Lun-Ven : 9h00 - 18h00 | Sam : 9h00 - 13h00 (Sur RDV)",
        ar: "الاثنين - الجمعة: 9:00 - 18:00 | السبت: 9:00 - 13:00 (بموعد مسبق)",
        en: "Mon-Fri: 9:00 AM - 6:00 PM | Sat: 9:00 AM - 1:00 PM (By Appointment)",
      },
      description: {
        fr: "Consultation privée spécialisée par des cliniciens diplômés en sexologie de la Faculté de Médecine de Tunis. Prise en charge des dysfonctions et thérapie de couple.",
        ar: "عيادة خاصة متخصصة من قبل أطباء مجازين في الطب الجنسي من كلية الطب بتونس. علاج الاضطرابات الجنسية والعلاقات الزوجية.",
        en: "Private specialized consultations by clinicians graduated in Sexology from the Faculty of Medicine of Tunis. Treatment of sexual dysfunctions and couple therapy.",
      },
      services: ["suivi", "conseil"],
    },
  ];

export const quizQuestions: any[] = [
    {
      id: "quiz-1",
      category: "Prevention",
      question: {
        fr: "Quel est le moyen le plus efficace pour se protéger simultanément d’une grossesse non désirée et des infections sexuellement transmissibles (IST) ?",
        ar: "ما هي الطريقة الأكثر فعالية للحماية المتزامنة من الحمل غير المرغوب فيه والأمراض المنقولة جنسياً (IST)؟",
        en: "What is the most effective way to protect against both unplanned pregnancy and sexually transmitted infections (STIs) simultaneously?",
      },
      options: {
        fr: [
          "La pilule contraceptive œstroprogestative",
          "Le préservatif (masculin ou féminin)",
          "Le dispositif intra-utérin (stérilet) au cuivre",
          "La méthode du calendrier (contrôle des cycles)",
        ],
        ar: [
          "حبوب منع الحمل الهرمونية المختلطة",
          "الواقي (الذكري أو الأنثوي)",
          "اللولب الرحمي النحاسي",
          "طريقة الحساب (مراقبة أيام الإباضة)",
        ],
        en: [
          "Combined oral contraceptive pills",
          "The condom (male or female)",
          "The copper intrauterine device (IUD)",
          "The calendar rhythm method",
        ],
      },
      correctIndex: 1,
      explanation: {
        fr: "Le préservatif (externe ou interne) est la seule méthode de contraception barrière qui empêche physiquement le passage des fluides corporels et protège à la fois d’une grossesse accidentelle et des IST (dont le VIH, la syphilis, l’herpès et la chlamydiose).",
        ar: "يعتبر الواقي (الذكري أو الأنثوي) هو الوسيلة الوحيدة لمنع الحمل العازلة التي تمنع فيزيائياً انتقال سوائل الجسم وتحمي في الوقت نفسه من الحمل والعدوى بالأمراض المنقولة جنسياً.",
        en: "The condom (external or internal) is the only barrier contraceptive method that physically blocks bodily fluids, protecting against both unintended pregnancy and STIs (including HIV, syphilis, herpes, and chlamydia).",
      },
    },
    {
      id: "quiz-2",
      category: "Emergency",
      question: {
        fr: "Dans quel délai idéal doit-on prendre la contraception d’urgence (« pilule du lendemain ») après un rapport non ou mal protégé ?",
        ar: 'ما هي الفترة الزمنية المثالية لتناول حبوب منع الحمل الطارئة ("حبة اليوم التالي") بعد جماع غير محمي أو فاشل الوقاية؟',
        en: 'Within what ideal timeframe should emergency contraception ("the morning-after pill") be taken after unprotected or compromised intercourse?',
      },
      options: {
        fr: [
          "Dans les 12 heures à 72 heures au maximum",
          "Exactement une semaine après le rapport",
          "Uniquement au moment des prochaines règles",
          "Dans les 30 jours suivant le rapport",
        ],
        ar: [
          "خلال 12 ساعة إلى 72 ساعة على الأكثر",
          "بعد أسبوع تماماً من الجماع",
          "فقط عند موعد الدورة الشهرية المقبلة",
          "خلال 30 يوماً بعد الجماع",
        ],
        en: [
          "Within 12 hours up to 72 hours maximum",
          "Exactly one week after intercourse",
          "Only when the next menstrual period begins",
          "Within 30 days following intercourse",
        ],
      },
      correctIndex: 0,
      explanation: {
        fr: "La pilule de contraception d’urgence est d’autant plus efficace qu’elle est prise tôt. Elle bloque ou retarde l’ovulation. Son efficacité est maximale si elle est ingérée dans les 12h à 24h, et reste efficace jusqu’à 72 heures (voire 120 heures pour certaines formules).",
        ar: "تكون حبة منع الحمل الطارئة أكثر فعالية كلما تم تناولها مبكراً. فهي تعمل على منع أو تأخير الإباضة. تبلغ فعاليتها أقصاها عند تناولها في غضون 12 إلى 24 ساعة، وتظل فعالة حتى 72 ساعة.",
        en: "The emergency contraceptive pill is most effective when taken as early as possible. It works by delaying or preventing ovulation. Efficacy is highest when taken within 12–24 hours, and remains high up to 72 hours.",
      },
    },
    {
      id: "quiz-3",
      category: "Consent",
      question: {
        fr: "Parmi les affirmations suivantes sur le consentement dans une relation, laquelle est médicalement et juridiquement exacte ?",
        ar: "من بين الادعاءات التالية حول الموافقة في العلاقات، أيها صحيح طبياً وقانونياً؟",
        en: "Among the following statements regarding consent in a relationship, which one is medically and legally correct?",
      },
      options: {
        fr: [
          "Le consentement donné une fois est permanent pour toute la durée de la relation.",
          "Le consentement peut être retiré à tout moment, par n’importe quel partenaire.",
          "L’absence de refus explicite (« non ») équivaut automatiquement à un accord.",
          "Le mariage ou l’engagement officiel annule la nécessité de demander le consentement.",
        ],
        ar: [
          "الموافقة المعطاة مرة واحدة تعتبر دائمة طوال مدة العلاقة.",
          "يمكن سحب الموافقة في أي وقت، من قبل أي طرف في العلاقة.",
          'عدم الرفض الصريح ("لا") يعادل تلقائياً الموافقة والقبول.',
          "الزواج أو الخطوبة الرسمية تلغي الحاجة لطلب الموافقة المتبادلة.",
        ],
        en: [
          "Consent given once is permanent for the entire duration of the relationship.",
          "Consent can be withdrawn at any moment, by either partner.",
          'The absence of an explicit refusal ("no") automatically equals consent.',
          "Marriage or official engagement cancels the need to ask for consent.",
        ],
      },
      correctIndex: 1,
      explanation: {
        fr: "Le consentement doit être libre, éclairé, enthousiaste, spécifique et révocable. Cela signifie que chaque partenaire a le droit absolu de changer d’avis et de retirer son accord à tout moment, quel que soit l’engagement amoureux ou juridique.",
        ar: "يجب أن تكون الموافقة حرة، واعية، محددة وقابلة للتراجع. وهذا يعني أن لكل شريك الحق المطلق في تغيير رأيه وسحب موافقته في أي وقت، بغض النظر عن طبيعة العلاقة.",
        en: "Consent must be freely given, informed, specific, enthusiastic, and reversible. This means each partner has an absolute right to change their mind and withdraw agreement at any time, regardless of marital or legal commitment.",
      },
    },
  ];

export const governorates: string[] = [
  "Tunis",
  "Sousse",
  "Sfax",
  "Monastir",
  "Bizerte",
  "Gafsa",
  "Nabeul",
  "Ariana",
  "Kairouan",
  "National",
];

export const filterGovernorates: string[] = [
  "All",
  "National",
  "Tunis",
  "Sousse",
  "Sfax",
  "Monastir",
  "Bizerte",
  "Gafsa",
];

export const getCategoryIcon = (name: string) => {
  switch (name) {
    case 'body': return User;
    case 'heart': return Heart;
    case 'shield': return Shield;
    case 'users': return Users;
    case 'star': return Compass;
    case 'file-text': return FileText;
    default: return BookOpen;
  }
};
