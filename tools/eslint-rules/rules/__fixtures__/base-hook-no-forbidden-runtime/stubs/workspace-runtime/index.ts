// A forbidden runtime that ships as a *workspace* package: it is path-mapped straight to source,
// so its files carry no `node_modules` segment to read a package name from.
export function runWorkspaceHeavy(): { tag: 'workspace-heavy' } {
  return { tag: 'workspace-heavy' };
}

export type WorkspaceHeavyOptions = { kind: 'workspace-heavy' };
