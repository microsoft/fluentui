export interface IRepoDetails {
  owner: string;
  repo: string;
}

/** Simplified info about a pull request. */
export interface IPullRequest {
  number: number;
  url: string;
  author: IUser;
}

/** Info about a GitHub user. */
export interface IUser {
  username: string;
  url: string;
  email?: string;
}
