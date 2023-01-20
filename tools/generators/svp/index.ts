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
import * as semver from 'semver';

type DepMap = Record<
  string,
  { prod: Record<string, string>; dev: Record<string, string>; peer: Record<string, string> }
>;

type RootDepMap = { prod: Record<string, string>; dev: Record<string, string> };

type RootDepMapNormalized = {
  dev: Record<string, string[]>;
  prod: Record<string, string[]>;
};

export default async function (tree: Tree, _schema: SvpGeneratorSchema) {
  const rootPackageJson = readJson<PackageJson>(tree, 'package.json');
  const rootDeps = { dev: rootPackageJson.devDependencies ?? {}, prod: rootPackageJson.dependencies ?? {} };

  const normalizedDevDepsMap = parsePackages(tree);
  const { packagesToRoot, result } = normalizePackages(tree, normalizedDevDepsMap);

  writeJson(tree, 'debug-svp.json', normalizedDevDepsMap);
  writeJson(tree, 'debug-svp.norm.json', result);

  const dedupedRootDeps = dedupeRoot(packagesToRoot);
  const merged = dedupeRoot(mergeDepMaps(rootDeps, dedupedRootDeps));
  const semverResolved = resolveVersions(merged);

  writeJson(tree, 'debug-root.json', rootDeps);
  writeJson(tree, 'debug-root.extracted.json', packagesToRoot);
  // writeJson(tree, 'debug-root.norm.json', newRootDeps);
  writeJson(tree, 'debug-root.deduped.json', dedupedRootDeps);
  writeJson(tree, 'debug-root.deduped.merged.json', merged);
  writeJson(tree, 'debug-root.deduped.merged.semver-resolved.json', semverResolved);

  // _updatePackages();

  function _updatePackages() {
    const normalizedPackagesToRoot = {
      dev: Object.entries(packagesToRoot.dev).reduce((acc, [packageName, versions]) => {
        acc[packageName] = versions[0].replace(/[\^~]/, '');
        return acc;
      }, {} as Record<string, string>),
      prod: Object.entries(packagesToRoot.prod).reduce((acc, [packageName, versions]) => {
        acc[packageName] = versions[0].replace(/[\^~]/, '');
        return acc;
      }, {} as Record<string, string>),
    };

    const newRootDeps: RootDepMap = {
      prod: { ...rootDeps.prod, ...normalizedPackagesToRoot.prod },
      dev: { ...rootDeps.dev, ...normalizedPackagesToRoot.dev },
    };

    // update package.json
    updateJson(tree, 'package.json', (json: PackageJson) => {
      json.devDependencies = newRootDeps.dev;
      json.dependencies = newRootDeps.prod;
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
  }

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}

function mergeDepMaps(current: RootDepMap, extracted: RootDepMapNormalized) {
  return {
    prod: mergeMap(current.prod, extracted.prod),
    dev: mergeMap(current.dev, extracted.dev),
  };

  function mergeMap(curr: Record<string, string>, extr: Record<string, string[]>): Record<string, string[]> {
    const allKeys = [...Object.keys(curr), ...Object.keys(extr)];
    return allKeys.reduce((acc, pkgName) => {
      const rootValue = curr[pkgName] ? [curr[pkgName]] : [];
      const extractedValue = extr[pkgName] ? extr[pkgName] : [];
      acc[pkgName] = [...rootValue, ...extractedValue];
      return acc;
    }, {} as Record<string, string[]>);
  }
}

function resolveVersions(deps: RootDepMapNormalized) {
  return {
    prod: resolve(deps.prod),
    dev: resolve(deps.dev),
  };

  function resolve(val: Record<string, string[]>) {
    return Object.entries(val).reduce(
      (acc, [pkgName, pkgVersions]) => {
        acc[pkgName] = [getLatest(pkgVersions)];
        return acc;
      },
      { ...val },
    );
  }

  function getLatest(versions: string[]): string {
    const minVersions = versions.map(version => semver.minVersion(version)?.version) as string[];
    const sorted = minVersions.sort(semver.rcompare);
    return sorted[0];
  }
}
function dedupeRoot(deps: RootDepMapNormalized) {
  // devDeps in root have higher priority as deps might use ^ and lower version in range
  const newDevDeps: RootDepMapNormalized['dev'] = Object.entries(deps.dev).reduce(
    (acc, [pkgName, pkgVersions]) => {
      acc[pkgName] = unique(pkgVersions);
      return acc;
    },
    { ...deps.dev },
  );
  const newProdDeps = Object.entries(deps.prod).reduce((acc, [pkgName, pkgVersion]) => {
    const devDep = newDevDeps[pkgName];

    if (devDep) {
      newDevDeps[pkgName].push(...pkgVersion);
      newDevDeps[pkgName] = unique(newDevDeps[pkgName]);

      return acc;
    }

    acc[pkgName] = pkgVersion;

    return acc;
  }, {} as Record<string, string[]>);

  return { prod: newProdDeps, dev: newDevDeps };
}

function unique<T extends unknown[]>(arr: T) {
  return [...new Set(arr)] as T;
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
  const packagesToRoot: { dev: Record<string, Set<string>>; prod: Record<string, Set<string>> } = { dev: {}, prod: {} };

  const result = Object.entries(map).reduce((acc, [projectName, deps]) => {
    const { dev, prod } = deps;

    const normalizedDev = Object.entries(dev).reduce((acc2, [depName, depVersion]) => {
      if (depVersion === '*') {
        acc2[depName] = '*';
        return acc2;
      }

      if (isWorkspaceDep(tree, depName)) {
        acc2[depName] = '*';
        return acc2;
      }

      packagesToRoot.dev[depName] = packagesToRoot.dev[depName] ?? new Set();
      packagesToRoot.dev[depName].add(depVersion);

      return acc2;
    }, {} as Record<string, string>);

    const normalizedProd = Object.entries(prod).reduce((acc2, [depName, depVersion]) => {
      if (!isWorkspaceDep(tree, depName)) {
        packagesToRoot.prod[depName] = packagesToRoot.prod[depName] ?? new Set();
        packagesToRoot.prod[depName].add(depVersion);
      }

      return acc2;
    }, prod);

    acc[projectName].dev = normalizedDev;
    acc[projectName].prod = normalizedProd;
    return acc;
  }, map);

  const packagesToRootSerializedDev = Object.entries(packagesToRoot.dev).reduce((acc, [packageName, versions]) => {
    acc[packageName] = [...versions];
    return acc;
  }, {} as Record<string, string[]>);
  const packagesToRootSerializedProd = Object.entries(packagesToRoot.prod).reduce((acc, [packageName, versions]) => {
    acc[packageName] = [...versions];
    return acc;
  }, {} as Record<string, string[]>);

  const packagesToRootSerialized = { dev: packagesToRootSerializedDev, prod: packagesToRootSerializedProd };

  return { result, packagesToRoot: packagesToRootSerialized };
}

function parsePackages(tree: Tree) {
  const projects = getProjects(tree);

  const data: DepMap = {};
  projects.forEach((project, projectName) => {
    const pkgJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
    data[projectName] = {
      dev: pkgJson.devDependencies ?? {},
      prod: pkgJson.dependencies ?? {},
      peer: pkgJson.peerDependencies ?? {},
    };
  });

  return data;
}
