type GithubRequestBody = {
  action: string;
  pull_request?: {
    base: {
      label: string;
      ref: string;
    };
    head: {
      sha: string;
    };
    number: number;
    title: string;
  };
};
const ALLOWED_BASES: string[] = ['master'];

export const github = (req, res) => {
  router.get('/', async (req, res) => {
    const body: GithubRequestBody = req.body;

    const commitSHA = body.pull_request?.head.sha;
    const targetBranch = body.pull_request?.base.ref;

    const shouldProceedByActionType =
      body.action === 'opened' || body.action === 'reopened' || body.action === 'synchronize';
    const shouldProceedByTargetBranch = targetBranch && ALLOWED_BASES.includes(targetBranch);

    if (shouldProceedByActionType && shouldProceedByTargetBranch) {
      // pino.info({ body });
      console.log({ body });

      await githubApp.octokit.request('POST /repos/:owner/:repo/check-runs', {
        owner: OWNER,
        repo: REPO,
        name: CHECK_NAME,
        head_sha: commitSHA as string,
        mediaType: {
          previews: ['antiope', 'machine-man'],
        },
      });
    }

    res.end();
  });
};
