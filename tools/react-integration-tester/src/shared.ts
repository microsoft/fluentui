import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

export type ReactVersion = 17 | 18 | 19;
export type CommandName = 'e2e' | 'type-check' | 'test';

export interface Args {
  react: ReactVersion;
  templatePath?: string;
  run?: CommandName[];
  verbose?: boolean;
  cleanup?: boolean;
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

export function runCmd(command: string, opts: { cwd: string }): Promise<void> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, {
      cwd: opts.cwd,
      stdio: 'inherit',
      shell: true,
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
