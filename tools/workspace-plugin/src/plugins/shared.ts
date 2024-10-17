import { getPackageManagerCommand, type CreateNodesContextV2 } from '@nx/devkit';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export const projectConfigGlob = '**/project.json';

export function assertProjectExists(projectRoot: string, context: CreateNodesContextV2) {
  const siblingFiles = readdirSync(join(context.workspaceRoot, projectRoot));

  if (siblingFiles.includes('package.json') && siblingFiles.includes('project.json')) {
    return true;
  }

  return false;
}

export interface TaskBuilderConfig {
  pmc?: ReturnType<typeof getPackageManagerCommand>;
}
