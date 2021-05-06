// Don't reference anything importing Monaco in this file (it will break tests)

/**
 * Group of packages which are available at runtime under the same global, with loaders for
 * the global object and the packages' types.
 */
export interface IPackageGroup {
  /** Name of the global this group of packages' exports will be available from at runtime */
  globalName: string;

  /**
   * Load the module which will be made available under `globalName`.
   * The loader function can either return a promise or take a callback.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadGlobal: (() => Promise<any>) | ((cb: (globalResult: any) => void) => void);

  /** Packages whose exports are available at runtime from `globalName` */
  packages: IPackage[];
}

/** Name and typings loader for a package */
export interface IPackage {
  /** npm package name (*not* `@types` package name) */
  packageName: string;
  /** Loader function for this package's .d.ts file contents */
  loadTypes: () => string | Promise<string>;
}

/** Version of IPackageGroup without the loaders */
export type IBasicPackageGroup = Required<Pick<IPackageGroup, 'globalName'>> & {
  packages: Required<Pick<IPackage, 'packageName'>>[];
};
