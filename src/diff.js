const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { scanCodeSlop } = require('./rules/code-slop');
const { scanBloatSlop } = require('./rules/bloat-slop');
const { scanUISlop } = require('./rules/ui-slop');
const { scanProseSlop } = require('./rules/prose-slop');
const { formatReport } = require('./reporter');

function runDiff(baseBranch, config) {
  const targetBranch = baseBranch || 'origin/main';
  let changedFiles = [];

  try {
    const output = execSync(`git diff ${targetBranch}...HEAD --name-only --diff-filter=ACM`, { encoding: 'utf8' });
    changedFiles = output.split('\n').map(s => s.trim()).filter(Boolean);
  } catch {
    // Fallback to local HEAD comparison if remote ref doesn't exist
    try {
      const output = execSync(`git diff HEAD~1 --name-only --diff-filter=ACM`, { encoding: 'utf8' });
      changedFiles = output.split('\n').map(s => s.trim()).filter(Boolean);
    } catch {
      process.stderr.write(`Error: Failed to compute git diff against '${targetBranch}'.\n`);
      process.exit(1);
    }
  }

  if (changedFiles.length === 0) {
    process.stdout.write(`[OK] No changed files detected against '${targetBranch}'.\n`);
    process.exit(0);
  }

  const results = { codeSlop: [], bloatSlop: [], uiSlop: [], proseSlop: [] };
  const maxLOC = config && config.rules && config.rules.bloatSlop && config.rules.bloatSlop.maxLOC ? config.rules.bloatSlop.maxLOC : 250;

  for (const relFile of changedFiles) {
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
    process.stderr.write(`\n[DIFF AUDIT FAILED] ${total} slop issues introduced in branch diff against ${targetBranch}.\n`);
    process.exit(1);
  } else {
    process.stdout.write(`[OK] Branch diff against ${targetBranch} is 100% clean across ${changedFiles.length} changed files!\n`);
    process.exit(0);
  }
}

module.exports = { runDiff };
