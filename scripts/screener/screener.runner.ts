import fetch from 'node-fetch';
import { ScreenerRunnerConfig } from './screener.types';

export const environment = {
  screener: {
    /**
     *  Screener API endpoint used to create the tasks.
     **/
    apiUri: process.env.SCREENER_ENDPOINT,
    /**
     *  Screener Proxy endpoint used to orchestrate the GitHub checks for Screener.
     **/
    proxyUri: process.env.SCREENER_PROXY_ENDPOINT,
    /**
     *  Determines whether a screener test should be skipped or run
     **/
    isArtifactPresent: process.env.IS_ARTIFACT_PRESENT,
  },
};

type ScheduleScreenerBuildResponse = {
  conclusion?: 'skipped' | 'failure' | 'in_progress' | 'cancelled';
};

async function scheduleScreenerBuild(
  screenerConfig: ScreenerRunnerConfig,
  buildInfo: {
    build: string;
    branchName: string;
    commit?: string;
    pullRequest?: string;
  },
): Promise<ScheduleScreenerBuildResponse> {
  const payload = {
    states: screenerConfig.states,

    baseBranch: screenerConfig.baseBranch,
    projectRepo: screenerConfig.projectRepo,

    alwaysAcceptBaseBranch: screenerConfig.alwaysAcceptBaseBranch,
    diffOptions: screenerConfig.diffOptions,

    build: buildInfo.build,
    branch: buildInfo.branchName,
    commit: buildInfo.commit,
    pullRequest: buildInfo.pullRequest,
  };

  if (!environment.screener.proxyUri) {
    throw new Error('SCREENER_PROXY_ENDPOINT env variable doesnt exist');
  }

  const response = await fetch(environment.screener.proxyUri.replace('ci', 'runner'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload: payload,
      isArtifactPresent: environment.screener.isArtifactPresent,
    }),
  });

  if (response.status === 200) {
    console.log('Skipping screener check');
  }

  if (response.status !== 201 && response.status !== 200) {
    throw new Error(`Call to proxy failed: ${response.status}`);
  }

  return response.json() as ScheduleScreenerBuildResponse;
}

export async function screenerRunner(screenerConfig: ScreenerRunnerConfig) {
  // https://github.com/microsoft/azure-pipelines-tasks/issues/9801
  const commit = process.env.SYSTEM_PULLREQUEST_SOURCECOMMITID;
  // https://github.com/screener-io/screener-runner/blob/2a8291fb1b0219c96c8428ea6644678b0763a1a1/src/ci.js#L101
  let branchName = process.env.SYSTEM_PULLREQUEST_SOURCEBRANCH || process.env.BUILD_SOURCEBRANCHNAME;

  if (!branchName) {
    throw new Error('SYSTEM_PULLREQUEST_SOURCEBRANCH or BUILD_SOURCEBRANCHNAME env variable doesnt exist');
  }
  if (!process.env.BUILD_BUILDID) {
    throw new Error('BUILD_BUILDID env variable doesnt exist');
  }

  // remove prefix if exists
  if (branchName.indexOf('refs/heads/') === 0) {
    branchName = branchName.replace('refs/heads/', '');
  }

  const screenerRun = await scheduleScreenerBuild(screenerConfig, {
    build: process.env.BUILD_BUILDID,
    branchName,
    commit,
    pullRequest: process.env.SYSTEM_PULLREQUEST_PULLREQUESTID
      ? String(process.env.SYSTEM_PULLREQUEST_PULLREQUESTID)
      : undefined,
  });

  if (screenerRun.conclusion === 'skipped') {
    console.log('Screener test skipped.');
    return;
  }

  if (screenerRun.conclusion === 'in_progress') {
    console.log('Screener test in progress.');
    return;
  }

  if (screenerRun.conclusion === 'cancelled') {
    console.log('Screener test cancelled.');
    return;
  }
}
