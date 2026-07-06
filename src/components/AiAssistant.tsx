import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, AlertCircle, Stethoscope, HelpCircle, Lock } from 'lucide-react';
import { translations } from '../data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiAssistantProps {
  lang: 'fr' | 'ar' | 'en';
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ lang, isOpen, onClose }) => {
  const s = translations[lang];

  // Conversation State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested clinically vetted question prompts
  const suggestions = {
    fr: [
      "Où obtenir la contraception gratuite ?",
      "Le secret médical protège-t-il les mineurs ?",
      "Quels sont les symptômes d'une IST ?",
      "Comment fonctionne le stérilet ?"
    ],
    ar: [
      "أين يمكنني الحصول على موانع الحمل مجاناً؟",
      "هل يحميني السر الطبي كقاصر في تونس؟",
      "ما هي أهم أعراض الأمراض المنقولة جنسياً؟",
      "كيف يعمل اللولب الرحمي؟"
    ],
    en: [
      "Where to get free contraception in Tunisia?",
      "Does medical secrecy apply to minors?",
      "What are the symptoms of an STI?",
      "How does an IUD work?"
    ]
  };

  // Initialize Greeting
  useEffect(() => {
    const greetings = {
      fr: "Bonjour ! Je suis l'assistant d'orientation clinique confidentiel de Docsexprime.tn. Je suis conçu pour vous guider, vous informer de manière scientifique, et vous orienter vers les centres de l'ONFP. Comment puis-je vous accompagner aujourd'hui ?",
      ar: "مرحباً! أنا المساعد الطبي الإرشادي السري والمعتمد لمنصة Docsexprime.tn. أنا هنا للإجابة عن تساؤلاتك الطبية بكل سرية وتوجيهك إلى أقرب مراكز الديوان الوطني للأسرة. كيف يمكنني مساعدتك اليوم؟",
      en: "Hello! I am the secure clinical orientation assistant of Docsexprime.tn. I am here to provide objective medical information and guide you to ONFP counseling centers. How can I assist you today?"
    };

    setMessages([
      {
        role: 'assistant',
        content: greetings[lang],
      },
    ]);
  }, [lang, isOpen]);

  // Scroll to bottom helper
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Send message handler
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setChatError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          lang: lang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        const errData = await res.json();
        setChatError(errData.error || 'Erreur de connexion avec le serveur clinique.');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setChatError(lang === 'fr' ? 'Impossible d’établir la liaison avec l’IA clinique.' : 'تعذر الاتصال بالمساعد الطبي.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-[380px] h-[520px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          id="clinical-assistant-widget"
        >
          {/* Conversational Header banner */}
          <div className="bg-indigo-950/80 border-b border-indigo-900/40 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600/10 p-2 rounded-xl border border-indigo-500/20 text-indigo-400">
                <Stethoscope size={18} className="animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-xs md:text-sm">
                  {lang === 'fr' ? 'IA Orientation Clinique' : lang === 'ar' ? 'الإرشاد الطبي الذكي' : 'Clinical AI Assistant'}
                </h3>
                <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {lang === 'fr' ? 'Anonymat médical Garanti' : 'السر الطبي مضمون'}
                </span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Secure lock warning banner */}
          <div className="bg-slate-950 p-2 text-center text-[10px] text-slate-500 font-semibold border-b border-slate-900 flex items-center justify-center gap-1">
            <Lock size={10} className="text-slate-600" />
            <span>{lang === 'fr' ? 'Discussion cryptée. Aucun log personnel n’est stocké.' : 'محادثة مشفرة. لا يتم حفظ سجلات الهوية.'}</span>
          </div>

          {/* Messages display viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs md:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-950/60 border border-slate-850 text-slate-300 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading / Thinking Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-950/60 border border-slate-850 rounded-2xl rounded-bl-none px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="font-semibold text-[10px] ml-1">{lang === 'fr' ? 'Analyse clinique...' : 'دراسة طبية...'}</span>
                </div>
              </div>
            )}

            {/* Error notifications */}
            {chatError && (
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-[10px] text-rose-400 flex items-start gap-1.5 leading-relaxed">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{chatError}</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips (only when no pending prompt) */}
          {!isLoading && messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-850 flex gap-1.5 overflow-x-auto shrink-0 pb-3 select-none">
              {suggestions[lang].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-3 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-850 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 shrink-0 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Textarea inputs footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={lang === 'fr' ? 'Posez votre question clinique...' : 'اكتب استفسارك الطبي هنا...'}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl disabled:bg-slate-800 disabled:text-slate-600 transition-colors cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AiAssistant;
