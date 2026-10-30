<p align="center">
  <img src="assets/banner.svg" alt="Anti-Slop Stack Banner" width="100%" />
</p>

# Anti-Slop Stack 🛡️

> The ruthless multi-layer purifier for AI coding agents.
> Strips away bloated boilerplate, hallucinated abstractions, narrative comments, generic AI template UIs, and robotic prose.

[![Anti-Slop CI](https://github.com/Dhani078/anti-slop-stack/actions/workflows/ci.yml/badge.svg)](https://github.com/Dhani078/anti-slop-stack/actions/workflows/ci.yml)
[![GitHub Action](https://img.shields.io/badge/GitHub%20Action-Dhani078%2Fanti--slop--stack-blue?logo=githubactions&logoColor=white)](https://github.com/Dhani078/anti-slop-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen.svg)]()
[![Platform: Universal Agent Skills](https://img.shields.io/badge/Platforms-Hermes%20%7C%20Claude%20Code%20%7C%20Cursor%20%7C%20Windsurf%20%7C%20Codex%20%7C%20Aider%20%7C%20Cline%20%7C%20GitHub%20Copilot%20%7C%20Antigravity-purple.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)]()

---

## 🎯 The Problem

Large Language Models (LLMs) and AI coding agents have an innate bias toward AI Slop:
- Code Slop: Trivial comments restating syntax, empty `catch (e) {}` blocks, unchecked `as any` band-aids.
- YAGNI & Architecture Bloat: Single-use interfaces, premature factories, speculative configuration, and wrapper functions that add zero semantic value.
- UI Slop: Cookie-cutter purple gradients, unstyled floating cards, hardcoded pixel widths breaking mobile viewports.
- Prose Slop: Buzzword salads ("delve", "leverage", "testament", "in today's rapidly evolving world").

`anti-slop-stack` operates as an automated Senior Staff Engineer and QA gatekeeper that detects, catalogs, and mechanically purges these patterns.

---

## ⚡ Quick Start

### 1. Run via npx (Zero Install)
```bash
npx anti-slop scan src/
```

### 2. Auto-Fix Mechanical Slop
Automatically strips trivial narrative comments, dead imports, and obvious residue:
```bash
npx anti-slop fix src/
```

### 3. Machine-Readable JSON & SARIF Export
Output structured findings for CI/CD dashboards or GitHub Code Scanning:
```bash
# JSON output
npx anti-slop json src/

# SARIF v2.1.0 output for GitHub Security tab
npx anti-slop sarif src/ > results.sarif
```

### 4. Custom Configuration (`.antisloprc.json`)
Configure thresholds and toggle rules per repository:
```json
{
  "rules": {
    "bloatSlop": {
      "maxLOC": 200
    }
  }
}
```

### 5. Install Git Pre-Commit Hook
Prevent degraded AI code from ever entering your Git history:
```bash
npx anti-slop init-hook
```
You can also audit only currently staged Git files or check changes across branch diffs:
```bash
# Audit staged files before commit
npx anti-slop staged

# Audit changed files against base branch
npx anti-slop diff origin/main
```
See [docs/PRE-COMMIT.md](docs/PRE-COMMIT.md) for Husky and Python `pre-commit` integrations.

### 6. GitHub Action (Reusable CI Workflow)
Add to your repository's `.github/workflows/quality.yml`:
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: Dhani078/anti-slop-stack@main
    with:
      path: 'src'
      fail-on-violation: 'true'
```

### 7. CI Quality Gate
Fails the build with exit code `1` if high-severity violations exist:
```bash
npx anti-slop ci src/
```

---

## 🧩 4 Purification Layers

| Layer | Target | What it Eliminates |
|---|---|---|
| 1. Code Slop | TypeScript, JavaScript, Python, PHP, Go, Rust | Narrative comments, swallowed exceptions (`catch {}`), `as any` / `@ts-ignore`, dead residue, leftover debug logs, destructive error wrapping, dangerous `eval()`, hardcoded secrets/API keys, blind sleep timeouts. |
| 2. Architecture & Bloat | Architecture & Modules | Single-implementation interfaces, speculative wrappers, files exceeding 200 LOC ceiling. |
| 3. UI & Visual Slop | CSS, Tailwind, JSX, Vue | Generic AI purple glows, template card layouts, hardcoded width overflow risks, Tailwind template gradients (`from-purple-500 to-indigo-500`). |
| 4. Prose & Copy | Markdown, HTML, Docs | AI clichés (`delve`, `leverage`, `seamless`), throat-clearing openings, passive voice, markdown bold overuse (`term`). |

---

## 🤖 Installation into AI Coding Agents

anti-slop-stack is designed to run seamlessly across any AI coding environment:

### 1. Hermes Agent
Clone directly into your Hermes skills directory:
```bash
cd ~/.hermes/skills/code-quality
git clone https://github.com/Dhani078/anti-slop-stack.git
```

### 2. Claude Code CLI
Clone into your workspace or user skills folder:
```bash
git clone https://github.com/Dhani078/anti-slop-stack.git .claude/skills/anti-slop-stack
```

### 3. Cursor & Windsurf
Add `SKILL.md` directly to your project rules (`.cursorrules` or `.windsurfrules`):
```bash
curl -s https://raw.githubusercontent.com/Dhani078/anti-slop-stack/main/SKILL.md >> .cursorrules
```

### 4. OpenAI Codex & Antigravity
Reference `SKILL.md` inside your repository instructions (`AGENTS.md`):
```markdown
Before finalizing code changes, review and enforce SKILL.md from anti-slop-stack to eliminate boilerplate, narrative comments, and template UI bloat.
```

### 5. Aider & Cline & Roo Code
Use as a pre-commit or post-generation check script:
```bash
npx anti-slop scan src
```

### 6. GitHub Copilot CLI & Workspaces
Embed into `.github/copilot-instructions.md`:
```markdown
Follow the anti-slop-stack rules: write minimal code (YAGNI), avoid Hungarian interfaces (no IFoo), ban narrative comments, and eliminate generic purple gradients.
```

---

## 🧪 Testing

Run the included standalone verification suite (0 external dependencies):
```bash
npm test
```

Sample test output:
```text
Running test suite for anti-slop-stack...
✓ Code Slop scanner passed
✓ Code Slop fixer passed
✓ Architecture Bloat scanner passed
✓ UI Slop scanner passed
✓ Prose Slop scanner passed

All 5 test suites passed cleanly with 0 failures!
```

---

## 📄 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md) - Subsystem flow, directory hierarchy, and pipeline design.
- [Rules Reference Catalog](docs/RULES_REFERENCE.md) - Granular catalog and descriptions of all detection rules.
- [Performance Benchmarks](docs/BENCHMARKS.md) - Latency, throughput, and memory consumption stats.
- [CI/CD Integration](docs/CI_CD.md) - Setups for GitHub Actions, GitLab CI, Bitbucket, and Docker.
- [Extending Rules](docs/EXTENDING_RULES.md) - Guide for adding custom project rules and configuration.
- [Frequently Asked Questions (FAQ)](docs/FAQ.md) - Common questions, comparison with ESLint, and edge cases.
- [Architecture & Specification](SPEC.md) - Full technical design, rule taxonomy, and QA gates.
- [Visual Demonstration](docs/DEMO.md) - Before vs. after code comparison showing 48% LOC reduction.
- [Pre-Commit Hook Guide](docs/PRE-COMMIT.md) - Native Git, Husky, and Python pre-commit setup.
- [Contributing Guide](CONTRIBUTING.md) - Developer guidelines and zero-dependency principles.
- [Contributor Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines and behavioral pledge.
- [Security Policy](SECURITY.md) - Vulnerability disclosure policy and reporting process.
- [Changelog](CHANGELOG.md) - Version release history and migration notes.

---

## 📄 License

MIT © [Dhani078](https://github.com/Dhani078)

