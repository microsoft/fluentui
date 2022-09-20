export interface PackageJson {
  name: string;
  version: string;
  main: string;
  types?: string;
  module?: string;
  private?: boolean;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  peerDependencies?: { [key: string]: string };
  [key: string]: any;
}

export interface PackageInfo {
  /** Package path relative to the project root */
  packagePath: string;
  /** package.json contents */
  packageJson: PackageJson;
}

export type AllPackageInfo = { [packageName: string]: PackageInfo };

export declare function findGitRoot(): string;

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package
 * (by default, in the CWD when this was called)
 */
export declare function findRepoDeps(options?: {
  /** Optional different cwd */
  cwd?: string;
  /** Whether to include dev deps (default true) */
  dev?: boolean;
}): PackageInfo[];

export declare function getAllPackageInfo(): AllPackageInfo;

/**
 * Determines whether a package is converged, based on its version.
 *
 * @param {Object} [options]
 * @param {PathOrPackageJson} [options.packagePathOrJson] - optional different package path to run in OR previously-read package.json
 * (defaults to reading package.json from `process.cwd()`)
 * @param {'library' | 'application' | 'all'} [options.projectType] - filter for what project types you wanna apply the condition
 *
 * @returns {boolean} true if it's a converged package (version >= 9)
 */

export declare function isConvergedPackage(option?: {
  packagePathOrJson?: string | PackageJson;
  projectType?: 'library' | 'application' | 'all';
}): boolean;

/**
 * @param since - Commit to compare against
 * @returns Set of packages that are changed
 */
export declare function getAffectedPackages(since?: string): Set<string>;

/**
 * Returns SHA for the nth commit from a reference descending from the latest commit
 * @param n - nth commit from latest
 * @param ref - The github ref/branch the filter
 * @returns - A git commit SHA
 */
export declare function getNthCommit(n = 1, ref = 'HEAD'): string;

/**
 *
 * Gets project metadata from monorepo source of truth which is `workspace.json`
 */
export declare function getProjectMetadata(options: {
  /**
   * repo root path
   */
  root?: string;
  /**
   * package name
   */
  name: string;
}): import('@nrwl/devkit').ProjectConfiguration;

/**
 * Returns all the dependencies of a given package name
 * @param packageName - including `@fluentui/` prefix
 * @param options
 * @param options.dev - include dev dependencies
 * @param options.production - include production dependencies
 */
export async function getDependencies(packageName: string, options?: { production?: true; dev?: true }): string[];
