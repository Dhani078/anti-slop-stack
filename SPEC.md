# Anti-Slop Stack Specification (Technical Reference & Architecture)

## 1. System Philosophy & Purpose
`anti-slop-stack` is a deterministic, multi-layer code and documentation purification engine. It acts as an automated Senior Staff Engineer and QA gatekeeper, systematically identifying, cataloging, and purging four classes of degradation commonly introduced by LLMs and AI coding assistants:
1. Code Slop (Micro-Level): Trivial comments restating syntax, swallowed exceptions, unsafe type coercions (`as any`, `@ts-ignore`), and orphan stubs.
2. Architecture & YAGNI Bloat (Macro-Level): Speculative abstractions, Hungarian interfaces (`IFoo`), single-use wrappers, over-engineered factories, and files violating the modular 200 LOC ceiling.
3. UI & Visual Slop (Presentation-Level): Generic AI defaults (saturated violet/lavender gradients, diffuse drop-shadow glows, unstyled centered cards), concentric radius mismatches, and hardcoded viewport widths causing horizontal scroll.
4. Prose & Copywriting Slop (Textual-Level): Robotic throat-clearing, buzzword stuffing (`delve`, `leverage`, `seamless`, `testament`), and passive formulas.

---

## 2. Architecture & Module Design

### 2.1 File Map
```
anti-slop-stack/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated multi-OS GitHub Actions CI workflow
├── bin/
│   └── anti-slop.js             # Executable CLI entrypoint (node shebang)
├── src/
│   ├── index.js                 # Core orchestrator and execution runner
│   ├── reporter.js              # ANSI terminal report formatter & JSON output
│   └── rules/
│       ├── code-slop.js         # Layer 1: Code and syntax smell detection
│       ├── bloat-slop.js        # Layer 2: Architecture and YAGNI bloat detection
│       ├── ui-slop.js           # Layer 3: UI, CSS, and layout slop detection
│       └── prose-slop.js        # Layer 4: Text, Markdown, and copywriting slop detection
├── tests/
│   └── test-samples.js          # Standalone assertion test suite (0 dependencies)
├── SKILL.md                     # Universal Agent Skill definition
├── SPEC.md                      # Technical specification (this document)
├── README.md                    # Comprehensive public documentation
├── LICENSE                      # MIT License
└── package.json                 # Node.js project manifest & CLI binary bin map
```

### 2.2 Operational Modes
- `scan`: Analyzes project files and prints a categorized diagnostic report with line numbers, code snippets, severity ratings, and remediation advice.
- `fix`: Executes safe, deterministic mechanical fixes (e.g., stripping narrative comments, cleaning dead residue) without altering runtime semantics.
- `ci`: Runs full analysis and exits with status code `1` if any High or Critical severity findings exist, halting automated deployment pipelines.
- `json`: Returns machine-readable structured JSON findings for integration into IDE plugins, Git pre-commit hooks, or external dashboards.

---

## 3. Detailed Rule Matrix

### 3.1 Layer 1: Code Slop
- NARRATIVE_COMMENT: Matches comments beginning with verbs describing literal syntax (`// increment counter`, `// return result`, `// call api`). Remediation: Strip comment; keep only architectural intent (why, not what).
- SWALLOWED_EXCEPTION: Matches empty `catch (...) {}` blocks. Remediation: Re-throw, log to observability provider, or handle explicitly.
- UNSAFE_TYPE_CAST: Matches `as any`, `@ts-ignore`, and dynamic escape hatches. Remediation: Declare proper TypeScript interfaces, generics, or unknown type guards.
- DEAD_RESIDUE: Matches leftover temporary markers (`// TODO: remove`, `// temporary fix`). Remediation: Resolve debt or convert to formal tracking tickets.
- LEFTOVER_DEBUG_CALL: Matches rogue `console.log()` / debug prints. Remediation: Remove before production release.
- DESTRUCTIVE_ERROR_WRAPPING: Matches generic `catch (e) { throw new Error(e); }`. Remediation: Preserve original error causal chain.
- DANGEROUS_EVAL_SLOP: Matches `eval()` and `new Function()`. Remediation: Use safe data-driven parsers.

### 3.2 Layer 2: Architecture & YAGNI Bloat
- OVERSIZED_GOD_FILE: Flags files exceeding 250 LOC. Enforces modularity and single responsibility.
- SPECULATIVE_INTERFACE_PREFIX: Flags `interface IFoo` Hungarian notation and single-implementation interfaces.
- REDUNDANT_PASS_THROUGH: Flags single-line wrappers that merely invoke another function with identical parameters.

### 3.3 Layer 3: UI Slop
- UI_TEMPLATE_SLOP (Purple Glow & Template Gradients): Flags AI-typical `#8b5cf6` linear gradients, unstyled lavender box-shadow glows, and generic Tailwind template classes (`bg-gradient-to-r from-purple-500 to-indigo-500`).
- HORIZONTAL_OVERFLOW_RISK: Flags fixed pixel widths (`width: 600px` to `1920px`, or Tailwind `w-[800px]`) inside layout containers. Remediation: Use `max-width: 100%`, flexbox, or grid auto-fit.

### 3.4 Layer 4: Prose Slop
- AI_PROSE_BUZZWORD: Flags overused AI markers (`delve`, `leverage`, `robust`, `seamless`, `testament`, `spearhead`, `tapestry`, `vital role`).
- THROAT_CLEARING: Flags formulaic introductory phrases ("In today's fast-paced world...", "It is important to remember that...").
- BOLD_OVERUSE_SLOP: Flags excessive markdown bolding (`term` stacked 3+ times in a single sentence) which indicates artificial emphasis.

---

## 4. Verification and Quality Gates
Every pull request or release must pass:
1. `node tests/test-samples.js`: Zero assertion errors.
2. Self-scan clean: `node bin/anti-slop.js scan src`: Zero slop findings in `src/`.
3. GitHub Actions CI green across Ubuntu, macOS, and Windows runners.
