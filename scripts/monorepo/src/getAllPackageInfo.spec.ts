import * as path from 'path';
import getAllPackageInfo from './getAllPackageInfo';

describe(`#getAllPackageinfo`, () => {
  it(`should return workspace packages record with metadata as values`, () => {
    const allPackages = getAllPackageInfo();
    const entries = Object.entries(allPackages);
    const [packageName, packageMetadata] = entries[0];

    expect(allPackages['@fluentui/noop']).toBe(undefined);
    expect(packageName).toEqual(expect.stringMatching(/^@fluentui\/[a-z-]+/));
    expect(packageMetadata).toEqual({
      packagePath: expect.any(String),
      packageJson: expect.objectContaining({
        name: expect.any(String),
        version: expect.any(String),
      }),
    });
    expect(path.isAbsolute(packageMetadata.packagePath)).toBe(false);
  });
});
