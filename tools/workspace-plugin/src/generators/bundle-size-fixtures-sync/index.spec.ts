import { type ProjectConfiguration, type Tree, writeJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import ts from 'typescript';

import generator from './index';

/**
 * Barrel walking is covered by `lib/public-exports.spec.ts`.
 */
describe('bundle-size-fixtures-sync generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function setupProject(options: {
    name: string;
    packageName?: string;
    projectConfig?: Partial<ProjectConfiguration>;
    dependencies?: Record<string, string>;
    sourceFiles?: Record<string, string>;
  }) {
    const root = `packages/${options.name}`;

    writeJson(tree, `${root}/project.json`, {
      name: options.name,
      projectType: 'library',
      sourceRoot: `${root}/src`,
      tags: ['vNext', 'platform:web'],
      ...options.projectConfig,
    });

    writeJson(tree, `${root}/package.json`, {
      name: options.packageName ?? `@proj/${options.name}`,
      version: '9.0.0',
      type: 'module',
      dependencies: options.dependencies,
    });

    tree.write(`${root}/src/index.ts`, 'export {};');
    for (const [filePath, contents] of Object.entries(options.sourceFiles ?? {})) {
      tree.write(`${root}/${filePath}`, contents);
    }

    return { root, readFixture: (fileName: string) => tree.read(`${root}/bundle-size/${fileName}`, 'utf-8') };
  }

  describe('entryPoints fixture', () => {
    function setupEntryPointsProject(sourceFiles: Record<string, string>) {
      return setupProject({
        name: 'react-headless',
        packageName: '@proj/react-headless',
        projectConfig: {
          metadata: {
            exportMap: { root: true, subpathEntryPoints: ['src/*.ts'] },
            bundleSizeFixtures: {
              'AllComponents.fixture.js': { kind: 'entryPoints', name: 'react-headless: entire library' },
            },
          },
        },
        sourceFiles,
      });
    }

    it('named imports every value export of every subpath and logs them', async () => {
      const project = setupEntryPointsProject({
        'src/badge.ts': [
          `export { Badge, renderBadge, useBadge } from './components/Badge/index';`,
          `export type { BadgeProps, BadgeState } from './components/Badge/index';`,
        ].join('\n'),
        'src/color-picker.ts': `export const ColorPicker = () => null;\nexport function useColorPicker() {}`,
      });

      await generator(tree);

      expect(project.readFixture('AllComponents.fixture.js')).toMatchInlineSnapshot(`
        "// Named imports only - a namespace import keeps every export name as a string property in the minified output,
        // which no consumer ships, and inflates the measured size.
        import { Badge, renderBadge, useBadge } from '@proj/react-headless/badge';
        import { ColorPicker, useColorPicker } from '@proj/react-headless/color-picker';

        console.log(Badge, renderBadge, useBadge, ColorPicker, useColorPicker);

        export default {
          name: 'react-headless: entire library',
        };
        "
      `);
    });

    it.each([
      {
        scenario: 'ordinary duplicate names',
        sourceFiles: {
          'src/combobox.ts': `export { Combobox, Option } from './components/Combobox/index';`,
          'src/dropdown.ts': `export { Dropdown, Option } from './components/Dropdown/index';`,
        },
        expectedImport: "import {\n  Dropdown,\n  Option as Dropdown_Option,\n} from '@proj/react-headless/dropdown';",
        expectedLog: 'console.log(Combobox, Option, Dropdown, Dropdown_Option);',
      },
      {
        scenario: 'an alias that collides with another exported name',
        sourceFiles: {
          'src/combobox.ts': `export const Option = 1;`,
          'src/dropdown.ts': `export const Option = 1;\nexport const Dropdown_Option = 1;`,
        },
        expectedImport:
          "import {\n  Dropdown_Option,\n  Option as Dropdown_Option2,\n} from '@proj/react-headless/dropdown';",
        expectedLog: 'console.log(Option, Dropdown_Option, Dropdown_Option2);',
      },
    ])('aliases duplicate exports for $scenario', async ({ sourceFiles, expectedImport, expectedLog }) => {
      const project = setupEntryPointsProject(sourceFiles);

      await generator(tree);

      const fixture = project.readFixture('AllComponents.fixture.js')!;
      expect(fixture).toContain(expectedImport);
      expect(fixture).toContain(expectedLog);
    });

    it('imports default function, expression, and re-export values using valid bindings', async () => {
      const project = setupEntryPointsProject({
        'src/default-function.ts': `export default function Widget() {}`,
        'src/default-expression.ts': `export default () => null;`,
        'src/default-reexport.ts': `export { default } from './widget';`,
        'src/default-star.ts': `export * from './widget';`,
        'src/widget.ts': `export default function InternalWidget() {}`,
      });

      await generator(tree);

      const fixture = project.readFixture('AllComponents.fixture.js')!;
      expect(fixture).toContain('default as DefaultExpression_default');
      expect(fixture).toContain('default as DefaultFunction_default');
      expect(fixture).toContain('default as DefaultReexport_default');
      expect(fixture).not.toContain('DefaultStar_default');
      expect(fixture).toContain('console.log(');
      expect(fixture).not.toContain('console.log(default');
      expect(
        ts.transpileModule(fixture, {
          fileName: 'fixture.js',
          compilerOptions: { allowJs: true, module: ts.ModuleKind.ESNext },
          reportDiagnostics: true,
        }).diagnostics,
      ).toEqual([]);
    });

    it('keeps a bare import for a subpath without value exports, so it still has to resolve', async () => {
      const project = setupEntryPointsProject({
        'src/badge.ts': `export { Badge } from './components/Badge/index';`,
        'src/types.ts': `export type { BadgeProps } from './components/Badge/index';`,
      });

      await generator(tree);

      expect(project.readFixture('AllComponents.fixture.js')).toContain("import '@proj/react-headless/types';");
    });

    it('omits the root entry, which would defeat per subpath isolation', async () => {
      const project = setupEntryPointsProject({ 'src/badge.ts': `export const Badge = () => null;` });
      tree.write('packages/react-headless/src/index.ts', `export * from './badge';`);

      await generator(tree);

      expect(project.readFixture('AllComponents.fixture.js')).not.toContain("from '@proj/react-headless'");
    });

    it('picks up a newly added subpath', async () => {
      const project = setupEntryPointsProject({ 'src/badge.ts': `export const Badge = () => null;` });
      await generator(tree);

      tree.write('packages/react-headless/src/tooltip.ts', `export const Tooltip = () => null;`);
      const result = await generator(tree);

      expect(result.outOfSyncMessage).toContain('AllComponents.fixture.js');
      expect(project.readFixture('AllComponents.fixture.js')).toContain("} from '@proj/react-headless/tooltip';");
    });

    it('picks up a newly added export of an existing subpath', async () => {
      const project = setupEntryPointsProject({ 'src/badge.ts': `export const Badge = () => null;` });
      await generator(tree);

      tree.write(
        'packages/react-headless/src/badge.ts',
        `export const Badge = () => null;\nexport const useBadge = () => null;`,
      );
      const result = await generator(tree);

      expect(result.outOfSyncMessage).toContain('AllComponents.fixture.js');
      expect(project.readFixture('AllComponents.fixture.js')).toContain('useBadge');
    });
  });

  describe('entryPoint fixture', () => {
    function setupSingleEntryPointProject(options?: {
      entryPoint?: unknown;
      sourceFiles?: Record<string, string>;
      aggregate?: boolean;
    }) {
      return setupProject({
        name: 'react-headless',
        projectConfig: {
          metadata: {
            exportMap: { root: true, subpathEntryPoints: ['src/**/*.ts', 'src/**/*.tsx'] },
            bundleSizeFixtures: {
              'Calendar.fixture.js': {
                kind: 'entryPoint',
                entryPoint: options && 'entryPoint' in options ? options.entryPoint : './calendar',
                name: 'react-headless: Calendar',
              },
              ...(options?.aggregate
                ? {
                    'AllComponents.fixture.js': { kind: 'entryPoints', name: 'react-headless: entire library' },
                  }
                : {}),
            },
          },
        },
        sourceFiles: options?.sourceFiles ?? {
          'src/calendar.ts': `export const Calendar = () => null;`,
          'src/badge.ts': `export const Badge = () => null;`,
        },
      });
    }

    it('generates one subpath alongside the aggregate and leaves handwritten fixtures alone', async () => {
      const project = setupSingleEntryPointProject({ aggregate: true });
      const handwritten = "console.log('handwritten');\n";
      tree.write(`${project.root}/bundle-size/Manual.fixture.js`, handwritten);

      const result = await generator(tree);

      expect(project.readFixture('Calendar.fixture.js')).toMatchInlineSnapshot(`
        "// Named imports only - a namespace import keeps every export name as a string property in the minified output,
        // which no consumer ships, and inflates the measured size.
        import { Calendar } from '@proj/react-headless/calendar';

        console.log(Calendar);

        export default {
          name: 'react-headless: Calendar',
        };
        "
      `);
      expect(project.readFixture('Calendar.fixture.js')).not.toContain('/badge');
      expect(project.readFixture('Calendar.fixture.js')).not.toContain("from '@proj/react-headless';");
      expect(project.readFixture('AllComponents.fixture.js')).toContain("from '@proj/react-headless/calendar'");
      expect(project.readFixture('AllComponents.fixture.js')).toContain("from '@proj/react-headless/badge'");
      expect(project.readFixture('Manual.fixture.js')).toBe(handwritten);
      expect(result.outOfSyncMessage).toContain('Calendar.fixture.js');
    });

    it('collects sorted runtime exports through barrels, excluding types and star-exported defaults', async () => {
      const project = setupSingleEntryPointProject({
        sourceFiles: {
          'src/calendar.ts': [
            `export * from './components/calendar';`,
            `export { default } from './components/default';`,
            `export type { CalendarProps } from './components/calendar';`,
          ].join('\n'),
          'src/components/calendar.ts': [
            `export const useCalendar = () => null;`,
            `export const Calendar = () => null;`,
            `export type CalendarProps = {};`,
            `export default function UnexportedDefault() {}`,
          ].join('\n'),
          'src/components/default.ts': `export default function CalendarDefault() {}`,
        },
      });

      await generator(tree);

      const fixture = project.readFixture('Calendar.fixture.js')!;
      expect(fixture).toContain("import {\n  Calendar,\n  default as Calendar_default,\n  useCalendar,\n}");
      expect(fixture).toContain('console.log(Calendar, Calendar_default, useCalendar)');
      expect(fixture).not.toContain('CalendarProps');
      expect(fixture).not.toContain('UnexportedDefault');
    });

    it.each([
      { source: 'src/unstable/calendar/index.ts', entryPoint: './unstable/calendar' },
      { source: 'src/calendar.tsx', entryPoint: './calendar' },
      { source: 'src/unstable/calendar/index.tsx', entryPoint: './unstable/calendar' },
    ])('resolves $entryPoint from $source', async ({ source, entryPoint }) => {
      const project = setupSingleEntryPointProject({
        entryPoint,
        sourceFiles: { [source]: 'export const Calendar = () => null;' },
      });

      await generator(tree);

      expect(project.readFixture('Calendar.fixture.js')).toContain(
        `from '@proj/react-headless/${entryPoint.slice(2)}'`,
      );
      expect(project.readFixture('Calendar.fixture.js')).not.toContain('/index');
    });

    it.each(['export default function Calendar() {}', 'export default () => null;'])(
      'imports a direct default value from %s',
      async source => {
        const project = setupSingleEntryPointProject({ sourceFiles: { 'src/calendar.ts': source } });

        await generator(tree);

        expect(project.readFixture('Calendar.fixture.js')).toContain('import { default as Calendar_default }');
        expect(project.readFixture('Calendar.fixture.js')).toContain('console.log(Calendar_default)');
      },
    );

    it('retains a bare import for a type-only entry point', async () => {
      const project = setupSingleEntryPointProject({
        sourceFiles: { 'src/calendar.ts': 'export type CalendarProps = {};' },
      });

      await generator(tree);

      expect(project.readFixture('Calendar.fixture.js')).toContain("import '@proj/react-headless/calendar';");
      expect(project.readFixture('Calendar.fixture.js')).not.toContain('CalendarProps');
      expect(project.readFixture('Calendar.fixture.js')).toContain("name: 'react-headless: Calendar'");
    });

    it('tracks added and removed runtime exports, but not changes to sibling subpaths', async () => {
      const project = setupSingleEntryPointProject();
      await generator(tree);
      expect((await generator(tree)).outOfSyncMessage).toBeUndefined();

      tree.write(`${project.root}/src/calendar.ts`, 'export const NewCalendar = () => null;');
      const updated = await generator(tree);
      expect(updated.outOfSyncMessage).toContain('Calendar.fixture.js');
      expect(project.readFixture('Calendar.fixture.js')).toContain('import { NewCalendar }');
      expect(project.readFixture('Calendar.fixture.js')).not.toContain('import { Calendar }');

      const contents = project.readFixture('Calendar.fixture.js');
      tree.write(`${project.root}/src/badge.ts`, 'export const NewBadge = () => null;');
      expect((await generator(tree)).outOfSyncMessage).toBeUndefined();
      expect(project.readFixture('Calendar.fixture.js')).toBe(contents);
    });

    it('ignores a stale generated package export map', async () => {
      const project = setupSingleEntryPointProject();
      writeJson(tree, `${project.root}/package.json`, {
        name: '@proj/react-headless',
        exports: { '.': './lib/index.js', './badge': './lib/badge.js' },
      });

      await generator(tree);

      expect(project.readFixture('Calendar.fixture.js')).toContain("from '@proj/react-headless/calendar'");
    });

    it.each([
      undefined,
      null,
      42,
      '',
      '.',
      './',
      'calendar',
      '@proj/react-headless/calendar',
      'src/calendar.ts',
      './*',
      './cal?ndar',
      './[calendar]',
      './{calendar,badge}',
      './unstable\\calendar',
      './unstable//calendar',
      './unstable/../calendar',
      '././calendar',
      './calendar/',
    ])('rejects an invalid selector %p without replacing the fixture', async entryPoint => {
      const project = setupSingleEntryPointProject({ entryPoint });
      tree.write(`${project.root}/bundle-size/Calendar.fixture.js`, 'existing fixture');

      await expect(generator(tree)).rejects.toThrow(
        /project "react-headless", fixture "Calendar.fixture.js", entryPoint .*canonical non-root export key/,
      );
      expect(project.readFixture('Calendar.fixture.js')).toBe('existing fixture');
    });

    it('lists valid public keys for an unknown selection', async () => {
      setupSingleEntryPointProject({ entryPoint: './missing' });

      await expect(generator(tree)).rejects.toThrow(
        'entryPoint "./missing": No declared public entry point matches. Valid non-root keys: ./badge, ./calendar.',
      );
    });

    it('reports when no non-root keys are declared', async () => {
      setupSingleEntryPointProject({ sourceFiles: {} });

      await expect(generator(tree)).rejects.toThrow('Valid non-root keys: (none).');
    });

    it('rejects an unreadable selected source without replacing the fixture', async () => {
      const project = setupSingleEntryPointProject();
      tree.write(`${project.root}/bundle-size/Calendar.fixture.js`, 'existing fixture');
      const read = tree.read.bind(tree);
      jest.spyOn(tree, 'read').mockImplementation((path, encoding) => {
        if (path === `${project.root}/src/calendar.ts`) {
          return null;
        }
        return read(path, encoding);
      });

      await expect(generator(tree)).rejects.toThrow(
        'entryPoint "./calendar": Cannot read the source for "packages/react-headless/src/calendar"',
      );
      expect(project.readFixture('Calendar.fixture.js')).toBe('existing fixture');
    });

    it('rejects unresolved star re-exports without replacing the fixture', async () => {
      const project = setupSingleEntryPointProject({
        sourceFiles: { 'src/calendar.ts': `export * from './missing';` },
      });
      tree.write(`${project.root}/bundle-size/Calendar.fixture.js`, 'existing fixture');

      await expect(generator(tree)).rejects.toThrow(
        'project "react-headless", fixture "Calendar.fixture.js", entryPoint "./calendar": Cannot resolve star re-exports:\n' +
          '  - packages/react-headless/src/calendar.ts -> ./missing',
      );
      expect(project.readFixture('Calendar.fixture.js')).toBe('existing fixture');
    });
  });

  describe('baseHooks fixture', () => {
    function setupSuite() {
      setupProject({
        name: 'react-button',
        packageName: '@proj/react-button',
        sourceFiles: {
          'src/index.ts': [
            `export { Button, useButtonBase_unstable, useCompoundButtonBase_unstable } from './Button';`,
            `export type { ButtonProps } from './Button';`,
          ].join('\n'),
        },
      });
      setupProject({
        name: 'react-avatar',
        packageName: '@proj/react-avatar',
        sourceFiles: { 'src/index.ts': `export { useAvatarBase_unstable } from './Avatar';` },
      });
      setupProject({
        name: 'react-theme',
        packageName: '@proj/react-theme',
        sourceFiles: { 'src/index.ts': `export { tokens } from './tokens';` },
      });

      return setupProject({
        name: 'react-components',
        packageName: '@proj/react-components',
        dependencies: {
          '@proj/react-button': '^9.0.0',
          '@proj/react-avatar': '^9.0.0',
          '@proj/react-theme': '^9.0.0',
          '@swc/helpers': '^0.5.1',
        },
        projectConfig: {
          metadata: {
            bundleSizeFixtures: {
              'BaseHooks.fixture.js': { kind: 'baseHooks', name: 'react-components: all base hooks' },
            },
          },
        },
      });
    }

    it('named imports every base hook grouped and sorted by package', async () => {
      const project = setupSuite();

      await generator(tree);

      expect(project.readFixture('BaseHooks.fixture.js')).toMatchInlineSnapshot(`
        "// Named imports only - a namespace import would retain every styled component and defeat the isolation check.
        import { useAvatarBase_unstable } from '@proj/react-avatar';
        import {
          useButtonBase_unstable,
          useCompoundButtonBase_unstable,
        } from '@proj/react-button';

        console.log(
          useAvatarBase_unstable,
          useButtonBase_unstable,
          useCompoundButtonBase_unstable
        );

        export default {
          name: 'react-components: all base hooks',
        };
        "
      `);
    });

    it('picks up a base hook newly exported from a dependency source', async () => {
      const project = setupSuite();
      await generator(tree);

      tree.write(
        'packages/react-avatar/src/index.ts',
        `export { useAvatarBase_unstable, useAvatarGroupBase_unstable } from './Avatar';`,
      );
      const result = await generator(tree);

      expect(result.outOfSyncMessage).toContain('BaseHooks.fixture.js');
      expect(project.readFixture('BaseHooks.fixture.js')).toContain('useAvatarGroupBase_unstable');
    });

    it('imports named hooks and default aliases without importing default-only declaration names', async () => {
      const project = setupSuite();
      tree.write(
        'packages/react-button/src/index.ts',
        [
          `export { useButtonBase_unstable } from './Button';`,
          `export { default as useAliasedBase_unstable } from './Alias';`,
          `export default function useDefaultBase_unstable() {}`,
        ].join('\n'),
      );

      await generator(tree);

      const fixture = project.readFixture('BaseHooks.fixture.js');
      expect(fixture).toContain('useButtonBase_unstable');
      expect(fixture).toContain('useAliasedBase_unstable');
      expect(fixture).not.toContain('useDefaultBase_unstable');
    });

    it('imports destructured hooks reached through a dependency barrel', async () => {
      const project = setupSuite();
      tree.write('packages/react-button/src/index.ts', `export * from './hooks';`);
      tree.write(
        'packages/react-button/src/hooks.ts',
        `export const { useButtonBase_unstable, usePropertyBase_unstable: useAliasedBase_unstable } = hooks;`,
      );

      await generator(tree);

      const fixture = project.readFixture('BaseHooks.fixture.js');
      expect(fixture).toContain('useButtonBase_unstable');
      expect(fixture).toContain('useAliasedBase_unstable');
      expect(fixture).not.toContain('usePropertyBase_unstable');
    });

    it('ignores non workspace dependencies', async () => {
      const project = setupSuite();

      await generator(tree);

      expect(project.readFixture('BaseHooks.fixture.js')).not.toContain('@swc/helpers');
    });
  });

  it.each(['entryPoints', 'entryPoint', 'baseHooks'] as const)(
    'emits valid JavaScript preserving the exact %s fixture name',
    async kind => {
      const name = `headless: user's "components" \\ path\nnext line`;
      const project = setupProject({
        name: 'react-headless',
        projectConfig: {
          metadata: {
            exportMap: { root: true, subpathEntryPoints: ['src/*.ts'] },
            bundleSizeFixtures: { 'Special.fixture.js': { kind, name, entryPoint: './badge' } },
          },
        },
        sourceFiles: { 'src/badge.ts': 'export const Badge = () => null;' },
      });

      await generator(tree);

      const fixture = project.readFixture('Special.fixture.js')!;
      const { diagnostics } = ts.transpileModule(fixture, {
        fileName: 'fixture.js',
        compilerOptions: { allowJs: true, module: ts.ModuleKind.ESNext },
        reportDiagnostics: true,
      });

      expect(diagnostics).toEqual([]);
      expect(fixture).toContain(String.raw`name: 'headless: user\'s "components" \\ path\nnext line',`);
    },
  );

  it('leaves projects without a fixture declaration alone', async () => {
    const project = setupProject({ name: 'react-button' });

    await generator(tree);

    expect(project.readFixture('AllComponents.fixture.js')).toBeNull();
  });

  it('is a no-op on the second run', async () => {
    setupProject({
      name: 'react-headless',
      projectConfig: {
        metadata: {
          exportMap: { root: false, subpathEntryPoints: ['src/*.ts'] },
          bundleSizeFixtures: {
            'AllComponents.fixture.js': { kind: 'entryPoints', name: 'react-headless: entire library' },
          },
        },
      },
      sourceFiles: { 'src/badge.ts': 'export {};' },
    });

    await generator(tree);
    const result = await generator(tree);

    expect(result.outOfSyncMessage).toBeUndefined();
  });
});
