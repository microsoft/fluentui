import { relative, resolve } from 'node:path';

export function toPosixPath(path: string): string {
  return path.split('\\').join('/');
}

export function toWorkspacePath(workspaceRoot: string, path: string, rootValue = '.'): string {
  return toPosixPath(relative(workspaceRoot, resolve(path))) || rootValue;
}
