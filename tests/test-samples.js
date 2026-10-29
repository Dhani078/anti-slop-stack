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
`;
const codeIssues = scanCodeSlop('dummy.ts', dirtyCode);
assert.strictEqual(codeIssues.length, 4, 'Should detect 4 code slop issues');
console.log('✓ Code Slop scanner passed');

// 2. Test Code Slop Fixer
const { updatedContent, fixCount } = fixCodeSlop(dirtyCode);
assert.strictEqual(fixCount, 1, 'Should fix 1 narrative comment');
assert(!updatedContent.includes('// initialize user session'), 'Should strip narrative comment');
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
console.log('✓ Architecture Bloat scanner passed');

// 4. Test UI Slop
const dirtyCSS = `
.card {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  width: 900px;
}
`;
const uiIssues = scanUISlop('style.css', dirtyCSS);
assert.strictEqual(uiIssues.length, 3, 'Should detect gradient, glow, and hardcoded width overflow');
console.log('✓ UI Slop scanner passed');

// 5. Test Prose Slop
const dirtyProse = `
In today's fast-paced world, we must leverage AI to delve into robust solutions.
`;
const proseIssues = scanProseSlop('readme.md', dirtyProse);
assert(proseIssues.length >= 3, 'Should detect throat clearing and buzzwords (delve, leverage, robust)');
console.log('✓ Prose Slop scanner passed');

console.log('\nAll 5 test suites passed cleanly with 0 failures!');
