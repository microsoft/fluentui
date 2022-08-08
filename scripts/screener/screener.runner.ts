import fetch from 'node-fetch';
import { ScreenerProxyPayload, ScreenerRunnerConfig } from './screener.types';

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

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  const response = await fetch(environment.screener.apiUri, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': screenerConfig.apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 409) {
    console.log('screener-runner: An existing build is running...');

    await wait(15000);
    await scheduleScreenerBuild(screenerConfig, buildInfo);

    return;
  }

  if (response.status !== 200) {
    console.log(`screener-runner: Failed to queue screener tests: status=${response.status}. Retrying`);
    const errorMessage = await response.text();
    console.log(errorMessage);

    await wait(15000);
    await scheduleScreenerBuild(screenerConfig, buildInfo);

    return;
  }

  const data = await response.json();
  const url = `https://screener.io/v2/dashboard/${data.project}/${encodeURIComponent(data.branch)}`;

  console.log(`screener-runner: Screener tests for "${buildInfo.commit}" commit were queued.`);
  console.log(`screener-runner: See job status at ${url}`);

  return url;
}

async function notifyIntegration(payload: ScreenerProxyPayload) {
  const fetchResponse = await fetch(environment.screener.proxyUri, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (fetchResponse.status !== 200) {
    throw new Error(`Notify integration failed: ${fetchResponse.status}`);
  }
}

export async function screenerRunner(screenerConfig: ScreenerRunnerConfig) {
  // https://github.com/microsoft/azure-pipelines-tasks/issues/9801
  const commit = process.env.SYSTEM_PULLREQUEST_SOURCECOMMITID;
  // https://github.com/screener-io/screener-runner/blob/2a8291fb1b0219c96c8428ea6644678b0763a1a1/src/ci.js#L101
  let branchName = process.env.SYSTEM_PULLREQUEST_SOURCEBRANCH || process.env.BUILD_SOURCEBRANCHNAME;
  // remove prefix if exists
  if (branchName.indexOf('refs/heads/') === 0) {
    branchName = branchName.replace('refs/heads/', '');
  }

  const checkUrl = await scheduleScreenerBuild(screenerConfig, {
    build: process.env.BUILD_BUILDID,
    branchName,
    commit,
    pullRequest: process.env.SYSTEM_PULLREQUEST_PULLREQUESTID
      ? process.env.SYSTEM_PULLREQUEST_PULLREQUESTID.toString()
      : undefined,
  });

  await notifyIntegration({
    commit,
    url: checkUrl,
    status: 'in_progress',
    project: screenerConfig.projectRepo,
    branch: branchName,
  });
}

export async function cancelScreenerRun(
  screenerConfig: ScreenerRunnerConfig,
  conclusion: ScreenerProxyPayload['conclusion'] = 'cancelled',
) {
  // https://github.com/microsoft/azure-pipelines-tasks/issues/9801
  const commit = process.env.SYSTEM_PULLREQUEST_SOURCECOMMITID;
  // https://github.com/screener-io/screener-runner/blob/2a8291fb1b0219c96c8428ea6644678b0763a1a1/src/ci.js#L101
  let branchName = process.env.SYSTEM_PULLREQUEST_SOURCEBRANCH || process.env.BUILD_SOURCEBRANCHNAME;

  await notifyIntegration({
    commit,
    url: 'https://screener.io/',
    status: 'completed',
    project: screenerConfig.projectRepo,
    conclusion,
    branch: branchName,
  });

  console.log(`cancelled screener run ${screenerConfig.projectRepo}`);
}
