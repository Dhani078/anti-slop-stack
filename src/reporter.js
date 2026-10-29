const path = require('path');

function formatReport(results) {
  const { target, totalFiles, codeSlop, bloatSlop, uiSlop, proseSlop } = results;
  const totalIssues = codeSlop.length + bloatSlop.length + uiSlop.length + proseSlop.length;

  console.log(`\n======================================================`);
  console.log(`        ANTI-SLOP STACK AUDIT REPORT                  `);
  console.log(`======================================================`);
  console.log(`Target: ${target}`);
  console.log(`Files Scanned: ${totalFiles}`);
  console.log(`Total Slop Issues Found: ${totalIssues}`);
  console.log(`------------------------------------------------------`);

  if (totalIssues === 0) {
    console.log(`[OK] Excellent! Zero AI slop detected. Pure human/senior craft.`);
    console.log(`======================================================\n`);
    return;
  }

  // 1. Code Slop
  if (codeSlop.length > 0) {
    console.log(`\n[!] 1. CODE SLOP (${codeSlop.length} issues)`);
    codeSlop.forEach(issue => {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  - [${issue.severity}] ${relPath}:${issue.line} [${issue.type}]`);
      console.log(`    Message : ${issue.message}`);
      console.log(`    Sample  : "${issue.sample}"`);
    });
  }

  // 2. Bloat Slop
  if (bloatSlop.length > 0) {
    console.log(`\n[!] 2. ARCHITECTURE & YAGNI BLOAT (${bloatSlop.length} issues)`);
    bloatSlop.forEach(issue => {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  - [${issue.severity}] ${relPath}:${issue.line} [${issue.type}]`);
      console.log(`    Message : ${issue.message}`);
      console.log(`    Sample  : "${issue.sample}"`);
    });
  }

  // 3. UI Slop
  if (uiSlop.length > 0) {
    console.log(`\n[!] 3. UI & VISUAL TEMPLATE SLOP (${uiSlop.length} issues)`);
    uiSlop.forEach(issue => {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  - [${issue.severity}] ${relPath}:${issue.line} [${issue.type}]`);
      console.log(`    Message : ${issue.message}`);
      console.log(`    Sample  : "${issue.sample}"`);
    });
  }

  // 4. Prose Slop
  if (proseSlop.length > 0) {
    console.log(`\n[!] 4. PROSE & BUZZWORD SLOP (${proseSlop.length} issues)`);
    proseSlop.forEach(issue => {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  - [${issue.severity}] ${relPath}:${issue.line} [${issue.type}]`);
      console.log(`    Message : ${issue.message}`);
      console.log(`    Sample  : "${issue.sample}"`);
    });
  }

  console.log(`\n======================================================`);
  console.log(`Recommendation: Run 'node bin/anti-slop.js fix' for auto-cleaning.`);
  console.log(`======================================================\n`);
}

module.exports = {
  formatReport
};
