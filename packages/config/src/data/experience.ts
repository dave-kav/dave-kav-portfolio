import type { ExperienceItem } from '../types.js';

export const experiences: ExperienceItem[] = [
  {
    type: 'work',
    id: 1,
    company: 'Whatnot',
    role: 'Software Engineer',
    period: '2025 - Present',
    location: 'Dublin, Ireland',
    description:
      'Building backend systems and services for the Accounting, Taxes and Reporting domain. Developing robust, scalable solutions to support financial operations at scale.',
    highlights: [
      'Developing and maintaining backend services for financial reporting and tax compliance',
      'Building scalable data solutions using Python, Snowflake, and DBT',
      'Collaborating with cross-functional teams to deliver reliable, performant systems',
    ],
    technologies: ['Python', 'Snowflake', 'DBT', 'Teradata', 'PostgreSQL', 'MySQL', 'Datadog'],
    logo: '/logos/whatnot.png',
  },
  {
    type: 'work',
    id: 2,
    company: 'Evervault',
    role: 'Lead Engineer, Payments',
    period: '2024 - 2025',
    location: 'Dublin, Ireland',
    description:
      "Led the Payments engineering team, responsible for the development and maintenance of the company's payment systems. Spearheaded the development of cloud-native applications on AWS, leveraging Rust for performance-critical components and TypeScript for seamless front-end and server-side logic.",
    highlights: [
      'Led the development of new payment features and integrations, ensuring seamless adoption by clients and internal teams',
      'Managed the team\'s technical roadmap and drove improvements in API functionality to enhance performance and developer usability',
      'Mentored and guided engineers while establishing best practices for system reliability and security',
      'Utilized Terraform to automate infrastructure provisioning and ensure scalability in dynamic production environments',
    ],
    technologies: ['Rust', 'TypeScript', 'JavaScript', 'React', 'AWS', 'Terraform', 'PostgreSQL'],
    logo: '/logos/evervault.svg',
  },
  {
    type: 'work',
    id: 3,
    company: 'Apata',
    role: 'Senior Software Engineer',
    period: '2022 - 2024',
    location: 'Dublin, Ireland',
    description:
      'Played a central role in developing a next-generation Authentication and Cardholder Verification System (ACS) tailored for secure and frictionless eCommerce transactions. Focused on delivering robust features using TypeScript and AWS, ensuring system security, performance, and scalability.',
    highlights: [
      'Led the design and development of key system features using TypeScript and AWS for a scalable, secure architecture',
      'Spearheaded migration from JavaScript to TypeScript, improving code maintainability across the codebase',
    ],
    technologies: ['TypeScript', 'JavaScript', 'Node.js', 'AWS', 'MySQL', 'Redis'],
    logo: '/logos/apata.svg',
  },
  {
    type: 'work',
    id: 4,
    company: 'Salesforce',
    role: 'Software Engineer',
    period: '2021 - 2022',
    location: 'Dublin, Ireland',
    description:
      "Contributed to the seamless integration of Salesforce's suite of tools into Slack, focusing on the development of user-centric Slack apps and robust backend systems. Leveraged TypeScript for building interactive Slack apps and Java/Spring for backend services, ensuring a cohesive experience for users.",
    highlights: [
      'Built interactive Slack apps in TypeScript and backend integrations with Java/Spring',
      'Managed infrastructure and CI/CD pipelines using AWS, Jenkins, and Terraform',
    ],
    technologies: ['TypeScript', 'Java', 'Spring', 'AWS', 'Jenkins', 'Terraform', 'PostgreSQL'],
    logo: '/logos/salesforce.png',
  },
  {
    type: 'work',
    id: 5,
    company: 'Workday',
    role: 'Software Engineer - Distributed Systems',
    period: '2017 - 2021',
    location: 'Dublin, Ireland',
    description:
      "Worked on Workday's distributed integration runtime platform, building and maintaining microservices focused on high availability and performance at scale.",
    highlights: [
      'Optimized the integration runtime platform to reduce latency and improve uptime',
      'Resolved high-priority production issues while maintaining system SLAs',
    ],
    technologies: ['Scala', 'Java', 'Microservices', 'Distributed Systems'],
    logo: '/logos/workday.svg',
  },
  {
    type: 'work',
    id: 6,
    company: 'Qumas/Dassault Systemes',
    role: 'Software Development Intern',
    period: '2016',
    location: 'Cork, Ireland',
    description:
      'Built proof-of-concept solutions for data ingestion and indexing, working with real-time streaming and big data processing pipelines.',
    highlights: [
      'Built prototypes using Apache Spark for distributed processing and Kafka for streaming',
      'Implemented real-time data stream processing for high-volume, low-latency data handling',
    ],
    technologies: ['Apache Spark', 'Kafka', 'Big Data', 'Java'],
    logo: '/logos/dassault.png',
  },
];
