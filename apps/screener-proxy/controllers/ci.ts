import { Request, Response } from 'express';
import { Endpoints } from '@octokit/types';
import { CHECK_NAME, GITHUB_APP_ID, GITHUB_APP_REPO, GITHUB_APP_REPO_OWNER } from '../config';
import { setupGithubClient } from '../utils';

interface CIRequestBody {
  commit: string;
  url: string;
}

type CheckRunsResponse = Endpoints['GET /repos/{owner}/{repo}/commits/{ref}/check-runs']['response'];

export const ci = async (req: Request, res: Response) => {
  const githubClient = await setupGithubClient();
  const body: CIRequestBody = req.body;

  const response = (await githubClient.request('GET /repos/:owner/:repo/commits/:ref/check-runs', {
    repo: GITHUB_APP_REPO,
    owner: GITHUB_APP_REPO_OWNER,
    ref: body.commit,
  })) as CheckRunsResponse;
  const screenerCheck = response.data.check_runs.find(checkRun => checkRun.app.id === GITHUB_APP_ID);

  if (screenerCheck) {
    await githubClient.request('PATCH /repos/:owner/:repo/check-runs/:check_run_id', {
      repo: GITHUB_APP_REPO,
      owner: GITHUB_APP_REPO_OWNER,
      check_run_id: screenerCheck.id,
      status: 'in_progress',
      details_url: body.url,
      name: CHECK_NAME,
    });

    res.status(200).send(`Check ${screenerCheck.id} updated to "In Progress"`);
    return;
  }

  res.status(404).send(`Did not find any checks for app ID ${GITHUB_APP_ID}`);
};
