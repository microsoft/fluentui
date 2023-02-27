/* eslint-disable @typescript-eslint/naming-convention */
import { ChangelogJsonEntry } from 'beachball';
import { IPullRequest } from '@fluentui/scripts-github';

/** Entry in a CHANGELOG.json's `entries` array, plus the package name */
export interface IChangelogEntry extends ChangelogJsonEntry {
  /** Package name */
  name?: string;
}

export interface ICommit {
  /** Commit SHA */
  commit: string;
  /** Commit message */
  message: string;
  /** Author GitHub username */
  author: string;
  /** Author email */
  authorEmail?: string;
}

export interface IExtendedPullRequest extends IPullRequest {
  /** Commits included in this PR (filtered to ones by the PR author) */
  commits?: ICommit[];
}

export interface IRelease {
  id: number;
  tagName: string;
}
