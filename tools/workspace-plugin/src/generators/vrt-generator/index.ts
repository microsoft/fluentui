import {
  addProjectConfiguration,
  joinPathFragments,
  formatFiles,
  generateFiles,
  Tree,
  offsetFromRoot,
} from '@nx/devkit';
import * as path from 'path';
import { VisualRegressionSchema } from './schema';
import { getProjectConfig, isPackageConverged } from '../../utils';
import { addCodeowner } from '../add-codeowners';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: VisualRegressionSchema) {
  const options = normalizeOptions(tree, schema);

  addFiles(tree, options);

  addCodeowner(tree, { packageName: options.projectConfig.name as string, owner: schema.owner as string });

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
  const root = joinPathFragments('packages', 'react-components', options.project, 'visual-regression');
  const { projectConfig } = getProjectConfig(tree, { packageName: options.project });

  if (!isPackageConverged(tree, projectConfig)) {
    throw new Error(`this generator works only with v9 packages. "${projectConfig.name}" is not!`);
  }

  addProjectConfiguration(tree, projectName, {
    root,
    projectType: 'library',
    sourceRoot: `${root}/src`,
    tags: ['platform:web', 'vNext', 'visual-regression'],
    targets: {
      storybook: {
        command: 'storybook dev',
        options: {
          cwd: '{projectRoot}',
        },
      },
      'generate-image-for-vrt': {
        command:
          'rm -rf dist/vrt/actual && storywright  --browsers chromium --url dist/storybook --destpath dist/actual --waitTimeScreenshot 500 --concurrency 4 --headless true',
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
        outputs: ['{projectRoot}/dist/screenshots/**'],
        cache: true,
      },
      'test-vr': {
        executor: '@fluentui/workspace-plugin:visual-regression',
        dependsOn: ['build-storybook'],
      },
      'test-vr-cli': {
        command:
          'visual-regression-assert --baselineDir dist/baseline --actualDir dist/screenshots --diffDir dist/diff --reportPath dist/report.html',
        options: {
          cwd: '{projectRoot}',
        },
        dependsOn: ['build-storybook', 'generate-image-for-vrt'],
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
      build: {
        executor: '@nx/js:swc',
        outputs: ['{options.outputPath}'],
        options: {
          outputPath: `dist/${root}`,
          main: `${root}/src/index.ts`,
          tsConfig: `${root}/tsconfig.lib.json`,
          assets: [`${root}/*.md`],
        },
      },
      lint: {
        executor: '@nx/eslint:lint',
      },
    },
    implicitDependencies: [],
  });

  const project = getProjectConfig(tree, { packageName: projectName });

  return {
    ...options,
    ...project,
    rootOffset: offsetFromRoot(root),
    projectName,
  };
}
