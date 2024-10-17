import {
  formatFiles,
  getProjects,
  logger,
  ProjectConfiguration,
  readJson,
  Tree,
  updateJson,
  // serializeJson,
  // writeJson,
} from '@nx/devkit';
import { join } from 'node:path';
import { MigrateToProjectCrystalGeneratorSchema } from './schema';

export async function migrateToProjectCrystalGenerator(tree: Tree, _options: MigrateToProjectCrystalGeneratorSchema) {
  const projects = getProjects(tree);

  const result: {
    [projectName: string]: { npm: string[]; metadata: { copy: null | Record<string, string> }; nx: string[] };
  } = {};

  projects.forEach((projectConfig, projectName) => {
    const tags = projectConfig.tags ?? [];

    if (projectConfig.projectType === 'application') {
      return;
    }

    const justConfigPath = join(projectConfig.root, 'just.config.ts');
    const projectJsonPath = join(projectConfig.root, 'project.json');
    const pkgJsonPath = join(projectConfig.root, 'package.json');
    const pkgJson = readJson(tree, pkgJsonPath);

    const copyConfig = getCopyConfig(tree, projectConfig);

    if (!tags.includes('vNext') && tags.includes('tools') && !tags.includes('v8')) {
      result[projectName] = { npm: Object.keys(pkgJson.scripts ?? {}), metadata: { copy: copyConfig }, nx: [] };

      updateProject(tree, projectConfig, { justConfigPath, pkgJsonPath, projectJsonPath, copyConfig });

      if (projectConfig.root.startsWith('scripts/')) {
        updateJson<ProjectConfiguration>(tree, projectJsonPath, json => {
          delete json.targets;
          return json;
        });
      }

      console.log('tools: ' + projectName);

      return;
    }

    if (tags.includes('vNext')) {
      result[projectName] = { npm: Object.keys(pkgJson.scripts), metadata: { copy: copyConfig }, nx: [] };

      updateProject(tree, projectConfig, { justConfigPath, pkgJsonPath, projectJsonPath, copyConfig });

      if (tags.includes('v8') || tags.includes('react-northstar')) {
        console.log('hybrid:' + projectName);
        return;
      }
      if (tags.includes('tools')) {
        console.log('tools: ' + projectName);
        return;
      }
      console.log('v9: ' + projectName);
    }
  });

  await formatFiles(tree);

  const reportPath = join('scripts-to-nx-migration.json');
  // tree.write(reportPath, serializeJson(result));
  logger.info(`results created at: ${reportPath}`);
}

function getCopyConfig(tree: Tree, project: ProjectConfiguration) {
  const copyAssetsConfigPath = join(project.root, 'config/pre-copy.json');
  return tree.exists(copyAssetsConfigPath) ? readJson(tree, copyAssetsConfigPath) : null;
}

function updateProject(
  tree: Tree,
  project: ProjectConfiguration,
  config: {
    pkgJsonPath: string;
    justConfigPath: string;
    projectJsonPath: string;
    copyConfig: { copyTo: Record<string, string> };
  },
) {
  updateJson(tree, config.pkgJsonPath, json => {
    delete json.scripts;
    delete json?.devDependencies?.['@fluentui/scripts-tasks'];
    return json;
  });
  tree.delete(config.justConfigPath);

  updateJson<ProjectConfiguration>(tree, config.projectJsonPath, json => {
    if (config.copyConfig) {
      // const values = Object.values(config.copyConfig.copyTo);
      // const hasJson = values.some(val=>val.includes('.json'));
      // const hasDts = values.some(val=>val.includes('.d.ts'));
      json.targets ??= {};
      json.targets.build ??= {};
      json.targets.build.options ??= {};
      json.targets.build.options.assets = [
        // {
        //   input: '{projectRoot}/src/{jsx-runtime,jsx-dev-runtime}',
        //   output: '{projectRoot}',
        //   glob: '*.json__tmpl__',
        //   substitutions: {
        //     __tmpl__: '',
        //   },
        // },
        // {
        //   input: '{projectRoot}/src/{jsx-runtime,jsx-dev-runtime}',
        //   output: '{projectRoot}/dist',
        //   glob: '*.d.ts__tmpl__',
        //   substitutions: {
        //     __tmpl__: '',
        //   },
        // },
      ];
    }

    /*
     "copyTo": {
          "jsx-runtime/package.json": "./src/jsx-runtime/package.json__tmpl__",
          "jsx-dev-runtime/package.json": "./src/jsx-dev-runtime/package.json__tmpl__",
          "dist/jsx-runtime.d.ts": "./src/jsx-runtime/index.d.ts__tmpl__",
          "dist/jsx-dev-runtime.d.ts": "./src/jsx-dev-runtime/index.d.ts__tmpl__"
        }
    */

    return json;
  });
}

export default migrateToProjectCrystalGenerator;
