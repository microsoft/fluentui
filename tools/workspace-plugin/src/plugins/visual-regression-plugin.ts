import { readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { globSync } from 'fast-glob';
import {
  type CreateDependenciesContext,
  type CreateNodesContextV2,
  type CreateNodesResult,
  type CreateNodesResultV2,
  type CreateNodesV2,
  type RawProjectGraphDependency,
  DependencyType,
  createNodesFromFiles,
  readJsonFile,
} from '@nx/devkit';
import * as ts from 'typescript';

interface Group {
  packageRoot: string;
  stories: string[];
}

interface Manifest {
  groups: Record<string, Group>;
  addons?: string[];
  previewAnnotations?: string[];
}

const manifestGlob = '**/visual-regression.config.json';
const executor = '@fluentui/workspace-plugin:visual-regression';

function filesForGlob(pattern: string, root: string): string[] {
  return [...globSync(pattern, { cwd: root })].sort();
}

function readManifest(path: string): Manifest {
  const manifest = readJsonFile<Manifest>(path);
  if (!manifest.groups || !Object.keys(manifest.groups).length) {
    throw new Error(`Visual regression manifest ${path} must contain nonempty groups`);
  }
  return manifest;
}

function groupStories(manifest: Manifest, hostRoot: string, workspaceRoot: string): Record<string, string[]> {
  const hostPath = join(workspaceRoot, hostRoot);
  const owners = new Map<string, string[]>();
  const byGroup: Record<string, string[]> = {};

  for (const [name, group] of Object.entries(manifest.groups)) {
    if (!group.packageRoot || !group.stories?.length) {
      throw new Error(`Visual regression group ${name} needs a packageRoot and stories`);
    }
    byGroup[name] = [...new Set(group.stories.flatMap(pattern => filesForGlob(pattern, hostPath)))];
    if (!byGroup[name].length) {
      throw new Error(`Visual regression group ${name} matches no stories: ${group.stories.join(', ')}`);
    }
    for (const story of byGroup[name]) {
      owners.set(story, [...(owners.get(story) ?? []), name]);
    }
  }

  const allStories = filesForGlob('src/stories/**/*.stories.tsx', hostPath);
  const missing = allStories.filter(story => !owners.has(story));
  const duplicate = [...owners].filter(([, groups]) => groups.length > 1);
  if (missing.length || duplicate.length) {
    throw new Error(
      `Visual regression story ownership invalid in ${hostRoot}: ${[
        ...missing.map(story => `${story}: missing group`),
        ...duplicate.map(([story, groups]) => `${story}: multiple groups ${groups.join(', ')}`),
      ].join('; ')}`,
    );
  }
  return byGroup;
}

function compilerOptions(hostPath: string): ts.CompilerOptions {
  const configPath = join(hostPath, 'tsconfig.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) {
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  }
  return ts.parseJsonConfigFileContent(config.config, ts.sys, dirname(configPath)).options;
}

function references(filePath: string): { imports: string[]; addons: string[] } {
  const source = ts.createSourceFile(filePath, readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true);
  const imports: string[] = [];
  const addons: string[] = [];
  const visit = (node: ts.Node): void => {
    if (
      (ts.isImportDeclaration(node) && node.importClause?.isTypeOnly) ||
      (ts.isExportDeclaration(node) && node.isTypeOnly)
    ) {
      return;
    }
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      imports.push(node.moduleSpecifier.text);
    } else if (
      ts.isImportEqualsDeclaration(node) &&
      ts.isExternalModuleReference(node.moduleReference) &&
      node.moduleReference.expression &&
      ts.isStringLiteral(node.moduleReference.expression)
    ) {
      imports.push(node.moduleReference.expression.text);
    } else if (ts.isCallExpression(node) && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
      if (ts.isIdentifier(node.expression) && node.expression.text === 'loadWorkspaceAddon') {
        addons.push(node.arguments[0].text);
      } else if (
        ts.isIdentifier(node.expression) &&
        (node.expression.text === 'require' || node.expression.text === 'import')
      ) {
        imports.push(node.arguments[0].text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { imports, addons };
}

function isInside(filePath: string, directory: string): boolean {
  const remainder = relative(directory, filePath);
  return remainder === '' || (remainder !== '..' && !remainder.startsWith(`..${sep}`) && !isAbsolute(remainder));
}

function collectFiles(
  initialFiles: string[],
  hostPath: string,
  workspaceRoot: string,
  options: ts.CompilerOptions,
  addonOverride?: string[],
): { helpers: string[]; resolved: string[]; addons: string[] } {
  const pending = [...initialFiles];
  const visited = new Set<string>();
  const resolved = new Set<string>();
  const addons = new Set<string>();
  while (pending.length) {
    const filePath = pending.pop()!;
    if (visited.has(filePath)) {
      continue;
    }
    visited.add(filePath);
    const refs = references(filePath);
    const activeAddons = addonOverride ?? refs.addons;
    activeAddons.forEach(addon => addons.add(addon));
    for (const specifier of [...refs.imports, ...activeAddons]) {
      const result = ts.resolveModuleName(specifier, filePath, options, ts.sys).resolvedModule?.resolvedFileName;
      if (!result) {
        continue;
      }
      const target = resolve(result);
      if (isInside(target, workspaceRoot) && !target.includes(`${sep}node_modules${sep}`)) {
        if (!specifier.startsWith('.')) {
          resolved.add(target);
        }
        if ((specifier.startsWith('.') || isInside(target, hostPath)) && !visited.has(target)) {
          pending.push(target);
        }
      }
    }
  }
  return {
    helpers: [...visited].filter(filePath => !initialFiles.includes(filePath)).sort(),
    resolved: [...resolved],
    addons: [...addons],
  };
}

export const createNodesV2: CreateNodesV2 = [
  manifestGlob,
  (configFiles: readonly string[], options: unknown, context: CreateNodesContextV2): Promise<CreateNodesResultV2> =>
    createNodesFromFiles(createNodesInternal, configFiles, options, context),
];

function createNodesInternal(configFile: string, _options: unknown, context: CreateNodesContextV2): CreateNodesResult {
  const hostRoot = dirname(configFile);
  const hostPath = join(context.workspaceRoot, hostRoot);
  const manifest = readManifest(join(context.workspaceRoot, configFile));
  const stories = groupStories(manifest, hostRoot, context.workspaceRoot);
  const hostProject = readJsonFile<{ name: string }>(join(hostPath, 'project.json')).name;
  const options = compilerOptions(hostPath);
  const projects: NonNullable<CreateNodesResult['projects']> = {};
  const configFiles = ['js', 'ts', 'tsx']
    .flatMap(extension => filesForGlob(`.storybook/**/*.${extension}`, hostPath))
    .map(file => join(hostPath, file));

  for (const [name, group] of Object.entries(manifest.groups)) {
    const projectName = `${name}-vrt`;
    const projectRoot = `${group.packageRoot}/visual-regression`;
    const baseOutput = `${hostRoot}/dist/visual-regression/${projectName}`;
    const storybookPath = `${baseOutput}/storybook`;
    const screenshotsPath = `${baseOutput}/screenshots`;
    const found = collectFiles(
      [...stories[name].map(story => join(hostPath, story)), ...configFiles],
      hostPath,
      context.workspaceRoot,
      options,
      manifest.addons,
    );
    const vrt = [
      `{workspaceRoot}/${configFile}`,
      ...group.stories.map(story => `{workspaceRoot}/${hostRoot}/${story}`),
      ...found.helpers.map(
        filePath => `{workspaceRoot}/${relative(context.workspaceRoot, filePath).split(sep).join('/')}`,
      ),
      `{workspaceRoot}/${hostRoot}/.storybook/**`,
      `{workspaceRoot}/${hostRoot}/src/utilities/**`,
      `{workspaceRoot}/${hostRoot}/tsconfig.json`,
      `{workspaceRoot}/${hostRoot}/package.json`,
      '{workspaceRoot}/tsconfig.base.json',
      '{workspaceRoot}/package.json',
      '{workspaceRoot}/yarn.lock',
      '{workspaceRoot}/.yarnrc.yml',
      '{workspaceRoot}/babel.config.js',
      '{workspaceRoot}/tools/workspace-plugin/src/plugins/visual-regression-plugin.ts',
      '{workspaceRoot}/tools/workspace-plugin/src/executors/visual-regression/**',
    ];
    const inputs = [
      'vrt',
      '^production',
      { externalDependencies: ['nx', 'typescript', 'storybook', '@storybook/react-webpack5', 'storywright'] },
      { runtime: 'node --version' },
      { runtime: 'node -p process.platform' },
      { runtime: 'node -p process.arch' },
    ];

    projects[projectRoot] = {
      name: projectName,
      root: projectRoot,
      namedInputs: { vrt: [...new Set(vrt)] },
      metadata: { visualRegression: { hostProject, hostRoot, screenshotsPath } },
      targets: {
        'build-vr-storybook': {
          executor,
          cache: true,
          inputs,
          outputs: [`{workspaceRoot}/${storybookPath}`],
          dependsOn: manifest.addons?.length === 0 ? [] : [{ projects: ['react-storybook-addon'], target: 'build' }],
          options: {
            mode: 'build',
            hostRoot,
            stories: group.stories,
            outputPath: storybookPath,
            ...(manifest.addons === undefined ? {} : { addons: manifest.addons }),
            ...(manifest.previewAnnotations === undefined ? {} : { previewAnnotations: manifest.previewAnnotations }),
          },
        },
        'test-vr-granular': {
          executor,
          cache: true,
          inputs,
          outputs: [`{workspaceRoot}/${screenshotsPath}`],
          dependsOn: ['build-vr-storybook'],
          options: { mode: 'capture', hostRoot, storybookPath, outputPath: screenshotsPath, concurrency: 1 },
        },
      },
    };
  }
  return { projects };
}

export function createDependencies(
  _options: undefined,
  context: CreateDependenciesContext,
): RawProjectGraphDependency[] {
  const dependencies: RawProjectGraphDependency[] = [];
  const projects = Object.entries(context.projects).map(([name, config]) => ({ ...config, name }));
  const virtualProjects = projects.filter(project => project.metadata?.visualRegression);
  const hosts = new Map<
    string,
    {
      manifest: Manifest;
      stories: Record<string, string[]>;
      options: ts.CompilerOptions;
      configFiles: string[];
    }
  >();

  for (const project of virtualProjects) {
    const metadata = project.metadata!.visualRegression as { hostRoot: string; hostProject: string };
    const hostPath = join(context.workspaceRoot, metadata.hostRoot);
    if (!hosts.has(metadata.hostRoot)) {
      const manifest = readManifest(join(hostPath, 'visual-regression.config.json'));
      hosts.set(metadata.hostRoot, {
        manifest,
        stories: groupStories(manifest, metadata.hostRoot, context.workspaceRoot),
        options: compilerOptions(hostPath),
        configFiles: ['js', 'ts', 'tsx'].flatMap(extension =>
          [
            ...filesForGlob(`.storybook/**/*.${extension}`, hostPath),
            ...filesForGlob(`src/utilities/**/*.${extension}`, hostPath).filter(file => !file.includes('.test.')),
          ].map(file => join(hostPath, file)),
        ),
      });
    }
    const { manifest, stories, options, configFiles } = hosts.get(metadata.hostRoot)!;
    const groupName = project.name.replace(/-vrt$/, '');
    const group = manifest.groups[groupName];
    if (!group) {
      throw new Error(`Visual regression project ${project.name} has no group in ${metadata.hostRoot}`);
    }
    const found = collectFiles(
      [...stories[groupName].map(story => join(hostPath, story)), ...configFiles],
      hostPath,
      context.workspaceRoot,
      options,
      manifest.addons,
    );
    const targets = new Set<string>();
    for (const candidate of projects) {
      if (
        candidate.name !== project.name &&
        candidate.name !== metadata.hostProject &&
        isInside(join(context.workspaceRoot, candidate.root), join(context.workspaceRoot, group.packageRoot))
      ) {
        if (candidate.name === groupName) {
          targets.add(candidate.name);
        }
      }
    }
    for (const filePath of found.resolved) {
      const owner = projects
        .filter(
          candidate =>
            candidate.name !== project.name &&
            candidate.root !== '.' &&
            candidate.name !== metadata.hostProject &&
            isInside(filePath, join(context.workspaceRoot, candidate.root)),
        )
        .sort((first, second) => second.root.length - first.root.length)[0];
      if (owner) {
        targets.add(owner.name);
      }
    }
    for (const addon of found.addons) {
      const resolved = ts.resolveModuleName(addon, join(hostPath, '.storybook/main.js'), options, ts.sys).resolvedModule
        ?.resolvedFileName;
      const owner =
        resolved &&
        projects
          .filter(
            candidate =>
              candidate.name !== metadata.hostProject &&
              isInside(resolve(resolved), join(context.workspaceRoot, candidate.root)),
          )
          .sort((first, second) => second.root.length - first.root.length)[0];
      if (owner) {
        targets.add(owner.name);
      }
    }
    for (const target of targets) {
      dependencies.push({ source: project.name, target, type: DependencyType.implicit });
    }
  }
  return dependencies;
}
