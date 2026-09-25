import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const sourceFiles = listSourceFiles(join(root, 'src'));
const source = sourceFiles.map(file => readFileSync(file, 'utf8')).join('\n');
const usageManifest = JSON.parse(readFileSync(join(root, 'src/component-usage.json'), 'utf8'));
const forumTests = readFileSync(join(root, 'tests/forum.spec.ts'), 'utf8');

assert(!source.includes('React.FC'), 'React.FC is prohibited');
assert(!/(#[\da-f]{3,8}|rgba?\(|hsla?\()/i.test(source), 'Hardcoded colors are prohibited');
assert(!/['"`]-?\d*\.?\d+(px|rem|em|pt)['"`]/.test(source), 'Hardcoded spacing or typography is prohibited');
assert(
  !source.includes("from '@fluentui/react-headless-components-preview'"),
  'Headless controls must use explicit public subpaths',
);

const styledFamilies = usageManifest.families.filter(family => family.system === 'styled');
const headlessFamilies = usageManifest.families.filter(family => family.system === 'headless');
const distinctFamilies = new Set(usageManifest.families.map(family => family.family));
assert(usageManifest.schemaVersion === 1, 'Component usage manifest schema must be version 1');
assert(usageManifest.families.length === usageManifest.totals.usageEntries, 'Component usage entry total is stale');
assert(distinctFamilies.size === usageManifest.totals.distinctFamilies, 'Distinct component family total is stale');
assert(styledFamilies.length === usageManifest.totals.styledFamilies, 'Styled component family total is stale');
assert(headlessFamilies.length === usageManifest.totals.headlessFamilies, 'Headless component family total is stale');
assert(distinctFamilies.size >= 25, 'Fluent Forum must use at least 25 distinct component families');
assert(headlessFamilies.length >= 8, 'Fluent Forum must use at least 8 headless component families');

for (const family of usageManifest.families) {
  const specifier =
    family.entrypoint === '.' ? family.package : `${family.package}/${family.entrypoint.replace(/^\.\//, '')}`;
  assert(source.includes(`from '${specifier}'`), `${family.family} must import from ${specifier}`);
  for (const symbol of family.symbols) {
    assert(new RegExp(`\\b${escapeRegExp(symbol)}\\b`).test(source), `${family.family} must import ${symbol}`);
  }

  const evidenceSource = family.sourceFiles.map(file => readFileSync(join(root, file), 'utf8')).join('\n');
  for (const jsxSymbol of family.jsxSymbols) {
    assert(
      new RegExp(`<${escapeRegExp(jsxSymbol)}(?:\\s|>|/)`).test(evidenceSource),
      `${family.family} must render <${jsxSymbol}> in its declared source files`,
    );
  }
  for (const testTitle of family.testEvidence) {
    assert(
      forumTests.includes(`test('${testTitle}'`),
      `${family.family} references missing Playwright test: ${testTitle}`,
    );
  }
}

console.log(
  `Fluent Forum usage verified: ${distinctFamilies.size} distinct families, ${headlessFamilies.length} headless families`,
);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function listSourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return listSourceFiles(path);
    }
    return statSync(path).isFile() && /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
