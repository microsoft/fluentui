import { execFile } from 'node:child_process';

/**
 * Resolves the repo root. The MCP server is expected to run from the monorepo root
 * or from the mcp-server directory. We walk up to find the .git directory.
 */
function getRepoRoot(): string {
  // Use the environment variable if set, otherwise default to cwd
  return process.env['REPO_ROOT'] ?? process.cwd();
}

/**
 * Executes a git command in the repo root and returns stdout.
 */
export function execGit(args: string[]): Promise<string> {
  const cwd = getRepoRoot();
  return new Promise((resolve, reject) => {
    execFile('git', args, { cwd, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`git ${args.join(' ')} failed: ${stderr || error.message}`));
        return;
      }
      resolve(stdout);
    });
  });
}
