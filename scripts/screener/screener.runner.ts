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
    }),
  });

  if (response.status !== 201) {
    throw new Error(`Call to proxy failed: ${response.status}`);
  }
  //checkUrl
  return response.json().then(url => url);
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
    url: checkUrl.url,
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
