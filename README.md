# baseline

> One command to give your entire team the same AI tools, skills, and working rules — so anyone can pick up where someone else left off.

[![npm](https://img.shields.io/npm/v/@baseline-ia/baseline-cli)](https://www.npmjs.com/package/@baseline-ia/baseline-cli)
[![node](https://img.shields.io/node/v/@baseline-ia/baseline-cli)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/@baseline-ia/baseline-cli)](./LICENSE)

---

## Quick start

```bash
npm install -g @baseline-ia/baseline-cli
baseline install
```

That's it. Your machine now has the same setup as every other team member.

---

## What it installs

| Component | Where |
|-----------|-------|
| AI skills (SDD, review, design, git…) | `~/.claude/skills/` · `~/.opencode/skills/` · `~/.kiro/skills/` |
| Team standards block | `~/.claude/CLAUDE.md` · `~/.opencode/AGENTS.md` · `~/.kiro/steering/baseline.md` |
| [Gentle-AI](https://github.com/Gentleman-Programming/gentle-ai) ecosystem | global |
| [Engram](https://github.com/Gentleman-Programming/engram) MCP wiring (if installed) | per AI tool via `engram setup` |
| Git hooks (pre-push blocks main, master, qa, develop) | `~/.baseline/hooks/` via `core.hooksPath` |
| OpenSpec structure for spec-driven development | `./openspec/` in the project |

---

## Commands

```bash
baseline install                  # auto-detect tools and configure all
baseline install claude           # configure only Claude Code
baseline install opencode         # configure only OpenCode
baseline install kiro-ide         # configure only Kiro IDE (~/.kiro detected)
baseline install kiro-cli         # configure only Kiro CLI (kiro binary detected)
baseline install codex            # configure only Codex
baseline update                   # pull latest baseline and re-apply standards
baseline status                   # show what's installed and configured
baseline doctor                   # diagnose missing or broken setup — includes Engram check
baseline onboard junior           # onboarding guide by level: junior · semi · senior
baseline mcp jira                 # configure Atlassian MCP (Jira) for all detected tools
```

---

## Team workflow

Every change follows SDD (Spec-Driven Development):

```
explore → propose → spec → design → tasks → apply → verify → archive
```

Skills are installed for every step. Start any change with:

```bash
/sdd-new <description of what you're building>
```

---

## Supported AI tools

| Tool | Skills | Team config | Gentle-AI preset |
|------|--------|-------------|-----------------|
| [Claude Code](https://claude.ai/code) | ✅ | ✅ `~/.claude/CLAUDE.md` | `full-gentleman` + SDD multi |
| [OpenCode](https://opencode.ai) | ✅ | ✅ `~/.opencode/AGENTS.md` (strict TDD) | `full-gentleman` + SDD multi |
| [Kiro IDE](https://kiro.dev) (`~/.kiro` detected) | ✅ | ✅ `~/.kiro/steering/baseline.md` + statusline sub-agent | `performance` + SDD multi |
| [Kiro CLI](https://kiro.dev) (`kiro` binary detected) | ✅ | ✅ same as Kiro IDE | `performance` + SDD multi |
| Codex | — | via gentle-ai | `recommended` |
| Antigravity | — | coming soon | — |

Detection is automatic — `baseline install` reads your environment and configures only the tools that are present. All tools use `--persona neutral`.

---

## Skills reference

27 skills are installed across all supported tools. Each skill is invoked with `/skill-name` inside your AI tool.
Click the skill name to see a concrete usage example. Each example shows real prompts and output — not limits on what the skill can do.

### Architecture

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/architecture-guidelines`](example-sdd/06-architecture.md#architecture-guidelines--guiar-placement-de-archivos) | Validate and guide file placement across NestJS layers, Lambda, React Query/Zustand, and multi-tenancy rules. Enforces 7 CI/CD-blocking rules. | `/architecture-guidelines ¿dónde va la lógica de validación de un cupón?` |

### SDD — Spec-Driven Development

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/sdd-new`](example-sdd/01-sdd-workflow.md#atajo-arrancar-directo) | Shortcut that runs explore + propose in one step. Entry point for any new change. | `/sdd-new quiero agregar autenticación JWT a la API` |
| [`/sdd-explore`](example-sdd/01-sdd-workflow.md#fase-1--exploración) | Reads the codebase and maps the current state before proposing anything. | `/sdd-explore ¿cómo funciona actualmente el módulo de auth?` |
| [`/sdd-propose`](example-sdd/01-sdd-workflow.md#fase-2--propuesta) | Writes the change proposal with intent, scope, risks, and approach. | `/sdd-propose` |
| [`/sdd-spec`](example-sdd/01-sdd-workflow.md#fase-3--especificación) | Captures delta specs: requirements, scenarios, and contracts that change. | `/sdd-spec` |
| [`/sdd-design`](example-sdd/01-sdd-workflow.md#fase-4--diseño-técnico) | Writes the technical design and records architecture decisions (ADRs). | `/sdd-design` |
| [`/sdd-tasks`](example-sdd/01-sdd-workflow.md#fase-5--tasks) | Breaks the change into an ordered, checkable task list. | `/sdd-tasks` |
| [`/sdd-apply`](example-sdd/01-sdd-workflow.md#fase-6--implementación) | Implements the tasks following spec and design, checks each one off as it goes. | `/sdd-apply` |
| [`/sdd-verify`](example-sdd/01-sdd-workflow.md#fase-7--verificación) | Validates that the implementation matches spec, design, and tasks before archive. | `/sdd-verify` |
| [`/sdd-archive`](example-sdd/01-sdd-workflow.md#fase-8--archive) | Closes the change: merges delta specs into main specs and moves to archive. | `/sdd-archive` |
| `/sdd-init` | Bootstraps the `openspec/` structure in a project for the first time. | `/sdd-init` |
| `/sdd-onboard` | Guided walkthrough of the full SDD cycle using the real codebase. | `/sdd-onboard` |

### Code review

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/judgment-day`](example-sdd/02-review.md#judgment-day--revisión-adversarial-dual) | Two independent judges review the same code. Only issues both confirm get fixed. | `/judgment-day revisa el PR del módulo de pagos` |
| [`/comment-writer`](example-sdd/02-review.md#comment-writer--comentarios-de-colaboración) | Writes warm, direct PR comments — collaborative tone, not accusatory. | `/comment-writer este método tiene un N+1 query, ¿cómo lo comento?` |

### Git & pull requests

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/branch-pr`](example-sdd/08-git-jira-workflow.md#branch-pr--crear-el-pr-vinculado-al-trabajo) | Opens a PR linked to a Jira ticket or SDD change. Validates naming, commits, and tests before creating. | `/branch-pr` |
| [`/chained-pr`](example-sdd/03-git-workflow.md#chained-pr--partir-un-pr-grande-en-cadena) | Splits oversized PRs (400+ lines) into a reviewable sequence. | `/chained-pr tengo 800 líneas de refactor en el módulo de usuarios` |
| [`/work-unit-commits`](example-sdd/03-git-workflow.md#work-unit-commits--planear-commits-como-unidades-revieweables) | Plans commits as self-contained reviewable units before pushing. | `/work-unit-commits implementé notificaciones, auth y la integración` |

### Documentation

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/changelog-generator`](example-sdd/05-docs-testing-github.md#changelog-generator--release-notes-desde-commits-de-git) | Transforms git commits into polished changelogs and release notes. | `/changelog-generator genera las release notes para v2.1.0` |
| [`/cognitive-doc-design`](example-sdd/05-docs-testing-github.md#cognitive-doc-design--documentación-que-reduce-carga-cognitiva) | Designs guides, READMEs, and RFCs that minimize cognitive load. | `/cognitive-doc-design necesito un README para el microservicio de pagos` |

### Design & frontend

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/frontend-design`](example-sdd/04-design.md#frontend-design--interfaces-web-con-alta-calidad-visual) | Builds production-grade web UIs — avoids generic AI aesthetics. | `/frontend-design página de login para un SaaS B2B, estilo profesional` |
| [`/interface-design`](example-sdd/04-design.md#interface-design--dashboards-panels-y-herramientas-internas) | Builds dashboards, admin panels, and internal tools. | `/interface-design dashboard de métricas de pagos para operaciones` |
| [`/tailwind-design-system`](example-sdd/04-design.md#tailwind-design-system--sistema-de-diseño-con-tailwind-css-v4) | Builds scalable design systems with Tailwind CSS v4: tokens, components, patterns. | `/tailwind-design-system sistema de diseño para suite de productos internos` |

### Testing

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/go-testing`](example-sdd/05-docs-testing-github.md#go-testing--patrones-de-testing-para-go) | Applies focused Go testing patterns: coverage, TUI flows, teatest, golden files. | `/go-testing necesito testear un handler gRPC con dependencias externas` |

### GitHub

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/issue-creation`](example-sdd/05-docs-testing-github.md#issue-creation--github-issues-con-contexto-completo) | Creates GitHub issues with full context: steps to reproduce, impact, expected behavior. | `/issue-creation el checkout falla en Safari cuando hay 2+ items` |

### Jira

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| [`/jira-workflow`](example-sdd/08-git-jira-workflow.md#jira-workflow--gestionar-tickets-desde-el-ai-tool) | Creates and updates Jira tickets linked to SDD changes. Post-commit hook adds comments automatically. Requires `baseline mcp jira`. | `/jira-workflow crea un ticket para agregar soporte de webhooks en pagos` |

### Skills meta

| Skill | What it does | Example prompt |
|-------|-------------|----------------|
| `/skill-creator` | Creates new LLM-first skills with valid SKILL.md frontmatter. | `/skill-creator quiero una skill para nuestro proceso de deploy` |
| `/skill-improver` | Audits and refactors existing SKILL.md files: normalize conventions, improve quality. | `/skill-improver revisa la skill de branch-pr` |
| `/skill-registry` | Rebuilds the skill index after adding or changing skills. | `/skill-registry` |

---

## Integrations

### Jira (via Atlassian MCP)

Connect your AI tools to Jira so the `/jira-workflow` skill can create and update tickets directly.
Supported tools: **Claude Code**, **Kiro IDE**, **Kiro CLI**.

**Quick setup:**

```bash
export ATLASSIAN_SITE_URL=https://your-org.atlassian.net
export ATLASSIAN_USER_EMAIL=your@email.com
export ATLASSIAN_API_TOKEN=your-api-token
baseline mcp jira          # auto-detects your tools and configures all of them
# restart your AI tool, then:
/jira-workflow crea los tickets para la migración del módulo de pagos
```

**Full step-by-step guide (token generation, per-tool config, troubleshooting, Jira project setup):**
→ [`docs/guides/jira-integration.md`](docs/guides/jira-integration.md)

### Git workflow (branches, PRs, Jira linking)

Every branch must reference a Jira ticket (`feat/PROJ-123-description`) or an SDD change (`feat/sdd-<id>-description`). `baseline install` enforces this with two global git hooks:

- **`pre-push`** — blocks direct pushes to `main`, `master`, `qa`, `develop` and rejects branches without a work item reference
- **`post-commit`** — automatically posts a comment to the linked Jira ticket after every commit

**Guides:**
→ [`docs/guides/git-workflow.md`](docs/guides/git-workflow.md) — full step-by-step with both paths
→ [`example-sdd/08-git-jira-workflow.md`](example-sdd/08-git-jira-workflow.md) — concrete examples (not limits)

---

## Requirements

- Node.js >= 18
- At least one supported AI tool installed

---

## CI — publish on release

The workflow in `.github/workflows/publish.yml` runs lint, build, and publish automatically when you create a GitHub release. Add your `NPM_TOKEN` as a repository secret to enable it.
