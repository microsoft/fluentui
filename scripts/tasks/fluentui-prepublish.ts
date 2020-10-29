import { PackageInfo, findGitRoot, getAllPackageInfo } from '../monorepo/index';
import path from 'path';
import { promises as fs } from 'fs';

export async function fluentuiLernaPrePublish() {
  const fluentRoot = path.join('packages', 'fluentui');
  const packagesToPublish = Object.values(getAllPackageInfo()).reduce(
    (packages: PackageInfo[], packageInfo: PackageInfo) => {
      if (packageInfo.packagePath.indexOf(fluentRoot) > -1) {
        packageInfo.packageJson.main = 'dist/commonjs/index.js';
        packageInfo.packageJson.module = 'dist/es/index.js';
        packageInfo.packageJson.types = 'dist/es/index.d.ts';
        packages.push(packageInfo);
      }
      return packages;
    },
    [],
  );

  for (const pkg of packagesToPublish) {
    console.log('writing', findGitRoot(), pkg.packagePath);
    await fs.writeFile(
      path.join(findGitRoot(), pkg.packagePath, 'package.json'),
      JSON.stringify(pkg.packageJson, null, 2),
    );
  }
}
