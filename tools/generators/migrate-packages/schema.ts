export interface MigratePackagesGeneratorSchema {
  /**
   * The name of the package to move.
   */
  name?: string;
  /**
   * The folder to move the package into.
   */
  destination: string;
  /**
   * Where the generator should update the import path to reflect the new location.
   * @default true
   */
  updateImportPath?: boolean;
  /**
   * Flag to migrate all converged packages to a new location.
   */
  allConverged?: boolean;
  /**
   * Flag to migrate all v8 packages to a new location.
   */
  allV8?: boolean;
}
