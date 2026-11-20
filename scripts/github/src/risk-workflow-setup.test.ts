/* eslint-disable @typescript-eslint/naming-convention -- GitHub REST API fixtures use upstream field names. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

const workflow = readFileSync(join(__dirname, '../../../.github/workflows/pr-housekeeping.yml'), 'utf8');
const scripts = Array.from(workflow.matchAll(/^ {10}script: \|\n((?: {12}[^\n]*\n?)+)/gm), match =>
  match[1].replace(/^ {12}/gm, ''),
);
const job = (name: string) => {
  const start = workflow.indexOf(`\n  ${name}:\n`);
  const next = workflow.slice(start + 1).search(/\n {2}[a-z]+:\n/);
  return workflow.slice(start, next < 0 ? undefined : start + 1 + next);
};
const context = (headSha: string) => ({
  repo: { owner: 'microsoft', repo: 'fluentui' },
  issue: { number: 123 },
  payload: { pull_request: { head: { sha: headSha } } },
});

describe('trusted risk workflow setup', () => {
  test('starts the check before all fallible setup and checks out only trusted base code', () => {
    expect(scripts).toHaveLength(3);
    expect(workflow.indexOf('id: start')).toBeLessThan(workflow.indexOf('uses: actions/checkout'));
    expect(workflow).toContain('ref: ${{ steps.start.outputs.base-sha }}');
    expect(workflow).toContain('persist-credentials: false');
    expect(workflow).not.toContain('github.event.pull_request.head.ref');
    // The finalizer must not overwrite a check the classifier already completed.
    expect(workflow).toContain(
      "always() && steps.start.outputs.check-id != '' && steps.classify.outputs.check-completed != 'true'",
    );
  });

  test('grants each job only the permissions it needs', () => {
    expect(workflow).toContain('\npermissions: {}\n');
    expect(job('label')).not.toMatch(/id-token|checks:/);
    expect(job('assess')).toContain('id-token: write');
    expect(workflow).not.toMatch(/\n {2}[a-z]+:\n(?:(?! {2}[a-z]).*\n)*? {4}needs:/);
  });

  test('area labels do not depend on the risk pilot', () => {
    expect(job('label')).toContain('uses: actions/labeler');
    expect(job('label')).not.toContain('needs:');
  });

  test('the model configuration comes from repository settings only', () => {
    for (const name of ['API', 'ENDPOINT', 'DEPLOYMENT', 'ID', 'AZURE_CLIENT_ID']) {
      expect(workflow).toContain(`RISK_MODEL_${name}: \${{ vars.RISK_MODEL_${name} }}`);
    }
  });

  test('serializes label writers across PR heads without cancelling the active writer', () => {
    expect(workflow).toContain('group: pr-housekeeping-${{ github.event.pull_request.number }}\n');
    expect(workflow).toContain('cancel-in-progress: false');
    expect(workflow).not.toContain('cancel-in-progress: true');
  });

  test('an obsolete queued head exits before creating a check', async () => {
    const github = {
      rest: {
        pulls: { get: jest.fn().mockResolvedValue({ data: { head: { sha: 'current-head' } } }) },
        checks: { create: jest.fn() },
      },
    };
    const core = { notice: jest.fn(), setOutput: jest.fn() };
    await runInNewContext(`(async () => { ${scripts[0]} })()`, { github, context: context('obsolete-head'), core });
    expect(core.notice).toHaveBeenCalledWith(expect.stringContaining('Superseded PR head'));
    expect(core.setOutput).not.toHaveBeenCalled();
    expect(github.rest.checks.create).not.toHaveBeenCalled();
  });

  test('a same-head edit followed by setup failure replaces an old passing check with failure', async () => {
    const checks: Record<string, unknown>[] = [{ id: 1, head_sha: 'unchanged-head', conclusion: 'success' }];
    const outputs: Record<string, string> = {};
    const github = {
      rest: {
        pulls: {
          get: jest.fn().mockResolvedValue({ data: { head: { sha: 'unchanged-head' }, base: { sha: 'live-base' } } }),
        },
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
    const core = {
      setOutput: (key: string, value: string) => {
        outputs[key] = value;
      },
    };
    await runInNewContext(`(async () => { ${scripts[0]} })()`, { github, context: context('unchanged-head'), core });
    expect(checks[1]).toMatchObject({ head_sha: 'unchanged-head', status: 'in_progress' });
    expect(outputs).toEqual({ 'check-id': '2', 'head-sha': 'unchanged-head', 'base-sha': 'live-base' });
    // Checkout fails, so the classifier never runs; the always() finalizer still must run.
    await runInNewContext(`(async () => { ${scripts[2]} })()`, {
      github,
      context: context('unchanged-head'),
      process: { env: { RISK_CHECK_ID: outputs['check-id'] } },
    });
    expect(checks[1]).toMatchObject({ check_run_id: 2, status: 'completed', conclusion: 'failure' });
  });
});
