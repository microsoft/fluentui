import * as GitInterfaces from 'azure-devops-node-api/interfaces/GitInterfaces';
import { CommitDetails } from '../types';
import { Apis } from './getApi';
import { getProject } from './getProject';
import { getRepository } from './getRepository';

export async function getParentCommitFromMaster(buildId: number, apis: Apis): Promise<CommitDetails> {
  const { gitApi, buildApi } = apis;

  const repository = getRepository();
  const project = getProject();
  const build = await buildApi.getBuild(project, buildId);
  let repoId: string | undefined;
  let parentCommitId: string[] = [];
  let commitId: string | undefined;
  let prId: number | undefined;
  let owner: string | undefined;
  let pullRequestName: string | undefined;
  let prOwner: string | undefined;

  if (build && build.triggerInfo) {
    prId = Number(build.triggerInfo['pr.number']);
    // const sourcebranch = build.sourceBranch;
    // Find the last merge commit for this build
    commitId = build.sourceVersion;
    owner =
      build.requestedFor && build.requestedFor.uniqueName ? build.requestedFor.uniqueName.split('@')[0] : undefined;
    console.log('The PR ID: ', prId);

    if (prId) {
      const repo = await gitApi.getRepository(repository, project);
      console.log('The GIT Repository: ', repo.name);

      if (!repo.id || !commitId) {
        throw new Error(`Could not find the repository id (${repo.id}) or commit id (${commitId})`);
      }

      repoId = repo.id;
      const parentCommits = await getCommitParents(repo.id, commitId, project);
      console.log('Total Parent Commits: ' + parentCommits.length);
      const prDetails: GitInterfaces.GitPullRequest = await gitApi.getPullRequestById(prId, project);
      console.log('prDetails : ', prDetails.createdBy?.uniqueName);
      console.log('ownwer : ', owner);

      prOwner = prDetails.createdBy?.uniqueName;
      pullRequestName = prDetails.sourceRefName;
      if (parentCommits.length > 1) {
        const lastLocalCommit = await getLastCommitIdFromPullRequest(prId, project);
        console.log('Last Local Commit Id: ' + lastLocalCommit);

        // TODO: Check if lastLocalCommit is not undefined/null ?
        parentCommitId = parentCommits.filter(singleCommit => singleCommit !== lastLocalCommit);
        console.log('Related Parent Commit Id in Master: ' + parentCommitId);
      } else if (parentCommits.length === 1) {
        parentCommitId = parentCommits;
      } else {
        console.log('Warning: There is no Parents found for the last commit: ' + commitId);
      }
    } else {
      console.log('Warning: There is no PR associated with this build. Skipped getting commit details...');
    }
  } else {
    console.log('Error: There is no PR associated with this build. Skipped getting commit details...');
  }

  return {
    LastLocalCommit: commitId,
    ParentCommit: parentCommitId ? parentCommitId[0] : undefined,
    PrId: prId,
    BuildDefinition: build.definition && build.definition.name,
    Owner: owner,
    PullRequestBranch: pullRequestName,
    PROwner: prOwner,
  };

  async function getCommitParents(repoId: string, commitId: string, project: string): Promise<string[]> {
    const commitDetails: GitInterfaces.GitCommit = await gitApi.getCommit(commitId, repoId, project);
    console.log('Commit ID: ' + commitId);
    console.log(
      'Parents of the Commit: ' + commitDetails &&
        commitDetails.parents &&
        commitDetails.parents.map(singleParent => singleParent),
    );
    return commitDetails.parents || [];
  }

  async function getLastCommitIdFromPullRequest(prId: number, project: string): Promise<string | undefined> {
    const prDetails: GitInterfaces.GitPullRequest = await gitApi.getPullRequestById(prId, project);
    console.log('PR ID: ' + prId);
    console.log('PR Source Branch: ' + prDetails.sourceRefName);
    console.log('PR Target Branch: ' + prDetails.targetRefName);
    console.log('PR Merge Status: ' + prDetails.mergeStatus);
    /*console.log(
          "PR Merge Source Commit ID: " + prDetails.lastMergeSourceCommit
        );
        console.log(
          "PR Merge Target Commit ID from Master: " +
            prDetails.lastMergeTargetCommit
        );
        console.log("PR Merged Commit Id in Master: " + prDetails.lastMergeCommit);*/
    return prDetails.lastMergeSourceCommit ? prDetails.lastMergeSourceCommit.commitId : undefined;
  }
}

export async function getfirstCommitOfLGCI(buildId: number, apis: Apis): Promise<string | undefined> {
  const { buildApi } = apis;

  const project = getProject();
  const build = await buildApi.getBuild(project, buildId);
  let commitId: string | undefined;

  if (build && build.triggerInfo) {
    // prId = Number(build.triggerInfo['pr.number']);
    // const sourcebranch = build.sourceBranch;
    // Find the last merge commit for this build
    commitId = build.sourceVersion;

    console.log(`baseCommitID : ${commitId}`);
  } else {
    console.log('Error: There is no PR associated with this build. Skipped getting commit details...');
  }

  return commitId;
}
