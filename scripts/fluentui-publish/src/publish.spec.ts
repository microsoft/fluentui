/* eslint-disable @typescript-eslint/no-empty-function */
import { joinPathFragments, output, readJsonFile, workspaceRoot } from '@nx/devkit';
import { releasePublish } from 'nx/release';

import { publish } from './publish';
import { getLatestTag, gitPush, gitTag } from './utils';

const noop = () => {};

jest.mock('nx/release', () => {
  return {
    __esModule: true,
    releasePublish: jest.fn(async () => {}),
  };
});

jest.mock('./utils', () => {
  const originalModule = jest.requireActual('./utils');
  return {
    __esModule: true,
    ...originalModule,
    gitPush: jest.fn(async () => {}),
    gitTag: jest.fn(async () => {}),
    getLatestTag: jest.fn(async arg => {
      return originalModule.getLatestTag(arg);
    }),
  };
});

describe(`publish`, () => {
  const nxConfig = readJsonFile(joinPathFragments(workspaceRoot, 'nx.json'));

  beforeEach(() => {
    jest.spyOn(output, 'logSingleLine').mockImplementation(noop);
  });

  it(`should not do any modification in dryRun mode`, async () => {
    await publish({
      args: { dryRun: true, verbose: false },
      nxConfig,
      group: {
        crossBoundaryProjects: {},
        app: {},
        lib: {
          '@fluentui/react-northstar': {
            data: {
              root: 'packages/fluentui/react-northstar',
            },
            name: '',
            type: 'lib',
          },
        },
      },
    });

    expect(gitTag).not.toHaveBeenCalled();
    expect(gitPush).not.toHaveBeenCalled();
    expect(releasePublish).toHaveBeenCalledWith({
      dryRun: true,
      groups: ['northstar'],
      registry: 'https://registry.npmjs.org',
      verbose: false,
    });
  });

  it(`should create and push tag and invoke nx releasePublish`, async () => {
    (getLatestTag as unknown as ReturnType<typeof jest.fn>).mockImplementationOnce(async () => {
      return {
        extractedVersion: '0.1.0',
      };
    });

    await publish({
      args: { dryRun: false, verbose: false },
      nxConfig,
      group: {
        crossBoundaryProjects: {},
        app: {},
        lib: {
          '@fluentui/react-northstar': {
            data: {
              root: 'packages/fluentui/react-northstar',
            },
            name: '',
            type: 'lib',
          },
        },
      },
    });

    expect(gitTag).toHaveBeenCalled();
    expect(gitPush).toHaveBeenCalled();
    expect(releasePublish).toHaveBeenCalledWith({
      dryRun: false,
      groups: ['northstar'],
      registry: 'https://registry.npmjs.org',
      verbose: false,
    });
  });
});
