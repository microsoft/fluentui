import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { fetchPullRequest, parseArgs, run } from './cli';

interface FakeFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
}

function fakeFile(filename: string): FakeFile {
  return { filename, status: 'modified', additions: 1, deletions: 0 };
}

/** A fake `fetch` that serves a pull request with the given files, 100 per page, and records the requests. */
function fakeFetch(files: FakeFile[], changedFiles = files.length) {
  const calls: Array<{ url: string; headers: Record<string, string> }> = [];
  const fetchImpl = (async (url: string, init: { headers: Record<string, string> }) => {
    calls.push({ url, headers: init.headers });
    const page = /[?&]page=(\d+)/.exec(url);
    const body = page
      ? files.slice((Number(page[1]) - 1) * 100, Number(page[1]) * 100)
      : // eslint-disable-next-line @typescript-eslint/naming-convention
        { changed_files: changedFiles };
    return { ok: true, status: 200, json: async () => body };
  }) as unknown as typeof fetch;

  return { fetchImpl, calls };
}

describe(`parseArgs`, () => {
  it(`reads a pull request number and defaults the repository`, () => {
    expect(parseArgs(['36743'])).toEqual({ pullNumber: 36743, repo: 'microsoft/fluentui' });
  });

  it(`reads --repo and --files`, () => {
    expect(parseArgs(['--files', 'a.json'])).toEqual({ filesPath: 'a.json', repo: 'microsoft/fluentui' });
    expect(parseArgs(['1', '--repo', 'me/fork'])).toEqual({ pullNumber: 1, repo: 'me/fork' });
  });

  it(`rejects missing, conflicting and unknown input`, () => {
    expect(() => parseArgs([])).toThrow(/number or --files/);
    expect(() => parseArgs(['1', '--files', 'a.json'])).toThrow(/not both/);
    expect(() => parseArgs(['--bogus'])).toThrow(/Unknown argument/);
    expect(() => parseArgs(['--repo'])).toThrow(/needs a value/);
    expect(() => parseArgs(['1', '--repo', 'not a repo'])).toThrow(/Invalid repository/);
  });
});

describe(`fetchPullRequest`, () => {
  it(`follows pagination and reports the changed file count`, async () => {
    const files = Array.from({ length: 250 }, (_, i) => fakeFile(`packages/a/file${i}.ts`));
    const { fetchImpl, calls } = fakeFetch(files);

    const result = await fetchPullRequest({ repo: 'microsoft/fluentui', pullNumber: 7, fetchImpl });

    expect(result.files).toHaveLength(250);
    expect(result.changedFiles).toBe(250);
    expect(calls.map(call => call.url)).toEqual([
      'https://api.github.com/repos/microsoft/fluentui/pulls/7',
      'https://api.github.com/repos/microsoft/fluentui/pulls/7/files?per_page=100&page=1',
      'https://api.github.com/repos/microsoft/fluentui/pulls/7/files?per_page=100&page=2',
      'https://api.github.com/repos/microsoft/fluentui/pulls/7/files?per_page=100&page=3',
    ]);
  });

  it(`sends the token only when one is given`, async () => {
    const withToken = fakeFetch([fakeFile('a.ts')]);
    await fetchPullRequest({ repo: 'o/r', pullNumber: 1, token: 'secret', fetchImpl: withToken.fetchImpl });
    expect(withToken.calls[0].headers.authorization).toBe('Bearer secret');

    const withoutToken = fakeFetch([fakeFile('a.ts')]);
    await fetchPullRequest({ repo: 'o/r', pullNumber: 1, fetchImpl: withoutToken.fetchImpl });
    expect(withoutToken.calls[0].headers.authorization).toBeUndefined();
  });

  it(`fails with the status when the API refuses`, async () => {
    const fetchImpl = (async () => ({ ok: false, status: 404 })) as unknown as typeof fetch;
    await expect(fetchPullRequest({ repo: 'o/r', pullNumber: 1, fetchImpl })).rejects.toThrow(/\(404\)/);
  });
});

describe(`run`, () => {
  it(`classifies a fetched pull request`, async () => {
    const { fetchImpl } = fakeFetch([fakeFile('packages/react-components/react-button/library/README.md')]);

    const output = JSON.parse(await run(['5'], { env: {}, fetchImpl }));

    expect(output.tier).toBe(0);
    expect(output.reasons[0]).toMatch(/^tier 0:/);
  });

  it(`treats a truncated file list as tier 2`, async () => {
    const { fetchImpl } = fakeFetch([fakeFile('packages/react-components/react-button/library/README.md')], 40);

    expect(JSON.parse(await run(['5'], { env: {}, fetchImpl })).tier).toBe(2);
  });

  it(`reads GITHUB_TOKEN and falls back to GH_TOKEN`, async () => {
    const first = fakeFetch([fakeFile('a.ts')]);
    await run(['1'], { env: { GITHUB_TOKEN: 'one', GH_TOKEN: 'two' }, fetchImpl: first.fetchImpl });
    expect(first.calls[0].headers.authorization).toBe('Bearer one');

    const second = fakeFetch([fakeFile('a.ts')]);
    await run(['1'], { env: { GH_TOKEN: 'two' }, fetchImpl: second.fetchImpl });
    expect(second.calls[0].headers.authorization).toBe('Bearer two');
  });

  it(`classifies a saved file list offline without any request`, async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pr-risk-tier-'));
    const saved = path.join(dir, 'files.json');
    fs.writeFileSync(
      saved,
      JSON.stringify([fakeFile('packages/react-components/react-button/library/etc/react-button.api.md')]),
    );
    const fetchImpl = jest.fn() as unknown as typeof fetch;

    const output = JSON.parse(await run(['--files', saved], { env: {}, fetchImpl }));

    expect(output.tier).toBe(3);
    expect(fetchImpl).not.toHaveBeenCalled();
    fs.rmSync(dir, { recursive: true });
  });
});
