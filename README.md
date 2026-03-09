# dave-kav-portfolio

Monorepo for personal portfolio sites.

## Structure

```
dave-kav-portfolio/
├── apps/
│   ├── com/        # dave-kav.com - Editorial portfolio
│   ├── dev/        # dave-kav.dev - Terminal interface
│   └── resume/     # LaTeX resume generator
├── packages/
│   └── config/     # Shared data (JSON) + TypeScript types
└── .github/
    └── workflows/  # Path-filtered CI/CD
```

## How It Works

- **Shared config**: All apps import from `@dave-kav/config` at build time
- **Path-filtered CI**: Changes to `packages/config/` trigger rebuilds of dependent apps
- **Resume**: Generated from config data, compiled to PDF, uploaded to R2

## Development

```bash
pnpm install
pnpm dev:com    # Run dave-kav.com locally
pnpm dev:dev    # Run dave-kav.dev locally
```

## Deployment

| App | Trigger Paths | Target |
|-----|---------------|--------|
| com | `apps/com/**`, `packages/config/**` | Cloudflare Pages |
| dev | `apps/dev/**`, `packages/config/**` | Cloudflare Pages |
| resume | `apps/resume/**`, `packages/config/data/**` | Cloudflare R2 |

## URLs

- https://dave-kav.com
- https://dave-kav.dev
- https://pub-6c7cf0c817ad49ecaa8fa77083a1a590.r2.dev/resume.pdf
