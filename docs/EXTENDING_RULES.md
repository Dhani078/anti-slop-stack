# Extending & Customizing Rules

anti-slop-stack allows developers to tune thresholds, ignore patterns, and configure rules per project via `.antisloprc.json`.

## Configuration File Structure

Create `.antisloprc.json` in your repository root:

```json
{
  "ignore": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "coverage/**",
    "vendor/**",
    "*.min.js"
  ],
  "rules": {
    "codeSlop": {
      "banNarrativeComments": true,
      "banSwallowedExceptions": true,
      "banUnsafeCasts": true,
      "banDeadResidue": true,
      "banDebugLogs": true,
      "banDestructiveErrorWrapping": true,
      "banDangerousEval": true,
      "banHardcodedSecrets": true,
      "banBlindSleeps": true
    },
    "bloatSlop": {
      "maxLOC": 200,
      "banHungarianInterfaces": true,
      "banSingleUseInterfaces": true
    },
    "uiSlop": {
      "banPurpleGlow": true,
      "banTailwindPurpleTemplate": true,
      "banHardcodedViewportOverflow": true
    },
    "proseSlop": {
      "banAiBuzzwords": true,
      "banThroatClearing": true,
      "banBoldOveruse": true
    }
  }
}
```

## Adding a Custom Rule in Code

Custom rules can be added directly into `src/rules/`:
1. Open the relevant layer file (e.g. `src/rules/code-slop.js`).
2. Add regex matching logic within the line traversal loop.
3. Push violations into the `issues` array specifying `file`, `line`, `type`, `severity`, `message`, and `sample`.
4. Add corresponding test coverage into `tests/test-samples.js`.
