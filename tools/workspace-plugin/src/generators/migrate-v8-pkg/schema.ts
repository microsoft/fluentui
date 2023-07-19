export interface MigrateV8PkgGeneratorSchema {
  /**
   * Library name or comma delimited library names to execute migration on multiple libraries.
   */
  name?: string;
  /**
   * Run generator on all v8 packages
   */
  all?: boolean;
  /**
   * Get statistics for how many projects have been migrated
   */
  stats?: boolean;
}
