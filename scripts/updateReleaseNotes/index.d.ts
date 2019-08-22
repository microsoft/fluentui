/** A CHANGELOG.json */
interface IChangelog {
  entries: IChangelogEntry[];
  /** Package name */
  name: string;
}

/** Represents an entry in a CHANGELOG.json's `entries` array */
interface IChangelogEntry {
  comments: { major: IChangelogComment[]; minor: IChangelogComment[]; patch: IChangelogComment[]; };
  /** Package name */
  name?: string;
  /** Entry date */
  date?: string;
  /** Corresponding tag */
  tag?: string;
  version: string;
  body?: string;
}

interface IChangelogComment {
  /** Changelog entry comment */
  comment: string;
  /** Author email */
  author: string;
  /** Commit SHA */
  commit?: string;
}


interface ICommit {
  /** Commit SHA */
  commit: string;
  /** Commit message */
  message: string;
  /** Author GitHub username */
  author: string;
  /** Author email */
  authorEmail: string;
}

interface IPullRequest {
  number: number;
  url: string;
  /** Author GitHub username */
  author: string;
  /** Author GitHub profile URL */
  authorUrl: string;
  /** Commits included in this PR (filtered to ones by the PR author) */
  commits?: ICommit[];
}

interface IRelease {
  id: number;
  tagName: string;
}
