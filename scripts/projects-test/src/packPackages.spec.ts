import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { promisify } from 'node:util';

import { createPackageResolutions, packPackageArchives } from './packPackages';

jest.mock('node:util', () => ({
  ...jest.requireActual('node:util'),
  promisify: jest.fn(jest.requireActual('node:util').promisify),
}));

describe('packPackageArchives', () => {
  let directory: string;
  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'fluent-pack-'));
  });
  afterEach(() => {
    jest.mocked(promisify).mockReset().mockImplementation(jest.requireActual('node:util').promisify);
    fs.rmSync(directory, { recursive: true, force: true });
  });

  function archive(name: string) {
    fs.writeFileSync(path.join(directory, `${name}.tgz`), '');
    return { stdout: JSON.stringify([{ filename: `${name}.tgz` }]), stderr: '' };
  }

  it('bounds parallel packing and preserves npm names and lifecycle options', async () => {
    const pending: (() => void)[] = [];
    const pack = jest.fn(
      (_file: string, args: string[]) =>
        new Promise<ReturnType<typeof archive>>(resolve => {
          pending.push(() => resolve(archive(path.basename(args[args.length - 1]))));
        }),
    );
    jest.mocked(promisify).mockReturnValue(pack);
    const packages = Array.from({ length: 6 }, (_, index) => ({
      name: index === 0 ? 'unscoped' : `@fluentui/package-${index}`,
      absoluteRootPath: `/package-${index}`,
    }));
    const run = packPackageArchives(packages, directory, true);
    expect(pack).toHaveBeenCalledTimes(4);
    expect(pack).toHaveBeenCalledWith(
      'npm',
      ['pack', '--json', '--ignore-scripts', '/package-0'],
      expect.objectContaining({ cwd: directory, encoding: 'utf8' }),
    );
    pending.slice().forEach(resolve => resolve());
    await new Promise(resolve => {
      setImmediate(resolve);
    });
    expect(pack).toHaveBeenCalledTimes(6);
    pending.slice(4).forEach(resolve => resolve());
    const archives = await run;
    expect(Object.keys(archives).sort()).toEqual(packages.map(pkg => pkg.name).sort());
    expect(archives.unscoped).toBe(path.join(directory, 'package-0.tgz'));

    pack.mockResolvedValue(archive('legacy'));
    await packPackageArchives([{ name: 'legacy', absoluteRootPath: '/legacy' }], directory);
    expect(pack).toHaveBeenLastCalledWith(
      'npm',
      ['pack', '--json', '--foreground-scripts=false', '/legacy'],
      expect.any(Object),
    );
  });

  it('waits for active packing to finish before propagating a failure', async () => {
    const failure = new Error('npm pack failed');
    let finish: () => void = () => {
      throw new Error('Packing has not started');
    };
    const pack = jest
      .fn()
      .mockRejectedValueOnce(failure)
      .mockImplementationOnce(
        () =>
          new Promise(resolve => {
            finish = () => resolve(archive('slow'));
          }),
      );
    jest.mocked(promisify).mockReturnValue(pack);
    let settled = false;
    const run = packPackageArchives(
      [
        { name: 'broken', absoluteRootPath: '/broken' },
        { name: 'slow', absoluteRootPath: '/slow' },
      ],
      directory,
    );
    const result = run.catch(error => {
      settled = true;
      return error;
    });
    await new Promise(resolve => {
      setImmediate(resolve);
    });
    expect(settled).toBe(false);
    finish();
    expect(await result).toBe(failure);
    expect(fs.existsSync(path.join(directory, 'slow.tgz'))).toBe(true);
  });

  it('rejects a reported archive that was not created', async () => {
    jest.mocked(promisify).mockReturnValue(jest.fn().mockResolvedValue({ stdout: '[{"filename":"missing.tgz"}]' }));
    await expect(packPackageArchives([{ name: 'missing', absoluteRootPath: '/missing' }], directory)).rejects.toThrow(
      'missing: npm pack did not produce an archive',
    );
  });
});

describe('createPackageResolutions', () => {
  it('creates Yarn Modern resolutions without unsupported glob patterns', () => {
    expect(
      createPackageResolutions({
        '@fluentui/react': '/tmp/fluentui-react.tgz',
        '@fluentui/react-components': '/tmp/fluentui-react-components.tgz',
      }),
    ).toEqual({
      '@fluentui/react': 'file:/tmp/fluentui-react.tgz',
      '@fluentui/react-components': 'file:/tmp/fluentui-react-components.tgz',
    });
  });
});
