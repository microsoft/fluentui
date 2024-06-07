/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import childProcess from 'child_process';

import main from './runPublished';

// ☝️ NOTE - don't comment or remove this mock while running tests - you will need to manually kill lot of node processes :P
jest.mock('child_process');

describe(`#runPublished`, () => {
  const originalConsoleLog = console.log;
  beforeEach(() => {
    console.log = () => {};
  });
  afterAll(() => {
    console.log = originalConsoleLog;
  });

  function setup() {
    const workspacePackagesMetadata = {
      '@fluentui/web-components': {
        packagePath: 'packages/web-components',
        packageJson: { name: '@fluentui/web-components', version: '1.0.0', main: 'lib/index.js', private: false },
        projectConfig: { name: '@fluentui/web-components', root: 'packages/web-components', tags: [] },
      },
      '@fluentui/react': {
        packagePath: 'packages/react',
        packageJson: { name: '@fluentui/react', version: '8.0.0', main: 'lib/index.js', private: false },
        projectConfig: { name: '@fluentui/react', root: 'packages/react', tags: [] },
      },
      '@fluentui/react-northstar': {
        packagePath: 'packages/fluentui/react-northstar',
        packageJson: { name: '@fluentui/react-northstar', version: '0.1.0', main: 'lib/index.js', private: false },
        projectConfig: { name: '@fluentui/react-northstar', root: 'packages/fluentui/react-northstar', tags: [] },
      },
      '@fluentui/react-components': {
        packagePath: 'packages/react-components/react-components',
        packageJson: { name: '@fluentui/react-components', version: '9.0.0', main: 'lib/index.js', private: false },
        projectConfig: {
          name: '@fluentui/react-components',
          root: 'packages/react-components/react-components',
          tags: [],
        },
      },
    };

    const spawnSyncMock = jest.spyOn(childProcess, 'spawnSync').mockImplementation((() => {
      return { status: 0 };
    }) as any);

    jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);

    function getSpawnCallArguments() {
      const [, spawnSyncArgs, spawnSyncOptions] = spawnSyncMock.mock.calls[0];
      const [lagePath, ...restArgs] = spawnSyncArgs as string[];

      return { spawnSyncArgs, spawnSyncOptions, lagePath, restArgs };
    }

    return { workspacePackagesMetadata, spawnSyncMock, getSpawnCallArguments };
  }

  it(`should exit and provide help info if there are not arguments provided`, () => {
    const { workspacePackagesMetadata, spawnSyncMock } = setup();
    const logSpy = jest.spyOn(console, 'log');

    main({
      argv: [],
      workspacePackagesMetadata,
    });

    expect(spawnSyncMock).not.toHaveBeenCalled();
    expect(logSpy.mock.calls[0][0]).toMatchInlineSnapshot(`
      "Usage:

        yarn run:published <script> [<args>]

      This command runs <script> for all beachball-published packages, as well as packages for the version 8 website.
      "
    `);
  });

  it(`should do not invoke lage with '--to' if all packages are private`, () => {
    const { workspacePackagesMetadata, getSpawnCallArguments } = setup();
    const metadataCopy = { ...workspacePackagesMetadata };
    metadataCopy['@fluentui/react'].packageJson.private = true;
    metadataCopy['@fluentui/react-components'].packageJson.private = true;

    main({
      argv: ['build'],
      workspacePackagesMetadata: metadataCopy,
    });

    const { restArgs } = getSpawnCallArguments();

    expect(restArgs).toMatchInlineSnapshot(`
      Array [
        "run",
        "build",
        "--verbose",
      ]
    `);
  });

  it(`should never invoke built --to for northstar and web-components`, () => {
    const { spawnSyncMock, workspacePackagesMetadata, getSpawnCallArguments } = setup();

    main({
      argv: ['build'],
      workspacePackagesMetadata,
    });

    const { lagePath, restArgs, spawnSyncOptions } = getSpawnCallArguments();

    expect(spawnSyncMock).toHaveBeenCalledTimes(1);
    expect(lagePath.endsWith('node_modules/lage/bin/lage.js')).toBe(true);
    expect(restArgs).toMatchInlineSnapshot(`
      Array [
        "run",
        "build",
        "--verbose",
        "--to=@fluentui/react",
      ]
    `);
    expect(spawnSyncOptions).toEqual({ stdio: 'inherit', maxBuffer: 524288000 });
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it(`should invoke built --to for v9`, () => {
    const { workspacePackagesMetadata, getSpawnCallArguments } = setup();

    process.env.RELEASE_VNEXT = 'true';

    main({
      argv: ['build'],
      workspacePackagesMetadata,
    });

    const { restArgs } = getSpawnCallArguments();

    expect(restArgs).toMatchInlineSnapshot(`
      Array [
        "run",
        "build",
        "--verbose",
        "--to=@fluentui/react-components",
      ]
    `);

    expect(process.exit).toHaveBeenCalledWith(0);

    delete process.env.RELEASE_VNEXT;
  });
});
