const npmWhoAmIEndpoint = 'https://registry.npmjs.org/-/whoami';
const githubUserEndpoint = 'https://api.github.com/user';
const githubRepositoryEndpoint = 'https://api.github.com/repos/microsoft/fluentui';
const requestTimeoutMs = 15_000;

type FetchResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

export type FetchLike = (
  url: string,
  init: {
    method: 'GET';
    headers: Record<string, string>;
    redirect: 'error';
    signal: AbortSignal;
  },
) => Promise<FetchResponse>;

export type ValidateReleaseCredentialsOptions = {
  env?: NodeJS.ProcessEnv;
  fetchImpl?: FetchLike;
};

type CredentialRequest = {
  credentialName: 'NPM_TOKEN' | 'GITHUB_PAT';
  url: string;
  token: string;
  headers: Record<string, string>;
  accessDeniedStatuses: number[];
};

function hasNonEmptyStringProperty(value: unknown, propertyName: string): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    propertyName in value &&
    typeof (value as Record<string, unknown>)[propertyName] === 'string' &&
    ((value as Record<string, string>)[propertyName] as string).length > 0
  );
}

function hasStringPropertyValue(value: unknown, propertyName: string, expectedValue: string): boolean {
  return (
    hasNonEmptyStringProperty(value, propertyName) && (value as Record<string, unknown>)[propertyName] === expectedValue
  );
}

async function requestCredentialValidation(request: CredentialRequest, fetchImpl: FetchLike): Promise<unknown> {
  const { credentialName, url, token, headers, accessDeniedStatuses } = request;
  let response: FetchResponse;

  try {
    response = await fetchImpl(url, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      redirect: 'error',
      signal: AbortSignal.timeout(requestTimeoutMs),
    });
  } catch {
    throw new Error(`Unable to validate ${credentialName}: request failed or timed out.`);
  }

  if (accessDeniedStatuses.includes(response.status)) {
    throw new Error(`${credentialName} is invalid or does not have required access (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(`Unable to validate ${credentialName}: endpoint returned HTTP ${response.status}.`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`Unable to validate ${credentialName}: endpoint returned an unexpected response.`);
  }
}

async function validateNpmToken(token: string, fetchImpl: FetchLike): Promise<void> {
  const response = await requestCredentialValidation(
    {
      credentialName: 'NPM_TOKEN',
      url: npmWhoAmIEndpoint,
      token,
      headers: {
        Accept: 'application/json',
      },
      accessDeniedStatuses: [401, 403],
    },
    fetchImpl,
  );

  if (!hasNonEmptyStringProperty(response, 'username')) {
    throw new Error('Unable to validate NPM_TOKEN: endpoint returned an unexpected response.');
  }
}

async function validateGitHubToken(token: string, fetchImpl: FetchLike): Promise<void> {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'fluentui-release-credential-validator',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const userResponse = await requestCredentialValidation(
    {
      credentialName: 'GITHUB_PAT',
      url: githubUserEndpoint,
      token,
      headers,
      accessDeniedStatuses: [401, 403],
    },
    fetchImpl,
  );

  if (!hasNonEmptyStringProperty(userResponse, 'login')) {
    throw new Error('Unable to validate GITHUB_PAT: endpoint returned an unexpected response.');
  }

  const repositoryResponse = await requestCredentialValidation(
    {
      credentialName: 'GITHUB_PAT',
      url: githubRepositoryEndpoint,
      token,
      headers,
      accessDeniedStatuses: [401, 403, 404],
    },
    fetchImpl,
  );

  if (!hasStringPropertyValue(repositoryResponse, 'full_name', 'microsoft/fluentui')) {
    throw new Error('Unable to validate GITHUB_PAT: endpoint returned an unexpected response.');
  }
}

export async function validateReleaseCredentials(options: ValidateReleaseCredentialsOptions = {}): Promise<void> {
  const env = options.env ?? process.env;
  const missingCredentials = (['NPM_TOKEN', 'GITHUB_PAT'] as const).filter(
    credentialName => !env[credentialName]?.trim(),
  );

  if (missingCredentials.length > 0) {
    throw new Error(`Missing required release credentials: ${missingCredentials.join(', ')}.`);
  }

  const fetchImpl = options.fetchImpl ?? (globalThis.fetch as FetchLike);
  await validateNpmToken(env.NPM_TOKEN!.trim(), fetchImpl);
  await validateGitHubToken(env.GITHUB_PAT!.trim(), fetchImpl);
}

async function main(): Promise<void> {
  try {
    await validateReleaseCredentials();
    console.log('Release credentials validated successfully.');
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Release credential validation failed.');
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}
