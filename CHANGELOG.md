# Changelog

All notable changes to `anti-slop-stack` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-29

### Added
- Multi-Layer Purifier Core Engine:
  - Layer 1 (Code Slop): Detects and cleans narrative comments, swallowed exceptions, unsafe casts (`as any`, `@ts-ignore`), dead residue (`TODO: remove`), leftover `console.log()` debug calls, destructive error wrapping, dangerous `eval()`, hardcoded secret keys (`sk-...`, `ghp_...`), and blind sleep delays (`sleep(5000)`).
  - Layer 2 (Architecture & YAGNI Bloat): Flags Hungarian interface notation (`IFoo`), single-use pass-through functions, and files exceeding modular LOC limits.
  - Layer 3 (UI & Visual Slop): Flags generic AI gradients, glowing lavender box shadows, hardcoded pixel widths, and boilerplate Tailwind classes.
  - Layer 4 (Prose & Copy Slop): Detects 14+ AI buzzwords (`delve`, `leverage`, `seamless`), throat-clearing sentence openers, and artificial markdown bold overuse (`term`).
- CLI Commands:
  - `anti-slop scan [path]`: Human-readable terminal diagnostic report.
  - `anti-slop fix [path]`: Mechanical auto-purging of trivial narrative comments and debug statements.
  - `anti-slop json [path]`: Machine-readable structured JSON report for automation.
  - `anti-slop ci [path]`: Strict CI/CD quality gate failing on high/critical severity findings.
  - `anti-slop init-hook`: Native Git pre-commit hook installer.
- Zero External Dependencies: Pure Node.js standard library architecture with 0 third-party packages.
- Universal Agent Skill (`SKILL.md`): Full compatibility with Hermes Agent, Claude Code, OpenAI Codex, and Cursor.
- Project Configuration (`.antisloprc.json`): Supports glob-style directory ignores (`vendor/`, `*.min.js`) and customized rule thresholds.
- Integration Ecosystem:
  - Reusable composite GitHub Action (`action.yml`).
  - Pre-commit hook framework specification (`.pre-commit-hooks.yaml` & `docs/PRE-COMMIT.md`).
- Advanced Automation:
  - OASIS SARIF v2.1.0 exporter (`anti-slop sarif [path]`) for native GitHub Code Scanning integration.
  - Branch PR diff scanner (`anti-slop diff [branch]`) for incremental PR analysis.
  - Dry-run fixer preview mode (`anti-slop fix --dry-run`).
  - Inline rule disable comments (`// anti-slop-disable-next-line [RULE]`).
  - Fast Staged Audit (`anti-slop staged`): Enables near-instant scanning of Git staged files prior to committing, preventing dirty code from entering Git history.
  - Project Configuration (`.antisloprc.json`):
  - Standalone assertion test suite (`tests/test-samples.js`) with 100% pass rate.
  - Cross-platform automated GitHub Actions CI matrix (Ubuntu, Windows, macOS across Node 18, 20, 22).
  - High-resolution SVG dark-mode header banner (`assets/banner.svg`).
