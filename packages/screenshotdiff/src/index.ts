export const Greeter = (name: string) => `Hello ${name}`;
import { prepareFolders } from './directoryHelper';
import { getParentCommitFromMaster } from './azure-builddata/getParentCommitFromMaster';
import {
  // BaselineScreenshotContainer1JS,
  // BlobDowloadConfig,
  // BlobUploadConfig,
  // cleanupDirectories,
  // CommitDetails,
  // createFolderInApp,
  // createPrComment,
  // deleteArtifactsFromBlobStorage,
  // downloadBuildArtifact,
  // flattenDirectory,
  getApis,
  // getArtifactsFromBlobStorageAndWriteToLocalFolder,
  // getArtifactsFromBlobStorageDirectoriesAndWriteToLocalFolder,
  // getArtifactsFromLocalFolderAndWriteToBlobStorage,
  // getDefaultBlobDownloadConfig,
  // getDefaultBlobUploadConfig,
  // getParentCommitFromMaster,
  // getfirstCommitOfLGCI,
  // getProject,
  // insertCommitDetailsInBaselineTable,
  // isAnyBlobWithPrefixAvailable,
  // prepareFolders,
  // ReportDetail,
  // ScreenshotArtifact,
} from './midgardbot-core';
import { CommitDetails } from './types';

console.log('Starting screenshot diff');

startDiffing();

async function startDiffing(): Promise<void> {
  await runScreenshotDiffing();
}

export async function runScreenshotDiffing(): Promise<void> {
// buildId: number,
// clientType: string,
// pilot?: string,
// lkgCIBuild?: number
  // 1a. Initialize relevant APIs for getting builds details
  const apis = await getApis();
  console.log('Step 1a - Initialized APIs');

  // 1c. Find Commit Details for this PR Build
  const lastMergeCommitDetails: CommitDetails = await getParentCommitFromMaster(270070, apis);

  console.log('Async function');

  const folders = await prepareFolders(false, 'pr', 270070);

  console.log('done!');
}
