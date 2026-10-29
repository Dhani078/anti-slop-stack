# anti-slop-stack Specification

## Overview
`anti-slop-stack` is a unified multi-layer purifier skill and CLI tool designed for AI coding agents (Hermes, Claude Code, Codex, Cursor). It eliminates AI-generated code bloat, narrative comments, hallucinated abstractions, copy-paste slop, generic template UIs, and robotic prose.

## Core Purifier Layers
1. **Layer 1: Code & Logic Slop (AST & Rules)**
   - Swallowed exceptions: `catch (e) {}` or generic re-throws.
   - Unsafe casts: `as any`, `@ts-ignore`, dynamic type bypasses.
   - Narrative comments: Comments stating what code already clearly shows.
   - Dead residue: Unused imports, unreachable statements, orphan stubs.

2. **Layer 2: Architecture & YAGNI Bloat (`ponytail` Senior Rules)**
   - Single-use interfaces & single-product factories.
   - Speculative config, unnecessary wrappers, or premature generics.
   - Enforce standard library / native platform first.
   - Cap lines of code (LOC <= 200 per file).

3. **Layer 3: UI & Visual Slop (`impeccable` & `taste` Rules)**
   - Eliminates generic AI defaults (lavender glows, purple gradients, cookie-cutter cards).
   - Enforces concentric radii, optical alignment, WCAG 4.5:1 contrast.
   - Zero horizontal overflow mobile & desktop.

4. **Layer 4: Documentation & Prose Slop (`avoid-ai-writing` Rules)**
   - Eliminates robotic filler: "In today's fast-paced world", "delve", "harness", "crucial".
   - Restores direct, active, factual technical prose.
   - Strictly human voice with factual preservation.

## Architecture & File Structure
```
anti-slop-stack/
├── SKILL.md                 # Universal Agent Skill definition (Hermes, Claude, Codex, Cursor)
├── README.md                # High-conversion GitHub documentation with badges & workflows
├── LICENSE                  # MIT License
├── package.json             # NPM package definition (CLI binary `anti-slop`)
├── bin/
│   └── anti-slop.js         # Executable node CLI wrapper
├── src/
│   ├── index.js             # Engine entrypoint
│   ├── rules/
│   │   ├── code-slop.js     # Detects swallowed errors, unsafe casts, dead residue
│   │   ├── bloat-slop.js    # Detects single-impl interfaces, oversized files, redundant helpers
│   │   ├── ui-slop.js       # Checks CSS/Tailwind for generic AI styling & overflow risks
│   │   └── prose-slop.js    # Scans markdown/text for AI-isms, filler phrases, buzzwords
│   └── reporter.js          # Clean CLI output formatter with actionable before/after fixes
└── tests/
    └── test-samples.js      # Runnable verification test verifying zero regressions
```
