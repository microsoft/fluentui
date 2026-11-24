import { type CreateDependenciesContext, type CreateNodesContext, serializeJson } from '@nx/devkit';

import { TempFs } from './testing-utils';
import { createDependencies, createNodesV2 } from './visual-regression-plugin';

const hostRoot = 'apps/vr-tests-react-components';
const manifestPath = `${hostRoot}/visual-regression.config.json`;
const buttonRoot = 'packages/react-components/react-button';
const menuRoot = 'packages/react-components/react-menu';
const groups = {
  'react-button': { packageRoot: buttonRoot, stories: ['src/stories/Button/**/*.stories.tsx'] },
  'react-menu': { packageRoot: menuRoot, stories: ['src/stories/Menu/**/*.stories.tsx'] },
};

describe('visual-regression-plugin', () => {
  const [, createNodes] = createNodesV2;
  let tempFs: TempFs;
  let cwd: string;
  let context: CreateNodesContext;

  beforeEach(async () => {
    tempFs = new TempFs('vrt-plugin');
    cwd = process.cwd();
    process.chdir(tempFs.tempDir);
    context = { workspaceRoot: tempFs.tempDir, nxJsonConfiguration: {}, configFiles: [] };
    await tempFs.createFiles({
      [`${hostRoot}/project.json`]: serializeJson({ name: 'vr-tests-react-components' }),
      [`${hostRoot}/tsconfig.json`]: serializeJson({
        compilerOptions: {
          baseUrl: '../..',
          moduleResolution: 'node',
          allowJs: true,
          paths: {
            '@fluentui/react-button': [`${buttonRoot}/library/src/index.ts`],
            '@fluentui/react-menu': [`${menuRoot}/library/src/index.ts`],
            '@fluentui/react-storybook-addon': ['packages/react-components/react-storybook-addon/src/index.ts'],
          },
        },
      }),
      [`${buttonRoot}/library/project.json`]: serializeJson({ name: 'react-button' }),
      [`${buttonRoot}/library/src/index.ts`]: 'export const Button = 1;',
      [`${menuRoot}/library/project.json`]: serializeJson({ name: 'react-menu' }),
      [`${menuRoot}/library/src/index.ts`]: 'export const Menu = 1;',
      [`${hostRoot}/src/stories/Button/Button.stories.tsx`]: "import './helper'; export const Default = 1;",
      [`${hostRoot}/src/stories/Button/helper.ts`]:
        "import { Button } from '@fluentui/react-button'; import './nested'; export { Button };",
      [`${hostRoot}/src/stories/Button/nested.ts`]: "import { Menu } from '@fluentui/react-menu'; export { Menu };",
      [`${hostRoot}/src/stories/Menu/Menu.stories.tsx`]:
        "import { Menu } from '@fluentui/react-menu'; export { Menu };",
      [`${hostRoot}/.storybook/main.js`]:
        "const { loadWorkspaceAddon } = require('./utils'); loadWorkspaceAddon('@fluentui/react-storybook-addon');",
      [`${hostRoot}/.storybook/utils.js`]: 'exports.loadWorkspaceAddon = () => {};',
      'packages/react-components/react-storybook-addon/src/index.ts': 'export const addon = 1;',
      [manifestPath]: serializeJson({ groups }),
    });
  });

  afterEach(() => {
    tempFs.cleanup();
    process.chdir(cwd);
  });

  it('rejects missing and multiply owned stories with actionable errors', async () => {
    tempFs.writeFile(manifestPath, serializeJson({ groups: { 'react-button': groups['react-button'] } }));
    await expect(createNodes([manifestPath], undefined, context)).rejects.toMatchObject({
      errors: [[manifestPath, expect.objectContaining({ message: expect.stringMatching(/Menu\.stories\.tsx/) })]],
    });

    tempFs.writeFile(
      manifestPath,
      serializeJson({
        groups: {
          ...groups,
          'react-menu': { ...groups['react-menu'], stories: ['src/stories/**/*.stories.tsx'] },
        },
      }),
    );
    await expect(createNodes([manifestPath], undefined, context)).rejects.toMatchObject({
      errors: [
        [
          manifestPath,
          expect.objectContaining({
            message: expect.stringMatching(/Button\.stories\.tsx.*react-button.*react-menu/s),
          }),
        ],
      ],
    });
  });

  it('rejects groups that no longer select a story', async () => {
    tempFs.writeFile(
      manifestPath,
      serializeJson({
        groups: {
          ...groups,
          'react-unused': {
            packageRoot: 'packages/react-components/react-unused',
            stories: ['src/stories/Unused/**/*.stories.tsx'],
          },
        },
      }),
    );
    await expect(createNodes([manifestPath], undefined, context)).rejects.toMatchObject({
      errors: [
        [manifestPath, expect.objectContaining({ message: expect.stringMatching(/react-unused matches no stories/) })],
      ],
    });
  });

  it('creates distinct virtual targets and scoped named inputs', async () => {
    const result = await createNodes([manifestPath], undefined, context);
    const projects = result[0][1].projects!;
    const project = projects[`${buttonRoot}/visual-regression`];
    const build = project.targets!['build-vr-storybook'];
    const capture = project.targets!['test-vr-granular'];

    expect(Object.keys(projects).filter(root => root !== hostRoot)).toHaveLength(2);
    expect(project.name).toBe('react-button-vrt');
    expect(project.root).toBe(`${buttonRoot}/visual-regression`);
    expect(project.metadata?.visualRegression).toEqual({
      hostProject: 'vr-tests-react-components',
      hostRoot,
      screenshotsPath: `${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`,
    });
    expect(build).toMatchObject({
      executor: '@fluentui/workspace-plugin:visual-regression',
      cache: true,
      options: {
        mode: 'build',
        hostRoot,
        stories: groups['react-button'].stories,
        outputPath: `${hostRoot}/dist/visual-regression/react-button-vrt/storybook`,
      },
      outputs: [`{workspaceRoot}/${hostRoot}/dist/visual-regression/react-button-vrt/storybook`],
      dependsOn: [{ projects: ['react-storybook-addon'], target: 'build' }],
    });
    expect(capture).toMatchObject({
      executor: '@fluentui/workspace-plugin:visual-regression',
      cache: true,
      dependsOn: ['build-vr-storybook'],
      options: {
        mode: 'capture',
        hostRoot,
        stories: groups['react-button'].stories,
        concurrency: 1,
        storybookPath: build.options!.outputPath,
        outputPath: `${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`,
      },
      outputs: [`{workspaceRoot}/${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`],
    });
    expect(build.outputs).not.toContain(`{workspaceRoot}/${hostRoot}/dist/visual-regression/_shared/storybook`);
    expect(capture.outputs).not.toContain(`{workspaceRoot}/${hostRoot}/dist/visual-regression/_shared/storybook`);
    expect(capture.dependsOn).not.toContain('build-vr-storybook-shared');
    expect(build.inputs).toEqual(expect.arrayContaining(['vrt', '^production']));
    expect(project.namedInputs?.vrt).toEqual(
      expect.arrayContaining([
        `{workspaceRoot}/${manifestPath}`,
        `{workspaceRoot}/${hostRoot}/src/stories/Button/**/*.stories.tsx`,
        `{workspaceRoot}/${hostRoot}/src/stories/Button/helper.ts`,
        `{workspaceRoot}/${hostRoot}/src/stories/Button/nested.ts`,
        `{workspaceRoot}/${hostRoot}/.storybook/**`,
        `{workspaceRoot}/${hostRoot}/src/utilities/**`,
      ]),
    );
    expect(project.namedInputs?.vrt).not.toContain(`{workspaceRoot}/${hostRoot}/src/stories/Menu/**/*.stories.tsx`);
  });

  it('creates one host-owned shared build using the union of group inputs without selecting projects at inference time', async () => {
    const result = await createNodes([manifestPath], undefined, context);
    const projects = result[0][1].projects!;
    const host = projects[hostRoot];
    const shared = host.targets?.['build-vr-storybook-shared'];
    const output = `{workspaceRoot}/${hostRoot}/dist/visual-regression/_shared/storybook`;

    expect(Object.keys(projects)).toHaveLength(3);
    expect(host.metadata?.visualRegression).toBeUndefined();
    expect(shared).toMatchObject({
      executor: '@fluentui/workspace-plugin:visual-regression',
      cache: true,
      parallelism: false,
      inputs: [
        'vrt-shared',
        '^production',
        ...projects[`${buttonRoot}/visual-regression`].targets!['build-vr-storybook'].inputs!.slice(2),
      ],
      outputs: [output],
      dependsOn: [{ projects: ['react-storybook-addon'], target: 'build' }],
      options: {
        mode: 'build-shared',
        hostRoot,
        outputPath: `${hostRoot}/dist/visual-regression/_shared/storybook`,
      },
    });
    expect(shared?.options).not.toHaveProperty('stories');
    expect(shared?.options).not.toHaveProperty('projects');
    expect(host.namedInputs?.['vrt-shared']).toEqual([
      ...new Set([
        ...projects[`${buttonRoot}/visual-regression`].namedInputs!.vrt,
        ...projects[`${menuRoot}/visual-regression`].namedInputs!.vrt,
      ]),
    ]);
    expect(host.namedInputs?.['vrt-shared']).toEqual(
      expect.arrayContaining([
        `{workspaceRoot}/${manifestPath}`,
        `{workspaceRoot}/${hostRoot}/src/stories/Button/**/*.stories.tsx`,
        `{workspaceRoot}/${hostRoot}/src/stories/Menu/**/*.stories.tsx`,
        `{workspaceRoot}/${hostRoot}/src/stories/Button/helper.ts`,
        `{workspaceRoot}/${hostRoot}/src/stories/Button/nested.ts`,
        `{workspaceRoot}/${hostRoot}/.storybook/**`,
        `{workspaceRoot}/${hostRoot}/src/utilities/**`,
        '{workspaceRoot}/yarn.lock',
        '{workspaceRoot}/tools/workspace-plugin/src/executors/visual-regression/**',
      ]),
    );
    for (const root of [`${buttonRoot}/visual-regression`, `${menuRoot}/visual-regression`]) {
      expect(projects[root].targets?.['build-vr-storybook'].outputs).not.toContain(output);
      expect(projects[root].targets?.['test-vr-granular'].outputs).not.toContain(output);
      expect(projects[root].targets?.['test-vr-granular'].dependsOn).toEqual(['build-vr-storybook']);
    }
  });

  it('links real imported packages through a local helper and shared addon without linking the host', async () => {
    const result = await createNodes([manifestPath], undefined, context);
    const nodes = result[0][1].projects!;
    const dependencies = createDependencies(undefined, {
      workspaceRoot: tempFs.tempDir,
      externalNodes: {},
      nxJsonConfiguration: {},
      fileMap: { projectFileMap: {}, nonProjectFiles: [] },
      filesToProcess: { projectFileMap: {}, nonProjectFiles: [] },
      projects: {
        'react-button-vrt': { ...nodes[`${buttonRoot}/visual-regression`], root: `${buttonRoot}/visual-regression` },
        'react-menu-vrt': { ...nodes[`${menuRoot}/visual-regression`], root: `${menuRoot}/visual-regression` },
        'react-button': { name: 'react-button', root: `${buttonRoot}/library` },
        'react-menu': { name: 'react-menu', root: `${menuRoot}/library` },
        'react-storybook-addon': {
          name: 'react-storybook-addon',
          root: 'packages/react-components/react-storybook-addon',
        },
        'vr-tests-react-components': { ...nodes[hostRoot], name: 'vr-tests-react-components', root: hostRoot },
      },
    } satisfies CreateDependenciesContext);
    const buttonTargets = dependencies.filter(edge => edge.source === 'react-button-vrt').map(edge => edge.target);

    expect(buttonTargets).toEqual(expect.arrayContaining(['react-button', 'react-menu', 'react-storybook-addon']));
    expect(buttonTargets).not.toContain('vr-tests-react-components');
    expect(dependencies.every(edge => edge.source !== 'vr-tests-react-components')).toBe(true);
    expect(dependencies.every(edge => edge.type === 'implicit' && !('sourceFile' in edge))).toBe(true);
  });

  it('tracks preview source without depending on the entire docs addon', async () => {
    const previewSource = 'packages/react-components/react-storybook-addon/src/decorators/preview.ts';
    await tempFs.createFiles({
      [`${hostRoot}/.storybook/preview-granular.ts`]:
        "export { preview } from '../../../packages/react-components/react-storybook-addon/src/decorators/preview';",
      [previewSource]: "import { Menu } from '@fluentui/react-menu'; export const preview = Menu;",
      [manifestPath]: serializeJson({ groups, addons: [], previewAnnotations: ['.storybook/preview-granular.ts'] }),
    });
    const result = await createNodes([manifestPath], undefined, context);
    const nodes = result[0][1].projects!;
    expect(nodes[`${buttonRoot}/visual-regression`].namedInputs?.vrt).toContain(`{workspaceRoot}/${previewSource}`);
    expect(nodes[`${buttonRoot}/visual-regression`].targets?.['build-vr-storybook'].options).toMatchObject({
      addons: [],
      previewAnnotations: ['.storybook/preview-granular.ts'],
    });
    expect(nodes[hostRoot].targets?.['build-vr-storybook-shared']).toMatchObject({
      dependsOn: [],
      options: { addons: [], previewAnnotations: ['.storybook/preview-granular.ts'] },
    });
    expect(nodes[hostRoot].namedInputs?.['vrt-shared']).toContain(`{workspaceRoot}/${previewSource}`);
    const dependencies = createDependencies(undefined, {
      workspaceRoot: tempFs.tempDir,
      externalNodes: {},
      nxJsonConfiguration: {},
      fileMap: { projectFileMap: {}, nonProjectFiles: [] },
      filesToProcess: { projectFileMap: {}, nonProjectFiles: [] },
      projects: {
        'react-button-vrt': { ...nodes[`${buttonRoot}/visual-regression`], root: `${buttonRoot}/visual-regression` },
        'react-button': { name: 'react-button', root: `${buttonRoot}/library` },
        'react-menu': { name: 'react-menu', root: `${menuRoot}/library` },
        'react-storybook-addon': {
          name: 'react-storybook-addon',
          root: 'packages/react-components/react-storybook-addon',
        },
      },
    } satisfies CreateDependenciesContext);
    expect(dependencies.map(edge => edge.target)).toContain('react-menu');
    expect(dependencies.map(edge => edge.target)).not.toContain('react-storybook-addon');
  });
});
