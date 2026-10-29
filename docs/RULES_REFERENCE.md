# Rules Reference Catalog

Complete inventory of detection rules enforced by anti-slop-stack across all four layers.

## Layer 1: Code Slop

### NARRATIVE_COMMENT
- Severity: LOW
- Auto-Fixable: Yes
- Description: Detects comments that redundantly narrate what syntax does rather than why.
- Target: TypeScript, JavaScript, Python, PHP, Go, Rust.
- Bad Pattern: `// increment counter`, `// function to fetch user`.
- Clean Pattern: No comment needed, or domain rationale: `// Buffer size aligned to 64-byte L1 cache line`.

### SWALLOWED_ERROR
- Severity: CRITICAL
- Auto-Fixable: No
- Description: Detects empty catch blocks that swallow runtime exceptions silently.
- Bad Pattern: `try { ... } catch (e) {}`
- Clean Pattern: Explicit error handling, structured logging, or re-throw.

### UNSAFE_TYPE_CAST
- Severity: HIGH
- Auto-Fixable: No
- Description: Detects dynamic type escapes that bypass static compiler checks.
- Bad Pattern: `data as any`, `// @ts-ignore`.
- Clean Pattern: Narrow types, unknown guards, or explicit schemas.

### DEAD_CODE_RESIDUE
- Severity: MEDIUM
- Auto-Fixable: No
- Description: Detects forgotten temporary markers and debug debt.
- Bad Pattern: `// TODO: remove this later`, `// temp fix`.

### LEFTOVER_DEBUG_CALL
- Severity: LOW
- Auto-Fixable: Yes
- Description: Detects leftover debugging statements in production source files.
- Bad Pattern: `console.log(...)`, `print(...)`.

### DESTRUCTIVE_ERROR_WRAPPING
- Severity: MEDIUM
- Auto-Fixable: No
- Description: Detects generic re-throwing that strips the underlying error stack trace.
- Bad Pattern: `catch (err) { throw new Error(err); }`
- Clean Pattern: `throw new Error('Contextual message', { cause: err });`

### DANGEROUS_EVAL_SLOP
- Severity: CRITICAL
- Auto-Fixable: No
- Description: Detects dynamic runtime evaluation anti-patterns.
- Bad Pattern: `eval(...)`, `new Function(...)`.

### HARDCODED_SECRET_SLOP
- Severity: CRITICAL
- Auto-Fixable: No
- Description: Detects hardcoded API tokens, keys, or credentials in source code.
- Bad Pattern: `const key = "sk-..."`, `const token = "ghp_..."`.

### BLIND_SLEEP_SLOP
- Severity: MEDIUM
- Auto-Fixable: No
- Description: Detects arbitrary timeouts used to paper over race conditions.
- Bad Pattern: `setTimeout(..., 5000)`, `await sleep(3000)`.

---

## Layer 2: Architecture & YAGNI Bloat

### HUNGARIAN_INTERFACE
- Severity: HIGH
- Description: Detects Hungarian notation prefixes on interfaces.
- Bad Pattern: `interface IUserService`.
- Clean Pattern: `interface UserService`.

### SINGLE_USE_INTERFACE
- Severity: MEDIUM
- Description: Detects speculative interfaces that possess only one trivial implementation.

### OVERSIZED_GOD_FILE
- Severity: HIGH
- Description: Flags files exceeding the configurable modular limit (default: 250 LOC).

---

## Layer 3: UI & Visual Slop

### PURPLE_GLOW_SLOP
- Severity: MEDIUM
- Description: Flags generic AI purple/lavender glowing box shadows.
- Bad Pattern: `box-shadow: 0 0 20px rgba(168, 85, 247, 0.4)`.

### TAILWIND_TEMPLATE_SLOP
- Severity: MEDIUM
- Description: Flags repetitive template purple-to-indigo gradients.
- Bad Pattern: `from-purple-500 to-indigo-500`, `shadow-purple-500/50`.

### HARDCODED_VIEWPORT_OVERFLOW
- Severity: HIGH
- Description: Flags hardcoded viewport widths that cause horizontal scrolling on mobile viewports.
- Bad Pattern: `width: 800px`, `min-width: 900px`, `w-[800px]`.

---

## Layer 4: Prose & Copy Slop

### AI_PROSE_BUZZWORD
- Severity: MEDIUM
- Description: Flags hallmark AI marketing clichés.
- Bad Pattern: `delve`, `leverage`, `seamless`, `testament`, `spearhead`, `tapestry`, `vital role`.

### THROAT_CLEARING
- Severity: LOW
- Description: Flags verbose introductory phrases.
- Bad Pattern: `In today's fast-paced world...`, `It is important to remember that...`.

### BOLD_OVERUSE_SLOP
- Severity: LOW
- Description: Flags sentences with 3 or more bold spans creating visual noise.
