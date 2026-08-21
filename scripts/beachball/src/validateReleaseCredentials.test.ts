import { FetchLike, validateReleaseCredentials } from './validateReleaseCredentials';

const npmToken = 'npm-test-token';
const githubToken = 'github-test-token';

function createResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(body),
  };
}

describe('validateReleaseCredentials', () => {
  let fetchMock: jest.MockedFunction<FetchLike>;

  beforeEach(() => {
    fetchMock = jest.fn();
  });

  it('fails before making requests when required credentials are missing', async () => {
    await expect(validateReleaseCredentials({ env: {}, fetchImpl: fetchMock })).rejects.toThrow(
      'Missing required release credentials: NPM_TOKEN, GITHUB_PAT.',
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('validates npm authentication, GitHub authentication, and repository access', async () => {
    fetchMock
      .mockResolvedValueOnce(createResponse({ username: 'npm-user' }))
      .mockResolvedValueOnce(createResponse({ login: 'github-user' }))
      .mockResolvedValueOnce(createResponse({ ['full_name']: 'microsoft/fluentui' }));

    await validateReleaseCredentials({
      env: { NPM_TOKEN: npmToken, GITHUB_PAT: githubToken },
      fetchImpl: fetchMock,
    });

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://registry.npmjs.org/-/whoami',
      expect.objectContaining({
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${npmToken}`,
        },
        redirect: 'error',
        signal: expect.any(AbortSignal),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://api.github.com/user',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${githubToken}`,
          'User-Agent': 'fluentui-release-credential-validator',
        }),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'https://api.github.com/repos/microsoft/fluentui',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${githubToken}`,
        }),
      }),
    );
  });

  it('fails explicitly when npm rejects the token without exposing it', async () => {
    fetchMock.mockResolvedValueOnce(createResponse({}, 401));

    await expect(
      validateReleaseCredentials({
        env: { NPM_TOKEN: npmToken, GITHUB_PAT: githubToken },
        fetchImpl: fetchMock,
      }),
    ).rejects.toThrow(/^NPM_TOKEN is invalid or does not have required access \(HTTP 401\)\.$/);
  });

  it('fails explicitly when GitHub rejects the token without exposing it', async () => {
    fetchMock
      .mockResolvedValueOnce(createResponse({ username: 'npm-user' }))
      .mockResolvedValueOnce(createResponse({}, 403));

    await expect(
      validateReleaseCredentials({
        env: { NPM_TOKEN: npmToken, GITHUB_PAT: githubToken },
        fetchImpl: fetchMock,
      }),
    ).rejects.toThrow(/^GITHUB_PAT is invalid or does not have required access \(HTTP 403\)\.$/);
  });

  it('fails when the GitHub token cannot access the Fluent UI repository', async () => {
    fetchMock
      .mockResolvedValueOnce(createResponse({ username: 'npm-user' }))
      .mockResolvedValueOnce(createResponse({ login: 'github-user' }))
      .mockResolvedValueOnce(createResponse({}, 404));

    await expect(
      validateReleaseCredentials({
        env: { NPM_TOKEN: npmToken, GITHUB_PAT: githubToken },
        fetchImpl: fetchMock,
      }),
    ).rejects.toThrow(/^GITHUB_PAT is invalid or does not have required access \(HTTP 404\)\.$/);
  });

  it('fails closed on other HTTP errors', async () => {
    fetchMock.mockResolvedValueOnce(createResponse({}, 503));

    await expect(
      validateReleaseCredentials({
        env: { NPM_TOKEN: npmToken, GITHUB_PAT: githubToken },
        fetchImpl: fetchMock,
      }),
    ).rejects.toThrow(/^Unable to validate NPM_TOKEN: endpoint returned HTTP 503\.$/);
  });

  it('sanitizes network errors that could contain credential values', async () => {
    fetchMock.mockRejectedValueOnce(new Error(`request failed for ${npmToken}`));

    await expect(
      validateReleaseCredentials({
        env: { NPM_TOKEN: npmToken, GITHUB_PAT: githubToken },
        fetchImpl: fetchMock,
      }),
    ).rejects.toThrow(/^Unable to validate NPM_TOKEN: request failed or timed out\.$/);
  });
});
