export interface VersionBumpGeneratorSchema {
  /**
   * Library name
   */
  name?: string;

  /**
   * Runs migration for all vNext packages
   */
  all?: boolean;

  /**
   * Prerelease tag e.g. alpha
   */
  prereleaseTag: string;

  /**
   * Same kinds of bumps permitted by semver https://github.com/npm/node-semver
   */
  bumpType: string;
}
