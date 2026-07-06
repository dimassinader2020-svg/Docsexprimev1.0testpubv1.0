// Strong TypeScript interfaces for Docsexprime.tn

export interface LocalizedString {
  fr: string;
  ar: string;
  en: string;
}

export interface Category {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  icon: string;
  color: string;
  count: number;
}

export interface Article {
  id: string;
  categoryId: string;
  title: LocalizedString;
  duration: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString[];
  scientificNote: LocalizedString;
}

export interface ONFPResource {
  id: string;
  name: LocalizedString;
  type: 'onfp' | 'clinic' | 'association';
  phone: string;
  address: LocalizedString;
  governorate: string;
  hours: LocalizedString;
  description: LocalizedString;
  services: string[];
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: LocalizedString;
  options: {
    fr: string[];
    ar: string[];
    en: string[];
  };
  correctIndex: number;
  explanation: LocalizedString;
}

export interface ForumQuestion {
  id: string;
  category: string;
  title: string;
  content: string;
  timestamp: string;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  authorName: string;
  isProfessional: boolean;
  professionalTitle?: string;
  content: string;
  timestamp: string;
}

export interface AnonymousSubmission {
  id: string;
  type: 'question' | 'testimonial';
  content: string;
  category: string;
  governorate: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}
