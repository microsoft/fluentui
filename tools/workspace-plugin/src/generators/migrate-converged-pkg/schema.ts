export interface MigrateConvergedPkgGeneratorSchema {
  /**
   * Library name or comma delimited library names to execute migration on multiple libraries.
   */
  name?: string;
  /**
   * Get statistics for how many projects have been migrated
   */
  stats?: boolean;
  /**
   * Run generator on all vNext packages
   */
  all?: boolean;
  /**
   * Add particular team to CODEOWNERS file
   */
  owner?: string;
}
