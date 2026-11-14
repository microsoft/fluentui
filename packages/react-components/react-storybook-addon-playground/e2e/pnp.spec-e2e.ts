import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as vm from 'node:vm';
import { expect, test } from '@playwright/test';
import * as ts from 'typescript';

import type { PlaygroundRuntimeManifest } from '../src/setup';

test('collects workspace, archived transitive and declaration-only types in an isolated Yarn PnP workspace', async () => {
  const repositoryRoot = path.resolve(__dirname, '../../../..');
  const { packageManager } = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'));
  const yarnVersion = packageManager.replace(/^yarn@/, '').split('+')[0];
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'playground-pnp-')));
  const manifest = (name: string, metadata: Record<string, unknown>) =>
    JSON.stringify({ name, version: '1.0.0', ...metadata });

  try {
    const fixtureFiles = {
      'package.json': manifest('pnp-consumer', {
        private: true,
        packageManager,
        workspaces: ['packages/*'],
        dependencies: {
          react: 'workspace:*',
          'react-dom': 'workspace:*',
          'pnp-ui': 'workspace:*',
          'pnp-types': 'workspace:*',
        },
      }),
      '.yarnrc.yml': 'enableNetwork: false\nenableGlobalCache: false\nenableTelemetry: false\nenableScripts: false\n',
      'setup.mjs': 'export default {};',
      'packages/react/package.json': manifest('react', { main: './index.js', types: './index.d.ts' }),
      'packages/react/index.js': 'module.exports = {};',
      'packages/react/index.d.ts': 'export {};',
      'packages/react/jsx-runtime.js': 'module.exports = {};',
      'packages/react/jsx-runtime.d.ts': 'export {};',
      'packages/react-dom/package.json': manifest('react-dom', { main: './index.js', types: './index.d.ts' }),
      'packages/react-dom/index.js': 'module.exports = {};',
      'packages/react-dom/index.d.ts': 'export {};',
      'packages/react-dom/client.js': 'module.exports = {};',
      'packages/react-dom/client.d.ts': 'export {};',
      'packages/ui/package.json': manifest('pnp-ui', {
        exports: { '.': { types: './dist/index.d.ts', default: './lib/index.js' } },
        dependencies: { 'pnp-shared': 'file:../../fixtures/shared' },
      }),
      'packages/ui/lib/index.js': 'exports.value = require("pnp-shared").value;',
      'packages/ui/dist/index.d.ts': 'export { value, type Value } from "pnp-shared";',
      'packages/types/package.json': manifest('pnp-types', {
        exports: { '.': { types: './index.d.ts' } },
      }),
      'packages/types/index.d.ts': 'export type Additional = "pnp";',
      'fixtures/shared/package.json': manifest('pnp-shared', {
        main: './index.js',
        types: './index.d.ts',
        typesVersions: { '<99.0.0': { '*': ['legacy/*'] } },
      }),
      'fixtures/shared/index.js': 'exports.value = "pnp";',
      'fixtures/shared/index.d.ts': 'export declare const value: "wrong-version"; export type Value = "wrong-version";',
      'fixtures/shared/legacy/index.d.ts': 'export declare const value: "pnp"; export type Value = "pnp";',
    };
    for (const [relativePath, content] of Object.entries(fixtureFiles)) {
      const file = path.join(root, relativePath);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
    }

    execFileSync(
      process.execPath,
      [
        path.join(repositoryRoot, `.yarn/releases/yarn-${yarnVersion}.cjs`),
        'install',
        '--no-immutable',
        '--mode=skip-build',
      ],
      { cwd: root, timeout: 60_000, encoding: 'utf8' },
    );
    expect(fs.existsSync(path.join(root, 'node_modules'))).toBe(false);
    expect(fs.existsSync(path.join(root, '.pnp.cjs'))).toBe(true);

    const result: { pnpVersion: string; sharedLocation: string; inlineStylesLoaded: boolean; warnings: string[] } =
      JSON.parse(
        execFileSync(
          process.execPath,
          ['--require', path.join(root, '.pnp.cjs'), path.join(__dirname, 'pnp-build.cjs'), root],
          { cwd: root, timeout: 60_000, encoding: 'utf8' },
        ),
      );
    expect(result.pnpVersion).toBeTruthy();
    expect(result.sharedLocation).toMatch(/\.zip[/\\]/);
    expect(result.inlineStylesLoaded).toBe(false);
    expect(result.warnings.filter(warning => warning.startsWith('Playground typings'))).toEqual([]);

    const runtimeManifest: PlaygroundRuntimeManifest = JSON.parse(
      fs.readFileSync(path.join(root, 'out/playground/runtime/manifest.json'), 'utf8'),
    );
    const typings = (file: string): Record<string, string> =>
      JSON.parse(fs.readFileSync(path.join(root, 'out', file), 'utf8'));
    const files: Record<string, string> = Object.assign(
      typings(runtimeManifest.typings),
      ...runtimeManifest.moduleTypings!['pnp-ui'].map(typings),
    );
    expect(files['file:///node_modules/pnp-ui/dist/index.d.ts']).toContain('pnp-shared');
    expect(files['file:///node_modules/pnp-shared/legacy/index.d.ts']).toContain('"pnp"');
    expect(files['file:///node_modules/pnp-types/index.d.ts']).toContain('Additional');
    expect(runtimeManifest.allowedModules).not.toContain('pnp-types');

    const virtualFiles: Record<string, string> = {
      ...Object.fromEntries(Object.entries(files).map(([file, content]) => [file.replace(/^file:\/\//, ''), content])),
      '/example.ts':
        'import { value, type Value } from "pnp-ui"; import type { Additional } from "pnp-types"; ' +
        'const result: Value & Additional = value; const expected: "pnp" = result;',
    };
    const options: ts.CompilerOptions = {
      noLib: true,
      strict: true,
      types: [],
      moduleResolution: ts.ModuleResolutionKind.Node10,
    };
    const host: ts.CompilerHost = {
      ...ts.createCompilerHost(options),
      getCurrentDirectory: () => '/',
      fileExists: file => file in virtualFiles,
      readFile: file => virtualFiles[file],
      directoryExists: directory => Object.keys(virtualFiles).some(file => file.startsWith(`${directory}/`)),
      getSourceFile: (file, languageVersion) =>
        virtualFiles[file] === undefined ? undefined : ts.createSourceFile(file, virtualFiles[file], languageVersion),
    };
    expect(
      ts
        .createProgram(['/example.ts'], options, host)
        .getSemanticDiagnostics()
        .map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')),
    ).toEqual([]);

    let runtime: { moduleLoaders: Record<string, () => Promise<{ value: string }>> } | undefined;
    const context = { require: () => ({}) };
    Reflect.set(context, '__FLUENTUI_PLAYGROUND_REGISTER_V1__', (value: typeof runtime) => {
      runtime = value;
    });
    vm.runInNewContext(fs.readFileSync(path.join(root, 'out/playground-runtime.js'), 'utf8'), context);
    await expect(runtime!.moduleLoaders['pnp-ui']()).resolves.toMatchObject({ value: 'pnp' });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
