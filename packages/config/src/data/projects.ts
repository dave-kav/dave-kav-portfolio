import type { ProjectItem } from '../types.js';

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'This Website',
    description:
      'Personal portfolio monorepo with editorial and terminal-style sites, built with React, TypeScript, and Claude Code',
    repo: 'https://github.com/dave-kav/dave-kav-portfolio',
    tech: ['React', 'TypeScript', 'pnpm Workspaces', 'Cloudflare Pages'],
    highlights: [
      'Monorepo with shared config package for type-safe data imports',
      'Path-filtered GitHub Actions for efficient CI/CD',
      'LaTeX resume auto-generated from config data',
      'Companion terminal site at dave-kav.dev',
    ],
    thumbnail: 'logo.svg',
  },
  {
    id: 2,
    title: 'Irish Rail Timetable',
    description: 'A Raycast extension that allows you to search for Irish Rail live departure times',
    repo: 'https://github.com/dave-kav/raycast-irish-rail',
    tech: ['TypeScript', 'Raycast SDK'],
    highlights: [
      'Developed a Raycast extension that allows users to search for Irish Rail live departure times',
      'Utilized the Irish Rail API to fetch live data',
    ],
    thumbnail: 'logos/raycast.svg',
  },
];
