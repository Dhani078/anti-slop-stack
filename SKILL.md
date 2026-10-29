---
name: anti-slop-stack
description: >
  Ruthless multi-layer purifier for AI coding agents. Eliminates bloated boilerplate,
  hallucinated abstractions, narrative comments, generic AI template UIs, and robotic prose.
  Use when asked to "remove AI slop", "clean up code", "audit for bloat", "simplify project",
  or "purify codebase".
version: 1.0.0
license: MIT
metadata:
  author: Dhani078
  repository: https://github.com/Dhani078/anti-slop-stack
  tags: [code-quality, anti-slop, clean-code, refactoring, ai-cleaner]
---

# Anti-Slop Stack

A unified, multi-layer purifier that strips away AI-generated sludge across Code, Architecture, UI, and Prose.

## What is AI Slop?

AI models naturally gravitate toward:
1. **Code Slop**: Narrative comments restating obvious code, empty `catch (e) {}`, `as any` band-aids, and orphan functions.
2. **Architecture Bloat (YAGNI violations)**: 5 layers of indirection where a single function works, premature factories, speculative configuration files.
3. **UI Slop**: Cookie-cutter purple gradients, centered cards with generic lavender borders, hardcoded sizes causing horizontal scroll.
4. **Prose Slop**: Buzzword salads ("delve", "leverage", "testament"), throat-clearing openings, and breathless conclusions.

`anti-slop-stack` enforces strict senior-developer discipline to eradicate all four.

---

## The 4 Purification Layers

### 1. Code Slop Purifier
- **Ban Narrative Comments**: Delete comments like `// increment counter` or `// function to fetch user`. Keep only non-obvious *why*.
- **Forbid Swallowed Errors**: Flag every empty `catch` block or log-and-forget handler that risks silent failure.
- **Eliminate Unsafe Coercions**: Flag `as any`, `@ts-ignore`, and dynamic casts that bypass the type checker.
- **Dead Code Sweep**: Purge unreferenced imports, unreachable branches, and commented-out scraps.
- **Purge Debug Console Output**: Detect and clean stray `console.log()` / debug prints from production code.
- **Destructive Error Wrapping**: Forbid generic `catch (err) { throw new Error(err); }` which destroys original stack traces.
- **Dangerous Dynamic Evaluation**: Detect critical `eval()` and `new Function()` anti-patterns that expose applications to code injection.

### 2. Architecture & YAGNI Purifier (Senior Rules)
- **Stdlib & Native First**: Replace third-party library imports with native stdlib or platform built-ins when a few lines suffice.
- **Single-Implementation Rule**: Delete interfaces, abstractions, or wrappers that only have one concrete consumer.
- **200 LOC Ceiling**: Strongly discourage monolithic god-files. Break components by single responsibility, never arbitrary splits.
- **Shortest Working Diff**: Choose the solution with the fewest lines of code that cleanly satisfies all requirements and edge cases.

### 3. UI & Visual Slop Purifier
- **Ban Generic AI Aesthetics**: Reject template dark-mode purple/lavender glows and unstyled cards.
- **Tailwind Template Slop**: Detect boilerplate gradients (`from-purple-500 to-indigo-500`) and shadow glows (`shadow-purple-500/50`).
- **Optical Precision**: Enforce concentric corner radiuses (`outer_radius = inner_radius + padding`).
- **Contrast & Hierarchy**: Ensure minimum WCAG 4.5:1 text contrast and distinct typographic scale.
- **Zero Horizontal Overflow**: Zero tolerance for horizontal scrolling on mobile (360px) and desktop viewports (`w-[800px]`, `width: 900px`).

### 4. Prose & Copywriting Purifier
- **Purge AI Clichés**: Ban filler words: `delve`, `leverage`, `robust`, `seamless`, `testament`, `spearhead`, `tapestry`, `vital role`.
- **Delete Throat-Clearing**: Cut opening sentences like *"In today's fast-paced digital world..."* or *"It is important to remember that..."*.
- **Bold Overuse Detection**: Flag stacked markdown bold tags (`**word**`) used as artificial emphasis crutches.
- **Active & Direct**: Replace passive constructions with direct, concrete human language.

---

## Usage Commands

### Interactive CLI Tool
Scan a codebase or target directory:
```bash
node src/index.js scan [path]
```

Automatically apply mechanical fixes (strip narrative comments, clean dead imports, fix trivial slop):
```bash
node src/index.js fix [path]
```

Audit in CI mode (exits with non-zero code if slop exceeds threshold):
```bash
node src/index.js ci [path]
```

### Agent Integration (Hermes / Claude / Codex / Cursor)
When this skill is invoked:
1. Run the local scanner across the affected project files.
2. Report categorized slop findings grouped by severity (Critical / High / Cleanable).
3. Present the shortest working diff that removes all unnecessary code while maintaining 100% of functional requirements.
