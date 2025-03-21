import { createI18n } from 'vue-i18n';
import type { I18n } from 'vue-i18n';
import ptContent from './data/content.json';
import enContent from './data/content_en.json';

// UI translations
const messages = {
  'pt-br': {
    about: 'Sobre',
    links: 'Links',
    skills: 'Habilidades',
    languages: 'Idiomas',
    professionalExperience: 'Experiência Profissional',
    education: 'Formação',
    technologies: 'Tecnologias',
    downloadPDF: 'Download PDF',
    generating: 'Gerando PDF...',
    language: 'Idioma',
    profilePhoto: 'Foto de perfil',
  },
  en: {
    about: 'About',
    links: 'Links',
    skills: 'Skills',
    languages: 'Languages',
    professionalExperience: 'Professional Experience',
    education: 'Education',
    technologies: 'Technologies',
    downloadPDF: 'Download PDF',
    generating: 'Generating PDF...',
    language: 'Language',
    profilePhoto: 'Profile photo',
  },
};

// CV content data
type LocaleKey = 'pt-br' | 'en';
const cvContent: Record<LocaleKey, typeof ptContent> = {
  'pt-br': ptContent,
  en: enContent,
};

export const i18n: I18n = createI18n({
  legacy: false, // Use Composition API
  globalInjection: true, // Make $t() available in templates
  locale: 'pt-br', // Default locale
  fallbackLocale: 'en',
  messages: messages,
});

// Export CV content separately
export const getCVContent = (locale: string): typeof ptContent => {
  return cvContent[locale as LocaleKey] || cvContent['pt-br'];
};
