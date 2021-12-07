import { Tree, updateJson, readWorkspaceConfiguration, readJson } from '@nrwl/devkit';
import { PackageJson, TsConfig } from '../../../types';
import { getProjects } from '../../../utils';
import { NormalizedSchema } from '../types';

export function updateBaseTsConfig(tree: Tree, options: NormalizedSchema) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const publishedNpmScope = `@${workspaceConfig.npmScope}`;
  const allProjects = getProjects(tree);

  const projectPkgJson = readJson<PackageJson>(tree, options.paths.packageJson);
  const rootPkgJson = readJson<PackageJson>(tree, options.paths.rootPackageJson);
  const rootPkgDevDependencies = rootPkgJson.devDependencies || {};

  const depsThatNeedToBecomeAliases = Object.keys(projectPkgJson.dependencies ?? {})
    .filter(pkgName => {
      return pkgName.startsWith(publishedNpmScope) && !rootPkgDevDependencies[pkgName];
    })
    .reduce((acc, pkgName) => {
      acc[pkgName] = [`${allProjects.get(pkgName)?.root}/src/index.ts`];

      return acc;
    }, {} as Required<Pick<TsConfig['compilerOptions'], 'paths'>>['paths']);

  updateJson<TsConfig, TsConfig>(tree, options.paths.rootTsconfig, json => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[options.name] = [`${options.projectConfig.root}/src/index.ts`];

    Object.assign(json.compilerOptions.paths, depsThatNeedToBecomeAliases);

    return json;
  });
}
