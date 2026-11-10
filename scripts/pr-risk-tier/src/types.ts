/** A file entry as returned by the GitHub "list pull request files" API (only the fields the classifier uses). */
export interface PullRequestFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  previous_filename?: string;
}

/** The risk tier of a pull request: 0 trivial, 1 low, 2 standard, 3 high. */
export type Tier = 0 | 1 | 2 | 3;

export interface ClassifyInput {
  /** The changed files of the pull request. */
  files: PullRequestFile[];
  /** The number of changed files GitHub reports for the pull request, used to detect an incomplete file list. */
  changedFiles?: number;
}

export interface Classification {
  tier: Tier;
  /** Why the tier was chosen: the rule that decided it and the files involved. */
  reasons: string[];
  /** The number of files in the input. */
  files: number;
  /** Added plus deleted lines, not counting Beachball change files. */
  changedLines: number;
  ruleVersion: string;
}

export interface TierRules {
  /** Identifies this rule set; reported with every classification. */
  version: string;
  /** A fix touching at most this many lines in one package can be tier 1. */
  maxSmallFixLines: number;
  /** GitHub lists at most this many files for a pull request; a list this long may be truncated. */
  maxListedFiles: number;
  /** Beachball change files: ignored when counting lines, allowed next to a tier 1 change. */
  changeFiles: string[];
  /** A pull request touching any of these paths (old or new path) is tier 3. */
  tier3: string[];
  tier0: {
    /** Every file must match one of these... */
    allow: string[];
    /** ...and none of these. */
    exclude: string[];
  };
  /** Test and snapshot files. */
  tests: string[];
  /** Library source, where a small fix can be tier 1. */
  librarySource: string[];
  /** Patterns whose first match yields a package root directory, used to check that a fix stays in one package. */
  packageRoots: RegExp[];
}
