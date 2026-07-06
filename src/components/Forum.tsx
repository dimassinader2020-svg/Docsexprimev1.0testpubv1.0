import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, MessageCircle, HelpCircle, Search, SlidersHorizontal, Plus, ArrowLeft, Send, Sparkles, User, ShieldCheck } from 'lucide-react';
import { translations, categories } from '../data';
import { Submissions } from './Submissions';

interface ForumProps {
  lang: 'fr' | 'ar' | 'en';
  isProfessional: boolean;
  professionalTitle: string;
}

export const Forum: React.FC<ForumProps> = ({ lang, isProfessional, professionalTitle }) => {
  const s = translations[lang];

  // Active sub tab: "forum" or "submissions"
  const [subTab, setSubTab] = useState<'forum' | 'submissions'>('forum');

  // Forum Questions States
  const [questions, setQuestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'recent' | 'popular' | 'solved'>('recent');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  // New Question States
  const [isAsking, setIsAsking] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState(categories[0]?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Reply States
  const [replyContent, setReplyContent] = useState('');

  // Fetch all forum questions from backend
  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/forum');
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
        
        // If we have a selected question, keep it updated with the latest replies
        if (selectedQuestion) {
          const updated = data.find((q: any) => q.id === selectedQuestion.id);
          if (updated) setSelectedQuestion(updated);
        }
      }
    } catch (err) {
      console.error('Error fetching forum questions:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [subTab]);

  // Handle Asking New Question
  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;

    setIsSubmitting(true);
    const catObj = categories.find((c) => c.id === newQuestionCategory);
    const catLabel = catObj ? catObj.title[lang] : categories[0]?.title[lang];

    try {
      const res = await fetch('/api/forum/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newQuestionTitle.trim(),
          category: catLabel,
          categoryKey: newQuestionCategory,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuestions((prev) => [data, ...prev]);
        setNewQuestionTitle('');
        setIsAsking(false);
      }
    } catch (err) {
      console.error('Error posting question:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Replying to Question
  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !selectedQuestion) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/forum/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: selectedQuestion.id,
          authorName: isProfessional ? 'Dr. Praticien' : 'Utilisateur',
          isProfessional: isProfessional,
          professionalTitle: isProfessional ? professionalTitle : '',
          content: replyContent.trim(),
        }),
      });

      if (res.ok) {
        const replyData = await res.json();
        const updatedQuestion = {
          ...selectedQuestion,
          isSolved: true,
          answers: [...(selectedQuestion.answers || []), replyData],
        };
        setSelectedQuestion(updatedQuestion);
        
        // Update general questions list
        setQuestions((prev) =>
          prev.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q))
        );
        setReplyContent('');
      }
    } catch (err) {
      console.error('Error posting reply:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter and Sort Questions
  const filteredQuestions = questions
    .filter((q) => q.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (activeFilter === 'popular') {
        return b.viewsCount - a.viewsCount;
      } else if (activeFilter === 'solved') {
        return (b.isSolved ? 1 : 0) - (a.isSolved ? 1 : 0);
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6" id="forum-tab-root">
      {/* Forum Sub Tab Toggles */}
      <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 max-w-md mx-auto mb-8 shadow-inner">
        <button
          onClick={() => {
            setSubTab('forum');
            setSelectedQuestion(null);
            setIsAsking(false);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            subTab === 'forum'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 shadow-sm'
              : 'text-slate-400 hover:text-white border border-transparent'
          }`}
        >
          <MessageCircle size={15} />
          {lang === 'fr' ? 'Forum Clinique' : lang === 'ar' ? 'المنتدى الطبي' : 'Clinical Forum'}
        </button>
        <button
          onClick={() => {
            setSubTab('submissions');
            setSelectedQuestion(null);
            setIsAsking(false);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            subTab === 'submissions'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 shadow-sm'
              : 'text-slate-400 hover:text-white border border-transparent'
          }`}
        >
          <HelpCircle size={15} />
          {lang === 'fr' ? 'Soumissions & Témoignages' : lang === 'ar' ? 'مشاركات وتجارب' : 'Submissions & Testimonials'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'submissions' ? (
          <motion.div
            key="submissions-subtab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Submissions lang={lang} />
          </motion.div>
        ) : selectedQuestion ? (
          // Question Details View
          <motion.div
            key="question-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedQuestion(null)}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {s.back}
            </button>

            {/* Original Question Card */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700/50">
                  {selectedQuestion.category}
                </span>
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                  selectedQuestion.isSolved 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                }`}>
                  {selectedQuestion.isSolved ? s.solved : s.unsolved}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
                {selectedQuestion.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedQuestion.content}
              </p>
              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-3">
                <span>{new Date(selectedQuestion.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{selectedQuestion.viewsCount} {lang === 'fr' ? 'vues' : lang === 'ar' ? 'مشاهدة' : 'views'}</span>
              </div>
            </div>

            {/* Answers Header */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base md:text-lg flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-400" />
                {lang === 'fr' ? 'Réponses des Praticiens' : lang === 'ar' ? 'إجابات الأطباء والأخصائيين' : 'Practitioners Responses'}
              </h4>

              {selectedQuestion.answers && selectedQuestion.answers.length > 0 ? (
                selectedQuestion.answers.map((reply: any) => (
                  <div key={reply.id} className="bg-slate-950/40 border border-slate-800 p-5 rounded-2xl space-y-3 relative overflow-hidden">
                    {reply.isProfessional && (
                      <div className="absolute top-0 right-0 h-1 w-32 bg-emerald-500" />
                    )}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${reply.isProfessional ? 'bg-emerald-500/10' : 'bg-slate-800'}`}>
                          {reply.isProfessional ? (
                            <ShieldCheck size={16} className="text-emerald-400" />
                          ) : (
                            <User size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200">
                            {reply.authorName}
                          </div>
                          {reply.isProfessional && reply.professionalTitle && (
                            <div className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider">
                              {reply.professionalTitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(reply.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-xs md:text-sm">
                  {lang === 'fr' 
                    ? 'Aucune réponse clinique n’a encore été publiée. Les réponses de notre équipe médicale qualifiée s’affichent en vert.' 
                    : lang === 'ar'
                    ? 'لم ينشر أي رد طبي بعد. ردود الطاقم الطبي تظهر باللون الأخضر.'
                    : 'No clinical responses have been posted yet. Verification badges will show in green.'}
                </div>
              )}
            </div>

            {/* Reply Area */}
            <form onSubmit={handlePostReply} className="space-y-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                {isProfessional 
                  ? `${lang === 'fr' ? 'Rédiger une réponse médicale' : lang === 'ar' ? 'إضافة إجابة طبية معتمدة' : 'Draft professional reply'} (${professionalTitle || 'Dr.'})`
                  : lang === 'fr' ? 'Partager un conseil / une réaction' : lang === 'ar' ? 'إضافة رأي أو استفسار مكمل' : 'Share a reaction'}
              </label>
              <div className="relative">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={lang === 'fr' ? 'Saisissez votre réponse confidentielle...' : lang === 'ar' ? 'اكتب ردك الطبي السري هنا...' : 'Type your confidential reply...'}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !replyContent.trim()}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-slate-800 disabled:text-slate-600 transition-colors cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          // General Questions List View
          <motion.div
            key="forum-general"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'fr' ? 'Rechercher un sujet médical...' : lang === 'ar' ? 'البحث عن موضوع طبي...' : 'Search clinical topics...'}
                  className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl pl-11 pr-4 py-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-slate-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAsking(true)}
                  className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer shrink-0"
                >
                  <Plus size={16} />
                  {lang === 'fr' ? 'Poser une question' : lang === 'ar' ? 'طرح سؤال طبي' : 'Ask Question'}
                </button>
              </div>
            </div>

            {/* Filter Buttons row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <SlidersHorizontal size={14} className="text-slate-500 shrink-0" />
              {(['recent', 'popular', 'solved'] as const).map((filt) => (
                <button
                  key={filt}
                  onClick={() => setActiveFilter(filt)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                    activeFilter === filt
                      ? 'bg-slate-800 text-white border-slate-700 shadow-sm'
                      : 'bg-transparent text-slate-500 hover:text-slate-300 border-transparent'
                  }`}
                >
                  {filt === 'recent' ? s.filterRecent : filt === 'popular' ? s.filterPopular : s.filterSolved}
                </button>
              ))}
            </div>

            {/* Questions Grid/List */}
            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => (
                  <motion.div
                    key={q.id}
                    whileHover={{ scale: 1.005 }}
                    onClick={() => {
                      // Increment views on front side
                      q.viewsCount += 1;
                      setSelectedQuestion(q);
                    }}
                    className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/20 p-5 rounded-3xl transition-all cursor-pointer space-y-3 relative group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold tracking-wider uppercase bg-slate-800 text-indigo-400 px-2 py-0.5 rounded-full border border-slate-700/50">
                          {q.category}
                        </span>
                        <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                          q.isSolved 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {q.isSolved ? s.solved : s.unsolved}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors text-sm md:text-base leading-snug">
                      {q.title}
                    </h4>

                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        {q.answers ? q.answers.length : 0} {lang === 'fr' ? 'réponses' : lang === 'ar' ? 'إجابات' : 'replies'}
                      </span>
                      <span>•</span>
                      <span>{q.viewsCount} {lang === 'fr' ? 'vues' : lang === 'ar' ? 'مشاهدة' : 'views'}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-xs md:text-sm">
                  {lang === 'fr' 
                    ? 'Aucun sujet de discussion correspondant à votre recherche n’a été trouvé.' 
                    : lang === 'ar'
                    ? 'لم يتم العثور على أي أسئلة مطابقة لبحثك.'
                    : 'No forum questions matching your search were found.'}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ask Question Modal Popup */}
      <AnimatePresence>
        {isAsking && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-lg space-y-6 relative"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/10 p-2.5 rounded-2xl border border-indigo-500/20">
                  <Sparkles size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-white">
                    {lang === 'fr' ? 'Poser une Question Clinique' : lang === 'ar' ? 'طرح استفسار طبي جديد' : 'Ask clinical question'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'fr' ? 'Votre question sera publiée de manière 100% anonyme.' : lang === 'ar' ? 'سيتم نشر استفسارك بشكل مجهول الهوية بالكامل.' : 'Your question will be posted completely anonymously.'}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleAskQuestion} className="space-y-4">
                {/* Category Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {lang === 'fr' ? 'Thématique' : lang === 'ar' ? 'المحور الطبي' : 'Clinical topic'}
                  </label>
                  <select
                    value={newQuestionCategory}
                    onChange={(e) => setNewQuestionCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {lang === 'fr' ? 'Votre Question' : lang === 'ar' ? 'استفسارك التفصيلي' : 'Your question details'}
                  </label>
                  <textarea
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                    placeholder={lang === 'fr' ? 'Ex: Comment savoir si ma contraception est adaptée ? Est-ce que le secret médical protège un mineur...' : lang === 'ar' ? 'مثال: كيف أعرف ما إذا كانت وسيلة منع الحمل مناسبة لي؟ هل يحمي السر الطبي القاصر...' : 'Ex: How do I know if my contraceptive is right for me? Does medical secrecy protect a minor...'}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 resize-none"
                    required
                  />
                </div>

                {/* Submitting Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAsking(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    {lang === 'fr' ? 'Annuler' : lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newQuestionTitle.trim()}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:bg-slate-800 disabled:text-slate-600 flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      lang === 'fr' ? 'Publication...' : 'جاري النشر...'
                    ) : (
                      <>
                        <Send size={14} />
                        {lang === 'fr' ? 'Publier anonymement' : lang === 'ar' ? 'نشر مجهول الهوية' : 'Post anonymously'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Forum;
