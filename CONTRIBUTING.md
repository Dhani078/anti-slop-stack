# Contributing to Anti-Slop Stack

We welcome contributions! To maintain senior-developer quality, please adhere to these standards:

## Principles
1. **Zero External Dependencies**: All core scanners must run using native Node.js standard libraries.
2. **Minimal LOC**: The best code is the code never written. Avoid speculative abstractions or single-implementation interfaces.
3. **Verification First**: Every new rule or fix must be accompanied by an assertion test in `tests/test-samples.js`.
4. **Self-Audit**: The codebase itself must pass its own audit (`node bin/anti-slop.js scan src`).

## Development Workflow
1. Fork and clone the repository.
2. Run test suite:
   ```bash
   npm test
   ```
3. Run self-scan:
   ```bash
   node bin/anti-slop.js scan src
   ```
4. Submit a clean, atomic pull request.
