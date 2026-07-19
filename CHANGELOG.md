# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.4] - 2026-07-18

### Added
- **`/jira-workflow` skill** — Create and manage Jira tickets linked to the team's SDD workflow:
  - Creates Epic → Story → Subtask hierarchy per SDD change
  - Maps SDD phases to Jira status transitions (explore → In Progress, propose → In Review, verify → Done)
  - Links PRs to Jira issues automatically
  - Includes SDD→Jira status mapping reference (`references/sdd-jira-mapping.md`)
- **`baseline mcp jira` command** — Configures the `@atlassian/mcp` server in `~/.claude/settings.json`:
  - Reads credentials from env vars (`ATLASSIAN_SITE_URL`, `ATLASSIAN_USER_EMAIL`, `ATLASSIAN_API_TOKEN`)
  - Falls back to placeholder values with setup instructions if env vars are not set
  - Merges into existing `settings.json` without overwriting other config
- **Migration example** — `example-sdd/07-project-migration.md`: complete 8-step walkthrough for migrating an existing project (e.g. Express → NestJS) using all baseline skills together
- **Skill → example links** — Every skill in the README skills reference table now links directly to its usage example in `example-sdd/`
- **Engram validation in `baseline install`** — After applying adapters, runs `engram setup <agent>` for each detected tool if Engram is installed. If not installed, prints instructions without blocking the rest of the install.
- **Engram checks in `baseline doctor`** — New advisory section reports: binary presence, version, mode (local / cloud / both), and whether MCP is wired per detected AI tool. Not blocking — Engram is optional but recommended.
- **Global git hooks** — `baseline install` installs two hooks at `~/.baseline/hooks/` and sets `git config --global core.hooksPath`:
  - `pre-push`: blocks direct pushes to `main`, `master`, `qa`, `develop`; also rejects branches not linked to a Jira ticket key (`PROJ-123`) or an SDD change id (`sdd-<id>`)
  - `post-commit`: after every commit, posts a comment to the linked Jira ticket via the Atlassian REST API using credentials from env vars; silent if no ticket key in branch name or credentials not set
- **`/branch-pr` skill updated** — Branch naming convention updated to include optional Jira ticket key (`feat/PROJ-123-description`). Protected branch reminder added.
- **Git Workflow guide** — `docs/guides/git-workflow.md`: 8-step guide covering protected branches, branch naming with Jira, conventional commits, PR requirements, and skills to use at each step.
- **Kiro MCP path corrected** — `baseline mcp jira` now writes to `~/.kiro/settings/mcp.json` (not `~/.kiro/settings.json`). Kiro config uses `${VAR}` env expansion for credentials instead of hardcoded values.

## [0.1.3] - 2026-07-18

### Added
- **`/architecture-guidelines` skill** — AI runtime instructions that validate and guide code placement across the team's official stack:
  - Backend: NestJS layer structure (`controllers/` → `services/` → `domain/` → `infrastructure/`) and Lambda selection criteria
  - Frontend: React Query for server state, Zustand for UI state — no direct `fetch`/`axios` in `useEffect`
  - Multi-tenancy: mandatory `tenant_id` filtering on every query, no raw SQL without architecture approval
  - 7 hard rules enforced as CI/CD blockers: no hardcoded env vars, no empty catch, no `console.log`, no PII logging, SRP, DIP
  - Full official guidelines document included in `references/` for AI context

## [0.1.2] - 2026-07-18

### Added
- **Skill documentation** — README now includes a full reference table for every installed skill, organized by category (SDD, review, git, design, testing, docs, meta)

## [0.1.1] - 2026-07-18

### Added
- **Kiro IDE support** (`kiro-ide`) — detected by presence of `~/.kiro` directory
  - Skills copied to `~/.kiro/skills/`
  - Team standards written to `~/.kiro/steering/baseline.md`
  - Statusline sub-agent installed to `~/.kiro/agents/statusline.md`
- **Kiro CLI support** (`kiro-cli`) — detected by `kiro` binary on PATH; shares the same `~/.kiro` adapter
- **Per-agent gentle-ai presets** — targeted install per tool, all with `--persona neutral`:
  - Kiro (IDE + CLI): `--preset performance --sdd-mode multi` (frontier models for SDD phases)
  - Codex: `--preset recommended`
  - Claude Code / OpenCode: `--preset full-gentleman --sdd-mode multi`
- **OpenCode strict TDD mode** — `Strict TDD Mode: enabled` prepended to `~/.opencode/AGENTS.md`
- **Codex detection** — `codex` binary auto-detected and passed to gentle-ai with the recommended preset
- **`baseline install [tool]`** — install for a single tool instead of auto-detecting all:
  - Valid values: `claude`, `opencode`, `kiro-ide`, `kiro-cli`, `codex`, `antigravity`

### Fixed
- `gentle-ai install` failing with "Refusing to load formula from untrusted tap" — CLI now runs `brew trust gentleman-programming/tap` before every gentle-ai install
- Kiro agent ID corrected from `kiro` to `kiro-ide` to match gentle-ai's registered agent ID

## [0.1.0] - 2026-07-15

### Added
- Initial release of `baseline` CLI
- `baseline install` — installs team standards, skills, and AI tool configuration
- `baseline update` — updates the package and re-applies standards
- `baseline status` — shows installed tools and team config state
- `baseline doctor` — verifies the full environment configuration
- `baseline onboard [junior|semi|senior]` — shows role-specific onboarding guide
- Claude Code adapter: copies skills to `~/.claude/skills/` and appends team standards to `CLAUDE.md`
- OpenCode adapter: copies skills to `~/.opencode/skills/` and appends team standards to `AGENTS.md`
- Gentle-AI ecosystem integration
- OpenSpec structure bootstrap for spec-driven development (SDD)
- CI workflows: `validate.yml` (lint + build on push/PR) and `publish.yml` (publish on release)
