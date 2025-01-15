import * as Core from '@actions/core';
import Github from '@actions/github';

export interface Api extends GithubScriptsParams {
  config: Schema;
}
export interface GithubScriptsParams {
  context: (typeof Github)['context'];
  github: ReturnType<(typeof Github)['getOctokit']>;
  core: typeof Core;
}

export interface Schema {
  params: Array<{
    keyword: string;
    labels: string[];
    assignees: string[];
  }>;
}

export interface SchemaV2 {
  params: Array<{
    /** Label added by issue template */
    frameworkType: string;
    /** Which heading is the source of truth for parsing selected Option */
    headingToParse: string;
    /**
     * Mapping used against parsed CODEOWNERS file
     */
    mapping: {
      [projectRoot: string]: /* Options within issue Dropdown */ string[];
    };
  }>;
}

export interface FileOwnershipMatcher {
  path: string;
  owners: string[];
}
