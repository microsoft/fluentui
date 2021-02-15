import { request } from '@octokit/request';

type CIRequestBody = {
  commit: string;
  url: string;
};

export const ci = async (req, res) => {
  const body: CIRequestBody = req.body;

  pino.info({ body });

  const checksForCommit = await request('GET /repos/:owner/:repo/commits/:ref/check-runs', {
    owner: OWNER,
    repo: REPO,
    ref: body.commit,
    headers: {
      authorization: `token ${accessToken}`,
    },
    mediaType: {
      previews: ['antiope', 'machine-man'],
    },
  });
  const screenerCheck = checksForCommit.data.check_runs.find(checkRun => checkRun.app.id === APP_ID);

  if (screenerCheck) {
    await request('PATCH /repos/:owner/:repo/check-runs/:check_run_id', {
      owner: OWNER,
      repo: REPO,
      check_run_id: screenerCheck.id,
      status: 'in_progress',
      details_url: body.url,
      name: CHECK_NAME,
      headers: {
        authorization: `token ${accessToken}`,
      },
      mediaType: {
        previews: ['antiope', 'machine-man'],
      },
    });
  }

  res.end();
};
