import Project from '@lerna/project';
import PackageGraph from '@lerna/package-graph';
import config from '@uifabric/build/config';
import sh from '@uifabric/build/gulp/sh';
import fs from 'fs-extra';
import path from 'path';

import { createTempDir } from './utils';

type PackedPackages = Record<string, string>;

/** Shared packed packages between tests since they're not modified by any test */
let packedPackages: PackedPackages;

function flattenPackageGraph(rootPackages: string[], projectGraph, packageList = []): string[] {
  rootPackages.forEach(packageName => {
    packageList.push(packageName);

    flattenPackageGraph([...projectGraph.get(packageName).localDependencies.keys()], projectGraph, packageList);
  });

  return packageList.sort().filter((v, i, a) => a.indexOf(v) === i);
}

export async function addResolutionPathsForProjectPackages(testProjectDir: string) {
  const packageJsonPath = path.resolve(testProjectDir, 'package.json');
  const packageJson = require(packageJsonPath);

  packageJson.resolutions = packageJson.resolutions || {};
  Object.keys(packedPackages).forEach(packageName => {
    packageJson.resolutions[`**/${packageName}`] = `file:${packedPackages[packageName]}`;
  });

  fs.writeJSONSync(packageJsonPath, packageJson, { spaces: 2 });
}

export async function packProjectPackages(logger: Function): Promise<PackedPackages> {
  if (packedPackages) {
    logger(`✔️ Packages already packed`);
    return packedPackages;
  }

  packedPackages = {};

  const lernaProject = new Project(config.paths.packages());
  const projectPackages = await lernaProject.getPackages();

  logger(`✔️ A lerna config that was used: ${lernaProject.rootConfigLocation}`);

  const projectPackagesGraph = new PackageGraph(projectPackages, 'dependencies');
  const requiredPackages = flattenPackageGraph(['@fluentui/react-northstar'], projectPackagesGraph);

  logger(`✔️ Following packages will be packed:${requiredPackages.map(p => `\n${' '.repeat(30)}- ${p}`)}`);

  const tmpDirectory = createTempDir('project-packed-');
  logger(`✔️ Temporary directory for packed packages was created: ${tmpDirectory}`);

  await Promise.all(
    requiredPackages.map(async packageName => {
      const filename = path.join(tmpDirectory, path.basename(packageName)) + '.tgz';
      const packagePath = projectPackages.find(pkg => pkg.name === packageName).location;

      await sh(`yarn pack --filename ${filename}`, packagePath);
      packedPackages[packageName] = filename;
    }),
  );

  logger(`✔️ Packages were packaged to ${tmpDirectory}`);

  return packedPackages;
}
