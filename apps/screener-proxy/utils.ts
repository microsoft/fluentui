import { App } from '@octokit/app';
import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import {
  GITHUB_APP_CLIENT_ID,
  GITHUB_APP_CLIENT_SECRET,
  GITHUB_APP_ID,
  GITHUB_APP_PRIVATE_KEY,
  GITHUB_APP_REPO,
  GITHUB_APP_REPO_OWNER,
  GITHUB_APP_WEBHOOK_SECRET,
} from './config';

interface InstallationResponse {
  data: {
    id: number;
  };
}

export const validateGithubWebhook = (req: Request, _: Response, next: NextFunction) => {
  const headerName = 'X-Hub-Signature-256';

  const payload = JSON.stringify(req.body);
  if (!payload) {
    return next('Request body empty');
  }

  const sig = req.get(headerName) || '';
  const hmac = crypto.createHmac('sha256', GITHUB_APP_WEBHOOK_SECRET);
  const digest = Buffer.from('sha256=' + hmac.update(payload).digest('hex'), 'utf8');
  const checksum = Buffer.from(sig, 'utf8');

  if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
    return next(`Request body digest (${digest}) did not match ${headerName} (${checksum})`);
  }

  return next();
};

export const setupGithubClient = async () => {
  const githubApp = new App({
    appId: GITHUB_APP_ID,
    privateKey: GITHUB_APP_PRIVATE_KEY,
    oauth: {
      clientId: GITHUB_APP_CLIENT_ID,
      clientSecret: GITHUB_APP_CLIENT_SECRET,
    },
  });

  const response: InstallationResponse = await githubApp.octokit.request('GET /repos/:owner/:repo/installation', {
    repo: GITHUB_APP_REPO,
    owner: GITHUB_APP_REPO_OWNER,
  });

  return await githubApp.getInstallationOctokit(response.data.id);
};
