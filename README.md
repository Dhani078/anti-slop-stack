# Anti-Slop Stack 🛡️

> **The ruthless multi-layer purifier for AI coding agents.**
> Strips away bloated boilerplate, hallucinated abstractions, narrative comments, generic AI template UIs, and robotic prose.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://img.shields.io/badge/Node.js-%3E%3D16.0.0-brightgreen.svg)]()
[![Platform: Agent Skills](https://img.shields.io/badge/Platform-Hermes%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor-purple.svg)]()

---

## 🎯 The Problem

Large Language Models (LLMs) and AI coding agents have a natural tendency toward **AI Slop**:
- **Code Slop**: Trivial comments restating obvious code, empty `catch (e) {}` blocks, unchecked `as any` band-aids.
- **YAGNI & Architecture Bloat**: Single-use interfaces, premature factories, speculative configuration, and wrapper functions that add zero semantic value.
- **UI Slop**: Cookie-cutter purple gradients, unstyled floating cards, hardcoded pixel widths breaking responsive viewports.
- **Prose Slop**: Buzzword salads (*"delve"*, *"leverage"*, *"testament"*, *"in today's rapidly evolving world"*).

`anti-slop-stack` operates as a strict Senior Staff Engineer quality gate that detects, flags, and automatically purges these patterns.

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

### 3. CI Quality Gate
Fails the build with exit code `1` if slop exceeds tolerance:
```bash
npx anti-slop ci src/
```

---

## 🧩 4 Purification Layers

| Layer | Target | What it Eliminates |
|---|---|---|
| **1. Code Slop** | TypeScript, JavaScript, Python, PHP, Go | Narrative comments, swallowed exceptions (`catch {}`), `as any` / `@ts-ignore`, dead residue. |
| **2. Architecture & Bloat** | Architecture & Modules | Single-implementation interfaces, speculative wrappers, files exceeding 200 LOC ceiling. |
| **3. UI & Visual Slop** | CSS, Tailwind, JSX, Vue | Generic AI purple glows, template card layouts, hardcoded width overflow risks. |
| **4. Prose & Copy** | Markdown, HTML, Docs | AI clichés (`delve`, `leverage`, `seamless`), throat-clearing openings, passive voice. |

---

## 🤖 Installation into AI Coding Agents

### For Hermes Agent
Clone into your Hermes skills directory:
```bash
cd ~/.hermes/skills/code-quality
git clone https://github.com/Dhani078/anti-slop-stack.git
```

### For Claude Code
Add to your project's `.claude/skills/`:
```bash
git clone https://github.com/Dhani078/anti-slop-stack.git .claude/skills/anti-slop-stack
```

### For OpenAI Codex / Cursor / Antigravity
Reference `SKILL.md` directly in your workspace rules or prompt instructions:
```markdown
Before finalizing code changes, execute anti-slop-stack to audit and eliminate unnecessary abstractions, narrative comments, and template bloat.
```

---

## 🧪 Testing

Run the included verification suite:
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

## 📄 License

MIT © [Dhani078](https://github.com/Dhani078)
