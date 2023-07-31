import childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import { stripIndents } from '@nx/devkit';
import * as tmp from 'tmp';

import { generateVersionFiles } from './generate-version-files';

// ☝️ NOTE - don't comment or remove this mock while running tests
jest.mock('child_process');

tmp.setGracefulCleanup();

describe(`generate-version-files`, () => {
  function getFileContents(filePath: string) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  function setup() {
    const { name: rootDir } = tmp.dirSync({ prefix: 'generate-version-files', unsafeCleanup: true });
    const packagesRoot = path.join(rootDir, 'packages');

    const packageNames = ['react-one', 'react-two'];

    const packages = packageNames.map((packageName, idx) => {
      const pkgRoot = `${packagesRoot}/${packageName}`;
      const pkgVersionFilePath = `${packagesRoot}/${packageName}/src/version.ts`;
      const pkgJsonPath = `${pkgRoot}/package.json`;
      const pkgVersion = `1.${idx}.0`;
      fs.mkdirSync(`${pkgRoot}/src`, { recursive: true });
      fs.writeFileSync(
        pkgJsonPath,
        JSON.stringify({
          name: `@proj/${packageName}`,
          version: pkgVersion,
          dependencies: {
            '@fluentui/set-version': '1.0.0',
          },
        }),
      );
      fs.writeFileSync(
        `${pkgVersionFilePath}`,
        stripIndents`
        import { setVersion } from '@proj/set-version';
        setVersion('@proj/${packageName}', '0.0.0');
        `,
      );

      return {
        pkgRoot,
        pkgJsonPath,
        pkgVersion,
        pkgVersionFilePath,
      };
    });

    const spawnSyncMock = jest.spyOn(childProcess, 'spawnSync').mockImplementation((() => {
      return { status: 0, stdout: 'ok' };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => 1482363367071);

    return { rootDir, packages, spawnSyncMock, logSpy };
  }

  it(`should bump -> update versions.ts -> revert bump`, () => {
    const { rootDir, /* packages, */ logSpy, spawnSyncMock } = setup();
    generateVersionFiles({
      args: {},
      bumpCmd: ['bin/node', 'node_modules/bin/beachball', 'bump'],
      gitRoot: rootDir,
    });
    expect(logSpy.mock.calls.flat()).toEqual(
      expect.arrayContaining([
        'bumping',
        'reverting',
        `writing to ${rootDir}/packages/react-one/src/version.ts`,
        `writing to ${rootDir}/packages/react-two/src/version.ts`,
      ]),
    );

    expect(spawnSyncMock).toHaveBeenCalledTimes(3);
    expect(spawnSyncMock.mock.calls.flat()).toMatchInlineSnapshot(`
      Array [
        "bin/node",
        Array [
          "node_modules/bin/beachball",
          "bump",
        ],
        Object {
          "cwd": "${rootDir}",
        },
        "git",
        Array [
          "stash",
          "push",
          "-u",
          "-m",
          "tmp_bump_1482363367071",
        ],
        Object {
          "cwd": "${rootDir}",
        },
        "git",
        Array [
          "stash",
          "list",
        ],
        Object {
          "cwd": "${rootDir}",
        },
      ]
    `);
  });

  it(`should not do anything if package doesnt contain set-version as dependency or src/version.ts doesnt exist`, () => {
    const { rootDir, packages, logSpy, spawnSyncMock } = setup();

    packages.forEach(pkg => {
      fs.unlinkSync(pkg.pkgVersionFilePath);
      const pkgJson = JSON.parse(getFileContents(pkg.pkgJsonPath));
      delete pkgJson.dependencies['@fluentui/set-version'];
      fs.writeFileSync(pkg.pkgJsonPath, JSON.stringify(pkgJson));
    });

    generateVersionFiles({
      args: { generateOnly: true },
      bumpCmd: ['bin/node', 'node_modules/bin/beachball', 'bump'],
      gitRoot: rootDir,
    });

    expect(spawnSyncMock).not.toHaveBeenCalled();

    expect(logSpy.mock.calls.flat()).toEqual([]);
  });

  it(`should "generate only" versions.ts`, () => {
    const { rootDir, packages, logSpy, spawnSyncMock } = setup();
    generateVersionFiles({
      args: { generateOnly: true },
      bumpCmd: ['bin/node', 'node_modules/bin/beachball', 'bump'],
      gitRoot: rootDir,
    });

    expect(spawnSyncMock).not.toHaveBeenCalled();

    expect(logSpy.mock.calls.flat()).toEqual(
      expect.arrayContaining([
        `writing to ${rootDir}/packages/react-one/src/version.ts`,
        `writing to ${rootDir}/packages/react-two/src/version.ts`,
      ]),
    );

    expect(getFileContents(packages[0].pkgVersionFilePath)).toMatchInlineSnapshot(`
      "// Do not modify this file; it is generated as part of publish.
      // The checked in version is a placeholder only and will not be updated.
      import { setVersion } from '@fluentui/set-version';
      setVersion('@proj/react-one', '1.0.0');"
    `);
    expect(getFileContents(packages[1].pkgVersionFilePath)).toMatchInlineSnapshot(`
      "// Do not modify this file; it is generated as part of publish.
      // The checked in version is a placeholder only and will not be updated.
      import { setVersion } from '@fluentui/set-version';
      setVersion('@proj/react-two', '1.1.0');"
    `);
  });

  it(`should not update versions.ts if its contents is identical`, () => {
    const { rootDir, packages, logSpy, spawnSyncMock } = setup();

    // modify version.ts
    const firstPackage = packages[0];
    const pkgVersionsFileContent = getFileContents(firstPackage.pkgVersionFilePath);
    const pkgVersionsFileContentModified = pkgVersionsFileContent.replace(`'0.0.0'`, `'${firstPackage.pkgVersion}'`);
    fs.writeFileSync(firstPackage.pkgVersionFilePath, pkgVersionsFileContentModified, 'utf-8');

    generateVersionFiles({
      args: { generateOnly: true, forceUpdate: true },
      bumpCmd: ['bin/node', 'node_modules/bin/beachball', 'bump'],
      gitRoot: rootDir,
    });

    expect(spawnSyncMock).not.toHaveBeenCalled();
    expect(logSpy.mock.calls.flat()).toEqual(
      expect.arrayContaining([`writing to ${rootDir}/packages/react-two/src/version.ts`]),
    );
    expect(getFileContents(packages[1].pkgVersionFilePath)).toMatchInlineSnapshot(`
      "// Do not modify this file; it is generated as part of publish.
      // The checked in version is a placeholder only and will not be updated.
      import { setVersion } from '@fluentui/set-version';
      setVersion('@proj/react-two', '1.1.0');"
    `);
  });
});
