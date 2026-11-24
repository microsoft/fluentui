import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import { isBuiltin } from 'node:module';
import * as path from 'node:path';

import { getDependencies } from '@fluentui/scripts-monorepo';
import { sync as globSync } from 'glob';
import * as ts from 'typescript';

import { createPackageResolutions } from './packPackages';
import { generateFiles, prepareTempDirs, workspaceRoot } from './utils';

interface Manifest {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  resolutions?: Record<string, string>;
  main?: string;
  module?: string;
  types?: string;
  typings?: string;
  exports?: string | null | { [condition: string]: Manifest['exports'] };
}

function readManifest(root: string): Manifest {
  return JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
}

export function verifyDeclaredImports(root: string, manifest: Manifest): void {
  const declared = { ...manifest.dependencies, ...manifest.devDependencies, ...manifest.optionalDependencies };
  for (const file of globSync('**/*.{ts,tsx}', { cwd: root, ignore: ['node_modules/**', 'dist/**'] })) {
    const { importedFiles } = ts.preProcessFile(fs.readFileSync(path.join(root, file), 'utf8'), true, true);
    for (const { fileName: specifier } of importedFiles) {
      if (specifier.startsWith('.') || path.isAbsolute(specifier) || isBuiltin(specifier)) {
        continue;
      }
      const name = specifier
        .split('/')
        .slice(0, specifier.startsWith('@') ? 2 : 1)
        .join('/');
      if (!Object.prototype.hasOwnProperty.call(declared, name)) {
        throw new Error(`${file}: ${name} is imported but not declared by the starter`);
      }
    }
  }
}

export function verifyPackageOutputs(root: string, manifest: Manifest): void {
  const exports: string[] = [];
  const visit = (value: Manifest['exports']) => {
    if (typeof value === 'string') {
      exports.push(value);
    } else if (value) {
      Object.values(value).forEach(visit);
    }
  };
  visit(manifest.exports);
  const outputs = [manifest.main, manifest.module, manifest.types, manifest.typings, ...exports];
  for (const output of outputs) {
    if (output && globSync(output, { cwd: root, nodir: true }).length === 0) {
      throw new Error(`${manifest.name}: missing package output ${output} in ${root}`);
    }
  }
}

export async function withTemporaryApp(run: (app: string, root: string) => Promise<void>): Promise<void> {
  const { root, testApp } = prepareTempDirs('fluent-vite-');
  let failure: unknown;
  let failed = false;
  try {
    await run(testApp, root);
  } catch (error) {
    failed = true;
    failure = error;
  }
  try {
    fs.rmSync(root, { recursive: true, force: true });
  } catch (error) {
    if (!failed) {
      throw error;
    }
    console.error('Failed to clean up the temporary Vite app:', error);
  }
  if (failed) {
    throw failure;
  }
}

export async function testIntegration(): Promise<void> {
  const { dependencies, projectGraph, getProjectPackageJsonInfo } = await getDependencies('react-components');
  const localPackages = [...new Set(['react-components', ...dependencies.map(dependency => dependency.name)])].map(
    project => getProjectPackageJsonInfo(project, projectGraph),
  );

  await withTemporaryApp(async (app, root) => {
    generateFiles(path.join(workspaceRoot, 'starter-templates/src/react-components-vite'), app);
    const manifest = readManifest(app);
    // Hoisted transitive packages must not conceal a missing starter dependency.
    verifyDeclaredImports(app, manifest);
    for (const name of Object.keys({
      ...manifest.dependencies,
      ...manifest.devDependencies,
      ...manifest.optionalDependencies,
    })) {
      const project = name.replace('@fluentui/', '');
      if (
        projectGraph.nodes[project] &&
        getProjectPackageJsonInfo(project, projectGraph).name === name &&
        !localPackages.some(pkg => pkg.name === name)
      ) {
        throw new Error(`${name}: add this local starter dependency to the integration package selection and Nx graph`);
      }
    }
    const archives: Record<string, string> = {};
    for (const local of localPackages) {
      verifyPackageOutputs(local.absoluteRootPath, local);
      // Sequential packing ensures no subprocess is still writing when cleanup starts.
      const result: { filename: string }[] = JSON.parse(
        execFileSync('npm', ['pack', '--json', '--ignore-scripts', local.absoluteRootPath], {
          cwd: root,
          encoding: 'utf8',
        }),
      );
      archives[local.name] = path.join(root, result[0].filename);
    }
    fs.writeFileSync(
      path.join(app, 'package.json'),
      JSON.stringify(
        { ...manifest, resolutions: { ...manifest.resolutions, ...createPackageResolutions(archives) } },
        null,
        2,
      ),
    );

    const { packageManager } = readManifest(workspaceRoot) as Manifest & { packageManager: string };
    const yarn = path.join(workspaceRoot, `.yarn/releases/yarn-${packageManager.replace('yarn@', '')}.cjs`);
    const env = { ...process.env };
    // The consumer must resolve its own dependencies, not Nx/ts-node hooks or the workspace's binaries.
    for (const key of Object.keys(env)) {
      if (
        /^(NODE_PATH|NODE_OPTIONS|TS_NODE_.*|INIT_CWD|PROJECT_CWD)$/.test(key) ||
        (key.startsWith('YARN_') && !key.startsWith('YARN_NPM_'))
      ) {
        delete env[key];
      }
    }
    env.PATH = (env.PATH ?? '')
      .split(path.delimiter)
      .filter(entry => !entry.includes('node_modules') && !entry.startsWith(workspaceRoot))
      .join(path.delimiter);
    const runYarn = (...args: string[]) =>
      execFileSync(process.execPath, [yarn, ...args], { cwd: app, env, stdio: 'inherit' });
    runYarn('install', '--no-immutable');

    const lockfile = fs.readFileSync(path.join(app, 'yarn.lock'), 'utf8');
    for (const local of localPackages) {
      const name = local.name;
      const installedRoot = fs.realpathSync(path.join(app, 'node_modules', name));
      if (!installedRoot.startsWith(`${fs.realpathSync(app)}${path.sep}`)) {
        throw new Error(`${name}: installed package escaped the isolated consumer: ${installedRoot}`);
      }
      if (!lockfile.includes(`${name}@file:${archives[name]}#`)) {
        throw new Error(`${name}: consumer did not resolve the local tarball`);
      }
      verifyPackageOutputs(installedRoot, readManifest(installedRoot));
    }
    console.log(`Verified ${localPackages.length} local tarballs in isolated consumer ${app}`);
    if (fs.existsSync(path.join(app, 'dist'))) {
      throw new Error('The copied starter already contains dist; a fresh production build is required');
    }
    runYarn('build');
    if (!fs.existsSync(path.join(app, 'dist/index.html')) || globSync('dist/assets/*.js', { cwd: app }).length === 0) {
      throw new Error('Vite did not emit the production HTML and JavaScript assets');
    }
  });
}

if (require.main === module) {
  testIntegration().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
