/* eslint-disable @typescript-eslint/naming-convention -- GitHub REST API fixtures use upstream field names. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

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
    expect(workflow).toContain('ref: ${{ github.event.pull_request.base.sha }}');
    expect(workflow).toContain('persist-credentials: false');
  });

  test('a same-head edit followed by setup failure replaces an old passing check with failure', async () => {
    const checks: Record<string, unknown>[] = [{ id: 1, head_sha: 'unchanged-head', conclusion: 'success' }];
    const outputs: Record<string, string> = {};
    const github = {
      rest: {
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
      payload: { pull_request: { head: { sha: 'unchanged-head' }, body: 'Review focus removed' } },
    };
    const core = {
      setOutput: (key: string, value: string) => {
        outputs[key] = value;
      },
    };
    await runInNewContext(`(async () => { ${scripts[0]} })()`, { github, context, core });
    expect(checks[1]).toMatchObject({ head_sha: 'unchanged-head', status: 'in_progress' });
    // Checkout/labeler fails, so the classifier never runs; the always() finalizer still must run.
    await runInNewContext(`(async () => { ${scripts[2]} })()`, {
      github,
      context,
      process: { env: { RISK_POLICY_CHECK_ID: outputs['check-id'] } },
    });
    expect(checks[1]).toMatchObject({ check_run_id: 2, status: 'completed', conclusion: 'failure' });
  });
});
