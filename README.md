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
baseline install                  # auto-detect tools and configure all
baseline install claude           # configure only Claude Code
baseline install opencode         # configure only OpenCode
baseline install kiro-ide         # configure only Kiro IDE (~/.kiro detected)
baseline install kiro-cli         # configure only Kiro CLI (kiro binary detected)
baseline install codex            # configure only Codex
baseline update                   # pull latest baseline and re-apply standards
baseline status                   # show what's installed and configured
baseline doctor                   # diagnose missing or broken setup
baseline onboard junior           # onboarding guide by level: junior · semi · senior
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

25 skills are installed across all supported tools. Each skill is invoked with `/skill-name` inside your AI tool.

### Architecture

| Skill | What it does |
|-------|-------------|
| `/architecture-guidelines` | Validate and guide file placement across NestJS layers, Lambda handlers, React Query/Zustand state, and multi-tenancy rules — enforces the 7 hard rules that block CI/CD |

### SDD — Spec-Driven Development

| Skill | What it does |
|-------|-------------|
| `/sdd-new` | Start a new SDD change — runs exploration then creates a proposal |
| `/sdd-explore` | Investigate an idea or feature: reads the codebase and compares approaches before committing |
| `/sdd-propose` | Create a change proposal with intent, scope, and approach once exploration is complete |
| `/sdd-spec` | Write delta specs with requirements and scenarios once the proposal is approved |
| `/sdd-design` | Create the technical design and architecture decisions for the change |
| `/sdd-tasks` | Break the change into an ordered implementation task checklist |
| `/sdd-apply` | Implement the tasks following specs and design; marks tasks complete as it goes |
| `/sdd-verify` | Validate that the implementation matches specs, design, and tasks |
| `/sdd-archive` | Close a completed change — merge delta specs into main specs and move to archive |
| `/sdd-init` | Initialize SDD context in a project: detects stack and bootstraps persistence |
| `/sdd-onboard` | Guided walkthrough of the full SDD cycle on your real codebase |

### Code review

| Skill | What it does |
|-------|-------------|
| `/judgment-day` | Blind dual review: two independent judges assess the code, confirmed issues are fixed, then re-judged |
| `/comment-writer` | Write warm, direct collaboration comments for PR feedback, code reviews, and GitHub/Slack replies |

### Git & pull requests

| Skill | What it does |
|-------|-------------|
| `/branch-pr` | Create a pull request with issue-first checks and gentle-ai validation before opening to review |
| `/chained-pr` | Split oversized PRs (400+ lines) into chained/stacked PRs to protect reviewer focus |
| `/work-unit-commits` | Plan commits as reviewable work units, keeping tests and docs with the code they belong to |

### Documentation

| Skill | What it does |
|-------|-------------|
| `/changelog-generator` | Automatically transform git commits into polished, user-facing changelogs and release notes |
| `/cognitive-doc-design` | Design guides, READMEs, RFCs, and architecture docs that minimize cognitive load and aid retention |

### Design & frontend

| Skill | What it does |
|-------|-------------|
| `/frontend-design` | Create distinctive, production-grade web interfaces (components, pages, landing pages) — avoids generic AI aesthetics |
| `/interface-design` | Build dashboards, admin panels, SaaS tools, and data interfaces (not marketing sites) |
| `/tailwind-design-system` | Build scalable design systems with Tailwind CSS v4: tokens, components, and responsive patterns |

### Testing

| Skill | What it does |
|-------|-------------|
| `/go-testing` | Apply focused Go testing patterns: coverage, Bubbletea TUI flows, teatest, and golden files |

### GitHub

| Skill | What it does |
|-------|-------------|
| `/issue-creation` | Create GitHub issues (bug reports, feature requests) with gentle-ai validation and issue-first checks |

### Skills meta

| Skill | What it does |
|-------|-------------|
| `/skill-creator` | Create reusable LLM-first skills with valid SKILL.md frontmatter for complex workflows |
| `/skill-improver` | Audit and refactor existing SKILL.md files: normalize conventions, improve quality |
| `/skill-registry` | Rebuild the skill index after adding or changing skills |

---

## Requirements

- Node.js >= 18
- At least one supported AI tool installed

---

## CI — publish on release

The workflow in `.github/workflows/publish.yml` runs lint, build, and publish automatically when you create a GitHub release. Add your `NPM_TOKEN` as a repository secret to enable it.
