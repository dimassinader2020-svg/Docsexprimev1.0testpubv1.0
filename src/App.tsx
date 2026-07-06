import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Bot, Stethoscope, Compass, MessageCircle, MapPin, User, Globe, AlertTriangle } from 'lucide-react';
import { translations } from './data';
import { Home } from './components/Home';
import { Themes } from './components/Themes';
import { Forum } from './components/Forum';
import { Resources } from './components/Resources';
import { Profile } from './components/Profile';
import { Quiz } from './components/Quiz';
import { AiAssistant } from './components/AiAssistant';

export default function App() {
  // Global States
  const [lang, setLang] = useState<'fr' | 'ar' | 'en'>('fr');
  const [activeTab, setActiveTab] = useState<string>('home'); // 'home', 'themes', 'forum', 'resources', 'profile', 'quiz'
  
  // Professional Credentials Toggles
  const [isProfessional, setIsProfessional] = useState(false);
  const [professionalTitle, setProfessionalTitle] = useState('Gynécologue-Obstétricien');

  // Assistant widget state
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const s = translations[lang];

  // Helper to handle navigation directly
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="app-viewport-root">
      {/* Top Clinical Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="bg-indigo-600/10 p-2 rounded-xl border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600/20 transition-all">
              <Stethoscope size={18} className="text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm md:text-base text-white tracking-tight">
                Docsexprime<span className="text-indigo-500">.tn</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-semibold uppercase">
                {lang === 'fr' ? 'Éducation Clinique' : lang === 'ar' ? 'التربية الصحية والطبية' : 'Clinical Education'}
              </span>
            </div>
          </div>

          {/* Navigation tabs for Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-xl border border-slate-800/60">
            <button
              onClick={() => handleNavigate('home')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'home' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Accueil' : lang === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <button
              onClick={() => handleNavigate('themes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'themes' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Thèmes' : lang === 'ar' ? 'المحاور' : 'Topics'}
            </button>
            <button
              onClick={() => handleNavigate('forum')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'forum' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Forum' : lang === 'ar' ? 'المنتدى' : 'Forum'}
            </button>
            <button
              onClick={() => handleNavigate('resources')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'resources' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Structures' : lang === 'ar' ? 'المراكز' : 'Centers'}
            </button>
            <button
              onClick={() => handleNavigate('quiz')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quiz' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Quiz' : lang === 'ar' ? 'الاختبار' : 'Quiz'}
            </button>
            <button
              onClick={() => handleNavigate('profile')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'fr' ? 'Espace' : lang === 'ar' ? 'حسابي' : 'Space'}
            </button>
          </nav>

          {/* Quick Language Dropdown & Professional Badges */}
          <div className="flex items-center gap-2">
            {isProfessional && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Dr. Praticien</span>
              </div>
            )}

            <button
              onClick={() => setLang((prev) => (prev === 'fr' ? 'ar' : prev === 'ar' ? 'en' : 'fr'))}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Switch language"
            >
              <Globe size={13} className="text-slate-400" />
              <span className="text-slate-200">
                {lang === 'fr' ? 'FR' : lang === 'ar' ? 'AR' : 'EN'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main viewport Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'home' && (
              <Home lang={lang} onNavigate={handleNavigate} onOpenChat={() => setIsAssistantOpen(true)} />
            )}
            {activeTab === 'themes' && (
              <Themes lang={lang} />
            )}
            {activeTab === 'forum' && (
              <Forum lang={lang} isProfessional={isProfessional} professionalTitle={professionalTitle} />
            )}
            {activeTab === 'resources' && (
              <Resources lang={lang} />
            )}
            {activeTab === 'quiz' && (
              <Quiz lang={lang} />
            )}
            {activeTab === 'profile' && (
              <Profile
                lang={lang}
                isProfessional={isProfessional}
                professionalTitle={professionalTitle}
                onToggleProfessional={setIsProfessional}
                onSetProfessionalTitle={setProfessionalTitle}
                onChangeLang={setLang}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Tab Bar for Mobile Devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 p-2 flex justify-around items-center">
        <button
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center gap-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'home' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Heart size={18} />
          <span>{lang === 'fr' ? 'Accueil' : 'الرئيسية'}</span>
        </button>
        <button
          onClick={() => handleNavigate('themes')}
          className={`flex flex-col items-center gap-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'themes' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Compass size={18} />
          <span>{lang === 'fr' ? 'Thèmes' : 'المحاور'}</span>
        </button>
        <button
          onClick={() => handleNavigate('forum')}
          className={`flex flex-col items-center gap-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'forum' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <MessageCircle size={18} />
          <span>{lang === 'fr' ? 'Forum' : 'المنتدى'}</span>
        </button>
        <button
          onClick={() => handleNavigate('resources')}
          className={`flex flex-col items-center gap-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'resources' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <MapPin size={18} />
          <span>{lang === 'fr' ? 'Centres' : 'المراكز'}</span>
        </button>
        <button
          onClick={() => handleNavigate('profile')}
          className={`flex flex-col items-center gap-1 py-1 text-[10px] font-bold transition-all ${
            activeTab === 'profile' || activeTab === 'quiz' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <User size={18} />
          <span>{lang === 'fr' ? 'Espace' : 'حسابي'}</span>
        </button>
      </div>

      {/* Floating AI Clinical Assistant Chat Trigger Bubble */}
      <div className="fixed bottom-18 md:bottom-6 right-4 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAssistantOpen((prev) => !prev)}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer border border-indigo-500/30"
          title="Clinical Assistant"
        >
          <Bot size={24} className="text-white" />
        </motion.button>
      </div>

      {/* Floating Clinical Assistant panel widget */}
      <AiAssistant
        lang={lang}
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}
