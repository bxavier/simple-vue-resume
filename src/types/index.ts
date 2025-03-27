export interface Link {
  url: string;
  text: string;
  icon?: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  links: Link[];
}

export interface About {
  description: string;
}

export interface TimelineItem {
  place: string;
  title: string;
  period: string;
  location?: string;
  description: string[];
  technologies?: string[];
  visible: boolean;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface SkillItem {
  title: string;
  items: string[];
}

export interface CVData {
  profile: Profile;
  about: About;
  experience: TimelineItem[];
  education: TimelineItem[];
  additional: string[];
  languages: LanguageItem[];
  skills: SkillItem[];
  differential: string[];
}
