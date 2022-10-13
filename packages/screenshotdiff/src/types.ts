export type Optional<T> = { [index in keyof T]?: T[index] };

export type CommitDetails = {
  LastLocalCommit?: string;
  ParentCommit?: string;
  PrId?: number;
  BuildDefinition?: string;
  Owner?: string;
  PullRequestBranch?: string;
  PROwner?: string;
};

export type BuildContext = {
  IsReleaseBuild: boolean;
  BuildId: number;
  ClientType: string;
  IsExperiment: boolean;
  PullRequestBranch?: string;
};

export type BlobDowloadConfig = {
  container: string;
  blobPrefix: string;
  folder: string;
  generateSasToken: boolean;
  skipBaselineDownload: boolean;
  blobexp: boolean;
  // tslint:disable-next-line: no-any
  storage: any;
  createFolder: boolean;
  includeSubFolders: boolean;
};

export type BlobUploadConfig = {
  container: string;
  blobFilePrefix: string;
  localFolder: string;
  generateSasToken: boolean;
  isGzip: boolean;
  includeSubFolders: boolean;
};

export type BundleStatDetails = {
  version: string;
  appname: string;
  parsedsize: number;
};

export type ReportDetail = {
  screenshotURLs: {};
  diffResult: {};
  baselinePath: string;
  candidatePath: string;
  blobBaselinePath: string;
  blobCandidatePath: string;
};

export const ScreenshotArtifact = 'screenshots';
export const ScreenshotArtifactStoryBook = 'Screenshots';
export const BundleStatsArtifact = 'BundleStats';
export const BaselineScreenshotContainer = 'ooui-screenshots';
export const BaselineScreenshotContainer1JS = 'baseline-screenshots';
export const BaselineScreenshotv2Container = 'midgard-screenshotsv2';
export const BaselineBundleStatContainer = 'webpack-stats-files';
