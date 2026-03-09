interface SocialLinks {
  github: string;
  linkedin: string;
  substack: string;
  email: string;
}

export const SOCIAL_LINKS: SocialLinks = {
  github: 'https://github.com/dave-kav',
  linkedin: 'https://linkedin.com/in/dave-kav',
  substack: 'https://davekav.substack.com',
  email: 'work@dave-kav.com'
} as const;
