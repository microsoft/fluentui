export type PeerDependencyCheck =
  | 'missing-peer-forward'
  | 'incompatible-peer-range'
  | 'invalid-peer-range'
  | 'orphaned-peer-meta'
  | 'unverified-peer-range';

export interface VerifyPeerDependenciesGeneratorSchema {
  /**
   * Comma separated list of projects to verify. Defaults to every publishable project.
   */
  project?: string;
  /**
   * Comma separated list of nx project tags to verify, e.g. `vNext`. Defaults to every tag.
   */
  tag?: string;
  /**
   * Comma separated list of checks to run. Defaults to every check except `missing-peer-forward`,
   * which only matters under Yarn PnP strict resolution.
   */
  checks?: string;
  /**
   * Automatically add every missing forwarded peer dependency to the offending package.json.
   * Without this flag the generator only reports violations and fails.
   */
  fix?: boolean;
  /**
   * Comma separated list of peer dependency names to check. Defaults to all.
   */
  peers?: string;
}
