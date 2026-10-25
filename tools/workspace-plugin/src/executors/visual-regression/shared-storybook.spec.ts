import { type ExecutorContext } from '@nx/devkit';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { resolveSharedGroups, writeSharedManifest } from './shared-storybook';

const hostRoot = 'apps/vr-tests-react-components';
const buttonStories = 'src/stories/Button/**/*.stories.tsx';
const menuStories = 'src/stories/Menu/**/*.stories.tsx';

describe('shared Storybook compilation', () => {
  let root: string;
  let hostPath: string;
  let outputPath: string;
  let context: ExecutorContext;

  function write(relativePath: string, content: string): void {
    const filePath = join(hostPath, relativePath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
  }

  function writeIndex(entries: Record<string, unknown>): void {
    const indexPath = join(outputPath, 'index.json');
    mkdirSync(dirname(indexPath), { recursive: true });
    writeFileSync(indexPath, JSON.stringify({ v: 5, entries }));
  }

  const story = (id: string, importPath: string) => ({
    type: 'story',
    id,
    title: 'Title',
    name: 'Default',
    importPath,
  });

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'vrt-shared-'));
    hostPath = join(root, hostRoot);
    outputPath = join(hostPath, 'dist/visual-regression/_shared/storybook');
    write('src/stories/Button/Button.stories.tsx', 'export const Default = 1;');
    write('src/stories/Menu/Menu.stories.tsx', 'export const Default = 2;');
    writeIndex({
      'menu--default': story('menu--default', './src/stories/Menu/Menu.stories.tsx'),
      'button--default': story('button--default', './src/stories/Button/Button.stories.tsx'),
      'button--docs': { type: 'docs', id: 'button--docs', title: 'Button', name: 'Docs', importPath: './missing.mdx' },
    });
    writeFileSync(join(outputPath, 'iframe.html'), '<html>preview</html>');
    writeFileSync(join(outputPath, 'bundle.js'), 'initial bundle');
    context = {
      root,
      cwd: root,
      isVerbose: false,
      projectName: 'vr-tests-react-components',
      projectsConfigurations: { version: 2, projects: {} },
      nxJsonConfiguration: {},
      projectGraph: {
        dependencies: {},
        nodes: {
          'react-button-vrt': {
            name: 'react-button-vrt',
            type: 'lib',
            data: {
              root: 'packages/react-components/react-button/visual-regression',
              metadata: { visualRegression: { hostRoot } },
              targets: { 'build-vr-storybook': { options: { hostRoot, stories: [buttonStories, buttonStories] } } },
            },
          },
          'react-menu-vrt': {
            name: 'react-menu-vrt',
            type: 'lib',
            data: {
              root: 'packages/react-components/react-menu/visual-regression',
              metadata: { visualRegression: { hostRoot } },
              targets: { 'build-vr-storybook': { options: { hostRoot, stories: [menuStories] } } },
            },
          },
          'vr-tests-react-components': {
            name: 'vr-tests-react-components',
            type: 'app',
            data: { root: hostRoot },
          },
        },
      },
    } satisfies ExecutorContext;
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('resolves a canonical union of selected virtual projects without traversing dependencies', () => {
    expect(resolveSharedGroups(['react-menu-vrt', 'react-button-vrt'], hostRoot, context)).toEqual({
      'react-button-vrt': [buttonStories],
      'react-menu-vrt': [menuStories],
    });
    expect(Object.keys(resolveSharedGroups(['react-menu-vrt', 'react-button-vrt'], hostRoot, context))).toEqual([
      'react-button-vrt',
      'react-menu-vrt',
    ]);
  });

  it('rejects empty, duplicate, unknown and non-virtual project selections', () => {
    expect(() => resolveSharedGroups([], hostRoot, context)).toThrow(/nonempty|project/i);
    expect(() => resolveSharedGroups(['react-button-vrt', 'react-button-vrt'], hostRoot, context)).toThrow(
      /duplicate/i,
    );
    expect(() => resolveSharedGroups(['unknown-vrt'], hostRoot, context)).toThrow(/unknown-vrt/);
    expect(() => resolveSharedGroups(['vr-tests-react-components'], hostRoot, context)).toThrow(
      /vr-tests-react-components/,
    );
  });

  it('rejects mismatched graph host metadata or target options and unsafe globs', () => {
    const button = context.projectGraph.nodes['react-button-vrt'].data;
    button.metadata = { visualRegression: { hostRoot: 'apps/other' } };
    expect(() => resolveSharedGroups(['react-button-vrt'], hostRoot, context)).toThrow(/react-button-vrt.*hostRoot/i);
    button.metadata = { visualRegression: { hostRoot } };
    button.targets!['build-vr-storybook'].options!.hostRoot = 'apps/other';
    expect(() => resolveSharedGroups(['react-button-vrt'], hostRoot, context)).toThrow(/react-button-vrt.*hostRoot/i);
    button.targets!['build-vr-storybook'].options!.hostRoot = hostRoot;
    for (const invalid of ['../elsewhere/*.tsx', './src/*.tsx', '/tmp/*.tsx', 'src\\*.tsx', 'src//*.tsx', '']) {
      button.targets!['build-vr-storybook'].options!.stories = [invalid];
      expect(() => resolveSharedGroups(['react-button-vrt'], hostRoot, context)).toThrow(/react-button-vrt.*stor/i);
    }
    button.targets!['build-vr-storybook'].options!.stories = [];
    expect(() => resolveSharedGroups(['react-button-vrt'], hostRoot, context)).toThrow(/react-button-vrt.*stor/i);
  });

  it('assigns only story IDs to their unique owners and ignores docs entries', () => {
    write('src/stories/Button/Secondary.stories.tsx', 'export const Default = 4;');
    writeIndex({
      'menu--default': story('menu--default', './src/stories/Menu/Menu.stories.tsx'),
      'button--secondary': story('button--secondary', './src/stories/Button/Secondary.stories.tsx'),
      'button--default': story('button--default', './src/stories/Button/Button.stories.tsx'),
      'button--docs': { type: 'docs', id: 'button--docs', title: 'Button', name: 'Docs', importPath: './missing.mdx' },
    });
    const groups = resolveSharedGroups(['react-menu-vrt', 'react-button-vrt'], hostRoot, context);
    const manifest = writeSharedManifest(outputPath, hostPath, groups);
    expect(manifest).toEqual({
      hash: expect.stringMatching(/^[a-f0-9]{64}$/),
      groups: {
        'react-button-vrt': ['button--default', 'button--secondary'],
        'react-menu-vrt': ['menu--default'],
      },
    });
    expect(JSON.parse(readFileSync(join(outputPath, 'vrt-shared.json'), 'utf8'))).toEqual(manifest);
  });

  it('rejects stories without an owner, with multiple owners, and groups with no story entries', () => {
    const groups = resolveSharedGroups(['react-button-vrt', 'react-menu-vrt'], hostRoot, context);
    write('src/stories/Elsewhere.stories.tsx', 'export const Default = 3;');
    writeIndex({ 'unknown--default': story('unknown--default', './src/stories/Elsewhere.stories.tsx') });
    expect(() => writeSharedManifest(outputPath, hostPath, groups)).toThrow(/unknown--default.*owner/i);

    writeIndex({ 'button--default': story('button--default', './src/stories/Button/Button.stories.tsx') });
    expect(() => writeSharedManifest(outputPath, hostPath, groups)).toThrow(/react-menu-vrt.*stor/i);

    const overlapping = { ...groups, 'react-menu-vrt': [buttonStories] };
    expect(() => writeSharedManifest(outputPath, hostPath, overlapping)).toThrow(
      /button--default.*(multiple|react-menu-vrt)/i,
    );
  });

  it('rejects invalid index entries, unknown groups and unsafe or symlinked source files', () => {
    const groups = resolveSharedGroups(['react-button-vrt'], hostRoot, context);
    writeIndex({
      'button--default': { ...story('button--default', './src/stories/Button/Button.stories.tsx'), type: 'other' },
    });
    expect(() => writeSharedManifest(outputPath, hostPath, groups)).toThrow(/type/i);
    writeIndex({ 'button--default': story('', './src/stories/Button/Button.stories.tsx') });
    expect(() => writeSharedManifest(outputPath, hostPath, groups)).toThrow(/id/i);
    writeIndex({ 'button--default': story('button--default', '../outside.stories.tsx') });
    expect(() => writeSharedManifest(outputPath, hostPath, groups)).toThrow(/importPath/i);
    writeIndex({ 'button--default': story('button--default', './src/stories/Button/Missing.stories.tsx') });
    expect(() => writeSharedManifest(outputPath, hostPath, groups)).toThrow(/importPath|missing/i);

    writeIndex({ 'button--default': story('button--default', './src/stories/Button/Button.stories.tsx') });
    expect(() => writeSharedManifest(outputPath, hostPath, { 'external-project': [buttonStories] })).toThrow(
      /external-project/,
    );
    expect(() =>
      writeSharedManifest(outputPath, hostPath, { 'unknown-vrt': ['src/stories/Unknown/**/*.stories.tsx'] }),
    ).toThrow(/unknown-vrt.*stor/i);

    rmSync(join(hostPath, 'src/stories/Button/Button.stories.tsx'));
    symlinkSync(
      join(hostPath, 'src/stories/Menu/Menu.stories.tsx'),
      join(hostPath, 'src/stories/Button/Button.stories.tsx'),
    );
    expect(() => writeSharedManifest(outputPath, hostPath, groups)).toThrow(/symlink|importPath|matches no stories/i);
  });

  it('fingerprints compiled files, not manifest ordering or its prior content', () => {
    const groups = resolveSharedGroups(['react-button-vrt', 'react-menu-vrt'], hostRoot, context);
    const first = writeSharedManifest(outputPath, hostPath, {
      ...groups,
      'react-button-vrt': [buttonStories, 'src/stories/Button/Button.stories.tsx'],
    });
    expect(existsSync(join(outputPath, 'vrt-shared.json'))).toBe(true);
    expect(
      writeSharedManifest(outputPath, hostPath, {
        'react-menu-vrt': [menuStories],
        'react-button-vrt': ['src/stories/Button/Button.stories.tsx', buttonStories],
      }).hash,
    ).toBe(first.hash);
    writeFileSync(join(outputPath, 'bundle.js'), 'updated bundle');
    const assetChange = writeSharedManifest(outputPath, hostPath, groups);
    expect(assetChange.hash).not.toBe(first.hash);
    writeIndex({
      'button--default': story('button--default', './src/stories/Button/Button.stories.tsx'),
      'menu--default': story('menu--default', './src/stories/Menu/Menu.stories.tsx'),
    });
    expect(writeSharedManifest(outputPath, hostPath, groups).hash).not.toBe(assetChange.hash);
  });
});
