import {
  addProjectConfiguration,
  joinPathFragments,
  applyChangesToString,
  formatFiles,
  generateFiles,
  Tree,
  offsetFromRoot,
  ChangeType,
  type StringChange,
} from '@nx/devkit';
import * as path from 'path';
import { VisualRegressionSchema } from './schema';
import { getProjectConfig } from '../../utils';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: VisualRegressionSchema) {
  const options = normalizeOptions(tree, schema);

  addFiles(tree, options);

  const codeownersPath = joinPathFragments('/.github', 'CODEOWNERS');
  const codeownersContent = tree.read(codeownersPath, 'utf8') as string;
  const insertPosition = codeownersContent.indexOf('\n', codeownersContent.indexOf(options.library)) + 1;

  if (insertPosition === -1) {
    throw new Error(`CODEOWNERS doesn't have an entry for ${options.library}`);
  }

  const changes: StringChange[] = [
    {
      index: insertPosition,
      type: ChangeType.Insert,
      text: `${options.projectConfig.root} ${options.owner}\n`,
    },
  ];

  const newContents = applyChangesToString(codeownersContent, changes);
  tree.write(codeownersPath, newContents);
  await formatFiles(tree);
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const root = options.projectConfig.root as string;

  const templateOptions = {
    ...options,
    rootOffset: offsetFromRoot(root),
    npmScope: options.workspaceConfig.npmScope,
    componentName: options.project,
    tmpl: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), path.join(root), templateOptions);
}

function normalizeOptions(tree: Tree, options: VisualRegressionSchema) {
  const projectName = `${options.project}-visual-regression`;
  const { projectConfig } = getProjectConfig(tree, { packageName: options.project });
  const root = joinPathFragments(projectConfig.root.replace('/library', ''), 'visual-regression');
  const isVnextPackage = projectConfig.tags?.includes('vNext');

  if (!isVnextPackage) {
    throw new Error(`this generator works only with v9 packages. "${projectConfig.name}" is not!`);
  }

  if (options.project.endsWith('-stories')) {
    throw new Error(`${options.project} is a stories package, please specify react-<component> package name`);
  }

  if (!options.project.startsWith('react-')) {
    throw new Error('It should be v9 react-<component> package');
  }

  addProjectConfiguration(tree, projectName, {
    root,
    projectType: 'library',
    sourceRoot: `${root}/src`,
    tags: ['vNext', 'platform:web', 'visual-regression'],
    targets: {
      storybook: {
        command: 'storybook dev',
        options: {
          cwd: '{projectRoot}',
        },
      },
      'generate-image-for-vrt': {
        command:
          'rm -rf dist/vrt/actual && storywright  --browsers chromium --url dist/storybook --destpath dist/vrt/actual --waitTimeScreenshot 500 --concurrency 4 --headless true',
        options: {
          cwd: '{projectRoot}',
        },
        metadata: {
          help: {
            command: 'yarn storywright --help',
            example: {},
          },
        },
        dependsOn: ['build-storybook'],
        inputs: ['{projectRoot}/src/**/*.stories.tsx'],
        outputs: ['{projectRoot}/dist/vrt/actual/**'],
        cache: true,
      },
      'test-vr': {
        executor: '@fluentui/workspace-plugin:visual-regression',
        dependsOn: ['build-storybook'],
      },
      'test-vr-cli': {
        command: 'visual-regression-assert assert --baselineDir src/__snapshots__ --outputPath dist/vrt',
        options: {
          cwd: '{projectRoot}',
        },
        dependsOn: [
          'build-storybook',
          'generate-image-for-vrt',
          { projects: ['visual-regression-assert'], target: 'build' },
        ],
        inputs: ['{projectRoot}/dist/vrt/screenshots/**', '{projectRoot}/src/**/*.stories.tsx'],
        metadata: {
          help: {
            command: 'yarn visual-regression-assert --help',
            example: {},
          },
        },
      },
      'build-storybook': {
        command: 'storybook build -o dist/storybook --quiet',
        options: {
          cwd: '{projectRoot}',
        },
      },
    },
  });

  const project = getProjectConfig(tree, { packageName: projectName });

  return {
    ...options,
    ...project,
    rootOffset: offsetFromRoot(root),
    library: projectConfig.root,
    projectName,
  };
}

function assertProject(tree: Tree, options: NormalizedSchema) {}
