import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { analyzeFiles } from '../utils/annotator';
import { writeAnnotations } from '../utils/annotator';
import { handler } from '../handler';

const FIXTURES_DIR = path.join(__dirname, 'fixtures');

async function mkTmpDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'fluent-migrate-test-'));
}

/** Copy a fixture file into tmpDir and return the destination path. */
async function copyFixture(tmpDir: string, name: string): Promise<string> {
  const dest = path.join(tmpDir, name);
  await fs.copyFile(path.join(FIXTURES_DIR, name), dest);
  return dest;
}

// ─── suite ───────────────────────────────────────────────────────────────────

describe('migrate v8-to-v9 — integration', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkTmpDir();
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  // ── analyzeFiles ────────────────────────────────────────────────────────────

  describe('analyzeFiles', () => {
    it('returns empty results for files with no @fluentui/react imports', async () => {
      await copyFixture(tmpDir, 'unrelated.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results).toHaveLength(0);
    });

    it('detects import-paths annotation on a @fluentui/react import', async () => {
      await copyFixture(tmpDir, 'import-paths.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results).toHaveLength(1);
      expect(results[0].filePath).toContain('import-paths.tsx');
      const importAnnotations = results[0].annotations.filter(a => a.codemod === 'import-paths');
      expect(importAnnotations.length).toBeGreaterThan(0);
      expect(importAnnotations[0].action).toBe('auto');
      expect(importAnnotations[0].payload).toContain('@fluentui/react-components');
    });

    it('detects button-variant annotations for all v8 button variants', async () => {
      await copyFixture(tmpDir, 'button-variants.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results).toHaveLength(1);
      const variants = results[0].annotations.filter(a => a.codemod === 'button-variants');
      expect(variants.length).toBe(4);
      expect(variants.map(a => a.payload)).toMatchInlineSnapshot(`
        Array [
          "PrimaryButton → Button appearance=\\"primary\\"",
          "DefaultButton → Button",
          "ActionButton → Button appearance=\\"transparent\\"",
          "IconButton → Button (icon-only)",
        ]
      `);
      expect(variants.every(a => a.action === 'auto')).toBe(true);
    });

    it('detects styles prop as a scaffold annotation', async () => {
      await copyFixture(tmpDir, 'styles-prop.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results).toHaveLength(1);
      const styleAnnotations = results[0].annotations.filter(a => a.codemod === 'styles-prop');
      expect(styleAnnotations).toHaveLength(1);
      expect(styleAnnotations[0].action).toBe('scaffold');
    });

    it('detects no-equivalent annotations for deprecated components', async () => {
      await copyFixture(tmpDir, 'no-equivalent.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results).toHaveLength(1);
      const noEquiv = results[0].annotations.filter(a => a.codemod === 'no-equivalent');
      expect(noEquiv.length).toBeGreaterThanOrEqual(2);
      expect(noEquiv.every(a => a.action === 'no-equivalent')).toBe(true);
    });

    it('detects prop-rename annotations for legacy ARIA props', async () => {
      await copyFixture(tmpDir, 'prop-rename.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results).toHaveLength(1);
      const propAnnotations = results[0].annotations.filter(a => a.codemod === 'prop-rename');
      expect(propAnnotations.length).toBeGreaterThanOrEqual(2);
      expect(propAnnotations.some(a => a.payload === 'ariaLabel → aria-label')).toBe(true);
      expect(propAnnotations.some(a => a.payload === 'componentRef → ref')).toBe(true);
    });

    it('detects icon-props annotation with auto action for a known icon name', async () => {
      await copyFixture(tmpDir, 'icon-known.tsx');

      const results = await analyzeFiles(tmpDir);

      const iconAnnotations = results[0].annotations.filter(a => a.codemod === 'icon-props');
      expect(iconAnnotations).toHaveLength(1);
      expect(iconAnnotations[0].action).toBe('auto');
      expect(iconAnnotations[0].payload).toContain('AddRegular');
    });

    it('detects icon-props annotation with manual action for an unknown icon name', async () => {
      await copyFixture(tmpDir, 'icon-unknown.tsx');

      const results = await analyzeFiles(tmpDir);

      const iconAnnotations = results[0].annotations.filter(a => a.codemod === 'icon-props');
      expect(iconAnnotations).toHaveLength(1);
      expect(iconAnnotations[0].action).toBe('manual');
    });

    it('tracks @fluentui/react-components as a missing dep when import-paths is detected', async () => {
      await copyFixture(tmpDir, 'import-paths.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results[0].missingDeps.some(d => d.name === '@fluentui/react-components')).toBe(true);
    });

    it('tracks @fluentui/react-icons as a missing dep when icon-props is detected', async () => {
      await copyFixture(tmpDir, 'icon-known.tsx');

      const results = await analyzeFiles(tmpDir);

      expect(results[0].missingDeps.some(d => d.name === '@fluentui/react-icons')).toBe(true);
    });

    it('analyzes multiple files in a directory and skips non-fluent ones', async () => {
      await Promise.all([
        copyFixture(tmpDir, 'import-paths.tsx'),
        copyFixture(tmpDir, 'button-variants.tsx'),
        copyFixture(tmpDir, 'unrelated.tsx'),
      ]);

      const results = await analyzeFiles(tmpDir);

      expect(results).toHaveLength(2);
      const names = results.map(r => path.basename(r.filePath));
      expect(names).toContain('import-paths.tsx');
      expect(names).toContain('button-variants.tsx');
      expect(names).not.toContain('unrelated.tsx');
    });

    it('deduplicates missing deps across multiple annotations in the same file', async () => {
      await copyFixture(tmpDir, 'multi-import.tsx');

      const results = await analyzeFiles(tmpDir);

      const reactComponentsDeps = results[0].missingDeps.filter(d => d.name === '@fluentui/react-components');
      expect(reactComponentsDeps).toHaveLength(1);
    });
  });

  // ── writeAnnotations ─────────────────────────────────────────────────────────

  describe('writeAnnotations', () => {
    it('inserts @fluent-migrate: comments into the source file', async () => {
      const filePath = await copyFixture(tmpDir, 'import-paths.tsx');

      const results = await analyzeFiles(tmpDir);
      await writeAnnotations(results);

      const content = await fs.readFile(filePath, 'utf8');
      expect(content).toMatchInlineSnapshot(`
        "// @fluent-migrate:auto | import-paths | @fluentui/react → @fluentui/react-components
        import { Button } from '@fluentui/react';

        export const MyButton = () => <Button />;
        "
      `);
    });

    it('returns the number of files changed', async () => {
      await Promise.all([copyFixture(tmpDir, 'import-paths.tsx'), copyFixture(tmpDir, 'button-variants.tsx')]);

      const results = await analyzeFiles(tmpDir);
      const { filesChanged } = await writeAnnotations(results);

      expect(filesChanged).toBe(2);
    });

    it('is idempotent — running twice does not duplicate annotations', async () => {
      const filePath = await copyFixture(tmpDir, 'import-paths.tsx');

      const results1 = await analyzeFiles(tmpDir);
      await writeAnnotations(results1);
      const afterFirst = await fs.readFile(filePath, 'utf8');

      const results2 = await analyzeFiles(tmpDir);
      await writeAnnotations(results2);
      const afterSecond = await fs.readFile(filePath, 'utf8');

      expect(afterSecond).toBe(afterFirst);
    });

    it('preserves indentation of the target line in the inserted comment', async () => {
      const filePath = await copyFixture(tmpDir, 'indented.tsx');

      const results = await analyzeFiles(tmpDir);
      await writeAnnotations(results);

      const content = await fs.readFile(filePath, 'utf8');
      expect(content).toMatchInlineSnapshot(`
        "// @fluent-migrate:auto | import-paths | @fluentui/react → @fluentui/react-components
        import { PrimaryButton } from '@fluentui/react';

        export const MyComp = () => (
          <div>
            {/* @fluent-migrate:auto | button-variants | PrimaryButton → Button appearance=\\"primary\\" */}
            <PrimaryButton>Click</PrimaryButton>
          </div>
        );
        "
      `);
    });

    it('annotates multiple sites in a single file', async () => {
      const filePath = await copyFixture(tmpDir, 'multi-annotation.tsx');

      const results = await analyzeFiles(tmpDir);
      await writeAnnotations(results);

      const content = await fs.readFile(filePath, 'utf8');
      expect(content).toMatchInlineSnapshot(`
        "// @fluent-migrate:auto | import-paths | @fluentui/react → @fluentui/react-components
        import { PrimaryButton, DefaultButton } from '@fluentui/react';

        export const MyComp = () => (
          <div>
            {/* @fluent-migrate:auto | button-variants | PrimaryButton → Button appearance=\\"primary\\" */}
            <PrimaryButton>Save</PrimaryButton>
            {/* @fluent-migrate:auto | button-variants | DefaultButton → Button */}
            <DefaultButton>Cancel</DefaultButton>
          </div>
        );
        "
      `);
    });

    it('writes metadata.json listing annotated file paths when projectRoot is provided', async () => {
      await copyFixture(tmpDir, 'import-paths.tsx');

      const results = await analyzeFiles(tmpDir);
      await writeAnnotations(results, tmpDir);

      const metaContent = await fs.readFile(path.join(tmpDir, '.fluent-migrate', 'metadata.json'), 'utf8');
      const meta = JSON.parse(metaContent);
      expect(meta.version).toBe(1);
      expect(meta.annotatedFiles).toEqual(['import-paths.tsx']);
    });
  });

  // ── handler end-to-end ───────────────────────────────────────────────────────

  describe('handler (end-to-end)', () => {
    let logs: string[];
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
      logs = [];
      logSpy = jest.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
        logs.push(args.map(String).join(' '));
      });
    });

    afterEach(() => {
      logSpy.mockRestore();
    });

    it('dryRun does not modify files', async () => {
      const filePath = await copyFixture(tmpDir, 'import-paths.tsx');
      const original = await fs.readFile(filePath, 'utf8');

      await handler({ path: tmpDir, dryRun: true, _: [], $0: 'fluentui-cli' });

      const after = await fs.readFile(filePath, 'utf8');
      expect(after).toBe(original);
    });

    it('dryRun prints [dryRun] header and lists files that would be annotated', async () => {
      await copyFixture(tmpDir, 'import-paths.tsx');

      await handler({ path: tmpDir, dryRun: true, _: [], $0: 'fluentui-cli' });

      expect(logs.some(l => l.includes('[dryRun]'))).toBe(true);
      expect(logs.some(l => l.includes('import-paths.tsx'))).toBe(true);
    });

    it('write mode annotates files and prints summary with file count', async () => {
      const filePath = await copyFixture(tmpDir, 'import-paths.tsx');

      await handler({ path: tmpDir, dryRun: false, _: [], $0: 'fluentui-cli' });

      const content = await fs.readFile(filePath, 'utf8');
      expect(content).toContain('// @fluent-migrate:auto | import-paths |');
      expect(logs.some(l => l.includes('Annotated'))).toBe(true);
    });

    it('write mode prints missing dep packages in the summary', async () => {
      await copyFixture(tmpDir, 'import-paths.tsx');

      await handler({ path: tmpDir, dryRun: false, _: [], $0: 'fluentui-cli' });

      expect(logs.some(l => l.includes('@fluentui/react-components'))).toBe(true);
    });

    it('reports zero files annotated when no fluent imports are found', async () => {
      await copyFixture(tmpDir, 'unrelated.tsx');

      await handler({ path: tmpDir, dryRun: false, _: [], $0: 'fluentui-cli' });

      expect(logs.some(l => l.includes('Annotated 0 files'))).toBe(true);
    });

    it('write mode emits .fluent-migrate/metadata.json', async () => {
      await copyFixture(tmpDir, 'import-paths.tsx');

      await handler({ path: tmpDir, dryRun: false, _: [], $0: 'fluentui-cli' });

      const metaPath = path.join(tmpDir, '.fluent-migrate', 'metadata.json');
      const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'));
      expect(meta.version).toBe(1);
      expect(meta.annotatedFiles).toContain('import-paths.tsx');
    });
  });
});
