// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IRepoDetails {
  owner: string;
  repo: string;
}

/** Simplified info about a pull request. */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IPullRequest {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  number: number;
  url: string;
  author: IUser;
}

/** Info about a GitHub user. */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IUser {
  username: string;
  url: string;
  email?: string;
}
