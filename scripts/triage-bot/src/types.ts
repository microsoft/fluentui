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
