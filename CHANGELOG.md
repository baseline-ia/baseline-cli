# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-07-18

### Added
- **Kiro IDE support** — `baseline install` now configures Kiro automatically when detected
  - Skills copied to `~/.kiro/skills/`
  - Team standards written to `~/.kiro/steering/baseline.md` (Kiro's native steering mechanism)
  - Detection works via `kiro` binary on PATH **or** presence of `~/.kiro` directory, since Kiro is a desktop app and the binary may not be on PATH in all environments
- **`baseline install [tool]`** — optionally target a single tool instead of auto-detecting all
  - `baseline install kiro` — configure only Kiro
  - `baseline install claude` — configure only Claude Code
  - `baseline install opencode` — configure only OpenCode
  - Without argument, auto-detects and configures all present tools (existing behavior)

### Fixed
- `gentle-ai install` failing with "Refusing to load formula from untrusted tap" — now trusts `gentleman-programming/tap` via `brew trust` before running the install

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
