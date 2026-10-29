const fs = require('fs');
const path = require('path');
const { scanCodeSlop, fixCodeSlop } = require('./rules/code-slop');
const { scanBloatSlop } = require('./rules/bloat-slop');
const { scanUISlop } = require('./rules/ui-slop');
const { scanProseSlop } = require('./rules/prose-slop');
const { formatReport } = require('./reporter');

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') continue;
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

function runAnalysis(targetDir) {
  const resolvedTarget = path.resolve(targetDir || '.');
  const files = fs.statSync(resolvedTarget).isDirectory()
    ? getAllFiles(resolvedTarget)
    : [resolvedTarget];

  const results = {
    target: resolvedTarget,
    totalFiles: files.length,
    codeSlop: [],
    bloatSlop: [],
    uiSlop: [],
    proseSlop: []
  };

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const content = fs.readFileSync(file, 'utf8');

    // Code Slop (.js, .ts, .jsx, .tsx, .py, .php)
    if (['.js', '.ts', '.jsx', '.tsx', '.py', '.php'].includes(ext)) {
      const codeIssues = scanCodeSlop(file, content);
      if (codeIssues.length) results.codeSlop.push(...codeIssues);

      const bloatIssues = scanBloatSlop(file, content);
      if (bloatIssues.length) results.bloatSlop.push(...bloatIssues);
    }

    // UI Slop (.css, .scss, .html, .jsx, .tsx, .vue)
    if (['.css', '.scss', '.html', '.jsx', '.tsx', '.vue'].includes(ext)) {
      const uiIssues = scanUISlop(file, content);
      if (uiIssues.length) results.uiSlop.push(...uiIssues);
    }

    // Prose Slop (.md, .txt, .html)
    if (['.md', '.txt', '.html'].includes(ext)) {
      const proseIssues = scanProseSlop(file, content);
      if (proseIssues.length) results.proseSlop.push(...proseIssues);
    }
  }

  return results;
}

function runFix(targetDir) {
  const resolvedTarget = path.resolve(targetDir || '.');
  const files = fs.statSync(resolvedTarget).isDirectory()
    ? getAllFiles(resolvedTarget)
    : [resolvedTarget];

  let totalFixes = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.js', '.ts', '.jsx', '.tsx', '.py', '.php'].includes(ext)) {
      const content = fs.readFileSync(file, 'utf8');
      const { updatedContent, fixCount } = fixCodeSlop(content);
      if (fixCount > 0) {
        fs.writeFileSync(file, updatedContent, 'utf8');
        totalFixes += fixCount;
        console.log(`[FIXED] Cleaned ${fixCount} slop issues in: ${path.relative(process.cwd(), file)}`);
      }
    }
  }
  return totalFixes;
}

function runCLI(command, targetPath) {
  if (command === 'scan') {
    const results = runAnalysis(targetPath);
    formatReport(results);
  } else if (command === 'fix') {
    console.log(`\n=== Anti-Slop Stack Fixer ===`);
    const count = runFix(targetPath);
    console.log(`\nCompleted: ${count} mechanical slop issues purged cleanly.\n`);
  } else if (command === 'ci') {
    const results = runAnalysis(targetPath);
    const totalIssues = results.codeSlop.length + results.bloatSlop.length + results.uiSlop.length + results.proseSlop.length;
    formatReport(results);
    if (totalIssues > 0) {
      console.error(`\nCI FAILED: Found ${totalIssues} slop issues. Purge slop before merging.\n`);
      process.exit(1);
    }
    console.log(`\nCI PASSED: Codebase is 100% slop-free.\n`);
  } else {
    console.log(`Usage: anti-slop [scan|fix|ci] <path>`);
  }
}

module.exports = {
  runAnalysis,
  runFix,
  runCLI
};
