export interface VersionBumpGeneratorSchema {
  /**
   * Library name
   */
  name?: string;

  /**
   * Runs migration for all packages in the specified scope
   */
  all?: boolean;

  /**
   * Comma-delimited list of projects that should not be bumped when using the `--all` flag
   */
  exclude?: string;

  /**
   * Prerelease tag e.g. alpha
   */
  prereleaseTag?: string;

  /**
   * Same kinds of bumps permitted by semver https://github.com/npm/node-semver
   *
   * With the addition of `nightly` which bumps the version down to 0.0.0. Since semver will
   * match the prerelease tags in ascii order -> ^9.0.0-alpha will match ^9.0.0-nightly
   */
  bumpType?: 'prerelease' | 'major' | 'premajor' | 'minor' | 'preminor' | 'patch' | 'prepatch' | 'nightly';

  /**
   * Explicit version to set
   */
  explicitVersion?: string;

  /**
   * Which package scope `--all` targets.
   * - `vNext` (default): all converged/vNext packages
   * - `tools`: all public tools packages
   */
  scope?: 'vNext' | 'tools';

  /**
   * A suffix to append to each package's current version.
   * The resulting version will be `{currentVersion}-{versionSuffix}`.
   * Mutually exclusive with `bumpType` and `explicitVersion`.
   * Requires `--all`.
   */
  versionSuffix?: string;
}
