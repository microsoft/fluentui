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
  root = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'workspace-dependency-lint-'));
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
  jest.restoreAllMocks();
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

test.each([undefined, 'node', ['node'], { node: {} }])(
  'preserves external checks and resolver settings: %j',
  resolver => {
    const external = path.join(root, 'node_modules/external-dependency');
    writeJson(path.join(external, 'package.json'), { name: 'external-dependency', main: 'index.js' });
    fs.writeFileSync(path.join(external, 'index.js'), '');
    const glob = jest.spyOn(fs, 'globSync');
    for (let i = 0; i < 3; i++) {
      expect(verify("import 'external-dependency';", {}, { settings: { 'import/resolver': resolver } })).toHaveLength(
        1,
      );
    }
    expect(glob).toHaveBeenCalledTimes(1);
  },
);

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
  const messages = verify("import '@fixture/dependency';");
  expect(messages).toHaveLength(1);
  expect(messages[0].message).toContain('Resolve error:');
});

test('fails explicitly when workspace package names are duplicated', () => {
  writeJson(path.join(root, 'packages/duplicate/library/package.json'), { name: '@fixture/dependency' });
  const messages = verify("import '@fixture/dependency';");
  expect(messages).toHaveLength(1);
  expect(messages[0].message).toContain("Duplicate workspace package '@fixture/dependency'");
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

test('core and import-sorting configurations share the canonical plugin identity', () => {
  const core = require('../configs/core');
  const imports = require('../configs/imports');
  const corePlugins = core.filter(config => config.plugins?.import).map(config => config.plugins.import);
  expect(corePlugins.every(importPlugin => importPlugin === plugin)).toBe(true);
  expect(imports.every(config => config.plugins?.import === plugin)).toBe(true);
  expect(() => new Linter({ cwd: root }).verify('', [...core, ...imports])).not.toThrow();
});

test('import-free files do not discover workspace packages', () => {
  const glob = jest.spyOn(fs, 'globSync');
  for (let i = 0; i < 3; i++) {
    expect(verify('const value = 1;')).toEqual([]);
  }
  expect(glob).not.toHaveBeenCalled();
});

test('workspace discovery is reused across files and metadata is checked once per file', () => {
  const unrelatedManifest = path.join(root, 'packages/unrelated/library/package.json');
  writeJson(unrelatedManifest, { name: '@fixture/unrelated' });
  const glob = jest.spyOn(fs, 'globSync');
  const read = jest.spyOn(fs, 'readFileSync');
  for (let i = 0; i < 3; i++) {
    expect(verify("import '@fixture/dependency';")).toHaveLength(1);
  }
  expect(glob).toHaveBeenCalledTimes(1);
  expect(read.mock.calls.filter(([filename]) => filename === unrelatedManifest)).toHaveLength(1);
  const stat = jest.spyOn(fs, 'statSync');
  expect(verify("import '@fixture/dependency';".repeat(10))).toHaveLength(10);
  expect(stat.mock.calls.filter(([filename]) => filename === unrelatedManifest)).toHaveLength(1);
});

test('the cached index refreshes after workspace patterns change', () => {
  expect(verify("import '@fixture/dependency';")).toHaveLength(1);
  writeJson(path.join(root, 'package.json'), { workspaces: ['packages/consumer/library'] });
  expect(verify("import '@fixture/dependency';")).toEqual([]);
});

test('new and removed workspace imports are discovered in a long-lived process', () => {
  expect(verify("import '@fixture/added';")).toEqual([]);
  const addedManifest = path.join(root, 'packages/added/library/package.json');
  writeJson(addedManifest, { name: '@fixture/added' });
  expect(verify("import '@fixture/added';")).toHaveLength(1);
  fs.unlinkSync(addedManifest);
  expect(verify("import '@fixture/added';")).toEqual([]);
});

test.each([false, true])('a new workspace is not hidden by an installed package (declared: %s)', declared => {
  const store = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'workspace-dependency-store-'));
  try {
    if (declared) {
      writeJson(path.join(consumer, 'package.json'), {
        name: '@fixture/consumer',
        dependencies: { 'external-dependency': '*' },
      });
    }
    writeJson(path.join(store, 'package.json'), { name: 'external-dependency', main: 'index.js' });
    fs.writeFileSync(path.join(store, 'index.js'), '');
    fs.mkdirSync(path.join(root, 'node_modules'));
    fs.symlinkSync(store, path.join(root, 'node_modules/external-dependency'), 'junction');
    expect(verify("import '@fixture/dependency';")).toHaveLength(1);
    expect(verify("import 'external-dependency/new-workspace-subpath';")).toEqual([]);

    writeJson(path.join(root, 'packages/added/library/package.json'), {
      name: 'external-dependency',
      main: 'lib/index.js',
    });
    const messages = verify("import 'external-dependency/new-workspace-subpath';");
    if (declared) {
      expect(messages).toEqual([]);
    } else {
      expect(messages).toHaveLength(1);
      expect(messages[0].message).toContain("'external-dependency' should be listed");
    }
  } finally {
    fs.rmSync(store, { recursive: true, force: true });
  }
});

test('a renamed consumer keeps self imports internal when an installed package shares its name', () => {
  const external = path.join(root, 'node_modules/external-dependency');
  writeJson(path.join(external, 'package.json'), { name: 'external-dependency', main: 'index.js' });
  fs.writeFileSync(path.join(external, 'index.js'), '');
  expect(verify("import '@fixture/dependency';")).toHaveLength(1);
  writeJson(path.join(consumer, 'package.json'), { name: 'external-dependency' });
  expect(verify("import 'external-dependency';")).toEqual([]);
});

test.each(['packages/empty', 'packages/empty/library'])(
  'discovers manifests added beneath an existing empty directory: %s',
  directory => {
    fs.mkdirSync(path.join(root, directory), { recursive: true });
    expect(verify("import '@fixture/added';")).toEqual([]);
    writeJson(path.join(root, 'packages/empty/library/package.json'), { name: '@fixture/added' });
    expect(verify("import '@fixture/added';")).toHaveLength(1);
  },
);

test('refreshes unrelated workspace renames even when the new name is installed', () => {
  const external = path.join(root, 'node_modules/external-dependency');
  writeJson(path.join(external, 'package.json'), { name: 'external-dependency', main: 'index.js' });
  fs.writeFileSync(path.join(external, 'index.js'), '');
  expect(verify("import 'external-dependency';")).toHaveLength(1);
  writeJson(path.join(dependency, 'package.json'), { name: 'external-dependency', main: 'lib/index.js' });
  const glob = jest.spyOn(fs, 'globSync');
  expect(verify("import 'external-dependency/new-workspace-subpath';")).toHaveLength(1);
  expect(glob).toHaveBeenCalledTimes(1);
});

test('directory freshness covers brace expansions and recursive workspace patterns', () => {
  writeJson(path.join(root, 'package.json'), {
    workspaces: ['packages/{consumer,dependency}/library', 'extra/**/library'],
  });
  fs.mkdirSync(path.join(root, 'extra/empty'), { recursive: true });
  expect(verify("import '@fixture/dependency';")).toHaveLength(1);
  writeJson(path.join(root, 'extra/empty/nested/library/package.json'), { name: '@fixture/added' });
  expect(verify("import '@fixture/added';")).toHaveLength(1);
});
