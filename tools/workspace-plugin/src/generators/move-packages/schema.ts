export interface MovePackagesGeneratorSchema {
  /**
   * The name of the package to move.
   */
  name?: string;
  /**
   * The folder to move the package into.
   */
  destination: string;
  /**
   * Whether the generator should update the import path to reflect the new location.
   * @default false
   */
  updateImportPath?: boolean;
  /**
   * Flag to move all converged packages to a new location.
   */
  allConverged?: boolean;
  /**
   * Flag to move all v8 packages to a new location.
   */
  allV8?: boolean;
}
