type ScreenerRequestBody = {
  id: string;
  project: string;
  environment: string;
  build: string;
  status: 'error' | 'failure' | 'success';
  url: string;
  description: string;
  repo: string;
  commit: string;
};

export const screener = async (req, res) => {
  const body: ScreenerRequestBody = req.body;

  // pino.info({ body });
  console.log({ body });

  const checksForCommit = await githubApp.octokit.request('GET /repos/:owner/:repo/commits/:ref/check-runs', {
    owner: OWNER,
    repo: REPO,
    ref: body.commit,
    mediaType: {
      previews: ['antiope', 'machine-man'],
    },
  });
  const screenerCheck = checksForCommit.data.check_runs.find(
    (checkRun: { app: { id: number } }) => checkRun.app.id === APP_ID,
  );

  if (screenerCheck) {
    await githubApp.octokit.request('PATCH /repos/:owner/:repo/check-runs/:check_run_id', {
      owner: OWNER,
      repo: REPO,
      check_run_id: screenerCheck.id,
      conclusion: body.status === 'success' ? 'success' : 'failure',
      details_url: body.url,
      name: CHECK_NAME,
      mediaType: {
        previews: ['antiope', 'machine-man'],
      },
    });
  }

  res.end();
};
