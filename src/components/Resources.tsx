import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Search, Filter, ShieldCheck, Heart } from 'lucide-react';
import { translations, resources, governorates } from '../data';

interface ResourcesProps {
  lang: 'fr' | 'ar' | 'en';
}

export const Resources: React.FC<ResourcesProps> = ({ lang }) => {
  const s = translations[lang];

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGov, setSelectedGov] = useState<string>('Tous');
  const [selectedService, setSelectedService] = useState<string>('Tous');

  // Helper to get translated service label from code
  const getServiceLabel = (serviceKey: string) => {
    switch (serviceKey.toLowerCase()) {
      case 'contraception':
        return s.serviceContraception || (lang === 'fr' ? '💊 Contraception' : '💊 منع الحمل');
      case 'depistage':
        return s.serviceDepistage || (lang === 'fr' ? '🔬 Dépistage' : '🔬 تقصي الأمراض');
      case 'conseil':
        return s.serviceConseil || (lang === 'fr' ? '☎️ Écoute/Conseil' : '☎️ إرشاد وإصغاء');
      case 'suivi':
        return s.serviceSuivi || (lang === 'fr' ? '🩺 Suivi' : '🩺 متابعة طبية');
      default:
        return serviceKey;
    }
  };

  // Static list of services for the filter
  const serviceOptions = [
    { key: 'Tous', label: lang === 'fr' ? 'Tous les services' : lang === 'ar' ? 'جميع الخدمات الطبية' : 'All services' },
    { key: 'contraception', label: s.serviceContraception || (lang === 'fr' ? '💊 Contraception' : '💊 منع الحمل') },
    { key: 'depistage', label: s.serviceDepistage || (lang === 'fr' ? '🔬 Dépistage IST' : '🔬 تقصي الأمراض') },
    { key: 'conseil', label: s.serviceConseil || (lang === 'fr' ? '☎️ Conseil & Écoute' : '☎️ إرشاد وإصغاء') },
    { key: 'suivi', label: s.serviceSuivi || (lang === 'fr' ? '🩺 Suivi Gynécologique' : '🩺 متابعة طبية') }
  ];

  // Filter Centers list
  const filteredCenters = resources.filter((center) => {
    const matchesSearch = center.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                          center.address[lang].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGov = selectedGov === 'Tous' || center.governorate === selectedGov;
    
    const matchesService = selectedService === 'Tous' || center.services.some(serv => serv.toLowerCase() === selectedService.toLowerCase());

    return matchesSearch && matchesGov && matchesService;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-8" id="resources-directory-root">
      {/* Clinique Info Banner */}
      <div className="p-6 bg-indigo-950/20 border border-indigo-900/30 rounded-3xl flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
        <div className="bg-indigo-600/10 p-3.5 rounded-2xl border border-indigo-500/20 text-indigo-400">
          <Phone className="animate-bounce" size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-white text-base md:text-lg">
            {lang === 'fr' ? 'Numéro Vert ONFP (National)' : 'الرقم الأخضر المجاني لديوان الأسرة'}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {lang === 'fr'
              ? 'Besoin d’une écoute urgente et d’une orientation médicale 100% confidentielle ? Composez le 80 10 10 10 (appel gratuit depuis la Tunisie).'
              : 'للحصول على توجيه طبي وإصغاء نفسي سري ومجاني بالكامل، اتصل بالرقم الأخضر للديوان الوطني للأسرة والبريد البشري: 80 10 10 10.'}
          </p>
        </div>
      </div>

      {/* Directory Searching Panel */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher un centre par nom ou quartier...' : 'البحث عن مركز صحي أو عنوان...'}
            className="w-full bg-slate-950 border border-slate-850 rounded-2xl pl-11 pr-4 py-3 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
          />
        </div>

        {/* Filter selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Governorate selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Filter size={10} />
              {lang === 'fr' ? 'Filtrer par Gouvernorat' : 'تصفية حسب الولاية'}
            </label>
            <select
              value={selectedGov}
              onChange={(e) => setSelectedGov(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="Tous">{lang === 'fr' ? 'Tous les gouvernorats' : 'جميع الولايات'}</option>
              {governorates.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </div>

          {/* Service filter selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Filter size={10} />
              {lang === 'fr' ? 'Filtrer par Prestation' : 'تصفية حسب الخدمة الطبية'}
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {serviceOptions.map((opt) => (
                <option key={opt.key} value={opt.key === 'Tous' ? 'Tous' : opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Directory List Result */}
      <div className="space-y-4">
        <h3 className="font-semibold text-white text-base md:text-lg flex items-center gap-2">
          <MapPin size={18} className="text-indigo-400" />
          {lang === 'fr' ? 'Centres et Espaces Disponibles' : 'المراكز والمكاتب المتوفرة'}
          <span className="text-xs font-normal text-slate-500 font-mono">
            ({filteredCenters.length} {lang === 'fr' ? 'centres trouvés' : 'مركز متوفر'})
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCenters.length > 0 ? (
            filteredCenters.map((center) => (
              <motion.div
                key={center.id}
                whileHover={{ y: -2 }}
                className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-3xl flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] font-black tracking-wider uppercase bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20">
                      {center.governorate}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <ShieldCheck size={11} />
                      ONFP
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm md:text-base">
                    {center.name[lang]}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-start gap-2">
                      <MapPin size={13} className="text-slate-500 shrink-0 mt-0.5" />
                      <span>{center.address[lang]}</span>
                    </div>
                    {center.phone && (
                      <div className="flex items-center gap-2 font-mono">
                        <Phone size={13} className="text-slate-500 shrink-0" />
                        <a href={`tel:${center.phone}`} className="hover:text-indigo-400 transition-colors">
                          {center.phone}
                        </a>
                      </div>
                    )}
                    {center.hours && (
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-slate-500 shrink-0" />
                        <span>{center.hours[lang]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available services tag badges */}
                <div className="border-t border-slate-800/60 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {center.services.map((serv, index) => (
                      <span
                        key={index}
                        className="text-[9px] font-semibold bg-slate-950 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800"
                      >
                        {getServiceLabel(serv)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl text-slate-400 text-xs md:text-sm">
              {lang === 'fr'
                ? 'Aucun centre d’orientation ne correspond à vos critères de recherche.'
                : 'لم نجد أي مركز يطابق معايير البحث التي حددتها.'}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimers & Advice footnote */}
      <div className="p-5 bg-slate-950/40 border border-slate-900 rounded-3xl flex items-start gap-3">
        <Heart className="text-indigo-400 shrink-0 mt-0.5" size={18} />
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {lang === 'fr'
            ? 'Les services offerts dans les centres pilotes de l’ONFP sont entièrement gratuits pour les adolescents, les mineurs et les jeunes célibataires tunisiens. Aucune autorisation parentale ou pièce d’identité n’est exigée pour obtenir des conseils, des préservatifs ou la contraception d’urgence.'
            : 'جميع الخدمات الطبية والإرشادية المقدمة في مكاتب ومراكز الديوان الوطني للأسرة مجانية بالكامل للشباب، المراهقين وغير المتزوجين. لا تطلب أي رخصة عائلية أو وثيقة هوية للحصول على وسائل منع الحمل أو الإرشادات السرية.'}
        </p>
      </div>
    </div>
  );
};
export default Resources;
