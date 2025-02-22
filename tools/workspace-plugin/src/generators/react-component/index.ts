import path from 'path';
import { execSync } from 'child_process';
import { Tree, formatFiles, names, generateFiles, joinPathFragments, workspaceRoot, offsetFromRoot } from '@nx/devkit';

import { getProjectConfig, isPackageConverged } from '../../utils';
import { assertStoriesProject, isSplitProject } from '../split-library-in-two/shared';

import { ReactComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: ReactComponentGeneratorSchema) {
  const options = normalizeOptions(tree, schema);

  assertComponent(tree, options);

  addFiles(tree, options);

  updateBarrel(tree, options);

  await formatFiles(tree);

  return () => {
    const root = workspaceRoot;
    const { project, componentName } = options;

    execSync(`yarn nx run ${project}:generate-api`, {
      cwd: root,
      stdio: 'inherit',
    });

    // This is used only for integration testing purposes on CI as jest disables snapshot updates by default
    const forceSnapshotUpdate = Boolean(process.env.__FORCE_SNAPSHOT_UPDATE__);
    const testCmd = `yarn nx run ${project}:test -t ${componentName}` + (forceSnapshotUpdate ? ' -u' : '');

    execSync(testCmd, {
      cwd: root,
      stdio: 'inherit',
    });

    execSync(`yarn nx run ${project}:lint --fix`, {
      cwd: root,
      stdio: 'inherit',
    });
  };
}

function normalizeOptions(tree: Tree, options: ReactComponentGeneratorSchema) {
  const project = getProjectConfig(tree, { packageName: options.project });
  const nameCasings = names(options.name);

  return {
    ...options,
    ...project,
    ...nameCasings,
    directory: 'components',
    componentName: nameCasings.className,
    npmPackageName: `@${project.workspaceConfig.npmScope}/${project.projectConfig.name}`,
    isSplitProject: isSplitProject(tree, project.projectConfig),
  };
}

function createStoriesTitle(options: NormalizedSchema) {
  const isCompat = options.projectConfig.tags?.includes('compat');
  const isPreview = options.projectConfig.name?.endsWith('-preview');
  const isStable = !isCompat && !isPreview;

  let storiesTitlePrefix;
  if (isStable) {
    storiesTitlePrefix = '';
  }
  if (isPreview) {
    storiesTitlePrefix = 'Preview ';
  }
  if (isCompat) {
    storiesTitlePrefix = 'Compat ';
  }

  const storiesTitle = `${storiesTitlePrefix}Components/${options.componentName}`;

  return storiesTitle;
}

function createExportsForComponent(options: NormalizedSchema) {
  const exports = [
    `${options.propertyName}ClassNames`,
    options.componentName,
    `render${options.componentName}_unstable`,
    `use${options.componentName}_unstable`,
    `use${options.componentName}Styles_unstable`,
  ];
  const typeExports = [`${options.componentName}Props`, `${options.componentName}State`];

  return { exports, typeExports };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const sourceRoot = options.projectConfig.sourceRoot as string;

  const templateOptions = {
    ...options,
    rootOffset: offsetFromRoot(joinPathFragments(sourceRoot, options.directory, options.componentName)),
    storiesTitle: createStoriesTitle(options),
    tmpl: '',
  };

  // component
  generateFiles(
    tree,
    path.join(__dirname, 'files', 'component'),
    path.join(sourceRoot, options.directory, options.componentName),
    templateOptions,
  );

  const { exports, typeExports } = createExportsForComponent(options);

  tree.write(
    joinPathFragments(sourceRoot, options.componentName + '.ts'),
    `export { ${exports.join(', ')} } from './${options.directory}/${options.componentName}/index';
    export type { ${typeExports.join(', ')} } from './${options.directory}/${options.componentName}/index';`,
  );

  // story
  const storiesPath = options.isSplitProject
    ? path.join(options.projectConfig.root, '../stories/src', options.componentName)
    : path.join(options.paths.stories, options.componentName);
  generateFiles(tree, path.join(__dirname, 'files', 'story'), storiesPath, templateOptions);

  if (!options.isSplitProject) {
    const storiesGitkeep = path.join(options.paths.stories, '.gitkeep');
    if (tree.exists(storiesGitkeep)) {
      tree.delete(storiesGitkeep);
    }
  }
}

function updateBarrel(tree: Tree, options: NormalizedSchema) {
  const indexPath = joinPathFragments(options.paths.sourceRoot, 'index.ts');
  const content = tree.read(indexPath, 'utf-8') as string;

  const { exports, typeExports } = createExportsForComponent(options);

  let newContent = content.replace('export {}', '');

  newContent += `export { ${exports.join(', ')} } from './${options.componentName}';`;
  newContent += `export type { ${typeExports.join(', ')} } from './${options.componentName}';`;

  tree.write(indexPath, newContent);
}

function assertComponent(tree: Tree, options: NormalizedSchema) {
  const componentDirPath = joinPathFragments(options.projectConfig.sourceRoot as string, options.componentName + '.ts');

  if (!isPackageConverged(tree, options.projectConfig)) {
    throw new Error(`this generator works only with v9 packages. "${options.projectConfig.name}" is not!`);
  }
  if (tree.exists(componentDirPath)) {
    throw new Error(`The component "${options.componentName}" already exists`);
  }

  assertStoriesProject(tree, { isSplitProject: options.isSplitProject, project: options.projectConfig });

  return;
}
