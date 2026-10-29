# Changelog

All notable changes to `anti-slop-stack` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-29

### Added
- **Multi-Layer Purifier Core Engine**:
  - **Layer 1 (Code Slop)**: Detects and cleans narrative comments, swallowed exceptions, unsafe casts (`as any`, `@ts-ignore`), dead residue (`TODO: remove`), leftover `console.log()` debug calls, destructive error wrapping, and dangerous dynamic evaluation (`eval()`, `new Function()`).
  - **Layer 2 (Architecture & YAGNI Bloat)**: Flags Hungarian interface notation (`IFoo`), single-use pass-through functions, and files exceeding modular LOC limits.
  - **Layer 3 (UI & Visual Slop)**: Flags generic AI gradients, glowing lavender box shadows, hardcoded pixel widths, and boilerplate Tailwind classes.
  - **Layer 4 (Prose & Copy Slop)**: Detects 14+ AI buzzwords (`delve`, `leverage`, `seamless`) and throat-clearing sentence openers.
- **CLI Commands**:
  - `anti-slop scan [path]`: Human-readable terminal diagnostic report.
  - `anti-slop fix [path]`: Mechanical auto-purging of trivial narrative comments and debug statements.
  - `anti-slop json [path]`: Machine-readable structured JSON report for automation.
  - `anti-slop ci [path]`: Strict CI/CD quality gate failing on high/critical severity findings.
  - `anti-slop init-hook`: Native Git pre-commit hook installer.
- **Zero External Dependencies**: Pure Node.js standard library architecture with 0 third-party packages.
- **Universal Agent Skill (`SKILL.md`)**: Full compatibility with Hermes Agent, Claude Code, OpenAI Codex, and Cursor.
- **Project Configuration (`.antisloprc.json`)**: Supports glob-style directory ignores (`vendor/**`, `*.min.js`) and customized rule thresholds.
- **Integration Ecosystem**:
  - Reusable composite GitHub Action (`action.yml`).
  - Pre-commit hook framework specification (`.pre-commit-hooks.yaml` & `docs/PRE-COMMIT.md`).
  - Project configuration file (`.antisloprc.json`).
  - Standalone assertion test suite (`tests/test-samples.js`) with 100% pass rate.
  - Cross-platform automated GitHub Actions CI matrix (Ubuntu, Windows, macOS across Node 18, 20, 22).
  - High-resolution SVG dark-mode header banner (`assets/banner.svg`).
