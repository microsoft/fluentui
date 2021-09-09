export interface MigrateFixedVersionsGeneratorSchema {
  /**
   * Library name
   */
  name?: string;

  /**
   * Runs migration for all packages with tag `platform:web`
   */
  allWeb?: boolean;
}
