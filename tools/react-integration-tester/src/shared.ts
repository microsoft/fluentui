import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

export type ReactVersion = 17 | 18 | 19;
export type CommandName = 'e2e' | 'type-check' | 'test';

export interface Args {
  react: ReactVersion;
  configPath?: string;
  run?: CommandName[];
  verbose?: boolean;
  cleanup?: boolean;
  // New flags for advanced workflows
  prepareOnly?: boolean; // scaffold+install only, do not run commands
  projectId?: string; // deterministic suffix to make the prepared project name unique; with --run, reuse existing prepared project with this id
  force?: boolean; // when preparing, remove any existing folder first
  // Installation control
  noInstall?: boolean; // when preparing, skip installing dependencies
  installDeps?: boolean; // install dependencies for the selected react version root only and exit
}

export interface Config {
  react: {
    [version: string]: {
      commands?: {
        test?: string;
        e2e?: string;
        typeCheck?: string;
      };
      dependencies?: Record<string, string>;
    };
  };
}

function getBuiltinTemplatePath(version: ReactVersion) {
  return join(__dirname, 'files', `react-${version}.json.template`);
}

/**
 * Load rit.config.js if provided or present in CWD, merge with builtin template for the selected React version,
 * and return a concrete set of commands and dependencies used to scaffold and run.
 */
export function getMergedTemplate(
  reactVersion: ReactVersion,
  configPath: string,
): { commands: Record<string, string>; dependencies: Record<string, string> } {
  const builtinPath = getBuiltinTemplatePath(reactVersion);
  if (!existsSync(builtinPath)) {
    throw new Error(`Builtin template not found for React ${reactVersion} at: ${builtinPath}`);
  }
  const defaults = JSON.parse(readFileSync(builtinPath, 'utf-8')) as {
    commands: Record<string, string>;
    dependencies: Record<string, string>;
  };

  // Resolve config path: explicit --config wins, else default to ./rit.config.js if exists, else no overrides

  let overrides: Config['react'][string] | undefined;
  if (configPath) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const loaded = require(configPath) as Config | { default: Config };
    const conf: Config = (loaded as any).default ? (loaded as any).default : (loaded as any);
    const perVersion = conf?.react?.[String(reactVersion)] ?? {};
    overrides = perVersion;
  }

  const merged: { commands: Record<string, string>; dependencies: Record<string, string> } = {
    commands: { ...defaults.commands },
    dependencies: { ...defaults.dependencies },
  };
  if (overrides?.commands) {
    // Map camelCase keys from config to script names used in builtins
    const map: Record<string, string> = {
      test: 'test',
      e2e: 'e2e',
      typeCheck: 'type-check',
    };
    for (const [k, v] of Object.entries(overrides.commands)) {
      const key = map[k] ?? k;
      if (v) merged.commands[key] = v as string;
    }
  }
  if (overrides?.dependencies) {
    merged.dependencies = { ...merged.dependencies, ...overrides.dependencies };
  }
  return merged;
}

export function runCmd(command: string, opts: { cwd: string; env?: NodeJS.ProcessEnv }): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const localBin = join(opts.cwd, 'node_modules', '.bin');
    const parentBin = join(opts.cwd, '..', 'node_modules', '.bin');
    const pathKey = process.platform === 'win32' ? 'Path' : 'PATH';
    const existingPath = process.env[pathKey] ?? '';
    const mergedPath = [localBin, parentBin, existingPath]
      .filter(Boolean)
      .join(process.platform === 'win32' ? ';' : ':');
    // Help Node resolve modules like '@swc/jest' from parent/react-root or repo root
    const existingNodePath = process.env['NODE_PATH'] ?? '';
    const parentNodeModules = join(opts.cwd, '..', 'node_modules');
    const mergedNodePath = [parentNodeModules, existingNodePath]
      .filter(Boolean)
      .join(process.platform === 'win32' ? ';' : ':');

    const child = spawn(command, {
      cwd: opts.cwd,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, [pathKey]: mergedPath, NODE_PATH: mergedNodePath, ...(opts.env ?? {}) },
    });
    child.on('error', reject);
    child.on('exit', code => {
      if (code === 0) {
        return resolvePromise();
      }
      reject(new Error(`Command failed with exit code ${code}: ${command}`));
    });
  });
}

export function readCommandsFromPreparedProject(projectPath: string): Record<string, string> {
  const pkgPath = join(projectPath, 'package.json');
  if (!existsSync(pkgPath)) {
    throw new Error(
      `No package.json found in prepared project at: ${pkgPath}. Re-run preparation with a supported template.`,
    );
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { scripts?: Record<string, string> };
  const scripts = pkg.scripts ?? {};

  // Only expose the known command names; ignore others
  const result: Record<string, string> = {};
  const validCommands = ['e2e', 'type-check', 'test'] as const;
  for (const key of validCommands) {
    if (scripts[key]) {
      result[key] = scripts[key];
    }
  }

  // Notify user if requested command is not available
  const availableCommands = Object.keys(result);
  const missingCommands = validCommands.filter(cmd => !availableCommands.includes(cmd));
  if (missingCommands.length > 0) {
    console.warn(
      `Warning: The following commands are not available in the prepared project: ${missingCommands.join(', ')}`,
    );
  }
  return result;
}
