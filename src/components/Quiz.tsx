import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle, AlertTriangle, RefreshCw, Trophy, ChevronRight, Award, Compass } from 'lucide-react';
import { translations, quizQuestions } from '../data';

interface QuizProps {
  lang: 'fr' | 'ar' | 'en';
}

export const Quiz: React.FC<QuizProps> = ({ lang }) => {
  const s = translations[lang];

  const scoreLabelText = s.scoreLabel || s.score || (lang === 'fr' ? 'Votre Score' : lang === 'ar' ? 'نتيجتك' : 'Your Score');
  const confirmBtnText = s.confirmBtn || (lang === 'fr' ? 'Valider' : lang === 'ar' ? 'تأكيد' : 'Validate');
  const nextQuestionText = s.nextQuestion || s.next || (lang === 'fr' ? 'Suivant' : lang === 'ar' ? 'التالي' : 'Next');

  // Quiz States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOpt(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOpt === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Performance rating evaluation
  const getRating = () => {
    const pct = (score / quizQuestions.length) * 100;
    if (pct === 100) {
      return {
        badge: lang === 'fr' ? 'Expert Clinique' : lang === 'ar' ? 'خبير طبي ممتاز' : 'Clinical Expert',
        desc: lang === 'fr' ? 'Félicitations ! Vous disposez de connaissances scientifiques irréprochables.' : lang === 'ar' ? 'تهانينا! لديك ثقافة صحية علمية متميزة وخالية من الشائعات.' : 'Excellent job! Your scientific knowledge is perfect.',
        color: 'text-emerald-400'
      };
    } else if (pct >= 60) {
      return {
        badge: lang === 'fr' ? 'Sensibilisé' : lang === 'ar' ? 'مثقف صحياً' : 'Informed Youth',
        desc: lang === 'fr' ? 'Très bon score. Vous maîtrisez l’essentiel de la santé reproductive.' : lang === 'ar' ? 'نتيجة جيدة جداً. أنت تدرك المبادئ الأساسية للصحة الجنسية.' : 'Great job! You master reproductive health essentials.',
        color: 'text-indigo-400'
      };
    } else {
      return {
        badge: lang === 'fr' ? 'En Apprentissage' : lang === 'ar' ? 'في طريق التعلم' : 'Learner',
        desc: lang === 'fr' ? 'Quelques fausses croyances subsistent. Parcourez nos guides cliniques pour vous informer !' : lang === 'ar' ? 'بعض المفاهيم الخاطئة لا تزال شائعة لديك. ندعوك لتصفح أدلتنا الطبية.' : 'Some myths still persist. Explore our medical guides to learn more.',
        color: 'text-amber-400'
      };
    }
  };

  const rating = getRating();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6" id="quiz-workspace-root">
      <AnimatePresence mode="wait">
        {quizFinished ? (
          // 1. Quiz Completed View
          <motion.div
            key="quiz-finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-xl"
          >
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
              <Trophy size={32} className="animate-pulse" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white">
                {lang === 'fr' ? 'Quiz Complété !' : lang === 'ar' ? 'اكتمل الاختبار بنجاح !' : 'Quiz Completed!'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'fr' ? 'Merci de participer à la validation scientifique de vos connaissances.' : 'شكراً لمشاركتك في هذا التقييم العلمي لمفاهيم الصحة الإنجابية.'}
              </p>
            </div>

            {/* Score Ring Display */}
            <div className="py-4">
              <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <span className="text-3xl font-black text-white">{score} / {quizQuestions.length}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest">{scoreLabelText}</span>
              </div>
            </div>

            {/* Badge Evaluation Card */}
            <div className="p-5 bg-slate-950/40 rounded-2xl border border-slate-900 max-w-md mx-auto space-y-2">
              <div className="flex items-center justify-center gap-1.5">
                <Award size={18} className={rating.color} />
                <span className={`text-sm font-extrabold ${rating.color} uppercase tracking-wider`}>
                  {rating.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {rating.desc}
              </p>
            </div>

            {/* CTA Actions */}
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw size={14} />
                {lang === 'fr' ? 'Recommencer' : 'إعادة الاختبار'}
              </button>
            </div>
          </motion.div>
        ) : (
          // 2. Quiz Active Question View
          <motion.div
            key="quiz-active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Header / Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle size={14} className="text-indigo-400" />
                  {lang === 'fr' ? 'Évaluation Sexologique' : 'تقييم الثقافة الصحية'}
                </span>
                <span className="text-slate-400 font-mono font-bold">
                  {currentIdx + 1} / {quizQuestions.length}
                </span>
              </div>
              {/* Progress track bar */}
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text Box */}
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                {currentQuestion.question[lang]}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options[lang].map((opt: string, idx: number) => {
                // Style calculation based on status
                let buttonStyle = 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-900/80';
                
                if (selectedOpt === idx) {
                  buttonStyle = 'bg-indigo-600/10 border-indigo-500/60 text-indigo-200';
                }
                
                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    buttonStyle = 'bg-emerald-500/10 border-emerald-500/60 text-emerald-200';
                  } else if (selectedOpt === idx) {
                    buttonStyle = 'bg-rose-500/10 border-rose-500/60 text-rose-200';
                  } else {
                    buttonStyle = 'bg-slate-950/20 border-slate-900 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm font-bold transition-all flex justify-between items-center gap-4 ${buttonStyle} ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === currentQuestion.correctIndex && (
                      <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && selectedOpt === idx && idx !== currentQuestion.correctIndex && (
                      <AlertTriangle size={16} className="text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Clinical Explanations Card */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
                    {selectedOpt === currentQuestion.correctIndex ? (
                      <span className="text-emerald-400">{lang === 'fr' ? 'Excellente réponse' : 'إجابة صحيحة !'}</span>
                    ) : (
                      <span className="text-rose-400">{lang === 'fr' ? 'Incorrect' : 'مفهوم خاطئ !'}</span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                    {currentQuestion.explanation[lang]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirm / Next controls bar */}
            <div className="flex justify-end pt-2">
              {!isAnswered ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOpt === null}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-slate-800 disabled:text-slate-600 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  {confirmBtnText}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 group"
                >
                  {currentIdx + 1 < quizQuestions.length ? (
                    <>
                      {nextQuestionText}
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  ) : (
                    lang === 'fr' ? 'Voir mon score' : 'عرض النتيجة'
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Quiz;
