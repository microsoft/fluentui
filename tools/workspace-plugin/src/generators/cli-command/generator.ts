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
    commandSpecPath: path.join(CLI_PROJECT_ROOT, 'src/utils/command-spec.ts'),
    registryPath: path.join(CLI_PROJECT_ROOT, 'src/commands/registry.ts'),
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
  registerCommandSpec(tree, options);
  registerCommandModule(tree, options);
}

function registerCommandSpec(tree: Tree, options: NormalizedSchema) {
  const content = tree.read(options.commandSpecPath, 'utf-8');

  if (!content) {
    throw new Error(`Command spec file not found at ${options.commandSpecPath}`);
  }

  const specName = commandSpecName(options);
  if (content.includes(`export const ${specName}:`)) {
    return;
  }

  const commandSpecsAnchor = 'export const COMMAND_SPECS: readonly CliCommandSpec[] = [';
  const commandSpecsIndex = content.indexOf(commandSpecsAnchor);
  if (commandSpecsIndex === -1) {
    throw new Error(`COMMAND_SPECS registry not found in ${options.commandSpecPath}`);
  }

  const spec = [
    `export const ${specName}: CliCommandSpec = {`,
    `  command: '${options.name}',`,
    `  description: '${escapeSingleQuoted(options.description)}',`,
    '  options: {},',
    `  responses: ['fluentui.${options.name}'],`,
    '  exits: {',
    "    0: 'Command completed',",
    "    1: 'Command failed',",
    "    2: 'Invalid command input',",
    '  },',
    '};',
    '',
  ].join('\n');
  let updated = content.slice(0, commandSpecsIndex) + spec + content.slice(commandSpecsIndex);

  const arrayStart = updated.indexOf(commandSpecsAnchor) + commandSpecsAnchor.length;
  const arrayEnd = updated.indexOf('];', arrayStart);
  if (arrayEnd === -1) {
    throw new Error(`COMMAND_SPECS registry is malformed in ${options.commandSpecPath}`);
  }
  updated = updated.slice(0, arrayEnd) + `  ${specName},\n` + updated.slice(arrayEnd);
  tree.write(options.commandSpecPath, updated);
}

function registerCommandModule(tree: Tree, options: NormalizedSchema) {
  const content = tree.read(options.registryPath, 'utf-8');
  if (!content) {
    throw new Error(`Command registry not found at ${options.registryPath}`);
  }

  const moduleName = `${options.propertyName}Command`;
  const specName = commandSpecName(options);
  const moduleImport = `import ${moduleName} from './${options.name}';`;
  let updated = content;

  if (!updated.includes(moduleImport)) {
    const lastCommandImport = [...updated.matchAll(/^import .* from '\.\/[^']+';$/gm)].at(-1);
    if (!lastCommandImport?.index && lastCommandImport?.index !== 0) {
      throw new Error(`Command module imports not found in ${options.registryPath}`);
    }
    const insertAt = lastCommandImport.index + lastCommandImport[0].length;
    updated = `${updated.slice(0, insertAt)}\n${moduleImport}${updated.slice(insertAt)}`;
  }

  if (!updated.includes(`{ module: ${moduleName}, spec: ${specName} }`)) {
    const registryAnchor = 'export const REGISTERED_COMMANDS: readonly RegisteredCommand[] = [';
    const registryStart = updated.indexOf(registryAnchor);
    const registryEnd = updated.indexOf('];', registryStart + registryAnchor.length);
    if (registryStart === -1 || registryEnd === -1) {
      throw new Error(`REGISTERED_COMMANDS registry not found in ${options.registryPath}`);
    }
    updated =
      updated.slice(0, registryEnd) + `  { module: ${moduleName}, spec: ${specName} },\n` + updated.slice(registryEnd);
  }

  const specImportPattern = /import \{\n?([\s\S]*?)\} from '\.\.\/utils\/command-spec';/;
  const match = updated.match(specImportPattern);
  if (!match) {
    throw new Error(`Command spec import not found in ${options.registryPath}`);
  }
  if (!match[1].includes(specName)) {
    const existingImports = match[1].trimEnd();
    const replacement = `import {\n${existingImports}${
      existingImports ? '\n' : ''
    }  ${specName},\n} from '../utils/command-spec';`;
    updated = updated.replace(specImportPattern, replacement);
  }

  tree.write(options.registryPath, updated);
}

function commandSpecName(options: NormalizedSchema): string {
  return `${options.constantName}_COMMAND_SPEC`;
}

function escapeSingleQuoted(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
