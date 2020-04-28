import * as path from 'path';
import * as ts from 'typescript';
import { ComponentInfo } from './types';
import { ComponentInfoSchemaResolver, getComponentInfo } from './getComponentInfo';
import { parseTsconfig } from './utils';

export interface GetAllComponentInfoOptions<T extends ComponentInfo = ComponentInfo> {
  /**
   * All file paths which should be processed, grouped by package (so they can be processed with
   * the appropriate tsconfig). They must be passed in grouped because there's not an easy way to
   * infer the package groupings otherwise.
   */
  filePathsByPackage: { [packagePath: string]: string[] };
  /** Resolver to add custom properties to the returned component info. */
  schemaResolver?: ComponentInfoSchemaResolver<T>;
  /** Ignore props inherited from these interfaces. */
  ignoredParentInterfaces?: string[];
}

/**
 * Get component info for a list of files, grouped by package.
 */
export function getAllComponentInfo<T extends ComponentInfo = ComponentInfo>(
  options: GetAllComponentInfoOptions<T>,
): T[] {
  const { filePathsByPackage, ...componentInfoOptions } = options;
  const results: T[] = [];

  for (const [packagePath, filePaths] of Object.entries(filePathsByPackage)) {
    // Create a single program object for each package to greatly reduce overall parsing time
    const config = parseTsconfig(path.join(packagePath, 'tsconfig.json'));
    const program = ts.createProgram(filePaths, config);

    for (const filePath of filePaths) {
      try {
        results.push(getComponentInfo({ filePath, program, ...componentInfoOptions }));
      } catch (err) {
        err.message = `Error generating component info for ${filePath}:\n\n  ${err.message}`;
        err.stack = `${err.message}\n\n${err.stack || ''}`;
        throw err;
      }
    }
  }

  return results;
}
