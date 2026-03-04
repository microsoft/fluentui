import path from 'path';
import { Tree, formatFiles, names, generateFiles } from '@nx/devkit';

import { CliCommandGeneratorSchema } from './schema';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

const CLI_PROJECT_ROOT = 'tools/cli';
const COMMANDS_DIR = 'src/commands';

export default async function (tree: Tree, schema: CliCommandGeneratorSchema) {
  const options = normalizeOptions(schema);

  assertCommandDoesNotExist(tree, options);

  addFiles(tree, options);
  registerCommand(tree, options);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}

function normalizeOptions(options: CliCommandGeneratorSchema) {
  if (!options.name || options.name.length === 0) {
    throw new Error('name is required');
  }

  return {
    ...options,
    ...names(options.name),
    description: options.description ?? 'TODO: Add description',
    skipFormat: options.skipFormat ?? false,
    commandDir: path.join(CLI_PROJECT_ROOT, COMMANDS_DIR, options.name),
    cliEntryPath: path.join(CLI_PROJECT_ROOT, 'src/cli.ts'),
  };
}

function assertCommandDoesNotExist(tree: Tree, options: NormalizedSchema) {
  if (tree.exists(path.join(options.commandDir, 'index.ts'))) {
    throw new Error(`Command "${options.name}" already exists at ${options.commandDir}`);
  }
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    tmpl: '',
  };

  generateFiles(tree, path.join(__dirname, 'files'), options.commandDir, templateOptions);
}

function registerCommand(tree: Tree, options: NormalizedSchema) {
  const cliPath = options.cliEntryPath;
  const content = tree.read(cliPath, 'utf-8');

  if (!content) {
    throw new Error(`CLI entry file not found at ${cliPath}`);
  }

  const importName = `${options.propertyName}Command`;
  const importPath = `./commands/${options.name}`;

  if (content.includes(importPath)) {
    return;
  }

  // Add import after the last existing command import
  const importStatement = `import ${importName} from '${importPath}';\n`;
  const lastImportIndex = content.lastIndexOf('import ');
  const lastImportEnd = content.indexOf('\n', lastImportIndex) + 1;
  const withImport = content.slice(0, lastImportEnd) + importStatement + content.slice(lastImportEnd);

  // Add .command() registration before .demandCommand()
  const commandRegistration = `    .command(${importName})\n`;
  const demandCommandIndex = withImport.indexOf('.demandCommand(');
  const insertPoint = withImport.lastIndexOf('\n', demandCommandIndex) + 1;
  const withCommand = withImport.slice(0, insertPoint) + commandRegistration + withImport.slice(insertPoint);

  tree.write(cliPath, withCommand);
}
