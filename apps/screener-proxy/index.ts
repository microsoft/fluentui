import express from 'express';
import { App } from '@octokit/app';
import { GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET, GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, PORT } from './config';
import { github } from './controllers/github';
import { screener } from './controllers/screener';
import { ci } from './controllers/ci';

const app = express();

const githubApp = new App({
  appId: GITHUB_APP_ID,
  privateKey: GITHUB_APP_PRIVATE_KEY,
  oauth: {
    clientId: GITHUB_APP_CLIENT_ID,
    clientSecret: GITHUB_APP_CLIENT_SECRET,
  },
});
const setupGithubClient = async () => {
  const response = await githubApp.octokit.request('GET /repos/:owner/:repo/installation', {
    owner: 'andrefcdias',
    repo: 'fluentui',
  });
  console.log('hey');

  const installationOctokit = await githubApp.getInstallationOctokit(response.data.id);
  console.log('teacher');

  const test = await installationOctokit.request('GET /repose/:owner/:repo', {
    owner: 'andrefcdias',
    repo: 'fluentui',
  });

  console.log(test);
};
setupGithubClient();

// app.get('/api/github', github);
// app.get('/api/ci', ci);
// app.get('/api/screener', screener);
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
