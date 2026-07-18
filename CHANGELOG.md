# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
