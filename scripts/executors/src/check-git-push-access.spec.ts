import { spawnSync } from 'child_process';

import { checkCanPush, checkTokenIsUsable, redact } from './check-git-push-access';

jest.mock('child_process', () => ({ spawnSync: jest.fn() }));

const getAuthenticated = jest.fn();
jest.mock('@octokit/rest', () => ({
  Octokit: jest.fn().mockImplementation(() => ({ users: { getAuthenticated } })),
}));

const spawnSyncMock = spawnSync as unknown as jest.Mock;

const pushOptions = { remote: 'origin', branch: 'master', allowFailure: false };

/** Format an expiry the way GitHub sends it in the token expiration header. */
function expiresIn(ms: number): string {
  return new Date(Date.now() + ms).toISOString().replace('T', ' ').replace(/\..*/, ' UTC');
}

function gitResult(overrides: Partial<{ status: number; stderr: string; stdout: string; error: Error }> = {}) {
  return { status: 0, stderr: '', stdout: '', ...overrides };
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  jest.spyOn(console, 'warn').mockImplementation(() => undefined);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('redact', () => {
  it('removes every occurrence of the token', () => {
    expect(redact('using ghp_secret and ghp_secret again', 'ghp_secret')).toBe('using *** and *** again');
  });

  it('passes text through when there is no token to hide', () => {
    expect(redact('nothing to hide', undefined)).toBe('nothing to hide');
  });
});

describe('checkTokenIsUsable', () => {
  const ok = (headers: Record<string, string> = {}) => ({ data: { login: 'releaser' }, headers });

  it('accepts a valid token', async () => {
    getAuthenticated.mockResolvedValue(ok());

    await expect(checkTokenIsUsable('ghp_valid')).resolves.toBeUndefined();
  });

  it.each([
    [401, 'revoked or malformed credentials'],
    [403, 'credentials rejected by an enterprise policy'],
  ])('fails on HTTP %i (%s)', async (status, _description) => {
    getAuthenticated.mockRejectedValue(Object.assign(new Error('nope'), { status }));

    const failure = await checkTokenIsUsable('ghp_bad');

    expect(failure?.summary).toContain(`HTTP ${status}`);
  });

  it('never echoes the token in failure details', async () => {
    getAuthenticated.mockRejectedValue(Object.assign(new Error('bad credentials for ghp_secret'), { status: 401 }));

    const failure = await checkTokenIsUsable('ghp_secret');

    expect(JSON.stringify(failure)).not.toContain('ghp_secret');
    expect(failure?.details?.join('\n')).toContain('***');
  });

  it('does not fail the release when the GitHub API is unreachable', async () => {
    // The push check is authoritative, so an API outage must not block a release on its own.
    getAuthenticated.mockRejectedValue(Object.assign(new Error('getaddrinfo ENOTFOUND'), { status: 500 }));

    await expect(checkTokenIsUsable('ghp_valid')).resolves.toBeUndefined();
  });

  it('fails when the token is already expired', async () => {
    getAuthenticated.mockResolvedValue(ok({ 'github-authentication-token-expiration': expiresIn(-60 * 60 * 1000) }));

    const failure = await checkTokenIsUsable('ghp_expired');

    expect(failure?.summary).toContain('expired');
  });

  it('accepts a token expiring in less than a day', async () => {
    // Regression: flooring the delta to whole days reported 0 days left for a token with 23h of
    // life remaining, which failed a release that would otherwise have succeeded.
    getAuthenticated.mockResolvedValue(
      ok({ 'github-authentication-token-expiration': expiresIn(23 * 60 * 60 * 1000) }),
    );

    await expect(checkTokenIsUsable('ghp_short')).resolves.toBeUndefined();
  });

  it('warns without failing when the token expires soon', async () => {
    getAuthenticated.mockResolvedValue(
      ok({ 'github-authentication-token-expiration': expiresIn(23 * 60 * 60 * 1000) }),
    );

    await checkTokenIsUsable('ghp_short');

    expect((console.warn as jest.Mock).mock.calls.join('\n')).toContain('rotate it soon');
  });

  it('does not warn for a token with plenty of life left', async () => {
    getAuthenticated.mockResolvedValue(
      ok({ 'github-authentication-token-expiration': expiresIn(30 * 24 * 60 * 60 * 1000) }),
    );

    await checkTokenIsUsable('ghp_long');

    expect((console.warn as jest.Mock).mock.calls.join('\n')).not.toContain('rotate it soon');
  });
});

describe('checkCanPush', () => {
  it('passes when the dry-run push succeeds', () => {
    spawnSyncMock.mockReturnValue(gitResult());

    expect(checkCanPush(pushOptions, 'ghp_valid')).toBeUndefined();
  });

  it('runs a dry-run that cannot mutate the remote', () => {
    spawnSyncMock.mockReturnValue(gitResult());

    checkCanPush(pushOptions, 'ghp_valid');

    expect(spawnSyncMock).toHaveBeenCalledWith(
      'git',
      ['push', '--dry-run', '--no-verify', 'origin', 'HEAD:master'],
      expect.anything(),
    );
  });

  it('fails when the remote rejects the push', () => {
    spawnSyncMock.mockReturnValue(
      gitResult({ status: 128, stderr: 'remote: Permission denied\nfatal: unable to push' }),
    );

    expect(checkCanPush(pushOptions, 'ghp_readonly')?.summary).toContain('failed');
  });

  it.each([
    ['non-fast-forward', '! [rejected] master -> master (non-fast-forward)'],
    ['fetch first', '! [rejected] master -> master (fetch first)'],
    ['updates were rejected', 'Updates were rejected because the remote contains work you do not have'],
  ])('passes on a stale-ref rejection (%s), which is not an auth problem', (_name, stderr) => {
    // Authentication succeeded - the push only failed because the branch moved. beachball fetches
    // and merges inside its own retry loop, so failing here would block healthy releases.
    spawnSyncMock.mockReturnValue(gitResult({ status: 1, stderr }));

    expect(checkCanPush(pushOptions, 'ghp_valid')).toBeUndefined();
  });

  it('fails when git cannot be executed', () => {
    spawnSyncMock.mockReturnValue({ error: new Error('spawn git ENOENT'), status: null, stderr: '', stdout: '' });

    expect(checkCanPush(pushOptions, 'ghp_valid')?.summary).toContain('ENOENT');
  });

  it('never echoes the token from git output', () => {
    spawnSyncMock.mockReturnValue(
      gitResult({ status: 128, stderr: 'fatal: https://ghp_secret@github.com/microsoft/fluentui rejected' }),
    );

    const failure = checkCanPush(pushOptions, 'ghp_secret');

    expect(JSON.stringify(failure)).not.toContain('ghp_secret');
  });
});
