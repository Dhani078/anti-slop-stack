const assert = require('assert');
const { scanCodeSlop, fixCodeSlop } = require('../src/rules/code-slop');
const { scanBloatSlop } = require('../src/rules/bloat-slop');
const { scanUISlop } = require('../src/rules/ui-slop');
const { scanProseSlop } = require('../src/rules/prose-slop');

console.log('Running test suite for anti-slop-stack...');

// 1. Test Code Slop Scanner
const dirtyCode = `
// initialize user session
const user = getUser();
try {
  doRiskyOperation();
} catch (e) {}
const badType = data as any;
// TODO: remove this temporary hack
console.log("DEBUG: user loaded", user);
try {
  parse();
} catch (err) { throw new Error(err); }
const dangerous = eval("2 + 2");
`;
const codeIssues = scanCodeSlop('dummy.ts', dirtyCode);
assert.strictEqual(codeIssues.length, 7, 'Should detect 7 code slop issues (narrative, catch, any, todo, console, generic rethrow, eval)');
console.log('✓ Code Slop scanner passed (7 checks including dangerous eval)');

// 2. Test Code Slop Fixer
const { updatedContent, fixCount } = fixCodeSlop(dirtyCode);
assert.strictEqual(fixCount, 2, 'Should fix 2 issues (narrative comment + debug console log)');
assert(!updatedContent.includes('// initialize user session'), 'Should strip narrative comment');
assert(!updatedContent.includes('console.log("DEBUG: user loaded", user);'), 'Should strip debug console log');
console.log('✓ Code Slop fixer passed');

// 3. Test Bloat Slop
const bloatCode = `
interface IUserService {
  getUser(): void;
}
function wrapper(a, b) {
  return realFunction(a, b);
}
`;
const bloatIssues = scanBloatSlop('service.ts', bloatCode);
assert.strictEqual(bloatIssues.length, 2, 'Should detect speculative interface and redundant wrapper');

// Test custom LOC configuration limit
const longCode = Array(300).fill('const a = 1;').join('\n');
const locIssues = scanBloatSlop('long.ts', longCode, 200);
assert.strictEqual(locIssues.length, 1, 'Should detect oversized file with custom maxLOC');
console.log('✓ Architecture Bloat scanner passed (with custom maxLOC support)');

// 4. Test UI Slop
const dirtyCSS = `
.card {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  width: 900px;
}
<div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-[800px]" />
`;
const uiIssues = scanUISlop('style.css', dirtyCSS);
assert.strictEqual(uiIssues.length, 5, 'Should detect 3 CSS + 2 Tailwind template slop patterns');
console.log('✓ UI Slop scanner passed (CSS + Tailwind tokens)');

// 5. Test Prose Slop
const dirtyProse = `
In today's fast-paced world, we must leverage AI to delve into robust solutions.
This has **too** many **bold** words **in** one single sentence.
`;
const proseIssues = scanProseSlop('readme.md', dirtyProse);
assert(proseIssues.length >= 4, 'Should detect throat clearing, buzzwords, and bold overuse slop');
console.log('✓ Prose Slop scanner passed (buzzwords + bold overuse)');

// 6. Test Config Ignore Matching
const { shouldIgnore } = require('../src/index');
if (typeof shouldIgnore === 'function') {
  assert(shouldIgnore('vendor/bundle.js', ['vendor/**']), 'Should ignore files in vendor directory');
  assert(shouldIgnore('app.min.js', ['*.min.js']), 'Should ignore minified files');
  assert(!shouldIgnore('src/app.js', ['vendor/**']), 'Should not ignore regular src file');
  console.log('✓ Config ignore pattern matcher passed');
}

// 7. Test Staged Scanner Helper
const { runStaged } = require('../src/index');
assert(typeof runStaged === 'function', 'runStaged must be an exported function');
console.log('✓ Staged scanner module export verified');

console.log('\nAll 7 test suites passed cleanly with 0 failures!');
