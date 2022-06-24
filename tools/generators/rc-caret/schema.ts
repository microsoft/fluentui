export interface VersionBumpGeneratorSchema {
  /**
   * Library name
   */
  name?: string;

  /**
   * Runs migration for all vNext packages
   */
  all?: boolean;
}
