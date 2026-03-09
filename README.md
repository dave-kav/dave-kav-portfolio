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

All deployments are automated via GitHub Actions on push to `main`.

| App | Trigger Paths | Target |
|-----|---------------|--------|
| com | `apps/com/**`, `packages/config/**` | Cloudflare Pages |
| dev | `apps/dev/**`, `packages/config/**` | Cloudflare Pages |
| resume | `apps/resume/**`, `packages/config/data/**` | Cloudflare R2 |

### Manual Deployment

Workflows can be triggered manually from the Actions tab or via CLI:

```bash
gh workflow run deploy-com.yml
gh workflow run deploy-dev.yml
gh workflow run build-resume.yml
```

### Required Secrets

| Secret | Used By |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | All workflows |
| `CLOUDFLARE_ACCOUNT_ID` | All workflows |

### Cloudflare Setup

- **Pages projects**: `dave-kav-com`, `dave-kav-dev` (direct upload via wrangler)
- **R2 bucket**: `dave-kav-resume` with public access enabled

## URLs

- https://dave-kav.com
- https://dave-kav.dev
- https://pub-6c7cf0c817ad49ecaa8fa77083a1a590.r2.dev/resume.pdf
