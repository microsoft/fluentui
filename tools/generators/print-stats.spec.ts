import { addProjectConfiguration, getProjects, logger, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import * as chalk from 'chalk';
import { disableChalk, formatMockedCalls } from '../utils-testing';

import { printStats } from './print-stats';

describe(`print stats`, () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  disableChalk(chalk);

  let tree: Tree;

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();

    addProjectConfiguration(tree, '@proj/pkg-a', {
      root: 'packages/pkg-a',
      projectType: 'library',
      targets: {},
    });
    addProjectConfiguration(tree, '@proj/pkg-b', {
      root: 'packages/pkg-b',
      projectType: 'library',
      targets: {},
    });
    addProjectConfiguration(tree, '@proj/app-a', {
      root: 'apps/app-a',
      projectType: 'application',
      targets: {},
    });
    addProjectConfiguration(tree, '@proj/app-b', {
      root: 'apps/app-b',
      projectType: 'application',
      targets: {},
    });
  });

  it(`should print stats`, () => {
    const loggerInfoSpy = jest.spyOn(logger, 'info');

    printStats(tree, {
      projects: getProjects(tree),
      title: 'IT WORKS',
      isMigratedCheck: (_tree, project) => {
        return project.root === 'packages/pkg-a';
      },
      shouldProcessPackage: (_tree, _project) => {
        return true;
      },
    });

    expect(formatMockedCalls(loggerInfoSpy.mock.calls)).toMatchInlineSnapshot(`
      ">  IT WORKS migration stats:
      Migrated:
      Libs: (1)
      - @proj/pkg-a
      Apps (0):

      Not Migrated:
      Libs (1):
      - @proj/pkg-b
      Apps (2):
      - @proj/app-a
      - @proj/app-b"
    `);
  });

  it(`should use custom formatter`, () => {
    const loggerInfoSpy = jest.spyOn(logger, 'info');

    printStats(tree, {
      projects: getProjects(tree),
      title: 'IT WORKS',
      isMigratedCheck: (_tree, project) => {
        return project.root === 'packages/pkg-a';
      },
      shouldProcessPackage: (_tree, _project) => {
        return true;
      },
      projectInfoFormat: data => {
        return `--- CUSTOM | ${data.root}`;
      },
    });

    expect(formatMockedCalls(loggerInfoSpy.mock.calls)).toMatchInlineSnapshot(`
      ">  IT WORKS migration stats:
      Migrated:
      Libs: (1)
      --- CUSTOM | packages/pkg-a
      Apps (0):

      Not Migrated:
      Libs (1):
      --- CUSTOM | packages/pkg-b
      Apps (2):
      --- CUSTOM | apps/app-a
      --- CUSTOM | apps/app-b"
    `);
  });

  it(`should use custom project data`, () => {
    const loggerInfoSpy = jest.spyOn(logger, 'info');

    const customProjects = new Map(
      Array.from(getProjects(tree).entries()).map(([projectName, project]) => {
        const metadata = { ultimateTruth: 'it iz wat it iiiz' };
        const extendedProject = { ...project, metadata };
        return [projectName, extendedProject] as const;
      }),
    );

    printStats(tree, {
      projects: customProjects,
      title: 'IT WORKS',
      isMigratedCheck: (_tree, project) => {
        return project.root === 'packages/pkg-a';
      },
      shouldProcessPackage: (_tree, _project) => {
        return true;
      },
      projectInfoFormat: data => {
        return `- ${data.root} | ${data.metadata.ultimateTruth}`;
      },
    });

    expect(formatMockedCalls(loggerInfoSpy.mock.calls)).toMatchInlineSnapshot(`
      ">  IT WORKS migration stats:
      Migrated:
      Libs: (1)
      - packages/pkg-a | it iz wat it iiiz
      Apps (0):

      Not Migrated:
      Libs (1):
      - packages/pkg-b | it iz wat it iiiz
      Apps (2):
      - apps/app-a | it iz wat it iiiz
      - apps/app-b | it iz wat it iiiz"
    `);
  });
});
