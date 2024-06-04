import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  type Tree,
  type ProjectGraph,
  addProjectConfiguration,
  writeJson,
  joinPathFragments,
  stripIndents,
  readJson,
  updateJson,
  installPackagesTask,
  visitNotIgnoredFiles,
} from '@nrwl/devkit';
import childProcess from 'child_process';

import generator from './index';
import { PackageJson, TsConfig } from '../../types';

const getBlankGraphMock = () => ({
  dependencies: {},
  nodes: {},
  externalNodes: {},
});
let graphMock: ProjectGraph;
const codeownersPath = joinPathFragments('.github', 'CODEOWNERS');

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

jest.mock('@nx/devkit', () => {
  async function createProjectGraphAsyncMock(): Promise<ProjectGraph> {
    return graphMock;
  }

  return {
    ...jest.requireActual('@nx/devkit'),
    installPackagesTask: jest.fn(),
    createProjectGraphAsync: createProjectGraphAsyncMock,
  };
});

describe('prepare-initial-release generator', () => {
  const installPackagesTaskSpy = installPackagesTask as unknown as jest.SpyInstance;
  let execSyncSpy: jest.SpyInstance;
  let tree: Tree;

  beforeEach(() => {
    execSyncSpy = jest.spyOn(childProcess, 'execSync').mockImplementation(
      // @ts-expect-error - no need to mock whole execSync API
      noop,
    );
    // installPackagesTaskSpy = jest.spyOn(devkit, 'installPackagesTask').mockImplementation(noop);
    graphMock = {
      ...getBlankGraphMock(),
    };
    tree = createTreeWithEmptyWorkspace();
    tree.write(codeownersPath, `foo/bar @org/all\n`);
    writeJson<TsConfig>(tree, 'tsconfig.base.v8.json', { compilerOptions: { paths: {} } });
    writeJson<TsConfig>(tree, 'tsconfig.base.v0.json', { compilerOptions: { paths: {} } });
    writeJson<TsConfig>(tree, 'tsconfig.base.all.json', { compilerOptions: { paths: {} } });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe(`assertions`, () => {
    it(`should throw error if executed on invalid project`, async () => {
      createProject(tree, 'react-one-stable', {
        root: 'packages/react-one-stable',
        pkgJson: {
          version: '9.0.0-alpha.0',
        },
      });

      await expect(
        generator(tree, { project: '@proj/react-one-stable', phase: 'stable' }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: @proj/react-one-stable is already prepared for stable release. Please trigger RELEASE pipeline.]`,
      );

      updateJson<PackageJson>(tree, 'packages/react-one-stable/package.json', json => {
        json.version = '9.0.0';
        return json;
      });

      await expect(
        generator(tree, { project: '@proj/react-one-stable', phase: 'stable' }),
      ).rejects.toMatchInlineSnapshot(`[Error: @proj/react-one-stable is already released as stable.]`);
    });

    it(`should throw error if executed with invalid 'phase' option`, async () => {
      createProject(tree, 'react-one-preview', {
        root: 'packages/react-one-preview',
        pkgJson: {
          version: '0.1.0',
        },
      });

      await expect(
        generator(tree, { project: '@proj/react-one-preview', phase: 'compat' }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Invalid phase(compat) option provided. @proj/react-one-preview is a PREVIEW package thus phase needs to be one of 'preview'|'stable'.]`,
      );

      createProject(tree, 'react-one-compat', {
        root: 'packages/react-one-compat',
        tags: ['compat'],
        pkgJson: {
          version: '0.0.1',
        },
      });

      await expect(
        generator(tree, { project: '@proj/react-one-compat', phase: 'preview' }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Invalid phase(preview) option provided. @proj/react-one-compat is a COMPAT package thus phase needs to be 'compat'.]`,
      );
      await expect(
        generator(tree, { project: '@proj/react-one-compat', phase: 'stable' }),
      ).rejects.toMatchInlineSnapshot(
        `[Error: Invalid phase(stable) option provided. @proj/react-one-compat is a COMPAT package thus phase needs to be 'compat'.]`,
      );
    });
  });

  describe(`--phase`, () => {
    describe(`compat`, () => {
      it(`should prepare compat package for initial release`, async () => {
        const utils = {
          project: createProject(tree, 'react-one-compat', {
            root: 'packages/react-one-compat',
            pkgJson: {
              version: '0.0.0',
              private: true,
            },
            renameRoot: false,
          }),
          docsite: createProject(tree, 'public-docsite-v9', {
            root: 'apps/public-docsite-v9',
            pkgJson: { version: '9.0.123', private: true },
            renameRoot: false,
          }),
        };

        const sideEffects = await generator(tree, { project: '@proj/react-one-compat', phase: 'compat' });

        expect(utils.project.pkgJson()).toMatchInlineSnapshot(`
          Object {
            "name": "@proj/react-one-compat",
            "version": "0.0.0",
          }
        `);

        expect(utils.docsite.pkgJson().dependencies).toEqual(
          expect.objectContaining({
            '@proj/react-one-compat': '*',
          }),
        );

        sideEffects();

        const execCalls = getExecSpyCalls(execSyncSpy);

        expect(execCalls.length).toEqual(1);

        expect(execCalls[0].cmd).toMatchInlineSnapshot(
          `"yarn change --message 'feat: release compat package' --type patch --package @proj/react-one-compat"`,
        );
        expect(execCalls[0].args).toMatchInlineSnapshot(
          { cwd: expect.any(String) },
          `
          Object {
            "cwd": Any<String>,
            "stdio": "inherit",
          }
        `,
        );
      });
    });

    describe(`compat - isSplit`, () => {
      it(`should prepare compat package for initial release`, async () => {
        const utils = {
          project: createSplitProject(tree, 'react-one-compat', {
            root: 'packages/react-one-compat',
            pkgJson: {
              version: '0.0.0',
              private: true,
            },
            renameRoot: false,
          }),
          docsite: createProject(tree, 'public-docsite-v9', {
            root: 'apps/public-docsite-v9',
            pkgJson: { version: '9.0.123', private: true },
            renameRoot: false,
          }),
        };

        await generator(tree, { project: '@proj/react-one-compat', phase: 'compat' });

        expect(utils.project.library.pkgJson()).toMatchInlineSnapshot(`
          Object {
            "name": "@proj/react-one-compat",
            "version": "0.0.0",
          }
        `);
        expect(utils.project.stories.pkgJson()).toMatchInlineSnapshot(`
          Object {
            "name": "@proj/react-one-compat-stories",
            "private": true,
            "version": "0.0.0",
          }
        `);

        expect(utils.docsite.pkgJson().dependencies).toEqual(
          expect.objectContaining({
            '@proj/react-one-compat': '*',
          }),
        );
      });
    });

    describe(`preview`, () => {
      it(`should prepare preview package for initial release`, async () => {
        const utils = {
          project: createProject(tree, 'react-one-preview', {
            root: 'packages/react-one-preview',
            pkgJson: {
              version: '0.0.0',
              private: true,
            },
            renameRoot: false,
          }),
          docsite: createProject(tree, 'public-docsite-v9', {
            root: 'apps/public-docsite-v9',
            pkgJson: { version: '9.0.123', private: true },
            renameRoot: false,
          }),
        };

        const sideEffects = await generator(tree, { project: '@proj/react-one-preview', phase: 'preview' });

        expect(utils.project.pkgJson()).toMatchInlineSnapshot(`
          Object {
            "name": "@proj/react-one-preview",
            "version": "0.0.0",
          }
        `);

        expect(utils.docsite.pkgJson().dependencies).toEqual(
          expect.objectContaining({
            '@proj/react-one-preview': '*',
          }),
        );

        sideEffects();

        const execCalls = getExecSpyCalls(execSyncSpy);

        expect(execCalls.length).toEqual(1);

        expect(execCalls[0].cmd).toMatchInlineSnapshot(
          `"yarn change --message 'feat: release preview package' --type minor --package @proj/react-one-preview"`,
        );
        expect(execCalls[0].args).toMatchInlineSnapshot(
          { cwd: expect.any(String) },
          `
          Object {
            "cwd": Any<String>,
            "stdio": "inherit",
          }
        `,
        );
      });
    });

    describe(`preview - isSplit`, () => {
      it(`should prepare preview package for initial release`, async () => {
        const utils = {
          project: createSplitProject(tree, 'react-one-preview', {
            root: 'packages/react-one-preview',
            pkgJson: {
              version: '0.0.0',
              private: true,
            },
            renameRoot: false,
          }),
          docsite: createProject(tree, 'public-docsite-v9', {
            root: 'apps/public-docsite-v9',
            pkgJson: { version: '9.0.123', private: true },
            renameRoot: false,
          }),
        };

        await generator(tree, { project: '@proj/react-one-preview', phase: 'preview' });

        expect(utils.project.library.pkgJson()).toMatchInlineSnapshot(`
          Object {
            "name": "@proj/react-one-preview",
            "version": "0.0.0",
          }
        `);
        expect(utils.project.stories.pkgJson()).toMatchInlineSnapshot(`
          Object {
            "name": "@proj/react-one-preview-stories",
            "private": true,
            "version": "0.0.0",
          }
        `);

        expect(utils.docsite.pkgJson().dependencies).toEqual(
          expect.objectContaining({
            '@proj/react-one-preview': '*',
          }),
        );
      });
    });

    describe(`stable`, () => {
      const projectName = '@proj/react-one-preview';
      type Utils = ReturnType<typeof createProject>;
      const utils = { project: {} as Utils, suite: {} as Utils, docsite: {} as Utils, vrTest: {} as Utils };

      beforeEach(() => {
        utils.project = createProject(tree, 'react-one-preview', {
          root: 'packages/react-one-preview',
          pkgJson: {
            version: '0.12.33',
          },
          files: [
            {
              filePath: 'packages/react-one-preview/src/index.ts',
              content: stripIndents`
                export {One} from './one';
                export type {OneType} from './one';

                export {Two} from './two';
                export type {TwoType} from './two';
          `,
            },
            {
              filePath: 'packages/react-one-preview/bundle-size/index.fixture.js',
              content: stripIndents`
                import {One} from '@proj/react-one-preview';

                console.log(One);

                export default {
                   name: '@proj/react-one-preview - package',
                }
          `,
            },
            {
              filePath: 'packages/react-one-preview/stories/One.stories.tsx',
              content: stripIndents`
            import { One } from '@proj/react-one-preview';

            export const Default = () => <div><One/></div>
          `,
            },
            {
              filePath: 'packages/react-one-preview/stories/index.stories.tsx',
              content: stripIndents`
              import { One } from '@proj/react-one-preview';

              const metadata: ComponentMeta<typeof One> = {
                title: 'Preview Components/One',
                component: One,
              }

              export default metadata;
          `,
            },
          ],
        });
        utils.suite = createProject(tree, 'react-components', {
          root: 'packages/react-components/react-components',
          pkgJson: { version: '9.0.1' },
        });
        utils.docsite = createProject(tree, 'public-docsite-v9', {
          root: 'apps/public-docsite-v9',
          pkgJson: { version: '9.0.123', private: true },
          files: [
            {
              filePath: 'apps/public-docsite-v9/src/example.stories.tsx',
              content: stripIndents`
             import { One } from '${projectName}';
             import * as suite from '@proj/react-components';

             export const Example = () => { return <suite.Root><One/></suite.Root>; }
            `,
            },
          ],
        });
        utils.vrTest = createProject(tree, 'vr-tests-react-components', {
          root: 'apps/vr-tests-react-components',
          pkgJson: { version: '9.0.77', private: true },
          files: [
            {
              filePath: 'apps/vr-tests-react-components/src/stories/One.stories.tsx',
              content: stripIndents`
             import { One } from '${projectName}';
             import * as suite from '@proj/react-components';

             export const VrTest = () => { return <suite.Root><One/></suite.Root>; }
            `,
            },
          ],
        });
      });

      it(`should prepare preview package for stable release`, async () => {
        const sideEffects = await generator(tree, { project: projectName, phase: 'stable' });

        expect(utils.project.pkgJson()).toMatchInlineSnapshot(`
          Object {
            "name": "@proj/react-one",
            "version": "9.0.0-alpha.0",
          }
        `);
        expect(utils.project.projectJson()).toEqual(
          expect.objectContaining({
            name: '@proj/react-one',
            sourceRoot: 'packages/react-one/src',
          }),
        );
        expect(utils.project.jest()).toEqual(expect.stringContaining(`displayName: 'react-one'`));
        expect(utils.project.bundleSize()).toMatchInlineSnapshot(`
          Object {
            "packages/react-one/bundle-size/index.fixture.js": "import { One } from '@proj/react-one';

          console.log(One);

          export default {
          name: '@proj/react-one - package',
          };",
          }
        `);
        expect(utils.project.md.readme()).toMatchInlineSnapshot(`
          "# @proj/react-one

          **React Tags components for [Fluent UI React](https://react.fluentui.dev/)**

          These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.
          "
        `);
        expect(utils.project.md.api()).toMatchInlineSnapshot(`
          "## API Report File for \\"@proj/react-one\\"

          > Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).
          "
        `);
        expect(tree.read('packages/react-one/stories/One.stories.tsx', 'utf-8')).toMatchInlineSnapshot(`
          "import { One } from '@proj/react-components';

          export const Default = () => (
            <div>
              <One />
            </div>
          );
          "
        `);
        expect(tree.read('packages/react-one/stories/index.stories.tsx', 'utf-8')).toMatchInlineSnapshot(`
          "import { One } from '@proj/react-components';

          const metadata: ComponentMeta<typeof One> = {
            title: 'Components/One',
            component: One,
          };

          export default metadata;
          "
        `);

        expect(tree.children('packages/react-one-preview')).toEqual([]);

        expect(utils.project.global.codeowners()).toEqual(
          expect.stringContaining('packages/react-one @org/universe @johnwick'),
        );
        expect(utils.project.global.tsBase().compilerOptions.paths).toEqual(
          expect.objectContaining({
            '@proj/react-one': ['packages/react-one/src/index.ts'],
          }),
        );
        expect(utils.project.global.tsBaseAll().compilerOptions.paths).toEqual(
          expect.objectContaining({
            '@proj/react-one': ['packages/react-one/src/index.ts'],
          }),
        );

        // project updates

        // v9 docsite
        expect(utils.docsite.pkgJson().dependencies).not.toEqual(
          expect.objectContaining({ '@proj/react-one-preview': '*' }),
        );
        expect(tree.read('apps/public-docsite-v9/src/example.stories.tsx', 'utf-8')).toEqual(
          expect.stringContaining(stripIndents`
            import { One } from '@proj/react-components';
            import * as suite from '@proj/react-components';
        `),
        );

        // v9 vr-tests
        const vrTestDeps = utils.vrTest.pkgJson().dependencies ?? {};
        expect(vrTestDeps).toEqual(expect.objectContaining({ '@proj/react-one': '>=9.0.0-alpha' }));
        expect(vrTestDeps[projectName]).toEqual(undefined);
        expect(tree.read('apps/vr-tests-react-components/src/stories/One.stories.tsx', 'utf-8')).toEqual(
          expect.stringContaining(stripIndents`
            import { One } from '@proj/react-one';
            import * as suite from '@proj/react-components';
        `),
        );

        // react-components suite
        expect(utils.suite.pkgJson().dependencies).toEqual(
          expect.objectContaining({ '@proj/react-one': '9.0.0-alpha.0' }),
        );
        expect(tree.read('packages/react-components/react-components/src/index.ts', 'utf-8')).toEqual(
          expect.stringContaining(stripIndents`
            export { One, Two } from '@proj/react-one';
            export type { OneType, TwoType } from '@proj/react-one';
        `),
        );

        sideEffects();

        const execCalls = getExecSpyCalls(execSyncSpy);

        expect(execCalls.length).toEqual(3);

        expect(execCalls[0].cmd).toMatchInlineSnapshot(
          `"yarn change --message 'feat: release stable' --type minor --package @proj/react-one"`,
        );
        expect(execCalls[0].args).toMatchInlineSnapshot(
          { cwd: expect.any(String) },
          `
          Object {
            "cwd": Any<String>,
            "stdio": "inherit",
          }
        `,
        );

        expect(execCalls[1].cmd).toMatchInlineSnapshot(
          `"yarn change --message 'feat: add @proj/react-one to suite' --type minor --package @proj/react-components"`,
        );
        expect(execCalls[1].args).toMatchInlineSnapshot(
          { cwd: expect.any(String) },
          `
          Object {
            "cwd": Any<String>,
            "stdio": "inherit",
          }
        `,
        );

        expect(execCalls[2].cmd).toMatchInlineSnapshot(`"yarn lage generate-api --to @proj/react-components"`);
        expect(execCalls[2].args).toMatchInlineSnapshot(
          { cwd: expect.any(String) },
          `
          Object {
            "cwd": Any<String>,
            "stdio": "inherit",
          }
        `,
        );

        expect(installPackagesTaskSpy).toHaveBeenCalled();
      });

      it(`should update also other packages besides known ones if preview was used there`, async () => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const utils = createProject(tree, 'react-another-app', {
          root: 'apps/react-another-app',
          pkgJson: { version: '9.2.0', dependencies: { '@proj/react-one-preview': '*' } },
          files: [
            {
              filePath: 'apps/react-another-app/src/index.ts',
              content: stripIndents`
          import * as React from 'react';
          import { One } from '@proj/react-one-preview';
          `,
            },
          ],
        });

        await generator(tree, { project: projectName, phase: 'stable' });

        const dependencies = utils.pkgJson().dependencies ?? {};
        expect(dependencies[projectName]).toEqual(undefined);
        expect(dependencies).toEqual(
          expect.objectContaining({
            '@proj/react-components': '*',
          }),
        );

        expect(tree.read('apps/react-another-app/src/index.ts', 'utf-8')).toEqual(
          expect.stringContaining(stripIndents`
            import { One } from '@proj/react-components';
        `),
        );
      });
    });

    describe(`stable - isSplit`, () => {
      const projectName = '@proj/react-one-preview';

      type Utils = ReturnType<typeof createProject>;
      const utils = {
        project: { library: {} as Utils, stories: {} as Utils },
        suite: {} as Utils,
        docsite: {} as Utils,
        vrTest: {} as Utils,
      };

      beforeEach(() => {
        utils.project = createSplitProject(tree, 'react-one-preview', {
          root: 'packages/react-one-preview',
          pkgJson: {
            version: '0.12.33',
          },
          files: {
            library: [],
            stories: [
              {
                filePath: 'packages/react-one-preview/library/bundle-size/index.fixture.js',
                content: stripIndents`
                import {One} from '@proj/react-one-preview';

                console.log(One);

                export default {
                   name: '@proj/react-one-preview - package',
                }
          `,
              },
              {
                filePath: 'packages/react-one-preview/stories/src/One.stories.tsx',
                content: stripIndents`
            import { One } from '@proj/react-one-preview';

            export const Default = () => <div><One/></div>
          `,
              },
              {
                filePath: 'packages/react-one-preview/stories/src/index.stories.tsx',
                content: stripIndents`
              import { One } from '@proj/react-one-preview';

              const metadata: ComponentMeta<typeof One> = {
                title: 'Preview Components/One',
                component: One,
              }

              export default metadata;
          `,
              },
            ],
          },
        });

        utils.suite = createProject(tree, 'react-components', {
          root: 'packages/react-components/react-components',
          pkgJson: { version: '9.0.1' },
        });
        utils.docsite = createProject(tree, 'public-docsite-v9', {
          root: 'apps/public-docsite-v9',
          pkgJson: { version: '9.0.123', private: true },
          files: [
            {
              filePath: 'apps/public-docsite-v9/src/example.stories.tsx',
              content: stripIndents`
             import { One } from '${projectName}';
             import * as suite from '@proj/react-components';

             export const Example = () => { return <suite.Root><One/></suite.Root>; }
            `,
            },
          ],
        });
        utils.vrTest = createProject(tree, 'vr-tests-react-components', {
          root: 'apps/vr-tests-react-components',
          pkgJson: { version: '9.0.77', private: true },
          files: [
            {
              filePath: 'apps/vr-tests-react-components/src/stories/One.stories.tsx',
              content: stripIndents`
             import { One } from '${projectName}';
             import * as suite from '@proj/react-components';

             export const VrTest = () => { return <suite.Root><One/></suite.Root>; }
            `,
            },
          ],
        });
      });

      it(`should prepare preview package for stable release`, async () => {
        const treeStructureBefore = {
          host: tree.children('packages/react-one-preview'),
          library: tree.children('packages/react-one-preview/library'),
          stories: tree.children('packages/react-one-preview/stories'),
        };
        expect(treeStructureBefore.host).toEqual(['library', 'stories']);

        await generator(tree, { project: projectName, phase: 'stable' });

        const treeStructureAfter = {
          host: tree.children('packages/react-one'),
          library: tree.children('packages/react-one/library'),
          stories: tree.children('packages/react-one/stories'),
        };

        expect(treeStructureAfter).toEqual(treeStructureBefore);
        expect(tree.children('packages/react-one-preview')).toEqual([]);

        expect(utils.project.library.projectJson()).toEqual(
          expect.objectContaining({
            name: '@proj/react-one',
            sourceRoot: 'packages/react-one/library/src',
          }),
        );
        expect(utils.project.stories.projectJson()).toEqual(
          expect.objectContaining({
            name: '@proj/react-one-stories',
            sourceRoot: 'packages/react-one/stories/src',
          }),
        );

        expect(utils.project.library.bundleSize()).toMatchInlineSnapshot(`
          Object {
            "packages/react-one/library/bundle-size/index.fixture.js": "import { One } from '@proj/react-one';

          console.log(One);

          export default {
          name: '@proj/react-one - package',
          };",
          }
        `);

        expect(utils.project.library.md.readme()).toMatchInlineSnapshot(`
          "# @proj/react-one

          **React Tags components for [Fluent UI React](https://react.fluentui.dev/)**

          These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.
          "
        `);
        expect(utils.project.stories.md.readme()).toMatchInlineSnapshot(`
          "# @fluentui/react-one-stories

          Storybook stories for packages/react-components/react-one-stories

          ## Usage

          To include within storybook specify stories globs:

          \\\\\`\\\\\`\\\\\`js
          module.exports = {
          stories: ['../packages/react-components/react-one-stories/stories/src/**/*.stories.mdx', '../packages/react-components/react-one-stories/stories/src/**/index.stories.@(ts|tsx)'],
          }
          \\\\\`\\\\\`\\\\\`
          "
        `);

        expect(tree.read('packages/react-one/stories/src/One.stories.tsx', 'utf-8')).toMatchInlineSnapshot(`
          "import { One } from '@proj/react-components';

          export const Default = () => (
            <div>
              <One />
            </div>
          );
          "
        `);
        expect(tree.read('packages/react-one/stories/src/index.stories.tsx', 'utf-8')).toMatchInlineSnapshot(`
          "import { One } from '@proj/react-components';

          const metadata: ComponentMeta<typeof One> = {
            title: 'Components/One',
            component: One,
          };

          export default metadata;
          "
        `);

        expect(utils.project.library.global.codeowners()).toEqual(
          expect.stringContaining(stripIndents`
            packages/react-one/library @org/universe @johnwick
            packages/react-one/stories @org/universe @johnwick
          `),
        );
        expect(utils.project.library.global.tsBase().compilerOptions.paths).toEqual(
          expect.objectContaining({
            '@proj/react-one': ['packages/react-one/library/src/index.ts'],
            '@proj/react-one-stories': ['packages/react-one/stories/src/index.ts'],
          }),
        );
        expect(utils.project.library.global.tsBaseAll().compilerOptions.paths).toEqual(
          expect.objectContaining({
            '@proj/react-one': ['packages/react-one/library/src/index.ts'],
            '@proj/react-one-stories': ['packages/react-one/stories/src/index.ts'],
          }),
        );
      });
    });
  });
});

function createSplitProject(
  tree: Tree,
  projectName: string,
  options: {
    root: string;
    pkgJson: Partial<PackageJson>;
    files?: {
      library: Array<{ filePath: string; content: string }>;
      stories: Array<{ filePath: string; content: string }>;
    };
    tags?: string[];
    renameRoot?: boolean;
  },
) {
  // library
  const libraryProject = { root: options.root + '/library' };
  const library = createProject(tree, projectName, {
    ...options,
    root: libraryProject.root,
    files: options.files?.library,
  });

  // stories
  const storiesProjectName = `${projectName}-stories`;
  const storiesProject = { root: options.root + '/stories' };

  const stories = createProject(tree, storiesProjectName, {
    ...options,
    root: storiesProject.root,
    files: [
      ...(options.files?.stories ?? []),
      {
        filePath: joinPathFragments(storiesProject.root, 'README.md'),
        content: stripIndents`
        # @fluentui/${storiesProjectName}

        Storybook stories for packages/react-components/${storiesProjectName}

        ## Usage

        To include within storybook specify stories globs:

        \`\`\`js
        module.exports = {
        stories: ['../packages/react-components/${storiesProjectName}/stories/src/**/*.stories.mdx', '../packages/react-components/${storiesProjectName}/stories/src/**/index.stories.@(ts|tsx)'],
        }
        \`\`\`
    `,
      },
    ],
  });

  return {
    library,
    stories,
  };
}

function createProject(
  tree: Tree,
  projectName: string,
  options: {
    root: string;
    pkgJson: Partial<PackageJson>;
    files?: Array<{ filePath: string; content: string }>;
    renameRoot?: boolean;
    tags?: string[];
  },
) {
  const projectType = options.root.startsWith('apps/') ? 'application' : 'library';
  const npmName = `@proj/${projectName}`;
  const pkgJsonPath = joinPathFragments(options.root, 'package.json');
  const sourceRoot = joinPathFragments(options.root, 'src');
  const indexFile = joinPathFragments(sourceRoot, 'index.ts');
  const jestPath = joinPathFragments(options.root, 'jest.config.js');
  const readmePath = joinPathFragments(options.root, 'README.md');
  const apiMdPath = joinPathFragments(options.root, `etc/${projectName}.api.md`);
  const tsConfigBaseAllPath = 'tsconfig.base.all.json';
  const tsConfigBasePath = 'tsconfig.base.json';

  writeJson(tree, pkgJsonPath, {
    ...options.pkgJson,
    name: npmName,
  });

  addProjectConfiguration(tree, npmName, { root: options.root, sourceRoot, tags: ['vNext', ...(options.tags ?? [])] });

  tree.write(
    indexFile,
    stripIndents`
    export {};
  `,
  );

  tree.write(
    readmePath,
    stripIndents`
  # ${npmName}

**React Tags components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

  `,
  );
  tree.write(
    apiMdPath,
    stripIndents`
  ## API Report File for "${npmName}"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).
  `,
  );
  tree.write(
    jestPath,
    stripIndents`
    module.exports = {
      displayName: '${projectName}',
    };
  `,
  );

  const currentCodeowners = tree.read(codeownersPath, 'utf-8');
  const updatedCodeowners = currentCodeowners + `${options.root} @org/universe @johnwick\n`;
  tree.write(codeownersPath, updatedCodeowners);
  updateJson<TsConfig>(tree, tsConfigBasePath, json => {
    json.compilerOptions.paths![npmName] = [indexFile];
    return json;
  });
  updateJson<TsConfig>(tree, tsConfigBaseAllPath, json => {
    json.compilerOptions.paths![npmName] = [indexFile];
    return json;
  });

  const depKeys = [...Object.keys(options.pkgJson.dependencies ?? {})];

  graphMock.dependencies[npmName] = depKeys.map(value => {
    return { source: npmName, target: value, type: 'static' };
  });
  graphMock.nodes[npmName] = {
    name: npmName,
    type: projectType === 'library' ? 'lib' : 'app',
    data: { name: npmName, root: npmName },
  };

  if (options.files) {
    options.files.forEach(fileEntry => {
      tree.write(fileEntry.filePath, fileEntry.content);
    });
  }

  const newRoot = options.renameRoot === false ? options.root : options.root.replace('-preview', '');

  return {
    pkgJson: () => {
      return readJson<PackageJson>(tree, joinPathFragments(newRoot, 'package.json'));
    },
    projectJson: () => {
      return readJson(tree, joinPathFragments(newRoot, 'project.json'));
    },
    jest: () => {
      return tree.read(joinPathFragments(newRoot, 'jest.config.js'), 'utf-8');
    },
    md: {
      readme: () => tree.read(joinPathFragments(newRoot, 'README.md'), 'utf-8'),
      api: () => tree.read(joinPathFragments(newRoot, `etc/${projectName.replace('-preview', '')}.api.md`), 'utf-8'),
    },
    bundleSize: () => {
      const root = joinPathFragments(newRoot, 'bundle-size');
      const contents: Record<string, string> = {};

      visitNotIgnoredFiles(tree, root, file => {
        contents[file] = stripIndents`${tree.read(file, 'utf-8')}` ?? '';
      });

      return contents;
    },
    global: {
      tsBase: () => readJson<TsConfig>(tree, tsConfigBasePath),
      tsBaseAll: () => readJson<TsConfig>(tree, tsConfigBaseAllPath),
      codeowners: () => tree.read(codeownersPath, 'utf-8'),
    },
  };
}

function getExecSpyCalls(spy: jest.SpyInstance) {
  const execSyncCalls = spy.mock.calls;

  const normalized = execSyncCalls.map(call => {
    return {
      cmd: call[0],
      args: call[1],
    };
  });

  return normalized;
}
