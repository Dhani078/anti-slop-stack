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
  });

  return issues;
}

function fixCodeSlop(content) {
  const lines = content.split('\n');
  let fixCount = 0;
  const filtered = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let isNarrative = false;

    for (const pat of NARRATIVE_COMMENT_PATTERNS) {
      if (pat.test(line)) {
        isNarrative = true;
        fixCount++;
        break;
      }
    }

    if (!isNarrative) {
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
