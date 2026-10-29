function scanBloatSlop(filePath, content, customMaxLOC = 250) {
  const issues = [];
  const lines = content.split('\n');

  // 1. File size check (Senior rule: LOC <= 200/250)
  if (lines.length > customMaxLOC) {
    issues.push({
      file: filePath,
      line: lines.length,
      type: 'OVERSIZED_GOD_FILE',
      severity: 'HIGH',
      message: `File exceeds modular size (${lines.length} lines > ${customMaxLOC} LOC ceiling). Modularize or distill responsibilities.`,
      sample: `Total lines: ${lines.length}`
    });
  }

  // 2. Single-use Interface / Speculative Architecture & Pass-through
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    if (/^\s*interface\s+I[A-Z]/.test(line)) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'SPECULATIVE_INTERFACE_PREFIX',
        severity: 'MEDIUM',
        message: 'Avoid Hungarian notation (IFoo) or speculative interface wrappers without multiple implementations.',
        sample: line.trim()
      });
    }
  });

  // 3. Redundant Pass-Through Wrapper across single or multi-line
  const fullText = content;
  const wrapperRegex = /function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{[\s\n]*return\s+[a-zA-Z0-9_]+\s*\([^)]*\);?[\s\n]*\}/g;
  let match;
  while ((match = wrapperRegex.exec(fullText)) !== null) {
    const lineNum = fullText.substring(0, match.index).split('\n').length;
    issues.push({
      file: filePath,
      line: lineNum,
      type: 'REDUNDANT_PASS_THROUGH',
      severity: 'MEDIUM',
      message: 'Pass-through wrapper adding zero semantic value. Call underlying function directly.',
      sample: match[0].replace(/\s+/g, ' ')
    });
  }

  return issues;
}

module.exports = {
  scanBloatSlop
};
