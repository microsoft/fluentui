/* eslint-disable @typescript-eslint/naming-convention -- GitHub REST API fixtures use upstream field names. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

import { revisionKey } from './risk-policy';

const workflow = readFileSync(join(__dirname, '../../../.github/workflows/pr-housekeeping.yml'), 'utf8');
const scripts = Array.from(workflow.matchAll(/^ {10}script: \|\n((?: {12}[^\n]*\n?)+)/gm), match =>
  match[1].replace(/^ {12}/gm, ''),
);

describe('trusted risk workflow setup', () => {
  test('invalidates before all fallible setup and has only one risk-label writer', () => {
    expect(scripts).toHaveLength(3);
    expect(workflow.indexOf('id: policy')).toBeLessThan(workflow.indexOf('uses: actions/labeler'));
    expect(workflow.indexOf('id: policy')).toBeLessThan(workflow.indexOf('uses: actions/checkout'));
    expect(workflow).not.toContain('configuration-path: .github/risk-tiers.json');
    expect(workflow).toContain(
      "always() && steps.policy.outputs.check-id != '' && steps.classify.outcome != 'success'",
    );
    expect(workflow).toContain('ref: ${{ steps.policy.outputs.base-sha }}');
    expect(workflow).toContain('persist-credentials: false');
  });

  test('serializes label writers across PR heads without cancelling the active writer', () => {
    expect(workflow).toContain('group: pr-housekeeping-${{ github.event.pull_request.number }}\n');
    expect(workflow).toContain('cancel-in-progress: false');
    expect(workflow).not.toContain('cancel-in-progress: true');
    expect(workflow).not.toContain(
      'group: pr-housekeeping-${{ github.event.pull_request.number }}-${{ github.event.pull_request.head.sha }}',
    );
  });

  test('an obsolete queued head exits before creating an assessment or publishing labels', async () => {
    const github = {
      rest: {
        pulls: { get: jest.fn().mockResolvedValue({ data: { head: { sha: 'current-head' } } }) },
        checks: { create: jest.fn() },
      },
    };
    const core = { notice: jest.fn(), setOutput: jest.fn() };
    const context = {
      repo: { owner: 'microsoft', repo: 'fluentui' },
      issue: { number: 123 },
      payload: { pull_request: { head: { sha: 'obsolete-head' } } },
    };
    await runInNewContext(`(async () => { ${scripts[0]} })()`, { github, context, core, require });
    expect(core.notice).toHaveBeenCalledWith(expect.stringContaining('Superseded PR head'));
    expect(core.setOutput).not.toHaveBeenCalled();
    expect(github.rest.checks.create).not.toHaveBeenCalled();
  });

  test('a same-head edit followed by setup failure replaces an old passing check with failure', async () => {
    const checks: Record<string, unknown>[] = [{ id: 1, head_sha: 'unchanged-head', conclusion: 'success' }];
    const outputs: Record<string, string> = {};
    const github = {
      rest: {
        pulls: { get: jest.fn() },
        checks: {
          create: jest.fn(async check => {
            const data = { ...check, id: 2 };
            checks.push(data);
            return { data };
          }),
          update: jest.fn(async update => Object.assign(checks[1], update)),
        },
      },
    };
    const context = {
      repo: { owner: 'microsoft', repo: 'fluentui' },
      issue: { number: 123 },
      payload: { pull_request: { head: { sha: 'unchanged-head' } } },
    };
    const pull = {
      head: { sha: 'unchanged-head' },
      base: { sha: 'live-base', ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
      title: 'Current title',
      body: 'Review focus removed',
    };
    github.rest.pulls.get.mockResolvedValue({ data: pull });
    const core = {
      setOutput: (key: string, value: string) => {
        outputs[key] = value;
      },
    };
    await runInNewContext(`(async () => { ${scripts[0]} })()`, { github, context, core, require });
    expect(checks[1]).toMatchObject({ head_sha: 'unchanged-head', status: 'in_progress' });
    expect(outputs['base-sha']).toBe('live-base');
    expect(outputs.identity).toBe(revisionKey(pull));
    // Checkout/labeler fails, so the classifier never runs; the always() finalizer still must run.
    await runInNewContext(`(async () => { ${scripts[2]} })()`, {
      github,
      context,
      process: { env: { RISK_POLICY_CHECK_ID: outputs['check-id'] } },
    });
    expect(checks[1]).toMatchObject({ check_run_id: 2, status: 'completed', conclusion: 'failure' });
  });
});
