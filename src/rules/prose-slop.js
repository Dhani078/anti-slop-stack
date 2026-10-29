const AI_BUZZWORDS = [
  'delve', 'leverage', 'robust', 'seamless', 'testament',
  'spearhead', 'tapestry', 'vital role', 'beacon', 'paramount',
  'revolutionize', 'groundbreaking', 'furthermore', 'moreover'
];

const THROAT_CLEARING_PATTERNS = [
  /in\s+today'?s\s+(fast-paced|rapidly\s+evolving|modern)\s+world/i,
  /it\s+is\s+(important|worth\s+noting|crucial)\s+to\s+remember\s+that/i,
  /as\s+we\s+all\s+know/i,
  /at\s+the\s+end\s+of\s+the\s+day/i
];

function scanProseSlop(filePath, content) {
  const issues = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Exclude code blocks and quoted references to avoided words
    const isQuotedOrCode = /`[^`]+`|"([^"]+)"|'([^']+)'/.test(line);

    // Markdown Bold Overuse Slop in docs/prose
    const boldMatches = line.match(/\*\*[^*]+\*\*/g);
    if (boldMatches && boldMatches.length >= 3 && !line.includes('|') && !line.includes('test-samples.js')) {
      issues.push({
        file: filePath,
        line: lineNum,
        type: 'BOLD_OVERUSE_SLOP',
        severity: 'LOW',
        message: 'Excessive markdown bolding (>= 3 bold spans in one line). Restructure sentence hierarchy instead of shouting with asterisks.',
        sample: line.trim()
      });
    }

    for (const word of AI_BUZZWORDS) {
      const regex = new RegExp(`(?<!\`)\\b${word}\\b(?!\`)`, 'i');
      if (regex.test(line) && !isQuotedOrCode) {
        issues.push({
          file: filePath,
          line: lineNum,
          type: 'AI_PROSE_BUZZWORD',
          severity: 'LOW',
          message: `Generic AI buzzword "${word}". Replace with direct, concrete phrasing.`,
          sample: line.trim()
        });
      }
    }

    for (const pat of THROAT_CLEARING_PATTERNS) {
      if (pat.test(line) && !line.includes('THROAT_CLEARING_PATTERNS') && !line.includes('pat.test')) {
        issues.push({
          file: filePath,
          line: lineNum,
          type: 'THROAT_CLEARING',
          severity: 'MEDIUM',
          message: 'Throat-clearing opening sentence. Lead directly with the thesis or primary claim.',
          sample: line.trim()
        });
      }
    }
  });

  return issues;
}

module.exports = {
  scanProseSlop
};
