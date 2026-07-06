import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, Send, ShieldAlert, Lock, ShieldCheck, Check, X, Trash2, Eye, Compass, Heart } from 'lucide-react';
import { translations, categories, governorates } from '../data';

interface SubmissionsProps {
  lang: 'fr' | 'ar' | 'en';
}

export const Submissions: React.FC<SubmissionsProps> = ({ lang }) => {
  const s = translations[lang];

  // Active Testimonials list
  const [approvedSubmissions, setApprovedSubmissions] = useState<any[]>([]);
  const [allSubmissions, setAllSubmissions] = useState<any[]>([]);

  // Form states
  const [subContent, setSubContent] = useState('');
  const [subType, setSubType] = useState<'question' | 'testimonial'>('testimonial');
  const [subCategory, setSubCategory] = useState(categories[0]?.title[lang] || '');
  const [subGovernorate, setSubGovernorate] = useState(governorates[0] || 'Tunis');

  // Interactive controls state
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  // Admin lock states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [adminCodeError, setAdminCodeError] = useState('');
  const [adminActiveFilter, setAdminActiveFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

  // Fetch approved submissions
  const fetchApproved = async () => {
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        setApprovedSubmissions(data);
      }
    } catch (err) {
      console.error('Error fetching approved submissions:', err);
    }
  };

  // Fetch admin submissions
  const fetchAllForAdmin = async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.ok) {
        const data = await res.json();
        setAllSubmissions(data);
      }
    } catch (err) {
      console.error('Error fetching admin submissions:', err);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  useEffect(() => {
    if (isAdminMode) {
      fetchAllForAdmin();
    }
  }, [isAdminMode]);

  // Handle testimonial sending
  const handleSendSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subContent.trim()) return;

    setIsSending(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: subType,
          content: subContent.trim(),
          category: subCategory,
          governorate: subGovernorate,
        }),
      });

      if (res.ok) {
        setSubContent('');
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 6000);
        
        // Refresh approved list
        fetchApproved();
        // If admin workspace is open, refresh that too
        if (isAdminMode) fetchAllForAdmin();
      }
    } catch (err) {
      console.error('Error sending submission:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Admin Authorization
  const handleAuthorizeAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = adminCode.trim().toLowerCase();
    
    if (cleanCode === '1234' || cleanCode === 'admin' || cleanCode === 'tunis') {
      setIsAdminMode(true);
      setAdminCodeError('');
    } else {
      setAdminCodeError(
        lang === 'fr'
          ? 'Code incorrect. Utilisez "1234" ou "admin" pour tester le panneau de modération.'
          : lang === 'ar'
          ? 'الرمز خاطئ. استخدم "1234" أو "admin" لتجربة فضاء المراقبة.'
          : 'Incorrect code. Use "1234" or "admin" to test the moderation panel.'
      );
    }
  };

  // Admin Actions: Approve
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}/approve`, {
        method: 'POST',
      });
      if (res.ok) {
        fetchAllForAdmin();
        fetchApproved();
      }
    } catch (err) {
      console.error('Error approving submission:', err);
    }
  };

  // Admin Actions: Reject
  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}/reject`, {
        method: 'POST',
      });
      if (res.ok) {
        fetchAllForAdmin();
        fetchApproved();
      }
    } catch (err) {
      console.error('Error rejecting submission:', err);
    }
  };

  // Admin Actions: Delete
  const handleDelete = async (id: string) => {
    const confirmMsg =
      lang === 'fr'
        ? 'Voulez-vous supprimer définitivement cette soumission ?'
        : lang === 'ar'
        ? 'هل أنت متأكد من حذف هذه المشاركة نهائياً؟'
        : 'Do you want to permanently delete this submission?';

    if (window.confirm(confirmMsg)) {
      try {
        const res = await fetch(`/api/admin/submissions/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchAllForAdmin();
          fetchApproved();
        }
      } catch (err) {
        console.error('Error deleting submission:', err);
      }
    }
  };

  // Filter admin list based on current active filter
  const filteredAdminSubmissions = allSubmissions.filter(
    (s) => s.status === adminActiveFilter
  );

  return (
    <div className="space-y-8" id="submissions-container-root">
      {/* Intro Box */}
      <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <Sparkles size={16} />
          <span>{lang === 'fr' ? 'Foyers d’expériences' : lang === 'ar' ? 'تجارب ومشاركات ملهمة' : 'Secure Testimonials'}</span>
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          {lang === 'fr'
            ? 'Exprimez-vous en toute liberté et sécurité. Vos témoignages de contraception ou de rituels de soins sont validés de manière totalement anonyme par notre équipe médicale pour écarter tout risque.'
            : lang === 'ar'
            ? 'عبّر عن نفسك بكل حرية وأمان. مشاركاتك وتجاربك مع الرعاية الطبية أو وسائل منع الحمل يتم مراجعتها وتدقيقها طبياً بشكل سري للغاية ومجهول الهوية بالكامل قبل نشرها.'
            : 'Express yourself with absolute safety and liberty. Your personal testimonials and health experiences are reviewed confidentially by our medical practitioners before being published anonymously.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Create Submission Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Compass size={18} className="text-indigo-400" />
              {lang === 'fr' ? 'Témoigner anonymement' : lang === 'ar' ? 'شارك قصتك دون كشف هويتك' : 'Share anonymously'}
            </h3>

            <form onSubmit={handleSendSubmission} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setSubType('testimonial')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    subType === 'testimonial'
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'fr' ? 'Témoignage' : lang === 'ar' ? 'تجربة شخصية' : 'Testimonial'}
                </button>
                <button
                  type="button"
                  onClick={() => setSubType('question')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    subType === 'question'
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'fr' ? 'Question' : lang === 'ar' ? 'سؤال سري' : 'Secret Question'}
                </button>
              </div>

              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {lang === 'fr' ? 'Catégorie associée' : lang === 'ar' ? 'التصنيف' : 'Associated Topic'}
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.title[lang]}>
                      {cat.title[lang]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Governorate selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {lang === 'fr' ? 'Gouvernorat (Région)' : lang === 'ar' ? 'الولاية' : 'Tunisian Governorate'}
                </label>
                <select
                  value={subGovernorate}
                  onChange={(e) => setSubGovernorate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {governorates.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content text */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {lang === 'fr' ? 'Votre témoignage ou question' : lang === 'ar' ? 'محتوى مشاركتك' : 'Your Story'}
                </label>
                <textarea
                  value={subContent}
                  onChange={(e) => setSubContent(e.target.value)}
                  placeholder={
                    subType === 'testimonial'
                      ? (lang === 'fr' ? 'Partagez votre histoire ou votre vécu médical... (Ex: Mon expérience positive avec l’implant à l’ONFP de Monastir)' : lang === 'ar' ? 'شارك تجربتك مع العلاج أو وسائل منع الحمل... مثال: تجربتي مع الكبسولة الطبية في ولاية المنستير' : 'Share your story or medical feedback...')
                      : (lang === 'fr' ? 'Posez votre question médicale intime... Elle sera traitée de manière strictement confidentielle.' : lang === 'ar' ? 'اطرح سؤالك الحميمي بكل سرية... سنقوم بدراسته طبياً دون كشف هويتك.' : 'Ask your intimate question confidentially...')
                  }
                  rows={5}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 resize-none"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={isSending || !subContent.trim()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:bg-slate-800 disabled:text-slate-600 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isSending ? (
                  lang === 'fr' ? 'Envoi confidentiel...' : 'جاري الإرسال بسريّة...'
                ) : (
                  <>
                    <Send size={14} />
                    {lang === 'fr' ? 'Envoyer de manière anonyme' : lang === 'ar' ? 'إرسال بسرّية تامة' : 'Send Anonymously'}
                  </>
                )}
              </button>
            </form>

            {/* Success Prompt notification */}
            <AnimatePresence>
              {showSuccessMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-400 font-medium leading-relaxed"
                >
                  <ShieldCheck size={16} className="inline mr-1 text-emerald-400 shrink-0" />
                  {lang === 'fr'
                    ? 'Envoi réussi ! Votre témoignage sera examiné de façon strictement confidentielle par notre comité médical avant d’être publié sous anonymat intégral.'
                    : lang === 'ar'
                    ? 'تم الإرسال بنجاح! ستتم مراجعة مشاركتك بسرية تامة من قبل فريقنا الطبي قبل تفعيلها مجهولة الهوية بالكامل.'
                    : 'Submission successfully sent! It will be reviewed confidentially by our clinical team before being published with total anonymity.'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Approved Testimonials Stream */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-base md:text-lg flex items-center gap-2">
              <Eye size={18} className="text-indigo-400" />
              {lang === 'fr' ? 'Histoires Publiées' : lang === 'ar' ? 'التجارب المنشورة' : 'Published Stories'}
            </h3>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {approvedSubmissions.length > 0 ? (
                approvedSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-3xl space-y-3 relative overflow-hidden"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold tracking-wider uppercase bg-slate-950 text-indigo-400 px-2 py-0.5 rounded-full border border-slate-800">
                          {sub.category}
                        </span>
                        <span className="text-[9px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full">
                          {sub.governorate}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(sub.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic whitespace-pre-wrap">
                      « {sub.content} »
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                      <Heart size={11} className="text-indigo-500/50" />
                      <span>{lang === 'fr' ? 'Publié sous anonymat médical' : lang === 'ar' ? 'منشور بصفة مجهول الهوية' : 'Anonymously verified'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-xs md:text-sm">
                  {lang === 'fr'
                    ? 'Aucun témoignage publié pour le moment. Soyez le premier à partager votre vécu !'
                    : lang === 'ar'
                    ? 'لا توجد أي تجارب منشورة حالياً. كن أول من يشارك قصته الملهمة!'
                    : 'No approved testimonials found. Be the first to share your experience!'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin lock & Moderator workspace at bottom */}
      <div className="border-t border-slate-800/60 pt-8" id="moderator-workspace-section">
        <AnimatePresence mode="wait">
          {!isAdminMode ? (
            // Auth Form
            <motion.div
              key="admin-auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto bg-slate-950/40 border border-slate-900 rounded-3xl p-6 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
                <Lock size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm md:text-base">
                  {lang === 'fr' ? 'Fspace Modérateur' : lang === 'ar' ? 'فضاء المراقبة الطبي' : 'Moderator Workspace'}
                </h4>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  {lang === 'fr'
                    ? 'Réservé aux praticiens cliniques. Saisissez le code "1234" ou "admin" pour tester la modération.'
                    : lang === 'ar'
                    ? 'خاص بالأطباء والمنشطين الصحيين. أدخل الرمز "1234" أو "admin" لتجربة الرقابة.'
                    : 'Strictly restricted to medical administrators. Enter "1234" or "admin" to test moderation.'}
                </p>
              </div>

              <form onSubmit={handleAuthorizeAdmin} className="flex gap-2">
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder={lang === 'fr' ? 'Code d’accès...' : 'رمز الدخول...'}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
                >
                  {lang === 'fr' ? 'Déverrouiller' : 'دخول'}
                </button>
              </form>

              {adminCodeError && (
                <p className="text-[10px] text-rose-400 font-medium leading-relaxed animate-pulse">
                  {adminCodeError}
                </p>
              )}
            </motion.div>
          ) : (
            // Moderator Active Panel
            <motion.div
              key="admin-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 p-2.5 rounded-2xl border border-emerald-500/20 text-emerald-400">
                    <ShieldAlert size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base md:text-lg flex items-center gap-2">
                      {lang === 'fr' ? 'Espace de Modération Clinique' : lang === 'ar' ? 'لوحة تدقيق ومراقبة التجارب' : 'Clinical Moderation Desk'}
                      <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Admin
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'fr'
                        ? 'Vérifiez et filtrez les témoignages avant publication sur le flux public.'
                        : lang === 'ar'
                        ? 'قم بمراجعة، تفعيل، أو حذف المشاركات المعلقة لحماية سرية وحياء الفضاء.'
                        : 'Filter and approve safe reproductive health testimonials for public release.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsAdminMode(false);
                    setAdminCode('');
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 text-xs font-bold transition-all cursor-pointer self-start md:self-auto shrink-0"
                >
                  {lang === 'fr' ? 'Fermer la session' : 'خروج من الإدارة'}
                </button>
              </div>

              {/* Status Toggles */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 max-w-xs">
                {(['pending', 'approved', 'rejected'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setAdminActiveFilter(status)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      adminActiveFilter === status
                        ? 'bg-slate-800 text-white border border-slate-700/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {status === 'pending'
                      ? (lang === 'fr' ? 'En attente' : 'معلق')
                      : status === 'approved'
                      ? (lang === 'fr' ? 'Validé' : 'مقبول')
                      : (lang === 'fr' ? 'Refusé' : 'مرفوض')}
                  </button>
                ))}
              </div>

              {/* Moderator List Grid */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredAdminSubmissions.length > 0 ? (
                  filteredAdminSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-slate-950/40 border border-slate-850 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-800 transition-colors"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-bold tracking-wider uppercase bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full">
                            {sub.type === 'question' ? 'QUESTION' : 'TESTIMONIAL'}
                          </span>
                          <span className="text-[9px] font-bold tracking-wider uppercase bg-slate-900 text-indigo-400 px-2 py-0.5 rounded-full">
                            {sub.category}
                          </span>
                          <span className="text-[9px] font-bold tracking-wider uppercase bg-slate-900 text-emerald-400 px-2 py-0.5 rounded-full">
                            {sub.governorate}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic">
                          « {sub.content} »
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {new Date(sub.timestamp).toLocaleString()}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                        {sub.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove(sub.id)}
                            className="p-2 bg-emerald-950/20 hover:bg-emerald-500 border border-emerald-900/40 hover:border-transparent text-emerald-400 hover:text-white rounded-xl transition-all cursor-pointer"
                            title="Approve / Publish"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {sub.status !== 'rejected' && (
                          <button
                            onClick={() => handleReject(sub.id)}
                            className="p-2 bg-rose-950/20 hover:bg-rose-500 border border-rose-900/40 hover:border-transparent text-rose-400 hover:text-white rounded-xl transition-all cursor-pointer"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-rose-400 rounded-xl transition-all cursor-pointer"
                          title="Delete permanently"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-slate-950/20 border border-slate-900/50 rounded-2xl text-slate-500 text-xs">
                    {lang === 'fr'
                      ? 'Aucune soumission correspondante dans cette rubrique.'
                      : 'لا توجد مشاركات معلقة أو مصفاة في هذا الفضاء.'}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Submissions;
