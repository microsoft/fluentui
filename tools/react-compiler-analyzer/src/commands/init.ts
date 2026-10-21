import { existsSync, readFileSync, statSync } from 'node:fs';
import { cp, mkdir, mkdtemp, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

import type { CommandModule } from 'yargs';

import { DEFAULT_CONFIG_FILE, readRcaConfigFile, resolveRcaConfigPath, validateRcaConfig } from '../config';
import { compareText } from '../ordering';
import { prompt as defaultPrompt, type PromptFunction } from '../prompts';
import type { CompilationMode, RcaConfig } from '../types';
import { CliError, DEFAULT_EXCLUDE } from './shared';

type InitMode = Exclude<CompilationMode, 'all'>;

export interface InitArgv {
  config?: string;
  force: boolean;
  skill: boolean;
  yes: boolean;
}

export interface InitDependencies {
  cwd?: string;
  interactive?: boolean;
  packageRoot?: string;
  prompt?: PromptFunction;
}

interface SkillPlan {
  action: 'install' | 'update' | 'none' | 'skip';
  source: string;
  target: string;
}

const SKILL_NAME = 'react-compiler-analyzer';

function toPosixPath(value: string): string {
  return value.replace(/\\/g, '/');
}

function relativeFileReference(fromDirectory: string, target: string): string {
  const value = toPosixPath(relative(fromDirectory, target));
  return value.startsWith('.') ? value : `./${value}`;
}

function schemaReference(configPath: string, repositoryRoot: string): string {
  return relativeFileReference(
    dirname(configPath),
    join(repositoryRoot, 'node_modules', '@fluentui', 'react-compiler-analyzer', 'rca.config.schema.json'),
  );
}

export function findRepositoryRoot(startDirectory: string): string {
  const fallback = resolve(startDirectory);
  let current = fallback;

  while (true) {
    if (existsSync(join(current, '.git'))) {
      return current;
    }

    const parent = dirname(current);
    if (parent === current) {
      return fallback;
    }
    current = parent;
  }
}

export function findAnalyzerPackageRoot(startDirectory = __dirname): string {
  let current = resolve(startDirectory);

  while (true) {
    const packageJsonPath = join(current, 'package.json');
    if (existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { name?: string };
        if (packageJson.name === '@fluentui/react-compiler-analyzer') {
          return current;
        }
      } catch (error) {
        throw new CliError(`could not read package metadata '${packageJsonPath}': ${(error as Error).message}`);
      }
    }

    const parent = dirname(current);
    if (parent === current) {
      throw new CliError('could not locate the installed @fluentui/react-compiler-analyzer package.');
    }
    current = parent;
  }
}

async function directoryFiles(root: string, current = root): Promise<string[]> {
  const entries = await readdir(current, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries.sort((a, b) => compareText(a.name, b.name))) {
    const absolute = join(current, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await directoryFiles(root, absolute)));
    } else if (entry.isFile()) {
      files.push(relative(root, absolute));
    } else {
      throw new CliError(`unsupported entry in bundled Agent Skill: '${absolute}'.`);
    }
  }

  return files;
}

async function directoriesEqual(left: string, right: string): Promise<boolean> {
  const [leftFiles, rightFiles] = await Promise.all([directoryFiles(left), directoryFiles(right)]);
  if (leftFiles.length !== rightFiles.length || leftFiles.some((file, index) => file !== rightFiles[index])) {
    return false;
  }

  const contents = await Promise.all(
    leftFiles.flatMap(file => [readFile(join(left, file)), readFile(join(right, file))]),
  );
  for (let index = 0; index < contents.length; index += 2) {
    if (!contents[index].equals(contents[index + 1])) {
      return false;
    }
  }

  return true;
}

