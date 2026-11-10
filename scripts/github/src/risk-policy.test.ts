/* eslint-disable @typescript-eslint/naming-convention -- GitHub REST API fixtures use upstream field names. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { revisionKey } from './risk-policy';

const { waitForAssessment } = require('./risk-policy');

function fixture() {
  const pull = {
    head: { sha: 'head' },
    base: { sha: 'base', ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
    title: 'Title',
    body: 'Review focus: API compatibility',
  };
  const check = {
    id: 1,
    status: 'completed',
    conclusion: 'success',
    external_id: revisionKey(pull),
    app: { slug: 'github-actions' },
  };
  return {
    pull,
    check,
    github: {
      rest: {
        pulls: { get: jest.fn().mockResolvedValue({ data: pull }) },
        checks: { listForRef: jest.fn() },
      },
      paginate: jest.fn().mockResolvedValue([check]),
    },
    context: {
      repo: { owner: 'microsoft', repo: 'fluentui' },
      issue: { number: 123 },
      payload: { pull_request: { head: { sha: 'head' } } },
    },
    trustedBaseSha: 'base',
    wait: jest.fn(),
  };
}

describe('read-only head-SHA risk gate', () => {
  test('accepts only a successful trusted assessment of the complete current snapshot', async () => {
    const args = fixture();
    await expect(waitForAssessment(args)).resolves.toBeUndefined();
    expect(args.wait).not.toHaveBeenCalled();
    expect(args.github.paginate).toHaveBeenCalledWith(
      args.github.rest.checks.listForRef,
      expect.objectContaining({ ref: 'head', check_name: 'PR risk assessment' }),
    );
  });

  test.each(['pending', 'old-metadata', 'other-app'])('does not accept %s as current certification', async mode => {
    const args = fixture();
    args.github.paginate.mockResolvedValue([
      {
        ...args.check,
        status: mode === 'pending' ? 'in_progress' : 'completed',
        external_id: mode === 'old-metadata' ? 'old' : args.check.external_id,
        app: { slug: mode === 'other-app' ? 'untrusted-app' : 'github-actions' },
      },
    ]);
    await expect(waitForAssessment(args)).rejects.toThrow('deadline');
    expect(args.wait).toHaveBeenCalledTimes(30);
  });

  test('does not use an older success while a newer matching assessment is pending or failed', async () => {
    const args = fixture();
    args.github.paginate
      .mockResolvedValueOnce([args.check, { ...args.check, id: 2, status: 'in_progress' }])
      .mockResolvedValueOnce([args.check, { ...args.check, id: 2, conclusion: 'failure' }]);
    await expect(waitForAssessment(args)).rejects.toThrow('assessment failed');
    expect(args.wait).toHaveBeenCalledTimes(1);
  });

  test('rejects changed metadata, stale heads, and stale trusted base snapshots', async () => {
    const args = fixture();
    args.github.rest.pulls.get
      .mockResolvedValueOnce({ data: args.pull })
      .mockResolvedValueOnce({ data: { ...args.pull, body: '' } });
    await expect(waitForAssessment(args)).rejects.toThrow('metadata changed');
    await expect(waitForAssessment({ ...fixture(), trustedBaseSha: 'old-base' })).rejects.toThrow('head/base');
    const stale = fixture();
    stale.context.payload.pull_request.head.sha = 'old-head';
    await expect(waitForAssessment(stale)).rejects.toThrow('head/base');
  });

  test('the native required gate is read-only and startup failures cannot leave the custom assessment as its gate', () => {
    const workflow = readFileSync(join(__dirname, '../../../.github/workflows/pr-risk-gate.yml'), 'utf8');
    expect(workflow).toContain('pull_request:');
    expect(workflow).toContain('name: PR risk policy');
    expect(workflow).toContain('checks: read');
    expect(workflow).not.toContain('write');
    expect(workflow).not.toContain('secrets.');
    expect(workflow).toContain(
      'group: pr-risk-gate-${{ github.event.pull_request.number }}-${{ github.event.pull_request.head.sha }}',
    );
    expect(workflow).toContain('ref: ${{ steps.snapshot.outputs.base-sha }}');
  });
});
