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
            CONFIG[packages/config<br/>Worker API + Data]
            DATA[(data/*.json)]
        end

        CONFIG --> DATA
        RESUME -.->|reads| DATA
    end

    subgraph "Cloudflare"
        CF_COM[Pages<br/>dave-kav.com]
        CF_DEV[Pages<br/>dave-kav.dev]
        CF_WORKER[Worker<br/>Config API]
        CF_R2[(R2 Bucket<br/>resume.pdf)]
    end

    COM -->|deploy| CF_COM
    DEV -->|deploy| CF_DEV
    CONFIG -->|deploy| CF_WORKER
    RESUME -->|upload| CF_R2

    CF_COM -.->|fetch| CF_WORKER
    CF_DEV -.->|fetch| CF_WORKER
    CF_COM -.->|link| CF_R2
```

## CI/CD Workflow

```mermaid
flowchart LR
    subgraph "Git Push"
        PUSH((push to main))
    end

    subgraph "Path Filters"
        PUSH --> P1{apps/com/**}
        PUSH --> P2{apps/dev/**}
        PUSH --> P3{packages/config/**}
        PUSH --> P4{apps/resume/**<br/>OR<br/>packages/config/data/**}
    end

    subgraph "Workflows"
        P1 -->|yes| W1[deploy-com.yml]
        P2 -->|yes| W2[deploy-dev.yml]
        P3 -->|yes| W3[deploy-config.yml]
        P4 -->|yes| W4[build-resume.yml]
    end

    subgraph "Deployments"
        W1 --> D1[Cloudflare Pages]
        W2 --> D2[Cloudflare Pages]
        W3 --> D3[Cloudflare Workers]
        W4 --> D4[Cloudflare R2]
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
│   └── config/           # Cloudflare Worker API + shared data
│       ├── data/         # JSON config files (experience, education, etc.)
│       └── src/          # Worker source code
└── .github/workflows/    # Path-filtered CI/CD workflows
```

## Data Flow

| Source | Consumer | Method |
|--------|----------|--------|
| `packages/config/data/*.json` | `apps/com` | Runtime fetch from Worker API |
| `packages/config/data/*.json` | `apps/dev` | Runtime fetch from Worker API |
| `packages/config/data/*.json` | `apps/resume` | Direct file read at build time |

## Development

```bash
# Install dependencies
pnpm install

# Run dave-kav.com locally
pnpm dev:com

# Run dave-kav.dev locally
pnpm dev:dev

# Run config worker locally
cd packages/config && pnpm dev

# Generate resume
cd apps/resume && node scripts/generate.js
```

## Workflows

| Workflow | Triggers On | Deploys To |
|----------|-------------|------------|
| `deploy-com.yml` | `apps/com/**` | Cloudflare Pages (dave-kav-com) |
| `deploy-dev.yml` | `apps/dev/**` | Cloudflare Pages (dave-kav-dev) |
| `deploy-config.yml` | `packages/config/**` | Cloudflare Workers |
| `build-resume.yml` | `apps/resume/**`, `packages/config/data/**` | Cloudflare R2 |

## Secrets Required

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Pages/Workers/R2 permissions
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID

## URLs

- **dave-kav.com**: https://dave-kav.com
- **dave-kav.dev**: https://dave-kav.dev
- **Config API**: https://dave-kav-portfolio-config.davykav87.workers.dev
- **Resume PDF**: https://e176e82e7e125f4726a76dd364ecb66b.r2.cloudflarestorage.com/dave-kav-resume/resume.pdf
