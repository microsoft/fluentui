import fetch from 'node-fetch';
import { ScreenerRunnerConfig } from './screener.types';

const SCREENER_ENDPOINT = 'https://screener.io/api/v2/projects';

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

  const response = await fetch(SCREENER_ENDPOINT, {
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

    await wait(15000);
    await scheduleScreenerBuild(screenerConfig, buildInfo);

    return;
  }

  const data = await response.json();

  console.log('screener-runner: Screener tests queued.');
  console.log(
    `screener-runner: See job status at https://screener.io/v2/dashboard/${data.project}/${encodeURIComponent(
      data.branch,
    )}`,
  );
}

export async function screenerRunner(screenerConfigPath) {
  const screenerConfig: ScreenerRunnerConfig = require(screenerConfigPath) as any;

  // https://github.com/screener-io/screener-runner/blob/2a8291fb1b0219c96c8428ea6644678b0763a1a1/src/ci.js#L101
  let branchName = process.env.SYSTEM_PULLREQUEST_SOURCEBRANCH || process.env.BUILD_SOURCEBRANCHNAME;
  // remove prefix if exists
  if (branchName.indexOf('refs/heads/') === 0) {
    branchName = branchName.replace('refs/heads/', '');
  }

  await scheduleScreenerBuild(screenerConfig, {
    build: process.env.BUILD_BUILDID,
    branchName,
    commit: process.env.BUILD_SOURCEVERSION,
    pullRequest: process.env.SYSTEM_PULLREQUEST_PULLREQUESTID
      ? process.env.SYSTEM_PULLREQUEST_PULLREQUESTID.toString()
      : undefined,
  });
}
