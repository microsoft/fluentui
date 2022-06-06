const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const tmp = require('tmp');

const buildFixture = require('./buildFixture');

/**
 * @param {string} fixtureContent
 * @return {Promise<import('./prepareFixture').PreparedFixture>}
 */
async function setup(fixtureContent) {
  const packageDir = tmp.dirSync({ prefix: 'buildFixture', unsafeCleanup: true });

  const spy = jest.spyOn(process, 'cwd');
  spy.mockReturnValue(packageDir.name);

  const fixtureDir = tmp.dirSync({ dir: packageDir.name, name: 'bundle-size', unsafeCleanup: true });
  const fixture = tmp.fileSync({ dir: fixtureDir.name, name: 'test-fixture.js' });

  await fs.writeFile(fixture.name, fixtureContent);

  return {
    absolutePath: fixture.name,
    relativePath: path.relative(packageDir.name, fixture.name),

    name: 'Test fixture',
  };
}

describe('buildFixture', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('builds fixtures and returns minified & GZIP sizes', async () => {
    const fixturePath = await setup(`console.log('Hello world')`);
    const buildResult = await buildFixture(fixturePath, true);

    expect(buildResult.name).toBe('Test fixture');
    expect(buildResult.path).toMatch(/bundle-size[\\|/]test-fixture.js/);

    expect(buildResult.minifiedSize).toBeGreaterThan(1);
    expect(buildResult.gzippedSize).toBeGreaterThan(1);
  });

  it('should throw on compilation errors', async () => {
    const fixturePath = await setup(`import something from 'unknown-pkg'`);
    await expect(buildFixture(fixturePath, true)).rejects.toBeDefined();
  });
});
