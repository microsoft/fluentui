const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { Linter } = require('eslint');
const parser = require('typescript-eslint').parser;
const upstreamPlugin = require('eslint-plugin-import');
const plugin = require('./importPlugin');
const { getWorkspacePackages } = require('./workspaceResolver');

jest.mock('../internal', () => ({ __internal: { plugins: {} } }));

let root;
let consumer;
let dependency;

function writeJson(filename, value) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, JSON.stringify(value));
}

function verify(code, options = { devDependencies: false }, extraConfig = {}, selectedPlugin = plugin) {
  return new Linter({ cwd: root }).verify(
    code,
    {
      files: ['**/*.{js,ts}'],
      languageOptions: { parser },
      plugins: { import: selectedPlugin },
      settings: { 'import/resolver': 'node', 'import/cache': { lifetime: 0 } },
      rules: { 'import/no-extraneous-dependencies': ['error', options] },
      ...extraConfig,
    },
    { filename: path.join(consumer, 'src/index.ts') },
  );
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'workspace-dependency-lint-'));
  consumer = path.join(root, 'packages/consumer/library');
  dependency = path.join(root, 'packages/dependency/library');
  writeJson(path.join(root, 'package.json'), {
    private: true,
    workspaces: ['packages/*/library', '!packages/excluded/library'],
  });
  writeJson(path.join(consumer, 'package.json'), { name: '@fixture/consumer' });
  writeJson(path.join(dependency, 'package.json'), { name: '@fixture/dependency', main: 'lib/index.js' });
  writeJson(path.join(root, 'packages/excluded/library/package.json'), { name: '@fixture/excluded' });
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

test.each([
  "import '@fixture/dependency';",
  "import '@fixture/dependency/lib/subpath';",
  "export * from '@fixture/dependency';",
  "export { value } from '@fixture/dependency';",
  "import('@fixture/dependency');",
  "require('@fixture/dependency');",
])('reports missing workspace declarations without links or build outputs: %s', code => {
  const messages = verify(code);
  expect(messages).toHaveLength(1);
  expect(messages[0].ruleId).toBe('import/no-extraneous-dependencies');
  expect(messages[0].message).toContain("'@fixture/dependency' should be listed");
});

test('detects the original false negative before and after the entry point exists', () => {
  const linked = path.join(root, 'node_modules/@fixture/dependency');
  fs.mkdirSync(path.dirname(linked), { recursive: true });
  fs.symlinkSync(dependency, linked, 'junction');
  const code = "import '@fixture/dependency';";
  expect(verify(code, undefined, undefined, upstreamPlugin)).toEqual([]);
  expect(verify(code)).toHaveLength(1);
  fs.mkdirSync(path.join(dependency, 'lib'));
  fs.writeFileSync(path.join(dependency, 'lib/index.js'), '');
  expect(verify(code, undefined, undefined, upstreamPlugin)).toHaveLength(1);
  expect(verify(code)).toHaveLength(1);
});

test.each(['dependencies', 'peerDependencies', 'optionalDependencies', 'bundledDependencies', 'bundleDependencies'])(
  'preserves allowed declarations in %s',
  field => {
    writeJson(path.join(consumer, 'package.json'), {
      name: '@fixture/consumer',
      [field]: field.includes('bundl') ? ['@fixture/dependency'] : { '@fixture/dependency': '*' },
    });
    expect(verify("import '@fixture/dependency';")).toEqual([]);
  },
);

test.each(['devDependencies', 'optionalDependencies', 'peerDependencies', 'bundledDependencies'])(
  'preserves the disabled %s option',
  field => {
    writeJson(path.join(consumer, 'package.json'), {
      name: '@fixture/consumer',
      [field]: field === 'bundledDependencies' ? ['@fixture/dependency'] : { '@fixture/dependency': '*' },
    });
    expect(verify("import '@fixture/dependency';", { [field]: false })).toHaveLength(1);
  },
);

test('preserves development dependency filename globs', () => {
  writeJson(path.join(consumer, 'package.json'), {
    name: '@fixture/consumer',
    devDependencies: { '@fixture/dependency': '*' },
  });
  expect(verify("import '@fixture/dependency';", { devDependencies: ['**/src/*.ts'] })).toEqual([]);
  expect(verify("import '@fixture/dependency';", { devDependencies: ['**/*.test.ts'] })).toHaveLength(1);
});

test.each([
  "import type { Value } from '@fixture/dependency';",
  "import { type Value } from '@fixture/dependency';",
  "export type { Value } from '@fixture/dependency';",
])('preserves type-only import defaults and includeTypes: %s', code => {
  expect(verify(code)).toEqual([]);
  expect(verify(code, { includeTypes: true })).toHaveLength(1);
});

test('ignores self, relative, builtin and non-workspace imports', () => {
  expect(
    verify(
      "import '@fixture/consumer'; import './local'; import 'node:fs'; import '@fixture/excluded'; import 'unknown';",
    ),
  ).toEqual([]);
});

