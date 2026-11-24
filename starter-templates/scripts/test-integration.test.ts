import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import {
  addLocalResolutions,
  collectLocalPackages,
  verifyDeclaredImports,
  verifyPackageOutputs,
  withTemporaryApp,
} from './test-integration';

describe('isolated starter consumer', () => {
  it('substitutes the local runtime closure without adding undeclared dependencies or local dev tools', () => {
    const manifest = {
      name: 'starter',
      version: '1.0.0',
      dependencies: { '@fluentui/react-components': '^9', '@fluentui/react-icons': '^2' },
    };
    const packages = new Map(
      [
        {
          name: '@fluentui/react-components',
          version: '9.0.0',
          dependencies: { '@fluentui/react-button': '^9' },
          devDependencies: { '@fluentui/test-tool': '*' },
        },
        {
          name: '@fluentui/react-button',
          version: '9.0.0',
          optionalDependencies: { '@fluentui/optional': '*' },
          peerDependencies: { '@fluentui/peer': '*' },
        },
        { name: '@fluentui/optional', version: '1.0.0' },
        { name: '@fluentui/peer', version: '1.0.0' },
        { name: '@fluentui/test-tool', version: '1.0.0' },
      ].map(pkg => [pkg.name, { root: '/unused', manifest: pkg }]),
    );
    const closure = collectLocalPackages(manifest, packages).map(pkg => pkg.manifest.name);
    expect(closure).toEqual([
      '@fluentui/react-components',
      '@fluentui/react-button',
      '@fluentui/optional',
      '@fluentui/peer',
    ]);
    expect(collectLocalPackages({ ...manifest, dependencies: {} }, packages)).toEqual([]);
    const resolved = addLocalResolutions(manifest, { '@fluentui/react-components': '/tmp/components.tgz' });
    expect(resolved.dependencies).toEqual(manifest.dependencies);
    expect(resolved.resolutions).toEqual({ '@fluentui/react-components': 'file:/tmp/components.tgz' });
    expect(manifest).not.toHaveProperty('resolutions');
  });

  it('rejects missing ESM and declaration outputs even when CommonJS exists', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fluent-output-'));
    try {
      fs.writeFileSync(path.join(root, 'index.cjs'), '');
      const manifest = { name: 'package', version: '1', main: './index.cjs', module: './index.js' };
      expect(() => verifyPackageOutputs(root, manifest)).toThrow('missing package output ./index.js');
      fs.writeFileSync(path.join(root, 'index.js'), '');
      expect(() => verifyPackageOutputs(root, { ...manifest, exports: { '.': { types: './index.d.ts' } } })).toThrow(
        'missing package output ./index.d.ts',
      );
      fs.writeFileSync(path.join(root, 'index.d.ts'), '');
      expect(() =>
        verifyPackageOutputs(root, { ...manifest, exports: { '.': { types: './index.d.ts' } } }),
      ).not.toThrow();
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('rejects undeclared imports even if a transitive package could be hoisted', async () => {
    await withTemporaryApp(async app => {
      fs.writeFileSync(
        path.join(app, 'main.tsx'),
        `import { Button } from '@fluentui/react-components';
         import { AddRegular } from '@fluentui/react-icons';
         import './App';
         import 'node:path';`,
      );
      const manifest = {
        name: 'starter',
        version: '1',
        dependencies: { '@fluentui/react-components': '^9' },
        resolutions: { '@fluentui/react-icons': 'file:/tmp/icons.tgz' },
      };
      expect(() => verifyDeclaredImports(app, manifest)).toThrow(
        '@fluentui/react-icons is imported but not declared by the starter',
      );
      expect(() =>
        verifyDeclaredImports(app, {
          ...manifest,
          dependencies: { ...manifest.dependencies, '@fluentui/react-icons': '^2' },
        }),
      ).not.toThrow();
    });
  });

  it.each([false, true])('cleans up after the consumer finishes (failure: %s)', async fail => {
    let tempRoot = '';
    const run = withTemporaryApp(async (app, root) => {
      tempRoot = root;
      expect(fs.existsSync(path.join(app, 'package.json'))).toBe(true);
      if (fail) {
        throw new Error('consumer build failed');
      }
    });
    if (fail) {
      await expect(run).rejects.toThrow('consumer build failed');
    } else {
      await run;
    }
    expect(fs.existsSync(tempRoot)).toBe(false);
  });
});
