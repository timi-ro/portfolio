import { Resume } from '@/types';

export const resume: Resume = {
  personalInfo: {
    name: 'Fatemeh Rostami',
    role: 'Backend Software Engineer',
    intro: 'Backend engineer who brings structure to chaos and isn\'t afraid to step outside the box when the team needs it. I\'ve become the person teams call when a codebase is blocking delivery. I\'ve refactored legacy systems into clean Laravel/Symfony architecture, redesigned schemas for performance, and built ETL pipelines with Snowflake. My focus: architectural clarity, long-term scalability, and code that future developers will thank you for.',
    location: 'İstanbul, Türkiye',
    email: 'frostami.1988@gmail.com',
    linkedin: 'linkedin.com/in/frostami',
    github: 'github.com/timi-ro',
  },
  experience: [
    {
      company: 'Retreat Guru',
      role: 'Backend Developer / Data Engineer',
      duration: 'February 2021 - September 2025 · 4 yrs 8 mos',
      achievements: [
        'Refactored over 3,000 lines of legacy WordPress code into a structured Laravel architecture, enhancing performance by 40%',
        'Normalized legacy database schemas, migrating unstructured JSON data into properly indexed relational tables, improving query performance and data integrity',
        'Removed technical debt and anti-patterns (tight coupling, God objects), restoring code maintainability and developer velocity',
        'Owned the full data infrastructure as technical lead architecting, building, and maintaining ETL pipelines processing data from 1,000+ SaaS sites',
        'Built and managed data warehouse in Snowflake, enabling business intelligence and reporting through Metabase dashboards',
        'Integrated analytics stack (Segment, Rudderstack, PostHog, Google Analytics) and optimized data collection, reducing costs while improving data quality',
        'Architected 20+ Vue.js components using Vue 3 Composition API and TypeScript',
        'Established testing framework with Vitest and Jest, achieving 85% code coverage',
        'Collaborated seamlessly across 9-hour timezone gap, proactively adjusting communication for async workflows',
        'Leveraged AI-powered development tools (Cursor, Claude Code) to maximize output and accelerate delivery',
        'Contributed across multiple product areas: data warehouse/ETL, marketplace platform, and SaaS offerings',
        'Maintained independent Linux environment while team used MacOS, self-supporting own development setup',
      ],
      technologies: [
        'PHP',
        'Laravel',
        'WordPress',
        'Vue.js',
        'TypeScript',
        'Snowflake',
        'ETL Pipelines',
        'Metabase',
        'Segment',
        'Rudderstack',
        'PostHog',
        'Vitest',
        'Docker',
        'Linux',
        'CI/CD Pipeline'
      ],
    },
    {
      company: 'Agileful',
      role: 'Back End Developer',
      duration: 'November 2020 - January 2021 · 3 mos',
      achievements: [
        'Participated in a critical rescue mission for Co-Dressing, transforming a failing French codebase into a production-ready system within one month',
        'Debugged and reverse-engineered a complex Symfony application, ensuring platform stability for businesses and end-users',
        'Redesigned the database schema, migrating to a normalized MySQL structure, which improved data query performance',
        'Refactored legacy codebase applying Separation of Concerns principles, enhancing code readability and maintainability by 60%',
      ],
      technologies: ['PHP', 'Symfony', 'MySQL', 'Git', 'Docker', 'Linux'],
    },
    {
      company: 'Hirkan',
      role: 'Scrum Master | PHP Developer',
      duration: 'January 2019 - March 2020 · 1 yr 3 mos',
      achievements: [
        'Led daily scrum sessions for a 4-person development team, ensuring effective communication and task coordination',
        'Mentored junior developers on backend development best practices, Git workflows, and code review processes',
        'Fostered a collaborative environment that enhanced team productivity and sprint delivery',
        'Spearheaded R&D initiatives for optimizing a marketing platform for an online travel agency',
        'Analyzed user behavior data using Google Tag Manager and Piwik (Matomo) to enhance user experience',
        'Developed and implemented a Symfony service to automate data collection, reducing manual processing time by 80%',
        'Successfully eliminated data entry errors, improving overall data integrity',
      ],
      technologies: ['PHP', 'Symfony', 'MariDB', 'Linux', 'Scrum', 'Jira', 'Agile', 'Git', 'Google Tag Manager', 'Matomo'],
    },
  ],
  skills: [
    // Backend
    { name: 'PHP', category: 'Backend' },
    { name: 'Laravel', category: 'Backend' },
    { name: 'Symfony', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Nest.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'RESTful API', category: 'Backend' },
    { name: 'API Design', category: 'Backend' },

    // Frontend
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'TailwindCSS', category: 'Frontend' },

    // Database & Data
    { name: 'MySQL', category: 'Database' },
    { name: 'MariaDB', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Redis', category: 'Database' },
    { name: 'Elastic Search', category: 'Database' },
    { name: 'SQLite', category: 'Database' },
    { name: 'Data Modeling', category: 'Database' },

    // Architecture & Design
    { name: 'System Design', category: 'Architecture' },
    { name: 'Clean Architecture', category: 'Architecture' },
    { name: 'SOLID Principles', category: 'Architecture' },
    { name: 'Design Patterns', category: 'Architecture' },
    { name: 'Repository Pattern', category: 'Architecture' },
    { name: 'Service Pattern', category: 'Architecture' },
    { name: 'Factory Pattern', category: 'Architecture' },
    { name: 'DTO Pattern', category: 'Architecture' },
    { name: 'Separation of Concerns', category: 'Architecture' },
    { name: 'Event-Driven', category: 'Architecture' },

    // DevOps & Tools
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'CI/CD', category: 'DevOps' },
    { name: 'Jenkins', category: 'DevOps' },
    { name: 'Git', category: 'DevOps' },
    { name: 'GitLab', category: 'DevOps' },
    { name: 'Github', category: 'DevOps' },
    { name: 'Nginx', category: 'DevOps' },
    { name: 'Linux', category: 'DevOps' },

    // Data Engineering
    { name: 'ETL Pipelines', category: 'Data Engineering' },
    { name: 'Snowflake', category: 'Data Engineering' },
    { name: 'Metabase', category: 'Data Engineering' },
    { name: 'Kibana', category: 'Data Engineering' },
    { name: 'Segment', category: 'Data Engineering' },
    { name: 'Rudderstack', category: 'Data Engineering' },
    { name: 'PostHog', category: 'Data Engineering' },
    { name: 'Google Analytics', category: 'Data Engineering' },

    // Cloud & Infrastructure
    { name: 'Amazon S3', category: 'Cloud' },
    { name: 'Cloudflare', category: 'Cloud' },

    // Testing & Quality
    { name: 'Vitest', category: 'Testing' },
    { name: 'Jest', category: 'Testing' },
    { name: 'Playwright', category: 'Testing' },
    { name: 'Cypress', category: 'Testing' },
    { name: 'RobotFramework', category: 'Testing' },
    { name: 'SonarQube', category: 'Testing' },

    // Monitoring & Optimization
    { name: 'Sentry', category: 'Monitoring' },
    { name: 'Observability', category: 'Monitoring' },
    { name: 'Performance Optimization', category: 'Monitoring' },

    // Leadership & Process
    { name: 'Technical Leadership', category: 'Leadership' },
    { name: 'Scrum', category: 'Leadership' },
    { name: 'Agile', category: 'Leadership' },
    { name: 'Code Review', category: 'Leadership' },
    { name: 'Mentoring', category: 'Leadership' },
    { name: 'Legacy Refactoring', category: 'Leadership' },
  ],
};