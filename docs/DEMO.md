# Quick Demonstration & Example Workflow

This guide demonstrates how `anti-slop-stack` purifies real-world codebases.

## 1. Dirty AI Code Input (`before.ts`)

```typescript
// initialize user session
const user = getUser();

// check if user is valid
if (user) {
  try {
    doRiskyOperation();
  } catch (e) {} // swallowed exception
}

// type assertion to bypass compiler
const badType = data as any;

interface IUserService {
  getUser(): void;
}

// redundant pass through wrapper
function fetchUserWrapper(id: string) {
  return fetchUser(id);
}
```

## 2. Scan Execution

Run scan command:
```bash
anti-slop scan before.ts
```

Output:
```text
======================================================
        ANTI-SLOP STACK AUDIT REPORT                  
======================================================
Target: before.ts
Files Scanned: 1
Total Slop Issues Found: 6
------------------------------------------------------

[!] 1. CODE SLOP (4 issues)
  - [MEDIUM] before.ts:1 [NARRATIVE_COMMENT]: Trivial narrative comment restating code.
  - [MEDIUM] before.ts:4 [NARRATIVE_COMMENT]: Trivial narrative comment restating code.
  - [HIGH] before.ts:8 [SWALLOWED_EXCEPTION]: Empty catch block silently swallowing exceptions.
  - [HIGH] before.ts:12 [UNSAFE_TYPE_CAST]: Unsafe type assertion (as any) masking underlying issues.

[!] 2. ARCHITECTURE & YAGNI BLOAT (2 issues)
  - [MEDIUM] before.ts:14 [SPECULATIVE_INTERFACE_PREFIX]: Avoid Hungarian notation (IFoo).
  - [MEDIUM] before.ts:19 [REDUNDANT_PASS_THROUGH]: Pass-through wrapper adding zero semantic value.
```

## 3. Purified Senior Code Output (`after.ts`)

```typescript
const user = getUser();

if (user) {
  try {
    doRiskyOperation();
  } catch (error) {
    logger.error('Failed operation:', error);
    throw error;
  }
}

const safeType: UserRecord = parseUser(data);
```

- LOC Reduced: 21 lines $\rightarrow$ 11 lines (-48%).
- Noise Reduced: 100% of narrative comments and redundant wrappers eliminated.
