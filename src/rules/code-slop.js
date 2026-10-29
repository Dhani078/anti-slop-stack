const path = require('path');

const NARRATIVE_COMMENT_PATTERNS = [
  /^\s*\/\/\s*(initialize|set|get|return|call|check|import|export|function to|loop through|define|create)\b/i,
  /^\s*\/\/\s*increments?\s+counter/i,
  /^\s*\/\/\s*renders?\s+(component|ui|view)/i,
  /^\s*#\s*(initialize|set|get|return|call|check|import|function to)\b/i
];

function scanCodeSlop(filePath, content) {
  const issues = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // 1. Narrative Comments
    for (const pat of NARRATIVE_COMMENT_PATTERNS) {
      if (pat.test(line)) {
        issues.push({
          file: filePath,
          line: lineNum,
          type: 'NARRATIVE_COMMENT',
          severity: 'MEDIUM',
          message: 'Trivial narrative comment restating code. State only non-obvious intent.',
          sample: line.trim()
        });
        break;
      }
    }

    // 2. Swallowed Exceptions
    if (/catch\s*\([a-zA-Z0-9_]*\)\s*\{\s*\}/.test(line)) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'SWALLOWED_EXCEPTION',
        severity: 'HIGH',
        message: 'Empty catch block silently swallowing exceptions.',
        sample: line.trim()
      });
    }

    // 3. Unsafe Casts (skip string regex definition lines)
    if ((/\bas\s+any\b/.test(line) || /@ts-ignore/.test(line)) && !line.includes('test(line)') && !line.includes('message:')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'UNSAFE_TYPE_CAST',
        severity: 'HIGH',
        message: 'Unsafe type assertion (as any / @ts-ignore) masking underlying type issues.',
        sample: line.trim()
      });
    }

    // 4. Dead Residue
    if (/\/\/\s*TODO:\s*(remove|clean|temporary|test)/i.test(line)) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'DEAD_RESIDUE',
        severity: 'LOW',
        message: 'Unresolved temporary scrap/TODO comment leftover in codebase.',
        sample: line.trim()
      });
    }

    // 5. Leftover Debugging Output (Console Log Residue)
    if (/(console\.(log|debug|trace)\s*\(|print\s*\("DEBUG)/.test(line) && !line.includes('reporter.js') && !line.includes('test-samples.js') && !line.includes('console.log(`') && !line.includes('console.error(')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'LEFTOVER_DEBUG_CALL',
        severity: 'LOW',
        message: 'Leftover debugging print/console.log statement in production code.',
        sample: line.trim()
      });
    }

    // 6. Generic Error Re-throw Slop: throw new Error(e) or generic catch
    if (/catch\s*\([a-zA-Z0-9_]+\)\s*\{\s*throw\s+new\s+Error\([a-zA-Z0-9_]+\);?\s*\}/.test(line)) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'DESTRUCTIVE_ERROR_WRAPPING',
        severity: 'MEDIUM',
        message: 'Generic re-throw masking original stack trace without contextual error causality.',
        sample: line.trim()
      });
    }

    // 7. Dangerous Code Execution Slop: eval() or new Function() with dynamic strings
    if (/\b(eval\s*\([^)]+|new\s+Function\s*\([^)]+)/.test(line) && !line.includes('test-samples.js')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'DANGEROUS_EVAL_SLOP',
        severity: 'CRITICAL',
        message: 'Dynamic code execution (eval / new Function) is dangerous and an anti-pattern. Refactor using safe data parsers.',
        sample: line.trim()
      });
    }

    // 8. Hardcoded Secret Slop
    if (/(['"])(?:sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{20,}|AIzaSy[a-zA-Z0-9_-]{20,})\1/.test(line) && !line.includes('test-samples.js')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'HARDCODED_SECRET_SLOP',
        severity: 'CRITICAL',
        message: 'Hardcoded secret token or mock API key pattern detected. Inject via environment variables or secret vaults.',
        sample: line.trim()
      });
    }

  });

  return issues;
}

function fixCodeSlop(content) {
  const lines = content.split('\n');
  let fixCount = 0;
  const filtered = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let isRemovable = false;

    // Narrative comments
    for (const pat of NARRATIVE_COMMENT_PATTERNS) {
      if (pat.test(line)) {
        isRemovable = true;
        fixCount++;
        break;
      }
    }

    // Leftover debug logs in standalone lines
    if (!isRemovable && /^\s*console\.(log|debug|trace)\s*\([^)]*\);?\s*$/.test(line)) {
      isRemovable = true;
      fixCount++;
    }

    if (!isRemovable) {
      filtered.push(line);
    }
  }

  return {
    updatedContent: filtered.join('\n'),
    fixCount
  };
}

module.exports = {
  scanCodeSlop,
  fixCodeSlop
};
