# dave-kav.com

Personal website and portfolio built with React, showcasing my professional experience and projects.

## Tech Stack

- React 18
- TypeScript
- Framer Motion for animations
- FontAwesome for icons
- LaTeX for resume generation

## Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

## Deployment

The site is automatically deployed via GitHub Actions when changes are pushed to the main branch. The workflow:

1. Builds the React application
2. Compiles the resume from LaTeX to PDF
3. Deploys to GitHub Pages
4. Serves via custom domain at [dave-kav.com](https://www.dave-kav.com)

## Local Development

1. Clone the repository
2. Install dependencies: npm install
3. Start development server: npm start
4. Visit http://localhost:3000
