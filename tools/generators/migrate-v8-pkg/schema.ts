export interface MigrateV8PkgGeneratorSchema {
  /**
   * Library name or comma delimited library names to execute migration on multiple libraries.
   */
  name?: string;
  /**
   * Get statistics for how many projects have been migrated
   */
  stats?: boolean;
}