async function replaceDirectory(source: string, target: string): Promise<void> {
  const parent = dirname(target);
  await mkdir(parent, { recursive: true });
  const temporary = await mkdtemp(join(parent, `.${SKILL_NAME}-`));
  const backup = join(parent, `.${SKILL_NAME}-backup-${randomUUID()}`);
  let targetMoved = false;

  try {
    await cp(source, temporary, { recursive: true });
    if (existsSync(target)) {
      await rename(target, backup);
      targetMoved = true;
    }
    await rename(temporary, target);
    if (targetMoved) {
      await rm(backup, { recursive: true, force: true });
      targetMoved = false;
    }
  } catch (error) {
    if (targetMoved && !existsSync(target) && existsSync(backup)) {
      await rename(backup, target);
      targetMoved = false;
    }
    throw error;
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

async function writeFileAtomic(filePath: string, content: string): Promise<void> {
  const directory = dirname(filePath);
  await mkdir(directory, { recursive: true });
  const temporaryDirectory = await mkdtemp(join(directory, `.${basename(filePath)}-`));
  const temporaryFile = join(temporaryDirectory, basename(filePath));

  try {
    await writeFile(temporaryFile, content, 'utf-8');
    await rename(temporaryFile, filePath);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

async function confirm(prompt: PromptFunction, name: string, message: string, initial: boolean): Promise<boolean> {
  const answer = await prompt<Record<string, boolean>>({
    type: 'confirm',
    name,
    message,
    initial,
  });
  return answer[name] ?? false;
}

async function selectMode(prompt: PromptFunction, existingMode: CompilationMode | undefined): Promise<CompilationMode> {
  if (existingMode === 'all') {
    const keep = await confirm(prompt, 'keepMode', 'Keep the existing compiler mode?', true);
    if (keep) {
      return existingMode;
    }
  }

  const answer = await prompt<{ mode: InitMode }>({
    type: 'select',
    name: 'mode',
    message: 'React Compiler rollout mode',
    initial: existingMode === 'annotation' ? 1 : 0,
    choices: [
      { name: 'infer', message: 'infer - analyze components and hooks automatically (recommended)' },
      { name: 'annotation', message: "annotation - analyze functions explicitly marked with 'use memo'" },
    ],
  });

  return answer.mode;
}

async function planSkillInstallation(
  source: string,
  target: string,
  argv: InitArgv,
  prompt: PromptFunction,
): Promise<SkillPlan> {
  if (!argv.skill) {
    return { action: 'skip', source, target };
  }
  if (!existsSync(source)) {
    throw new CliError(`bundled Agent Skill is missing from '${source}'.`);
  }
  if (!statSync(source).isDirectory()) {
    throw new CliError(`bundled Agent Skill path is not a directory: '${source}'.`);
  }
  if (!existsSync(target)) {
    return { action: 'install', source, target };
  }
  if (statSync(target).isDirectory() && (await directoriesEqual(source, target))) {
    return { action: 'none', source, target };
  }
  if (argv.force) {
    return { action: 'update', source, target };
  }
  if (argv.yes) {
    throw new CliError(
      `Agent Skill '${target}' differs from the packaged version. Review it or rerun init with --force to replace it.`,
    );
  }

  const update = await confirm(prompt, 'updateSkill', `Update the existing Agent Skill at '${target}'?`, false);
  return { action: update ? 'update' : 'skip', source, target };
}

function describeConfigAction(exists: boolean, invalid: boolean, changed: boolean): string {
  if (!changed) {
    return 'unchanged';
  }
  if (!exists) {
    return 'create';
  }
  return invalid ? 'replace invalid file' : 'update';
}

function describeSkillAction(action: SkillPlan['action']): string {
  switch (action) {
    case 'install':
      return 'install in repository';
    case 'update':
      return 'update repository copy';
    case 'none':
      return 'unchanged';
    case 'skip':
      return 'skip';
  }
}

/** Command body, separated from yargs and terminal globals for deterministic tests. */
export async function runInit(argv: InitArgv, dependencies: InitDependencies = {}): Promise<number> {
  const cwd = resolve(dependencies.cwd ?? process.cwd());
  const interactive =
    dependencies.interactive ?? Boolean(process.stdin.isTTY === true && process.stdout.isTTY === true);
  const prompt = dependencies.prompt ?? defaultPrompt;

  if (!argv.yes && !interactive) {
    throw new CliError('init requires an interactive terminal. Use --yes to accept recommended defaults.');
  }

  const configPath = resolveRcaConfigPath(argv.config, cwd);
  const repositoryRoot = findRepositoryRoot(cwd);
  const packageRoot = dependencies.packageRoot ?? findAnalyzerPackageRoot();
  const skillSource = join(packageRoot, 'skills', SKILL_NAME);
  const skillTarget = join(repositoryRoot, '.agents', 'skills', SKILL_NAME);
  const configExists = existsSync(configPath);
  let existingConfig: RcaConfig | undefined;
  let invalidConfig: CliError | undefined;
  let existingText: string | undefined;

  if (configExists) {
    existingText = await readFile(configPath, 'utf-8');
    try {
      existingConfig = readRcaConfigFile(configPath);
    } catch (error) {
      if (!(error instanceof CliError)) {
        throw error;
      }
      invalidConfig = error;
    }
  }

  if (invalidConfig) {
    if (argv.yes && !argv.force) {
      throw new CliError(`${invalidConfig.message}\nRerun init with --force to replace the invalid config.`);
    }
    console.warn(`Warning: ${invalidConfig.message}`);
    if (!argv.force) {
      const replace = await confirm(prompt, 'replaceConfig', `Replace the invalid config at '${configPath}'?`, false);
      if (!replace) {
        console.log('Initialization cancelled; no files were changed.');
        return 0;
      }
    }
  }

  const mode = argv.yes ? existingConfig?.mode ?? 'infer' : await selectMode(prompt, existingConfig?.mode);
  const { $schema: _schema, ...existingValues } = existingConfig ?? {};
  const config = validateRcaConfig(
    {
      $schema: schemaReference(configPath, repositoryRoot),
      ...existingValues,
      mode,
      ...(existingConfig ? {} : { format: 'cli' as const }),
      exclude: existingConfig?.exclude ?? [...DEFAULT_EXCLUDE],
    },
    'generated by init',
  );
  const configText = `${JSON.stringify(config, null, 2)}\n`;
  const configChanged = configText !== existingText;
  const skillPlan = await planSkillInstallation(skillSource, skillTarget, argv, prompt);

  console.log(
    `Config (${describeConfigAction(configExists, invalidConfig !== undefined, configChanged)}): ${configPath}`,
  );
  console.log(`Agent Skill (${describeSkillAction(skillPlan.action)}): ${skillTarget}`);

  if (!configChanged && skillPlan.action === 'none') {
    console.log('React Compiler Analyzer initialization is already up to date.');
    return 0;
  }
  if (!configChanged && skillPlan.action === 'skip') {
    console.log('No files were changed.');
    return 0;
  }

  if (!argv.yes) {
    const apply = await confirm(prompt, 'apply', 'Apply these initialization changes?', true);
    if (!apply) {
      console.log('Initialization cancelled; no files were changed.');
      return 0;
    }
  }

  if (configChanged) {
    await writeFileAtomic(configPath, configText);
  }
  if (skillPlan.action === 'install' || skillPlan.action === 'update') {
    await replaceDirectory(skillPlan.source, skillPlan.target);
  }

  console.log('React Compiler Analyzer initialized.');
  if (skillPlan.action === 'install' || skillPlan.action === 'update') {
    console.log('Reload active agent sessions to discover the repository skill.');
  }
  const changedArtifacts = [
    configChanged && 'configuration',
    (skillPlan.action === 'install' || skillPlan.action === 'update') && 'Agent Skill',
  ].filter((artifact): artifact is string => Boolean(artifact));
  console.log(`Review and commit the ${changedArtifacts.join(' and ')} with this repository.`);
  return 0;
}

export function createInitCommand(): CommandModule<{}, InitArgv> {
  return {
    command: 'init',
    describe: `Create ${DEFAULT_CONFIG_FILE} and install the repository Agent Skill`,
    builder: yarg =>
      yarg
        .option('yes', {
          alias: 'y',
          type: 'boolean' as const,
          describe: 'Accept recommended defaults without prompting',
          default: false,
        })
        .option('force', {
          type: 'boolean' as const,
          describe: 'Replace invalid config or modified generated skill files',
          default: false,
        })
        .option('skill', {
          type: 'boolean' as const,
          describe: 'Install the packaged Agent Skill into the repository',
          default: true,
        }),
    handler: async argv => {
      process.exitCode = await runInit(argv);
    },
  };
}
