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

  if (codeSlop.length > 0) {
    console.log(`\n[!] 1. CODE SLOP (${codeSlop.length} issues)`);
    codeSlop.forEach(issue => {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  - [${issue.severity}] ${relPath}:${issue.line} [${issue.type}]`);
      console.log(`    Message : ${issue.message}`);
      console.log(`    Sample  : "${issue.sample}"`);
    });
  }

  if (bloatSlop.length > 0) {
    console.log(`\n[!] 2. ARCHITECTURE & YAGNI BLOAT (${bloatSlop.length} issues)`);
    bloatSlop.forEach(issue => {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  - [${issue.severity}] ${relPath}:${issue.line} [${issue.type}]`);
      console.log(`    Message : ${issue.message}`);
      console.log(`    Sample  : "${issue.sample}"`);
    });
  }

  if (uiSlop.length > 0) {
    console.log(`\n[!] 3. UI & VISUAL TEMPLATE SLOP (${uiSlop.length} issues)`);
    uiSlop.forEach(issue => {
      const relPath = path.relative(process.cwd(), issue.file);
      console.log(`  - [${issue.severity}] ${relPath}:${issue.line} [${issue.type}]`);
      console.log(`    Message : ${issue.message}`);
      console.log(`    Sample  : "${issue.sample}"`);
    });
  }

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
  console.log(`Recommendation: Run 'anti-slop fix' for auto-cleaning.`);
  console.log(`======================================================\n`);
}

function formatJSON(results) {
  const output = {
    target: results.target,
    totalFiles: results.totalFiles,
    summary: {
      total: results.codeSlop.length + results.bloatSlop.length + results.uiSlop.length + results.proseSlop.length,
      code: results.codeSlop.length,
      bloat: results.bloatSlop.length,
      ui: results.uiSlop.length,
      prose: results.proseSlop.length
    },
    findings: {
      codeSlop: results.codeSlop,
      bloatSlop: results.bloatSlop,
      uiSlop: results.uiSlop,
      proseSlop: results.proseSlop
    }
  };
  process.stdout.write(JSON.stringify(output, null, 2) + '\n');
}

module.exports = {
  formatReport,
  formatJSON
};
