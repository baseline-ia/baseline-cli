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
| OpenSpec structure for spec-driven development | `./openspec/` in the project |

---

## Commands

```bash
baseline install          # set up tools, skills, and team config
baseline update           # pull latest baseline and re-apply standards
baseline status           # show what's installed and configured
baseline doctor           # diagnose missing or broken setup
baseline onboard junior   # onboarding guide by level: junior · semi · senior
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

| Tool | Skills | Team config |
|------|--------|-------------|
| [Claude Code](https://claude.ai/code) | ✅ | ✅ `~/.claude/CLAUDE.md` |
| [OpenCode](https://opencode.ai) | ✅ | ✅ `~/.opencode/AGENTS.md` |
| [Kiro](https://kiro.dev) | ✅ | ✅ `~/.kiro/steering/baseline.md` |
| Antigravity | — | coming soon |

Detection is automatic — `baseline install` reads your environment and configures only the tools that are present.

---

## Requirements

- Node.js >= 18
- At least one supported AI tool installed

---

## CI — publish on release

The workflow in `.github/workflows/publish.yml` runs lint, build, and publish automatically when you create a GitHub release. Add your `NPM_TOKEN` as a repository secret to enable it.