test('supports unscoped workspace names', () => {
  writeJson(path.join(dependency, 'package.json'), { name: 'workspace-dependency' });
  expect(verify("import 'workspace-dependency/subpath';")).toHaveLength(1);
});

test('preserves explicit packageDir arrays', () => {
  const configPackage = path.join(root, 'config');
  writeJson(path.join(configPackage, 'package.json'), { dependencies: { '@fixture/dependency': '*' } });
  expect(verify("import '@fixture/dependency';", { packageDir: [consumer, configPackage] })).toEqual([]);
});

test('preserves internal-regex classification and includeInternal', () => {
  const settings = { 'import/internal-regex': '^@fixture/' };
  expect(verify("import '@fixture/dependency';", {}, { settings })).toEqual([]);
  expect(verify("import '@fixture/dependency';", { includeInternal: true }, { settings })).toHaveLength(1);
});

test('preserves external package checks and the default Node resolver', () => {
  const external = path.join(root, 'node_modules/external-dependency');
  writeJson(path.join(external, 'package.json'), { name: 'external-dependency', main: 'index.js' });
  fs.writeFileSync(path.join(external, 'index.js'), '');
  expect(verify("import 'external-dependency';", {}, { settings: {} })).toHaveLength(1);
});

test.each(['node', ['node'], { node: {} }])('preserves configured resolver forms: %j', resolver => {
  const external = path.join(root, 'node_modules/external-dependency');
  writeJson(path.join(external, 'package.json'), { name: 'external-dependency', main: 'index.js' });
  fs.writeFileSync(path.join(external, 'index.js'), '');
  expect(verify("import 'external-dependency';", {}, { settings: { 'import/resolver': resolver } })).toHaveLength(1);
});

test('preserves inline rule disable comments', () => {
  expect(
    verify("// eslint-disable-next-line import/no-extraneous-dependencies\nimport '@fixture/dependency';"),
  ).toEqual([]);
});

test('does not alter resolution for other import rules', () => {
  const messages = verify(
    "import '@fixture/dependency';",
    {},
    {
      rules: { 'import/no-extraneous-dependencies': 'error', 'import/no-unresolved': 'error' },
    },
  );
  expect(messages.map(message => message.ruleId).sort()).toEqual([
    'import/no-extraneous-dependencies',
    'import/no-unresolved',
  ]);
});

test('supports imports from the workspace root', () => {
  consumer = root;
  expect(verify("import '@fixture/dependency';")).toHaveLength(1);
});

test('does not keep stale workspace names between linted files', () => {
  expect(verify("import '@fixture/dependency';")).toHaveLength(1);
  writeJson(path.join(dependency, 'package.json'), { name: '@fixture/renamed' });
  expect(verify("import '@fixture/renamed';")).toHaveLength(1);
  expect(verify("import '@fixture/dependency';")).toEqual([]);
});

test('fails explicitly when workspace manifests are malformed', () => {
  fs.writeFileSync(path.join(dependency, 'package.json'), '{');
  expect(() => verify("import '@fixture/dependency';")).toThrow();
});

test('fails explicitly when workspace package names are duplicated', () => {
  writeJson(path.join(root, 'packages/duplicate/library/package.json'), { name: '@fixture/dependency' });
  expect(() => verify("import '@fixture/dependency';")).toThrow('Duplicate workspace package');
});

test('discovers negative globs and workspaces.packages independent of cwd', () => {
  writeJson(path.join(root, 'package.json'), {
    workspaces: { packages: ['packages/*/library', '!packages/excluded/library'] },
  });
  const packages = getWorkspacePackages(path.join(consumer, 'src/index.ts'));
  expect(packages['@fixture/dependency']).toBe(path.join(dependency, 'package.json'));
  expect(packages['@fixture/excluded']).toBeUndefined();
});

test('shared core configuration installs the wrapper and keeps development-file exemptions', () => {
  const core = require('../configs/core');
  const configs = core.map(config => ({
    ...config,
    rules: Object.fromEntries(
      Object.entries(config.rules ?? {}).map(([name, value]) => [
        name,
        name === 'import/no-extraneous-dependencies' ? value : 'off',
      ]),
    ),
  }));
  const linter = new Linter({ cwd: root });
  const lint = filename =>
    linter.verify(
      "import '@fixture/dependency';",
      [...configs, { languageOptions: { parserOptions: { projectService: false } } }],
      { filename },
    );
  expect(lint(path.join(consumer, 'src/index.js'))).toHaveLength(1);
  expect(lint(path.join(consumer, 'src/testing/index.js'))).toEqual([]);
  expect(lint(path.join(root, 'config/index.js'))).toEqual([]);
  expect(lint(path.join(consumer, 'src/index.stories.ts'))).toEqual([]);
});
