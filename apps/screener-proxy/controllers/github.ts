import { Request, Response } from 'express';
import { CHECK_NAME, GITHUB_APP_REPO, GITHUB_APP_REPO_OWNER } from '../config';
import { setupGithubClient } from '../utils';
import { GithubWebhook } from '../types/github';

const ALLOWED_BASES: string[] = ['master'];

export const github = async (req: Request, res: Response) => {
  const githubClient = await setupGithubClient();
  const body: GithubWebhook = req.body;

  const commitSHA = body.pull_request?.head.sha;
  const targetBranch = body.pull_request?.base.ref;

  const shouldProceedByActionType =
    body.action === 'opened' || body.action === 'reopened' || body.action === 'synchronize';
  const shouldProceedByTargetBranch = targetBranch && ALLOWED_BASES.includes(targetBranch);

  if (shouldProceedByActionType && shouldProceedByTargetBranch) {
    await githubClient.request('POST /repos/:owner/:repo/check-runs', {
      repo: GITHUB_APP_REPO,
      owner: GITHUB_APP_REPO_OWNER,
      name: CHECK_NAME,
      head_sha: commitSHA as string,
    });

    res.status(200).send(`Created ${CHECK_NAME} for PR ${body.pull_request?.title}`);
    return;
  }

  res.status(400).send('Invalid webhook type.');
};
