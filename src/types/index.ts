export interface Experience {
  company: string;
  role: string;
  duration: string;
  achievements: string[];
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
  location: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  experience: Experience[];
  skills: Skill[];
  projects?: Project[];
}