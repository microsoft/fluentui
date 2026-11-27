import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { copyStarter, verifyDeclaredImports, verifyPackageOutputs, withTemporaryApp } from './vite';

describe('isolated starter consumer', () => {
  it('copies current starter files without ignored local artifacts', async () => {
    await withTemporaryApp(async (app, root) => {
      const source = path.join(root, 'starter');
      fs.mkdirSync(source);
      execFileSync('git', ['init', '--quiet', source]);
      fs.writeFileSync(path.join(source, '.gitignore'), 'node_modules\ndist\n*.local\n');
      fs.writeFileSync(path.join(source, 'main.tsx'), 'original');
      execFileSync('git', ['add', '.'], { cwd: source });
      fs.writeFileSync(path.join(source, 'main.tsx'), 'local changes');
      fs.writeFileSync(path.join(source, 'new file.ts'), 'new source');
      for (const directory of ['dist', 'node_modules']) {
        fs.mkdirSync(path.join(source, directory));
        fs.writeFileSync(path.join(source, directory, 'artifact'), '');
      }
      fs.writeFileSync(path.join(source, 'settings.local'), '');
      copyStarter(source, app);
      expect(fs.readFileSync(path.join(app, 'main.tsx'), 'utf8')).toBe('local changes');
      expect(fs.readFileSync(path.join(app, 'new file.ts'), 'utf8')).toBe('new source');
      expect(fs.existsSync(path.join(app, '.gitignore'))).toBe(true);
      for (const ignored of ['dist', 'node_modules', 'settings.local', '.git']) {
        expect(fs.existsSync(path.join(app, ignored))).toBe(false);
      }
    });
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
