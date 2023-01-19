import {
  Tree,
  formatFiles,
  installPackagesTask,
  getProjects,
  readJson,
  joinPathFragments,
  writeJson,
  readProjectConfiguration,
  updateJson,
} from '@nrwl/devkit';

import { SvpGeneratorSchema } from './schema';
import { PackageJson } from '../../types';

type DepMap = Record<string, { dev: Record<string, string> }>;

export default async function (tree: Tree, _schema: SvpGeneratorSchema) {
  const rootPackageJson = readJson<PackageJson>(tree, 'package.json');
  const rootDevDeps = rootPackageJson.devDependencies ?? {};

  const normalizedDevDepsMap = parsePackages(tree);
  const { packagesToRoot, result } = normalizePackages(tree, normalizedDevDepsMap);

  writeJson(tree, 'debug-svp.json', normalizedDevDepsMap);
  writeJson(tree, 'debug-svp.norm.json', result);

  const normalizedPackagesToRoot = Object.entries(packagesToRoot).reduce((acc, [packageName, versions]) => {
    acc[packageName] = versions[0].replace(/[\^~]/, '');
    return acc;
  }, {} as Record<string, string>);

  const newRootDevDeps = { ...rootDevDeps, ...normalizedPackagesToRoot };

  writeJson(tree, 'debug-root.json', rootDevDeps);
  writeJson(tree, 'debug-root.norm.json', newRootDevDeps);
  writeJson(tree, 'debug-root.extracted.json', packagesToRoot);

  // update package.json
  updateJson(tree, 'package.json', (json: PackageJson) => {
    json.devDependencies = newRootDevDeps;
    return json;
  });

  // update packages
  Object.entries(normalizedDevDepsMap).forEach(([projectName, deps]) => {
    const project = readProjectConfiguration(tree, projectName);
    updateJson(tree, joinPathFragments(project.root, 'package.json'), (json: PackageJson) => {
      json.devDependencies = deps.dev;
      return json;
    });
  });

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}

function isWorkspaceDep(tree: Tree, projectName: string) {
  try {
    readProjectConfiguration(tree, projectName);
    return true;
  } catch (err) {
    return false;
  }
}

function normalizePackages(tree: Tree, map: DepMap) {
  const packagesToRoot: Record<string, Set<string>> = {};
  const result = Object.entries(map).reduce((acc, [projectName, deps]) => {
    const { dev } = deps;

    const normalizedDev = Object.entries(dev).reduce((acc2, [depName, depVersion]) => {
      if (depVersion === '*') {
        acc2[depName] = '*';
        return acc2;
      }

      if (isWorkspaceDep(tree, depName)) {
        acc2[depName] = '*';
        return acc2;
      }

      packagesToRoot[depName] = packagesToRoot[depName] ?? new Set();
      packagesToRoot[depName].add(depVersion);

      return acc2;
    }, {} as Record<string, string>);

    acc[projectName].dev = normalizedDev;
    return acc;
  }, map);

  const packagesToRootSerialized = Object.entries(packagesToRoot).reduce((acc, [packageName, versions]) => {
    acc[packageName] = [...versions];
    return acc;
  }, {} as Record<string, string[]>);

  return { result, packagesToRoot: packagesToRootSerialized };
}

function parsePackages(tree: Tree) {
  const projects = getProjects(tree);

  const data: DepMap = {};
  projects.forEach((project, projectName) => {
    const pkgJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
    data[projectName] = { dev: pkgJson.devDependencies ?? {} };
  });

  return data;
}
