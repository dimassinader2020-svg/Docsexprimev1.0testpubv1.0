import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Check, Heart, HelpCircle, Activity, Globe, Award } from 'lucide-react';
import { translations } from '../data';

interface ProfileProps {
  lang: 'fr' | 'ar' | 'en';
  isProfessional: boolean;
  professionalTitle: string;
  onToggleProfessional: (val: boolean) => void;
  onSetProfessionalTitle: (title: string) => void;
  onChangeLang: (lang: 'fr' | 'ar' | 'en') => void;
}

export const Profile: React.FC<ProfileProps> = ({
  lang,
  isProfessional,
  professionalTitle,
  onToggleProfessional,
  onSetProfessionalTitle,
  onChangeLang,
}) => {
  const s = translations[lang];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-8" id="profile-panel-root">
      {/* Upper Hero Badge */}
      <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/80 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
          <Activity size={26} className="animate-pulse" />
        </div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-white text-base md:text-lg">
            {lang === 'fr' ? 'Profil Confidentiel' : lang === 'ar' ? 'الملف الشخصي السري' : 'Confidential Profile'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            {lang === 'fr'
              ? 'Votre session est entièrement locale et confidentielle. Vos quiz et contributions respectent l’anonymat le plus strict.'
              : lang === 'ar'
              ? 'جلستك الحالية محلية وسرية بالكامل. مشاركاتك تخضع للسر الطبي التام.'
              : 'Your current session is fully secure and confidential. All forum interactions are encrypted locally.'}
          </p>
        </div>
      </div>

      {/* Language Preferences Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h4 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
          <Globe size={18} className="text-indigo-400" />
          {lang === 'fr' ? 'Langue de l’interface médicale' : lang === 'ar' ? 'لغة المنصة الطبية' : 'Language preference'}
        </h4>

        <div className="grid grid-cols-3 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['fr', 'ar', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => onChangeLang(l)}
              className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                lang === l
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/25 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {l === 'fr' ? 'Français' : l === 'ar' ? 'العربية' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {/* Practitioner Credentials Lock Form */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
            <Shield size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm md:text-base">
              {lang === 'fr' ? 'Crédentiels Professionnels' : lang === 'ar' ? 'بيانات الاعتماد الطبي' : 'Clinical Credentials'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'fr'
                ? 'Activez ce mode si vous êtes gynécologue, sage-femme, psychologue ou représentant de l’ONFP pour répondre aux questions du forum avec votre titre certifié.'
                : lang === 'ar'
                ? 'قم بتفعيل هذا الخيار إذا كنت طبيب توليد، قابلة، أخصائي نفسي أو ممثل للديوان للرد على استفسارات الشباب بصفتك المعتمدة.'
                : 'Toggle clinical practitioner status to certify and post replies with custom credentials.'}
            </p>
          </div>
        </div>

        {/* Toggle Option */}
        <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-850">
          <span className="text-xs font-bold text-slate-300">
            {lang === 'fr' ? 'Je suis praticien de santé' : lang === 'ar' ? 'أنا أخصائي صحي معتمد' : 'I am a clinical practitioner'}
          </span>
          <button
            onClick={() => onToggleProfessional(!isProfessional)}
            className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
              isProfessional ? 'bg-indigo-600' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                isProfessional ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Professional details form */}
        <AnimatePresence>
          {isProfessional && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden pt-1"
            >
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {lang === 'fr' ? 'Titre professionnel / Spécialité médicale' : lang === 'ar' ? 'اللقب والترخيص المهني' : 'Specialty / Designation'}
              </label>
              <input
                type="text"
                value={professionalTitle}
                onChange={(e) => onSetProfessionalTitle(e.target.value)}
                placeholder="Ex: Gynécologue-Obstétricien, ONFP Tunis..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
              />
              <p className="text-[10px] text-emerald-400 leading-relaxed font-semibold flex items-center gap-1.5">
                <Check size={12} />
                {lang === 'fr' 
                  ? 'Vos réponses sur le forum seront désormais badgées comme validées par la clinique.' 
                  : 'ستظهر ردودك القادمة في المنتدى بصفتك الطبية المعتمدة ومزينة بشعار التحقق.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security note footnote */}
      <div className="p-5 bg-slate-950/40 rounded-3xl border border-slate-900 text-center text-[11px] text-slate-500 leading-relaxed flex items-center justify-center gap-1.5">
        <Heart size={14} className="text-rose-500/40 shrink-0" />
        <span>
          {lang === 'fr'
            ? 'Plateforme confidentielle Docsexprime.tn. Données cryptées de bout en bout.'
            : 'منصة مشفرة وآمنة تماماً لحماية الصحة الجنسية والإنجابية.'}
        </span>
      </div>
    </div>
  );
};
export default Profile;
