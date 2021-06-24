const fs = require('fs').promises;
const process = require('process');
const tmp = require('tmp');

// This mock should be not required 😮
// glob.sync() call in collectLocalReport.js always returns an empty array on Linux/Windows in tests for an unknown
// reason while files are present in filesystem
jest.mock('glob', () => ({
  sync: () => [
    'packages/package-a/dist/bundle-size/bundle-size.json',
    'packages/package-b/dist/bundle-size/bundle-size.json',
  ],
}));

const collectLocalReport = require('./collectLocalReport');

/**
 * @param {string} rootDir
 * @return {string}
 */
function mkReportDir(rootDir) {
  const distDir = tmp.dirSync({ dir: rootDir, name: 'dist', unsafeCleanup: true });
  const bundleSizeDir = tmp.dirSync({ dir: distDir.name, name: 'bundle-size', unsafeCleanup: true });

  tmp.fileSync({ dir: rootDir, name: 'package.json' });

  return tmp.fileSync({ dir: bundleSizeDir.name, name: 'bundle-size.json' }).name;
}

async function setup() {
  const projectDir = tmp.dirSync({ prefix: 'collectLocalReport', unsafeCleanup: true });
  const packagesDir = tmp.dirSync({ dir: projectDir.name, name: 'packages', unsafeCleanup: true });

  const spy = jest.spyOn(process, 'cwd');
  spy.mockReturnValue(projectDir.name);

  // is required as root directory is determined based on Git project
  tmp.dirSync({ dir: projectDir.name, name: '.git', unsafeCleanup: true });

  const reportAPath = mkReportDir(tmp.dirSync({ dir: packagesDir.name, name: 'package-a', unsafeCleanup: true }).name);
  const reportBPath = mkReportDir(tmp.dirSync({ dir: packagesDir.name, name: 'package-b', unsafeCleanup: true }).name);

  /** @type {import('../utils/buildFixture').BuildResult[]} */
  const reportA = [
    { name: 'fixtureA1', path: 'path/fixtureA1.js', minifiedSize: 100, gzippedSize: 50 },
    { name: 'fixtureA2', path: 'path/fixtureA2.js', minifiedSize: 200, gzippedSize: 100 },
  ];
  /** @type {import('../utils/buildFixture').BuildResult[]} */
  const reportB = [{ name: 'fixtureB', path: 'path/fixtureB.js', minifiedSize: 10, gzippedSize: 5 }];

  await fs.writeFile(reportAPath, JSON.stringify(reportA));
  await fs.writeFile(reportBPath, JSON.stringify(reportB));
}

describe('collectLocalReport', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('aggregates all local reports to a single one', async () => {
    await setup();

    expect(await collectLocalReport()).toMatchInlineSnapshot(`
      Array [
        Object {
          "gzippedSize": 50,
          "minifiedSize": 100,
          "name": "fixtureA1",
          "packageName": "package-a",
          "path": "path/fixtureA1.js",
        },
        Object {
          "gzippedSize": 100,
          "minifiedSize": 200,
          "name": "fixtureA2",
          "packageName": "package-a",
          "path": "path/fixtureA2.js",
        },
        Object {
          "gzippedSize": 5,
          "minifiedSize": 10,
          "name": "fixtureB",
          "packageName": "package-b",
          "path": "path/fixtureB.js",
        },
      ]
    `);
  });
});
