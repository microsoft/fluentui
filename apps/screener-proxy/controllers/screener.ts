import { Request, Response } from 'express';
import { GITHUB_APP_REPO, GITHUB_APP_REPO_OWNER, GITHUB_APP_ID, CHECK_NAME } from '../config';
import { CheckRunsResponse } from '../types/github';
import { setupGithubClient } from '../utils';

interface ScreenerWebhook {
  id: string;
  project: string;
  environment: string;
  build: string;
  status: 'error' | 'failure' | 'success';
  url: string;
  description: string;
  repo: string;
  commit: string;
}

export const screener = async (req: Request, res: Response) => {
  const githubClient = await setupGithubClient();
  const body: ScreenerWebhook = req.body;

  console.log({ body });

  const checksForCommit: CheckRunsResponse = await githubClient.request(
    'GET /repos/:owner/:repo/commits/:ref/check-runs',
    {
      repo: GITHUB_APP_REPO,
      owner: GITHUB_APP_REPO_OWNER,
      ref: body.commit,
    },
  );
  const screenerCheck = checksForCommit.data.check_runs.find(checkRun => checkRun.app.id === GITHUB_APP_ID);

  if (screenerCheck) {
    const conclusion = body.status === 'success' ? 'success' : 'failure';

    await githubClient.request('PATCH /repos/:owner/:repo/check-runs/:check_run_id', {
      repo: GITHUB_APP_REPO,
      owner: GITHUB_APP_REPO_OWNER,
      check_run_id: screenerCheck.id,
      conclusion,
      name: CHECK_NAME,
    });

    res.status(200).send(`Check ${screenerCheck.id} updated to status "completed" with a "${conclusion}" conclusion`);
    return;
  }

  res.status(404).send(`Did not find any checks for app ID ${GITHUB_APP_ID}`);
};
