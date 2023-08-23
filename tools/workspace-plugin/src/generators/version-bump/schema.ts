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
   * Comma-delimited list of packages that should not be bumped when using the `--all` flag
   */
  exclude?: string;

  /**
   * Prerelease tag e.g. alpha
   */
  prereleaseTag: string;

  /**
   * Same kinds of bumps permitted by semver https://github.com/npm/node-semver
   *
   * With the addition of `nightly` which bumps the version down to 0.0.0. Since semver will
   * match the prerelease tags in ascii order -> ^9.0.0-alpha will match ^9.0.0-nightly
   */
  bumpType: 'prerelease' | 'major' | 'premajor' | 'minor' | 'preminor' | 'patch' | 'prepatch' | 'nightly';
}
