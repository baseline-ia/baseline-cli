# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
