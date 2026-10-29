# Pre-Commit Hook Integration (`pre-commit`)

Automate anti-slop checking before every Git commit to ensure zero degraded code enters version control.

---

## 1. Zero-Dependency Native Git Hook (Recommended)

Run this single command from your project root:
```bash
npx anti-slop init-hook
```

Or manually install the hook by creating `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# .git/hooks/pre-commit

echo "Running anti-slop-stack pre-commit gate..."
node bin/anti-slop.js ci .

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Commit rejected: AI slop violations detected."
  echo "💡 Run 'npx anti-slop fix' to auto-purge mechanical slop, or review findings above."
  echo ""
  exit 1
fi

echo "✅ Codebase passed anti-slop quality floor."
exit 0
```

Make the hook executable:
```bash
chmod +x .git/hooks/pre-commit
```

---

## 2. Integration with Husky (Node.js Projects)

Install Husky:
```bash
npm install --save-dev husky
npx husky init
```

Add the gate to `.husky/pre-commit`:
```bash
echo "npx anti-slop ci ." > .husky/pre-commit
```

---

## 3. Integration with Python `pre-commit` Framework

Add to your `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/Dhani078/anti-slop-stack
    rev: v1.0.0
    hooks:
      - id: anti-slop
        name: Anti-Slop Stack Purifier
        entry: npx anti-slop ci
        language: node
        types: [text]
```
