export interface VersionStringReplaceGeneratorSchema {
  /**
   * Library name
   */
  name?: string;

  /**
   * Runs migration for all vNext packages
   */
  all?: boolean;

  prereleaseTag: string;

  bumpType: string;
}
