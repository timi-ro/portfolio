// A highlight is either a plain sentence or a short lead-in followed by detail
export type Achievement = string | { title: string; detail: string };

export interface Experience {
  company: string;
  companyUrl?: string;
  context?: string;
  role: string;
  location: string;
  period: string;
  tenure?: string;
  achievements: Achievement[];
  technologies: string[];
}

export interface Skill {
  name: string;
  category: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
}

export interface PersonalInfo {
  name: string;
  role: string;
  intro: string;
  // The line the About section opens with
  statement: string;
  about: string[];
  location: string;
  email: string;
  linkedin: string;
  github: string;
  stackoverflow: string;
  medium: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  experience: Experience[];
  skills: Skill[];
  projects?: Project[];
}
