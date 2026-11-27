import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'path';

import { getDependencies } from '@fluentui/scripts-monorepo';
import fs from 'fs-extra';

import { createTempDir } from './utils';

type PackedPackages = Record</** npmPackageName (including scope) */ string, /** packed package path */ string>;

/** Shared packed packages between tests since they're not modified by any test */
let packedPackages: PackedPackages;

export async function addResolutionPathsForProjectPackages(testProjectDir: string, isTemplateJson?: boolean) {
  const jsonPath = path.resolve(testProjectDir, isTemplateJson ? 'template.json' : 'package.json');
  const json = fs.readJSONSync(jsonPath);
  const packageJson = isTemplateJson ? json.package : json;

  packageJson.resolutions = packageJson.resolutions || {};
  Object.assign(packageJson.resolutions, createPackageResolutions(packedPackages));

  fs.writeJSONSync(jsonPath, json, { spaces: 2 });
}

export function createPackageResolutions(packages: PackedPackages): Record<string, string> {
  return Object.fromEntries(
    Object.entries(packages).map(([packageName, packagePath]) => [packageName, `file:${packagePath}`]),
  );
}

export async function packPackageArchives(
  packages: { name: string; absoluteRootPath: string }[],
  directory: string,
  ignoreScripts = false,
): Promise<PackedPackages> {
  const archives: PackedPackages = {};
  const pack = promisify(execFile);
  let next = 0;
  const workers = Array.from({ length: Math.min(4, packages.length) }, async () => {
    while (next < packages.length) {
      const pkg = packages[next++];
      const { stdout } = await pack(
        'npm',
        ['pack', '--json', ignoreScripts ? '--ignore-scripts' : '--foreground-scripts=false', pkg.absoluteRootPath],
        { cwd: directory, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
      );
      const result: { filename?: string }[] = JSON.parse(stdout);
      const filename = result[0]?.filename;
      if (!filename || path.basename(filename) !== filename || !fs.existsSync(path.join(directory, filename))) {
        throw new Error(`${pkg.name}: npm pack did not produce an archive in ${directory}`);
      }
      archives[pkg.name] = path.join(directory, filename);
    }
  });
  // Promise.all rejects before sibling processes finish; drain them before callers can clean up.
  const results = await Promise.allSettled(workers);
  for (const result of results) {
    if (result.status === 'rejected') {
      throw result.reason;
    }
  }
  return archives;
}

export async function packProjectPackages(logger: Function, project: string): Promise<PackedPackages> {
  if (packedPackages) {
    logger(`✔️ Packages already packed`);
    return packedPackages;
  }

  const { dependencies: projectDependencies, projectGraph, getProjectPackageJsonInfo } = await getDependencies(project);
  // add provided package to be packaged
  projectDependencies.unshift({
    name: project.replace('@fluentui/', ''),
    dependencyType: 'dependencies',
    isTopLevel: true,
  });

  logger(`✔️ Following packages will be packed:${projectDependencies.map(pkg => `\n${' '.repeat(30)}- ${pkg.name}`)}`);

  const tmpDirectory = createTempDir('project-packed-');
  logger(`✔️ Temporary directory for packed packages was created: ${tmpDirectory}`);

  const packages = projectDependencies.map(projectConfig => {
    const packageName = projectConfig.name;
    const packageInfo = getProjectPackageJsonInfo(packageName, projectGraph);
    if (!packageInfo) {
      throw new Error(`Package ${packageName} doesn't exist`);
    }

    const packagePath = packageInfo.absoluteRootPath;
    const packageMain = packageInfo.main;
    const entryPointPath = packageMain ? path.join(packagePath, packageMain) : '';
    if (!fs.existsSync(entryPointPath)) {
      throw new Error(
        `Package '${packageName}' does not appear to have been built yet.` +
          `Please ensure that package:"${project}" has properly defined dependencies in its package.json`,
      );
    }

    return packageInfo;
  });
  // npm respects package files/.npmignore; Yarn pack does not produce the same archives.
  packedPackages = await packPackageArchives(packages, tmpDirectory);

  logger(`✔️ Packages were packaged to ${tmpDirectory}`);

  return packedPackages;
}
