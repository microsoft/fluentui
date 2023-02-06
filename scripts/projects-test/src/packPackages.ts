import path from 'path';

import { sh } from '@fluentui/scripts-utils';
import { PackageGraph } from '@lerna/package-graph';
import { Project } from '@lerna/project';
import fs from 'fs-extra';

import { createTempDir, shEcho } from './utils';

type PackedPackages = Record<string, string>;

/** Shared packed packages between tests since they're not modified by any test */
let packedPackages: PackedPackages;

function flattenPackageGraph(rootPackages: string[], projectGraph: PackageGraph, packageList: string[] = []): string[] {
  rootPackages.forEach(packageName => {
    packageList.push(packageName);

    // NOTE: we need to use Array.from instead of spread to new array because v0 packages have target `es5` thus this would trigger TS error
    flattenPackageGraph(Array.from(projectGraph.get(packageName).localDependencies.keys()), projectGraph, packageList);
  });

  return packageList.sort().filter((v, i, a) => a.indexOf(v) === i);
}

export async function addResolutionPathsForProjectPackages(testProjectDir: string, isTemplateJson?: boolean) {
  const jsonPath = path.resolve(testProjectDir, isTemplateJson ? 'template.json' : 'package.json');
  const json = fs.readJSONSync(jsonPath);
  const packageJson = isTemplateJson ? json.package : json;

  packageJson.resolutions = packageJson.resolutions || {};
  Object.keys(packedPackages).forEach(packageName => {
    packageJson.resolutions[`**/${packageName}`] = `file:${packedPackages[packageName]}`;
  });

  fs.writeJSONSync(jsonPath, json, { spaces: 2 });
}

export async function packProjectPackages(
  logger: Function,
  lernaRoot: string,
  rootPackages: string[],
): Promise<PackedPackages> {
  if (packedPackages) {
    logger(`✔️ Packages already packed`);
    return packedPackages;
  }

  packedPackages = {};

  const lernaProject = new Project(lernaRoot);
  // this is the list of package.json contents with some extra properties
  const projectPackages = await lernaProject.getPackages();

  logger(`✔️ Used lerna config: ${lernaProject.rootConfigLocation}`);

  const projectPackagesGraph = new PackageGraph(projectPackages, 'dependencies');
  const requiredPackages = flattenPackageGraph(rootPackages, projectPackagesGraph);

  logger(`✔️ Following packages will be packed:${requiredPackages.map(p => `\n${' '.repeat(30)}- ${p}`)}`);

  const tmpDirectory = createTempDir('project-packed-');
  logger(`✔️ Temporary directory for packed packages was created: ${tmpDirectory}`);

  await shEcho('npx npm-which npm', tmpDirectory);
  await shEcho('npm --version', tmpDirectory);

  await Promise.all(
    requiredPackages.map(async packageName => {
      const packageInfo = projectPackages.find(pkg => pkg.name === packageName);
      if (!packageInfo) {
        throw new Error(`Package ${packageName} doesn't exist`);
      }

      const packagePath = packageInfo.location;
      const packageMain: string | undefined = packageInfo.get('main');
      const entryPointPath = packageMain ? path.join(packagePath, packageMain) : '';
      if (!fs.existsSync(entryPointPath)) {
        throw new Error(
          `Package ${packageName} does not appear to have been built yet. Please ensure that root package(s) ` +
            `${rootPackages.join(', ')} are listed in devDependencies of the package running the test.`,
        );
      }

      // Use `npm pack` because `yarn pack` incorrectly calculates the included files when the
      // files to include/exclude are specified by .npmignore rather than package.json `files`.
      // (--quiet outputs only the .tgz filename, not all the included files)
      const packFile = (await sh(`npm pack --quiet ${packagePath}`, tmpDirectory, true /*pipeOutputToResult*/)).trim();
      packedPackages[packageName] = path.join(tmpDirectory, packFile);
      console.log('Wrote tarball to', packedPackages[packageName]);
    }),
  );

  logger(`✔️ Packages were packaged to ${tmpDirectory}`);

  return packedPackages;
}
