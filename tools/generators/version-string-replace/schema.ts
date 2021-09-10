export interface VersionStringReplaceGeneratorSchema {
  /**
   * Library name
   */
  name?: string;

  /**
   * Runs migration for all vNext packages
   */
  all?: boolean;

  /**
   * Regex match the part of the version to replace
   */
  match: string;
  /**
   * Replacement string for the matched version part
   */
  replace: string;
}
