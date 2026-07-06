import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { translations, categories, articles, getCategoryIcon } from '../data';

interface ThemesProps {
  lang: 'fr' | 'ar' | 'en';
}

export const Themes: React.FC<ThemesProps> = ({ lang }) => {
  const s = translations[lang];
  
  // State for active category selection
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  // State for active article selection
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const getFilteredArticles = (categoryId: string) => {
    return articles.filter((art) => art.categoryId === categoryId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6" id="articles-tab-root">
      <AnimatePresence mode="wait">
        {selectedArticle ? (
          // 1. Article Detailed Clinical Guide View
          <motion.article
            key="article-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {s.back}
            </button>

            {/* Meta Categories/Duration Tags */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="text-xs px-3 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: `${selectedCategory?.color}15`,
                  color: selectedCategory?.color,
                }}
              >
                {selectedCategory?.title[lang]}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock size={13} />
                {selectedArticle.duration[lang]}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {selectedArticle.title[lang]}
            </h1>

            {/* Content Paragraphs */}
            <div className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base">
              {selectedArticle.content[lang].map((paragraph: string, idx: number) => (
                <p key={idx} className="indent-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Clinical Evidence Validation Section */}
            <div className="p-5 bg-emerald-950/20 rounded-2xl border border-emerald-900/40 flex items-start gap-3 mt-8">
              <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={20} />
              <div className="space-y-1">
                <h4 className="font-bold text-emerald-300 text-sm md:text-base">
                  {s.scientificNoteLabel}
                </h4>
                <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                  {selectedArticle.scientificNote[lang]}
                </p>
              </div>
            </div>
          </motion.article>
        ) : selectedCategory ? (
          // 2. Category Articles Index View
          <motion.div
            key="category-articles"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors cursor-pointer group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {s.back}
            </button>

            {/* Header Area banner */}
            <div
              className="p-6 rounded-3xl text-white shadow-xl relative overflow-hidden border border-slate-800/40"
              style={{
                background: `linear-gradient(135deg, ${selectedCategory.color}20 0%, ${selectedCategory.color}40 100%)`,
              }}
            >
              <div className="relative z-10 flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                  {React.createElement(getCategoryIcon(selectedCategory.icon), {
                    className: "stroke-2 text-white",
                    size: 24,
                  })}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1">
                    {selectedCategory.title[lang]}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {selectedCategory.desc[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical Articles List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-base md:text-lg flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-400" />
                {s.articlesLabel}
              </h3>

              {getFilteredArticles(selectedCategory.id).length > 0 ? (
                getFilteredArticles(selectedCategory.id).map((article) => (
                  <motion.div
                    key={article.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/30 p-5 rounded-2xl shadow-sm transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20">
                          {s.level}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <Clock size={12} />
                          {article.duration[lang]}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors text-base">
                        {article.title[lang]}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {article.excerpt[lang]}
                      </p>
                    </div>
                    <div className="bg-slate-800 group-hover:bg-indigo-600 p-2 rounded-xl text-slate-400 group-hover:text-white transition-all self-end md:self-auto shrink-0">
                      <ChevronRight size={18} />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-xs md:text-sm">
                  {lang === 'fr'
                    ? "De nouveaux articles cliniques sont en cours de rédaction."
                    : lang === 'ar'
                    ? "يجري حالياً إعداد مقالات طبية جديدة لهذا المحور."
                    : "New clinical articles are currently being written for this topic."}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // 3. Main Topics Grid View (Standard Selection)
          <motion.div
            key="category-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                {s.categoriesTitle}
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                {s.categoriesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat: any) => {
                const IconComp = getCategoryIcon(cat.icon);
                return (
                  <motion.div
                    key={cat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(cat)}
                    className="bg-slate-900/40 p-5 rounded-3xl border border-slate-800/80 hover:border-indigo-500/30 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between h-48 group relative overflow-hidden"
                  >
                    {/* Color Top Border */}
                    <div
                      className="absolute top-0 right-0 left-0 h-1.5 transition-all group-hover:h-2"
                      style={{ backgroundColor: cat.color }}
                    />
                    
                    <div className="space-y-2">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${cat.color}15` }}
                      >
                        <IconComp size={22} style={{ color: cat.color }} />
                      </div>
                      <h3 className="font-bold text-slate-200 text-sm md:text-base">
                        {cat.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {cat.desc[lang]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/60 pt-3 mt-auto text-xs font-semibold">
                      <span className="text-slate-500 font-medium">
                        {getFilteredArticles(cat.id).length}{' '}
                        {lang === 'fr' ? 'guides' : lang === 'ar' ? 'أدلة' : 'guides'}
                      </span>
                      <span className="text-indigo-400 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                        {s.viewArticle}
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Themes;
