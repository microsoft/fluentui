import {
  Tree,
  formatFiles,
  joinPathFragments,
  updateJson,
  ProjectConfiguration,
  readJson,
  writeJson,
  logger,
  readProjectConfiguration,
  readNxJson,
} from '@nx/devkit';
import { moveGenerator } from '@nx/workspace/generators';
import { getProjectConfig, getProjects, hasSchemaFlag, isPackageConverged, isV8Package } from '../../utils';

import { MovePackagesGeneratorSchema } from './schema';

interface AssertedSchema extends MovePackagesGeneratorSchema {
  name: string;
}

export default async function (tree: Tree, schema: MovePackagesGeneratorSchema) {
  validateSchema(schema);

  if (hasSchemaFlag(schema, 'allConverged')) {
    await runBatchMove(tree, schema, isPackageConverged);
  } else if (hasSchemaFlag(schema, 'allV8')) {
    await runBatchMove(tree, schema, isV8Package);
  } else {
    hasSchemaFlag(schema, 'name') && (await movePackage(tree, schema));
  }

  await formatFiles(tree);
}

async function runBatchMove(
  tree: Tree,
  schema: MovePackagesGeneratorSchema,
  libraryVersionChecker: (tree: Tree, project: ProjectConfiguration) => boolean,
) {
  const projects = getProjects(tree);
  for (const [projectName, projectConfig] of projects) {
    if (libraryVersionChecker(tree, projectConfig)) {
      const destination = `${schema.destination}/${projectName.split('/')[1]}`;
      logger.log(`Attempting to move ${projectName} to ${destination}`);

      await movePackage(tree, {
        name: projectName,
        destination,
        updateImportPath: schema.updateImportPath,
      });
    }
  }
}

/**
 *
 * Starting nx 17, projects that include scope  within their project name cannot be moved via `derived`
 * until we refactor all projects to not use `@fluentui` scope as part of their name we need this extra logic
 */
function getDerivedRootPathPrefix(tree: Tree, projectName: string) {
  const nxJsonMapping = { library: 'libsDir', application: 'appsDir' } as const;
  const nxConfig = readNxJson(tree);
  const projectConfig = readProjectConfiguration(tree, projectName);

  if (!nxConfig) {
    throw new Error('nx.json doesnt exist');
  }

  if (!projectConfig.projectType) {
    throw new Error(`project ${projectName} has not specified projectType`);
  }

  const workspaceLayout = (nxConfig.workspaceLayout ?? {
    libsDir: '',
    appsDir: '',
  }) as { libsDir: string; appsDir: string };

  const root = workspaceLayout[nxJsonMapping[projectConfig.projectType]];

  return root;
}

async function movePackage(tree: Tree, schema: AssertedSchema) {
  const { name, destination, updateImportPath = false } = schema;

  const derivedRootPath = getDerivedRootPathPrefix(tree, name);
  const derivedDestination = joinPathFragments(derivedRootPath, destination);

  await moveGenerator(tree, {
    projectName: name,
    destination: derivedDestination,
    importPath: name,
    updateImportPath,
    projectNameAndRootFormat: 'as-provided',
  });

  updateApiExtractor(tree, schema);
  updateStorybookTypeImport(tree, schema);
  updateBuildLocalScript(tree, schema);
  updateCodeOwners(tree, schema);
}

function validateSchema(schema: MovePackagesGeneratorSchema) {
  const { name, allConverged, allV8 } = schema;

  if (name && allConverged) {
    throw new Error('--name and --allConverged are mutually exclusive');
  }

  if (name && allV8) {
    throw new Error('--name and --allV8 are mutually exclusive');
  }

  if (allConverged && allV8) {
    throw new Error('--allConverged and --allV8 are mutually exclusive');
  }

  if (!name && !allConverged && !allV8) {
    throw new Error(`must provide a specified --name or provide --allConverged or provide --allV8`);
  }
}

/**
 * manually update each packages' storybook main.js module.exports type to the new
 * storybook relative path.
 */
function updateStorybookTypeImport(tree: Tree, schema: AssertedSchema) {
  const project = getProjects(tree).get(schema.name) as ProjectConfiguration;
  const storybookMainJsPath = joinPathFragments(project.root, '/.storybook/main.js');

  if (!tree.exists(storybookMainJsPath)) {
    return;
  }

  const storybookMainJsFile = tree.read(storybookMainJsPath, 'utf8') as string;
  const [newStorybookPath, oldStorybookPath] = storybookMainJsFile.match(/\([^)]*\)/g) as RegExpMatchArray;
  const updatedStorybookMainJsFile = storybookMainJsFile.replace(oldStorybookPath, newStorybookPath);
  tree.write(storybookMainJsPath, updatedStorybookMainJsFile);
}

function updateCodeOwners(tree: Tree, schema: AssertedSchema) {
  const projectConfig = getProjectConfig(tree, { packageName: schema.name });
  const codeownersPath = joinPathFragments('/.github', 'CODEOWNERS');

  if (!tree.exists(codeownersPath)) {
    return;
  }

  const codeOwnersFile = tree.read(codeownersPath, 'utf8') as string;
  const updatedCodeOwnersFile = codeOwnersFile.replace(projectConfig.normalizedPkgName, schema.destination);
  tree.write(codeownersPath, updatedCodeOwnersFile);
}

function updateApiExtractor(tree: Tree, schema: AssertedSchema) {
  const projectConfig = getProjectConfig(tree, { packageName: schema.name });
  const apiExtractorLocalPath = joinPathFragments(projectConfig.paths.configRoot, 'api-extractor.local.json');
  const apiExtractorLocal = readJson(tree, apiExtractorLocalPath);
  const originalEntryPointPath = apiExtractorLocal.mainEntryPointFilePath;
  const normalizeFolderDestination = schema.destination.split('/').slice(0, -1).join('/');
  const updatedEntryPointPath = originalEntryPointPath.replace(
    'packages/<unscopedPackageName>',
    `packages/${normalizeFolderDestination}/<unscopedPackageName>`,
  );
  apiExtractorLocal.mainEntryPointFilePath = updatedEntryPointPath;

  writeJson(tree, apiExtractorLocalPath, apiExtractorLocal);
}

function updateBuildLocalScript(tree: Tree, schema: AssertedSchema) {
  const projectConfig = getProjectConfig(tree, { packageName: schema.name });
  updateJson(tree, projectConfig.paths.packageJson, json => {
    json.scripts = json.scripts ?? {};
    const originalScript = json.scripts['build:local'];
    const updatedScript = originalScript.replace(projectConfig.normalizedPkgName, schema.destination);
    json.scripts['build:local'] = updatedScript;
    return json;
  });
}
