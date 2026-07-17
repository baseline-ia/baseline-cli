# baseline

CLI that sets up AI tools, team standards, and working rules in one command — so every team member starts from the same baseline, regardless of who started the project.

## Install

```bash
npm install -g @baseline-ia/baseline-cli
```

## Usage

```bash
baseline install    # install team standards, skills and AI config
baseline update     # update baseline and re-apply standards
baseline status     # show installed tools and team config state
baseline doctor     # verify that everything is correctly configured
baseline onboard    # show the onboarding guide for your level
```

## What it installs

- Skills for Claude Code (`~/.claude/skills/`) and OpenCode (`~/.opencode/skills/`)
- Team standards block in `CLAUDE.md` / `AGENTS.md`
- [Gentle-AI](https://github.com/Gentleman-Programming/gentle-ai) ecosystem
- `openspec/` structure for spec-driven development (SDD)

## Onboarding

```bash
baseline onboard junior
baseline onboard semi
baseline onboard senior
```

## Requirements

- Node.js >= 18
- At least one AI tool: [Claude Code](https://claude.ai/code), [OpenCode](https://opencode.ai), or Antigravity
