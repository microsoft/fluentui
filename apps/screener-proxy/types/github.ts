export interface GithubWebhook {
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
}

interface CheckRun {
  id: number;
  app: {
    id: number;
  };
}

export interface CheckRunsResponse {
  data: {
    check_runs: CheckRun[];
  };
}
