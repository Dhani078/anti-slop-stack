const AI_GENERIC_CSS_PATTERNS = [
  {
    regex: /background\s*:\s*linear-gradient\([^)]*#8b5cf6[^)]*\)/i,
    message: 'Generic AI purple/violet gradient detected. Select brand-specific colors with distinct intent.'
  },
  {
    regex: /box-shadow\s*:\s*0\s+0\s+(15px|20px|25px)\s+rgba\(\s*139\s*,\s*92\s*,\s*246/i,
    message: 'Generic AI lavender glow shadow. Restrict shadows to natural elevation tokens.'
  },
  {
    regex: /width\s*:\s*[0-9]{3,4}px(?!\s*!\s*important)/i,
    message: 'Hardcoded pixel width risks horizontal overflow on responsive screens. Use max-width or flex/grid.'
  }
];

function scanUISlop(filePath, content) {
  const issues = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    for (const pat of AI_GENERIC_CSS_PATTERNS) {
      if (pat.regex.test(line)) {
        issues.push({
          file: filePath,
          line: lineNum,
          type: 'UI_TEMPLATE_SLOP',
          severity: 'MEDIUM',
          message: pat.message,
          sample: line.trim()
        });
      }
    }
  });

  return issues;
}

module.exports = {
  scanUISlop
};
