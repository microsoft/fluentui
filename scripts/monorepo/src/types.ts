export interface PackageJson {
  name: string;
  version: string;
  private?: boolean;
  main: string;
  types?: string;
  module?: string;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  peerDependencies?: { [key: string]: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface PackageInfo {
  /** Package path relative to the project root */
  packagePath: string;
  /** package.json contents */
  packageJson: PackageJson;
  projectConfig: import('@nx/devkit').ProjectConfiguration;
}

/**
 * packageName - valid npm package name including scope. Example: `@fluentui/foo-bar`
 */
export type AllPackageInfo = {
  [packageName: string]: PackageInfo;
};
