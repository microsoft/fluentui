import { Tree, readJson, writeJson, serializeJson } from '@nrwl/devkit';
import { PackageJson } from '../../../types';
import { getProjectConfig } from '../../../utils';
import { NormalizedSchema } from '../types';
import * as templates from '../templates';

export function updateBabel(tree: Tree, options: NormalizedSchema) {
  const currentProjectNpmScope = `@${options.workspaceConfig.npmScope}`;
  const pkgJson = readJson<PackageJson>(tree, options.paths.packageJson);
  pkgJson.dependencies = pkgJson.dependencies || {};
  pkgJson.devDependencies = pkgJson.devDependencies || {};

  const shouldAddMakeStylesPlugin =
    !options.name.includes('make-styles') &&
    (pkgJson.dependencies[`${currentProjectNpmScope}/react-make-styles`] ||
      pkgJson.dependencies[`${currentProjectNpmScope}/make-styles`]);

  const extraPlugins = shouldAddMakeStylesPlugin ? ['module:@fluentui/babel-make-styles'] : [];

  const config = templates.babelConfig({ extraPlugins });

  const babelMakeStylesProjectName = `${currentProjectNpmScope}/babel-make-styles`;
  if (shouldAddMakeStylesPlugin) {
    const babelMakeStylesProject = getProjectConfig(tree, { packageName: babelMakeStylesProjectName });
    const babelMakeStylesPkgJson: PackageJson = readJson(tree, babelMakeStylesProject.paths.packageJson);
    pkgJson.devDependencies[babelMakeStylesProjectName] = `${babelMakeStylesPkgJson.version}`;
  } else {
    delete pkgJson.devDependencies[babelMakeStylesProjectName];
  }

  tree.write(options.paths.babelConfig, serializeJson(config));
  writeJson(tree, options.paths.packageJson, pkgJson);

  return tree;
}
