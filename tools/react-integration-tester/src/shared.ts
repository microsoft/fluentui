import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { type PackageJson } from 'nx/src/utils/package-json';

export { type PackageJson };

export function serializeJson<T extends object = object>(
  input: T,
  options?: {
    /**
     * the whitespaces to add as indentation to make the output more readable.
     * @default 2
     */
    spaces?: number;
  },
): string {
  return JSON.stringify(input, null, options?.spaces ?? 2);
}

export function writeJsonFile<T extends object = object>(
  path: string,
  data: T,
  options?: { appendNewLine?: boolean; spaces?: number },
) {
  mkdirSync(dirname(path), { recursive: true });
  const serializedJson = serializeJson(data, options);
  const content = options?.appendNewLine ? `${serializedJson}\n` : serializedJson;
  writeFileSync(path, content, { encoding: 'utf-8' });
}

/**
 * Parse JSON from a file path with proper error handling
 */
export function parseJson<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends object = any,
>(filePath: string): T {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    const raw = readFileSync(filePath, 'utf-8');
    console.error('Failed to parse JSON at', filePath, 'content=', raw);

    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in file ${filePath}: ${error.message}`);
    } else if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    } else {
      throw error;
    }
  }
}

export interface TsConfig {
  include?: string[];
  exclude?: string[];
  files?: string[];
  compilerOptions?: Partial<{ target: string; lib: string[] }>;
}

export type ReactVersion = 17 | 18 | 19;
export type CommandName = 'e2e' | 'type-check' | 'test';

export interface Args {
  react: ReactVersion;
  configPath?: string;
  run?: CommandName[];
  verbose?: boolean;
  cleanup?: boolean;
  cwd?: string;
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
  const defaults = parseJson<{
    commands: Record<string, string>;
    dependencies: Record<string, string>;
  }>(builtinPath);

  // Resolve config path: explicit --config wins, else default to ./rit.config.js if exists, else no overrides
  let overrides: Config['react'][string] | undefined;
  if (configPath) {
    // Load CommonJS or ESM config with proper typing
    const loaded = require(configPath) as unknown;
    const conf: Config = (loaded as { default?: Config })?.default ?? (loaded as Config);
    const perVersion = conf?.react?.[String(reactVersion)] ?? {};
    overrides = perVersion;
  }

  const merged = {
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
      if (v) {
        merged.commands[key] = v as string;
      }
    }
  }
  if (overrides?.dependencies) {
    merged.dependencies = { ...merged.dependencies, ...overrides.dependencies };
  }
  return merged;
}

/**
 * Prepare template by filtering commands based on the origin project's setups (Jest/Cypress) and
 * reporting which setups exist. Keeps getMergedTemplate pure while providing a convenient wrapper.
 */
export function getPreparedTemplate(
  reactVersion: ReactVersion,
  configPath: string,
  projectPaths: {
    packageJson: string;
    jestConfig: string | null;
    cypressConfig: string | null;
    tsConfig: string | null;
  },
): {
  commands: Record<string, string>;
  dependencies: Record<string, string>;
  hasJestSetup: boolean;
  hasCypressSetup: boolean;
} {
  const merged = getMergedTemplate(reactVersion, configPath);
  const hasJestSetup = Boolean(projectPaths.jestConfig);
  const hasCypressSetup = Boolean(projectPaths.cypressConfig);

  const filteredCommands = Object.fromEntries(
    Object.entries(merged.commands).filter(([commandKey]) => {
      if (!hasCypressSetup && /^e2e($|:)/.test(commandKey)) {
        return false;
      }
      if (!hasJestSetup && /^test($|:)/.test(commandKey)) {
        return false;
      }
      return true;
    }),
  ) as Record<string, string>;

  return {
    commands: filteredCommands,
    dependencies: merged.dependencies,
    hasJestSetup,
    hasCypressSetup,
  } as const;
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

    const existingNodePath = (process.env as NodeJS.ProcessEnv & { NODE_PATH?: string }).NODE_PATH ?? '';
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
        resolvePromise();
        return;
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
  const pkg = parseJson<{ scripts?: Record<string, string> }>(pkgPath);
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
