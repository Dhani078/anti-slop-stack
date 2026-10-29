# Architecture Overview

anti-slop-stack is built with a zero-dependency, modular scanner engine designed to operate directly with native Node.js standard libraries.

## Directory Structure

```text
anti-slop-stack/
├── bin/
│   └── anti-slop.js           # CLI executable entrypoint
├── src/
│   ├── index.js               # CLI dispatcher & engine orchestrator
│   ├── reporter.js            # Terminal & JSON formatting output
│   ├── staged.js              # Git staged-only incremental analyzer
│   └── rules/
│       ├── code-slop.js       # Layer 1: Code anti-patterns & mechanical debt
│       ├── bloat-slop.js      # Layer 2: Architecture & YAGNI bloat
│       ├── ui-slop.js         # Layer 3: UI & visual template slop
│       └── prose-slop.js      # Layer 4: AI buzzwords & prose degradation
├── docs/
│   ├── ARCHITECTURE.md        # Technical architecture & subsystem flow
│   ├── BENCHMARKS.md          # Execution performance & memory benchmarks
│   ├── RULES_REFERENCE.md     # Granular catalog of all detection rules
│   ├── CI_CD.md               # GitHub Actions, GitLab, and Bitbucket setups
│   ├── EXTENDING_RULES.md     # Guide for adding custom project rules
│   ├── FAQ.md                 # Frequently asked questions & edge cases
│   ├── DEMO.md                # Before & after code comparisons
│   ├── PRE-COMMIT.md          # Pre-commit hook configurations
│   └── GROWTH.md              # Open-source community & adoption playbook
├── tests/
│   └── test-samples.js        # Self-contained zero-dependency test runner
├── action.yml                 # Reusable GitHub Action definition
├── .antisloprc.json           # Per-project customizable configuration
├── .pre-commit-hooks.yaml     # Pre-commit framework hooks manifest
├── package.json               # Package metadata & CLI command bindings
├── SKILL.md                   # Universal agent skill instructions
└── SPEC.md                    # Formal engineering design specification
```

## Engine Pipeline Flow

1. Input Intake: File paths or directory trees resolved natively via fs.
2. Configuration Resolution: Nearest .antisloprc.json loaded and merged with default thresholds.
3. Path Filtering: Glob ignore patterns evaluated against relative paths.
4. Memory Safety Guard: Files exceeding 1MB automatically bypassed to guarantee zero OOM risk.
5. Multi-Layer Rule Dispatch: Parallel pattern matching executed across code, bloat, UI, and prose layers.
6. Reporting & Exit Code: Structured terminal formatting or machine-readable JSON emitted; CI mode exits with 1 on non-zero violations.
