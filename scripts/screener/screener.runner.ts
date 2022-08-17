import fetch from 'node-fetch';
import { ScreenerRunnerConfig } from './screener.types';

const environment = {
  screener: {
    /**
     *  Screener API endpoint used to create the tasks.
     **/
    apiUri: process.env.SCREENER_ENDPOINT,
    /**
     *  Screener Proxy endpoint used to orchestrate the GitHub checks for Screener.
     **/
    proxyUri: process.env.SCREENER_PROXY_ENDPOINT,
  },
};

async function scheduleScreenerBuild(
  screenerConfig: ScreenerRunnerConfig,
  buildInfo: {
    build: string;
    branchName: string;
    commit: string;
    pullRequest: string;
  },
) {
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

  const response = await fetch(environment.screener.proxyUri.replace('ci', 'runner'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload: payload,
      screenerConfiguration: screenerConfig,
    }),
  });

  let prNumber = process.env.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER;
  if (response.status === 200) {
    console.log(`[PR #${prNumber}]: Skipping screener check`);
  }

  if (response.status !== 201 && response.status !== 200) {
    throw new Error(`[PR #${prNumber}]: Call to proxy failed: ${response.status}`);
  }
  //conclusion of screener run triggered by the proxy
  return response.json().then(conclusion => conclusion);
}

export async function screenerRunner(screenerConfig: ScreenerRunnerConfig) {
  // https://github.com/microsoft/azure-pipelines-tasks/issues/9801
  const commit = process.env.SYSTEM_PULLREQUEST_SOURCECOMMITID;
  // https://github.com/screener-io/screener-runner/blob/2a8291fb1b0219c96c8428ea6644678b0763a1a1/src/ci.js#L101
  let branchName = process.env.SYSTEM_PULLREQUEST_SOURCEBRANCH || process.env.BUILD_SOURCEBRANCHNAME;

  let prNumber = process.env.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER;
  // remove prefix if exists
  if (branchName.indexOf('refs/heads/') === 0) {
    branchName = branchName.replace('refs/heads/', '');
  }

  const screenerRun = await scheduleScreenerBuild(screenerConfig, {
    build: process.env.BUILD_BUILDID,
    branchName,
    commit,
    pullRequest: process.env.SYSTEM_PULLREQUEST_PULLREQUESTID
      ? process.env.SYSTEM_PULLREQUEST_PULLREQUESTID.toString()
      : undefined,
  });

  if (screenerRun.conclusion === 'skipped') {
    console.log(`[PR #${prNumber}]: Screener test skipped.`);
  } else if (screenerRun.conclusion === 'in_progress') {
    console.log(`[PR #${prNumber}]: Screener test in progress.`);
  }
}
