// Pure re-export of a workspace forbidden runtime. `getAliasedSymbol` collapses the whole chain
// in one hop, so the intermediate `workspace-runtime` specifier is never visited and ownership
// has to be recovered from the leaf declaration's own package manifest.
export { runWorkspaceHeavy } from 'workspace-runtime';
export type { WorkspaceHeavyOptions } from 'workspace-runtime';
