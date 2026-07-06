import React from 'react';
import { motion } from 'motion/react';
import { Heart, Bot, Compass, ShieldCheck, Stethoscope } from 'lucide-react';
import { translations, categories, getCategoryIcon } from '../data';

interface HomeProps {
  lang: 'fr' | 'ar' | 'en';
  onNavigate: (tab: string) => void;
  onOpenChat: () => void;
}

export const Home: React.FC<HomeProps> = ({ lang, onNavigate, onOpenChat }) => {
  const s = translations[lang];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-12" id="home-view-root">
      {/* Hero Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-indigo-400 text-xs font-bold tracking-wide shadow-md">
          <Stethoscope size={14} className="animate-pulse text-indigo-400" />
          <span>{s.badge}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          {s.heroTitle}
        </h1>
        
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {s.heroSubtitle}
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={onOpenChat}
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2 group cursor-pointer"
          >
            <Bot size={18} className="text-indigo-200 group-hover:rotate-12 transition-transform" />
            {s.exploreBtn}
          </button>
          
          <button
            onClick={() => onNavigate('themes')}
            className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Compass size={18} className="text-slate-400" />
            {lang === 'fr' ? 'Parcourir les guides' : lang === 'ar' ? 'تصفح الأدلة الطبية' : 'Browse medical guides'}
          </button>
        </div>
      </motion.div>

      {/* Platform Clinical Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {s.stats.map((stat: any, index: number) => {
          // Different icons for each stat
          const statIcons = [ShieldCheck, Bot, Heart];
          const IconComponent = statIcons[index] || ShieldCheck;
          
          return (
            <div
              key={index}
              className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex items-center gap-4 shadow-sm"
            >
              <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                <IconComponent size={24} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-xl font-black text-white">{stat.number}</div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Categories Fast Navigation */}
      <div className="space-y-6">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {s.exploreTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            {s.exploreSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat: any) => {
            const IconComp = getCategoryIcon(cat.icon);
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('themes')}
                className="bg-slate-900/40 p-5 rounded-3xl border border-slate-800/80 hover:border-indigo-500/30 cursor-pointer transition-all flex items-start gap-4 group h-32 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bottom-0 w-1 transition-all group-hover:w-1.5" style={{ backgroundColor: cat.color }} />
                <div className="bg-slate-900 p-3 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}10` }}>
                  <IconComp size={22} style={{ color: cat.color }} />
                </div>
                <div className="space-y-1 pr-4">
                  <h3 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors text-sm md:text-base">
                    {cat.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.desc[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Partner Footnote */}
      <div className="p-6 bg-indigo-950/20 border border-indigo-900/30 rounded-3xl text-center space-y-2">
        <Heart size={20} className="text-indigo-400 mx-auto animate-pulse" />
        <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
          {lang === 'fr' 
            ? 'Docsexprime.tn est un outil d’accompagnement confidentiel soutenu par des gynécologues et des experts en sexologie clinique tunisiens. Nous collaborons avec l’Office National de la Famille et de la Population (ONFP) pour garantir un accès universel à la santé sexuelle.' 
            : lang === 'ar'
            ? 'منصة Docsexprime.tn هي فضاء إرشادي آمن يدعمه أطباء وأخصائيون تونسيون في الصحة الجنسية والإنجابية بالتعاون مع الديوان الوطني للأسرة والبريد البшري (ONFP).'
            : 'Docsexprime.tn is a highly secure counseling tool built by Tunisian experts in clinical sexology, working alongside the ONFP to support universal sexual and reproductive health rights.'}
        </p>
      </div>
    </div>
  );
};
export default Home;
