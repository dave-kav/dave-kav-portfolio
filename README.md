# dave-kav-portfolio

Monorepo containing all portfolio sites and supporting infrastructure.

## Architecture

```mermaid
graph TB
    subgraph "Monorepo"
        subgraph "apps/"
            COM[apps/com<br/>dave-kav.com]
            DEV[apps/dev<br/>dave-kav.dev]
            RESUME[apps/resume<br/>Resume Generator]
        end

        subgraph "packages/"
            CONFIG[packages/config<br/>Shared Data]
            DATA[(data/*.json)]
        end

        CONFIG --> DATA
        COM -->|imports| CONFIG
        DEV -->|imports| CONFIG
        RESUME -->|reads| DATA
    end

    subgraph "Cloudflare"
        CF_COM[Pages<br/>dave-kav.com]
        CF_DEV[Pages<br/>dave-kav.dev]
        CF_R2[(R2 Bucket<br/>resume.pdf)]
    end

    COM -->|deploy| CF_COM
    DEV -->|deploy| CF_DEV
    RESUME -->|upload| CF_R2

    CF_COM -.->|link| CF_R2
```

## CI/CD Workflow

```mermaid
flowchart LR
    subgraph "Git Push"
        PUSH((push to main))
    end

    subgraph "Path Filters"
        PUSH --> P1{apps/com/**<br/>OR<br/>packages/config/**}
        PUSH --> P2{apps/dev/**<br/>OR<br/>packages/config/**}
        PUSH --> P3{apps/resume/**<br/>OR<br/>packages/config/data/**}
    end

    subgraph "Workflows"
        P1 -->|yes| W1[deploy-com.yml]
        P2 -->|yes| W2[deploy-dev.yml]
        P3 -->|yes| W3[build-resume.yml]
    end

    subgraph "Deployments"
        W1 --> D1[Cloudflare Pages]
        W2 --> D2[Cloudflare Pages]
        W3 --> D3[Cloudflare R2]
    end
```

## Structure

```
dave-kav-portfolio/
├── apps/
│   ├── com/              # dave-kav.com - Main portfolio site
│   ├── dev/              # dave-kav.dev - Terminal-style site
│   └── resume/           # LaTeX resume generator
├── packages/
│   └── config/           # Shared config data
│       ├── index.ts      # Exports all data + types
│       └── data/         # JSON config files
└── .github/workflows/    # Path-filtered CI/CD workflows
```

## Data Flow

All apps import config data directly at **build time** via the `@dave-kav/config` workspace package:

```typescript
import { experienceData, educationData } from '@dave-kav/config';
```

This approach:
- Eliminates runtime API calls
- Bakes data into the build for faster page loads
- Automatically rebuilds sites when config changes (via path filters)

## Development

```bash
# Install dependencies
pnpm install

# Run dave-kav.com locally
pnpm dev:com

# Run dave-kav.dev locally
pnpm dev:dev

# Generate resume
cd apps/resume && node scripts/generate.js
```

## Workflows

| Workflow | Triggers On | Deploys To |
|----------|-------------|------------|
| `deploy-com.yml` | `apps/com/**`, `packages/config/**` | Cloudflare Pages |
| `deploy-dev.yml` | `apps/dev/**`, `packages/config/**` | Cloudflare Pages |
| `build-resume.yml` | `apps/resume/**`, `packages/config/data/**` | Cloudflare R2 |

**Key behavior:** Changing `packages/config/data/*.json` triggers rebuilds of both sites AND the resume.

## Secrets Required

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages/R2 permissions
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID

## URLs

- **dave-kav.com**: https://dave-kav.com
- **dave-kav.dev**: https://dave-kav.dev
- **Resume PDF**: https://e176e82e7e125f4726a76dd364ecb66b.r2.cloudflarestorage.com/dave-kav-resume/resume.pdf
