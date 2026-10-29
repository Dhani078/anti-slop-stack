const fs = require('fs');
const path = require('path');
const { scanCodeSlop, fixCodeSlop } = require('./rules/code-slop');
const { scanBloatSlop } = require('./rules/bloat-slop');
const { scanUISlop } = require('./rules/ui-slop');
const { scanProseSlop } = require('./rules/prose-slop');
const { formatReport, formatJSON } = require('./reporter');

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

function loadConfig(rootDir) {
  const configPath = path.join(rootDir, '.antisloprc.json');
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {
      return null;
    }
  }
  return null;
}

function shouldIgnore(filePath, ignorePatterns = []) {
  const norm = filePath.replace(/\\/g, '/');
  for (const pat of ignorePatterns) {
    const cleanPat = pat.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*');
    const regex = new RegExp(cleanPat);
    if (regex.test(norm)) return true;
  }
  return false;
}

function runAnalysis(targetDir) {
  if (!fs.existsSync(targetDir || '.')) {
    console.error(`Error: Path '${targetDir}' does not exist.`);
    process.exit(1);
  }

  const resolvedTarget = path.resolve(targetDir || '.');
  const isDir = fs.statSync(resolvedTarget).isDirectory();
  const config = loadConfig(isDir ? resolvedTarget : path.dirname(resolvedTarget));
  
  let files = isDir
    ? getAllFiles(resolvedTarget)
    : [resolvedTarget];

  if (config && config.ignore && Array.isArray(config.ignore)) {
    files = files.filter(f => !shouldIgnore(path.relative(resolvedTarget, f), config.ignore));
  }

  const results = {
    target: resolvedTarget,
    totalFiles: files.length,
    codeSlop: [],
    bloatSlop: [],
    uiSlop: [],
    proseSlop: []
  };

  const maxLOC = config && config.rules && config.rules.bloatSlop && config.rules.bloatSlop.maxLOC ? config.rules.bloatSlop.maxLOC : 250;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const content = fs.readFileSync(file, 'utf8');

    if (['.js', '.ts', '.jsx', '.tsx', '.py', '.php', '.go', '.rs'].includes(ext)) {
      const codeIssues = scanCodeSlop(file, content);
      if (codeIssues.length) results.codeSlop.push(...codeIssues);

      const bloatIssues = scanBloatSlop(file, content, maxLOC);
      if (bloatIssues.length) results.bloatSlop.push(...bloatIssues);
    }

    if (['.css', '.scss', '.html', '.jsx', '.tsx', '.vue'].includes(ext)) {
      const uiIssues = scanUISlop(file, content);
      if (uiIssues.length) results.uiSlop.push(...uiIssues);
    }

    if (['.md', '.txt', '.html'].includes(ext)) {
      const proseIssues = scanProseSlop(file, content);
      if (proseIssues.length) results.proseSlop.push(...proseIssues);
    }
  }

  return results;
}

function runFix(targetDir) {
  if (!fs.existsSync(targetDir || '.')) {
    console.error(`Error: Path '${targetDir}' does not exist.`);
    process.exit(1);
  }

  const resolvedTarget = path.resolve(targetDir || '.');
  const isDir = fs.statSync(resolvedTarget).isDirectory();
  const config = loadConfig(isDir ? resolvedTarget : path.dirname(resolvedTarget));

  let files = isDir
    ? getAllFiles(resolvedTarget)
    : [resolvedTarget];

  if (config && config.ignore && Array.isArray(config.ignore)) {
    files = files.filter(f => !shouldIgnore(path.relative(resolvedTarget, f), config.ignore));
  }

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

function runInitHook() {
  const gitHooksDir = path.resolve('.git', 'hooks');
  if (!fs.existsSync(gitHooksDir)) {
    console.error('Error: Not a git repository or .git/hooks directory not found.');
    process.exit(1);
  }

  const hookScript = `#!/bin/sh\n# anti-slop pre-commit hook\nnode bin/anti-slop.js ci .\nif [ $? -ne 0 ]; then\n  echo "❌ Commit rejected by anti-slop-stack."\n  exit 1\nfi\nexit 0\n`;
  const preCommitFile = path.join(gitHooksDir, 'pre-commit');
  fs.writeFileSync(preCommitFile, hookScript, { mode: 0o755 });
  process.stdout.write('✅ Native Git pre-commit hook installed successfully into .git/hooks/pre-commit\n');
}

function runCLI(command, targetPath) {
  if (command === 'scan') {
    const results = runAnalysis(targetPath);
    formatReport(results);
  } else if (command === 'json') {
    const results = runAnalysis(targetPath);
    formatJSON(results);
  } else if (command === 'fix') {
    console.log(`\n=== Anti-Slop Stack Fixer ===`);
    const count = runFix(targetPath);
    console.log(`\nCompleted: ${count} mechanical slop issues purged cleanly.\n`);
  } else if (command === 'init-hook') {
    runInitHook();
  } else if (command === '--version' || command === '-v') {
    const pkg = require('../package.json');
    console.log(`anti-slop-stack v${pkg.version}`);
  } else if (command === '--help' || command === '-h' || command === 'help') {
    console.log(`
Anti-Slop Stack 🛡️
The ruthless multi-layer purifier for AI coding agents.

Usage:
  anti-slop [command] [path]

Commands:
  scan [path]        Scan target directory/file and display diagnostic report
  fix [path]         Automatically purge mechanical slop (comments, debug calls)
  ci [path]          Strict CI gate (exits with 1 if violations found)
  json [path]        Output structured JSON findings for automation
  init-hook          Install native Git pre-commit hook into .git/hooks/
  -v, --version      Display current version
  -h, --help         Display this help message

Options & Config:
  Place a .antisloprc.json in your project root to customize thresholds.
`);
  } else if (command === 'ci') {
    const results = runAnalysis(targetPath);
    const criticalCount = results.codeSlop.filter(i => i.severity === 'HIGH' || i.severity === 'CRITICAL').length;
    formatReport(results);
    if (criticalCount > 0) {
      console.error(`\nCI FAILED: Found ${criticalCount} high-severity slop violations.\n`);
      process.exit(1);
    }
    console.log(`\nCI PASSED: Codebase meets production quality floor.\n`);
  } else {
    console.log(`Usage: anti-slop [scan|fix|ci|json|init-hook] <path>`);
  }
}

module.exports = {
  runAnalysis,
  runFix,
  runCLI,
  shouldIgnore
};
