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
      projectConfig: expect.objectContaining({
        $schema: expect.any(String),
        implicitDependencies: expect.any(Array),
        name: expect.any(String),
        projectType: expect.any(String),
        root: expect.any(String),
      }),
    });
    expect(path.isAbsolute(packageMetadata.packagePath)).toBe(false);
  });

  it(`should accept predicate filter function`, () => {
    const allPackages = getAllPackageInfo(metadata => {
      return metadata.packageJson.name === '@fluentui/non-existent-package';
    });

    expect(allPackages).toEqual({});
  });
});
