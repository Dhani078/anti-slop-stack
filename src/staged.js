const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { scanCodeSlop } = require('./rules/code-slop');
const { scanBloatSlop } = require('./rules/bloat-slop');
const { scanUISlop } = require('./rules/ui-slop');
const { scanProseSlop } = require('./rules/prose-slop');
const { formatReport } = require('./reporter');

function runStaged(config) {
  let stagedFiles = [];
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    stagedFiles = output.split('\n').map(s => s.trim()).filter(Boolean);
  } catch {
    process.stderr.write('Error: Failed to retrieve git staged files.\n');
    process.exit(1);
  }

  if (stagedFiles.length === 0) {
    process.stdout.write('[OK] No staged files detected to scan.\n');
    process.exit(0);
  }

  const results = { codeSlop: [], bloatSlop: [], uiSlop: [], proseSlop: [] };
  const maxLOC = config && config.rules && config.rules.bloatSlop && config.rules.bloatSlop.maxLOC ? config.rules.bloatSlop.maxLOC : 250;

  for (const relFile of stagedFiles) {
    const fullPath = path.resolve(relFile);
    if (!fs.existsSync(fullPath)) continue;

    try {
      const stats = fs.statSync(fullPath);
      if (stats.size > 1024 * 1024) continue;
    } catch {
      continue;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const content = fs.readFileSync(fullPath, 'utf8');

    if (['.js', '.ts', '.jsx', '.tsx', '.py', '.php', '.go', '.rs'].includes(ext)) {
      const codeIssues = scanCodeSlop(fullPath, content);
      if (codeIssues.length) results.codeSlop.push(...codeIssues);

      const bloatIssues = scanBloatSlop(fullPath, content, maxLOC);
      if (bloatIssues.length) results.bloatSlop.push(...bloatIssues);
    }

    if (['.css', '.scss', '.html', '.jsx', '.tsx', '.vue'].includes(ext)) {
      const uiIssues = scanUISlop(fullPath, content);
      if (uiIssues.length) results.uiSlop.push(...uiIssues);
    }

    if (['.md', '.txt', '.html'].includes(ext)) {
      const proseIssues = scanProseSlop(fullPath, content);
      if (proseIssues.length) results.proseSlop.push(...proseIssues);
    }
  }

  const total = results.codeSlop.length + results.bloatSlop.length + results.uiSlop.length + results.proseSlop.length;
  if (total > 0) {
    formatReport(results);
    process.stderr.write(`\n[REJECTED] Commit aborted: ${total} slop issues detected in staged files.\nRun 'npx anti-slop fix .' or clean violations before committing.\n\n`);
    process.exit(1);
  } else {
    process.stdout.write(`[OK] All ${stagedFiles.length} staged files are 100% slop-free!\n`);
    process.exit(0);
  }
}

module.exports = { runStaged };
