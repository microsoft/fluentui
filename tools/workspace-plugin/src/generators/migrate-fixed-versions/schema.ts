export interface MigrateFixedVersionsGeneratorSchema {
  /**
   * Library name
   */
  name?: string;

  /**
   * Runs migration for all vNext packages
   */
  all?: boolean;
}
