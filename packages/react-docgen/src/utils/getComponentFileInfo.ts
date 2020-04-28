import * as path from 'path';
import { ComponentFileInfo } from '@fluentui/react-docgen-types';
// This file MUST NOT depend on react-docgen-typescript (or local fork)!

/**
 * Get file names and paths for a component file.
 * @param absPath - Path to the component's file
 */
export function getComponentFileInfo(absPath: string): ComponentFileInfo {
  return {
    filename: path.basename(absPath),
    filenameWithoutExt: path.basename(absPath, path.extname(absPath)),
    repoPath: path.relative(process.cwd(), absPath).replace(/\\/g, '/'),
  };
}
