const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const tmp = require('tmp');

const readConfig = require('./readConfig');

/**
 * @param {string} configContent
 * @param {number} pwdNesting How many folders to nest the pwd
 * @return {Promise<string>} Returns a relative path to a config file
 */
async function setup(configContent, pwdNesting = 0) {
  let packageDir = tmp.dirSync({ prefix: 'test-package', unsafeCleanup: true });
  const config = tmp.fileSync({ dir: packageDir.name, name: 'bundle-size.config.js' });

  for (let i = 0; i < pwdNesting; i++) {
    packageDir = tmp.dirSync({ dir: packageDir.name, prefix: 'nested', unsafeCleanup: true });
  }
  const spy = jest.spyOn(process, 'cwd');
  spy.mockReturnValue(packageDir.name);

  await fs.writeFile(config.name, configContent);

  return path.relative(packageDir.name, config.name);
}

describe('prepareFixture', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should read config from package', async () => {
    await setup(`module.exports = { webpack: (config) => { config.foo = 'bar'; return config; } }`);

    const config = await readConfig();

    expect(config.webpack({})).toEqual({ foo: 'bar' });
  });

  it('should return default webpack config if no config file defined', async () => {
    const config = await readConfig();

    expect(config.webpack({})).toEqual({});
  });

  it('should cache config', async () => {
    process.env.NODE_ENV = 'nottest';

    await setup(`module.exports = { webpack: (config) => config }`);
    const firstConfig = await readConfig();
    await setup(`module.exports = { webpack: (config) => { config.foo = 'bar'; return config; } }`);
    const config = await readConfig();

    expect(firstConfig).toBe(config);
    expect(config.webpack({})).toEqual({});

    process.env.NODE_ENV = 'test';
  });

  it.each([1, 2, 3])('should cache config for %i layers of nesting', async nesting => {
    await setup(`module.exports = { webpack: (config) => { config.foo = 'bar'; return config; } }`, nesting);
    const config = await readConfig();

    expect(config.webpack({})).toEqual({ foo: 'bar' });
  });
});
