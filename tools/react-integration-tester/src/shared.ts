import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

export type ReactVersion = 17 | 18 | 19;
export type CommandName = 'e2e' | 'type-check' | 'test';

export interface Args {
  react: ReactVersion;
  templatePath?: string;
  run?: CommandName[];
  verbose?: boolean;
  cleanup?: boolean;
  // New flags for advanced workflows
  prepareOnly?: boolean; // scaffold+install only, do not run commands
  useExistingProjectId?: string; // use `projectId` that was used when running the CLI with `--prepare-only` to use an existing prepared project
  projectId?: string; // optional suffix to make the prepared project name deterministic and unique
  force?: boolean; // when preparing, remove any existing folder first
}

export function resolveTemplatePath(templateArg: string | undefined, reactVersion: ReactVersion): string {
  const candidate = templateArg ? resolve(process.cwd(), templateArg) : getBuiltinTemplatePath(reactVersion);

  if (!existsSync(candidate)) {
    const hint = templateArg
      ? `Provided template not found at: ${candidate}`
      : `Builtin template not found for React ${reactVersion} at: ${candidate}`;
    throw new Error(hint);
  }
  return candidate;

  function getBuiltinTemplatePath(version: ReactVersion) {
    return join(__dirname, 'files', `react-${version}.json.template`);
  }
}

export function runCmd(command: string, opts: { cwd: string; env?: NodeJS.ProcessEnv }): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, {
      cwd: opts.cwd,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ...(opts.env ?? {}) },
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
    throw new Error(`No package.json found at prepared project: ${pkgPath}`);
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as {
    scripts?: Record<string, string>;
  };
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
