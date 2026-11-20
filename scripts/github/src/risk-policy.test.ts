/* eslint-disable @typescript-eslint/naming-convention -- GitHub REST API fixtures use upstream field names. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { revisionKey } from './risk-policy';

const { waitForAssessment } = require('./risk-policy');

const workflowPath = '.github/workflows/pr-housekeeping.yml';

function fixture() {
  const pull = {
    head: { sha: 'head' },
    base: { sha: 'base', ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
    title: 'Title',
    body: 'Review focus: API compatibility',
  };
  const workflow = { id: 7, path: workflowPath, state: 'active' };
  const run = {
    id: 10,
    workflow_id: workflow.id,
    path: workflowPath,
    event: 'pull_request_target',
    repository: { full_name: 'microsoft/fluentui' },
    head_sha: 'head',
    display_title: 'PR risk assessment #123',
    run_attempt: 2,
    status: 'completed',
    conclusion: 'success',
  };
  const job = {
    id: 20,
    run_id: run.id,
    run_attempt: run.run_attempt,
    name: `Assess PR #123 revision ${revisionKey(pull)}`,
    status: 'completed',
    conclusion: 'success',
  };
  return {
    pull,
    workflow,
    run,
    job,
    github: {
      rest: {
        pulls: { get: jest.fn().mockResolvedValue({ data: pull }) },
        actions: {
          getWorkflow: jest.fn().mockResolvedValue({ data: workflow }),
          listWorkflowRuns: jest.fn().mockResolvedValue({ data: { workflow_runs: [run] } }),
          listJobsForWorkflowRun: jest.fn(),
          getWorkflowRun: jest.fn().mockResolvedValue({ data: run }),
        },
      },
      paginate: jest.fn().mockResolvedValue([job]),
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

describe('read-only workflow-provenance risk gate', () => {
  test('requires a successful native job in the trusted target workflow and latest attempt', async () => {
    const args = fixture();
    await expect(waitForAssessment(args)).resolves.toBeUndefined();
    expect(args.wait).not.toHaveBeenCalled();
    expect(args.github.rest.actions.listWorkflowRuns).toHaveBeenCalledWith(
      expect.objectContaining({ workflow_id: 7, head_sha: 'head', event: 'pull_request_target' }),
    );
    expect(args.github.paginate).toHaveBeenCalledWith(
      args.github.rest.actions.listJobsForWorkflowRun,
      expect.objectContaining({ run_id: 10, filter: 'latest' }),
    );
    expect(args.github.rest.actions.getWorkflowRun).toHaveBeenCalled();
  });

  test.each(['pending', 'old-metadata', 'skipped-job'])('does not accept %s as current certification', async mode => {
    const args = fixture();
    if (mode === 'pending') {
      args.run.status = 'in_progress';
    } else if (mode === 'old-metadata') {
      args.job.name = 'Assess PR #123 revision old';
    } else {
      args.job.conclusion = 'skipped';
    }
    await expect(waitForAssessment(args)).rejects.toThrow('deadline');
    expect(args.wait).toHaveBeenCalledTimes(30);
  });

  test('does not use an older success while the newest trusted run is pending or failed', async () => {
    const args = fixture();
    args.github.rest.actions.listWorkflowRuns
      .mockResolvedValueOnce({
        data: { workflow_runs: [args.run, { ...args.run, id: 11, status: 'in_progress' }] },
      })
      .mockResolvedValueOnce({
        data: { workflow_runs: [args.run, { ...args.run, id: 11, conclusion: 'failure' }] },
      });
    await expect(waitForAssessment(args)).rejects.toThrow('assessment failed');
    expect(args.wait).toHaveBeenCalledTimes(1);
  });

  test.each([
    { event: 'pull_request' },
    { event: 'workflow_dispatch' },
    { workflow_id: 99 },
    { path: '.github/workflows/forged.yml' },
    { repository: { full_name: 'attacker/fluentui' } },
    { head_sha: 'other-head' },
    { display_title: 'PR risk assessment #456' },
  ])('rejects a successful run with untrusted provenance: %j', async change => {
    const args = fixture();
    Object.assign(args.run, change);
    await expect(waitForAssessment(args)).rejects.toThrow('deadline');
    expect(args.github.paginate).not.toHaveBeenCalled();
  });

  test.each([{ run_id: 99 }, { run_attempt: 1 }, { name: 'Assess PR #456 revision other' }])(
    'rejects a job outside the expected PR/revision/run attempt: %j',
    async change => {
      const args = fixture();
      Object.assign(args.job, change);
      await expect(waitForAssessment(args)).rejects.toThrow('deadline');
    },
  );

  test('a forged successful custom check cannot certify a PR without a trusted workflow run', async () => {
    const args = fixture();
    const forgedChecks = {
      listForRef: jest.fn().mockResolvedValue({
        data: {
          check_runs: [
            {
              name: 'PR risk assessment',
              app: { slug: 'github-actions' },
              external_id: revisionKey(args.pull),
              status: 'completed',
              conclusion: 'success',
            },
          ],
        },
      }),
    };
    const github = { ...args.github, rest: { ...args.github.rest, checks: forgedChecks } };
    args.github.rest.actions.listWorkflowRuns.mockResolvedValue({ data: { workflow_runs: [] } });
    await expect(waitForAssessment({ ...args, github })).rejects.toThrow('deadline');
    expect(forgedChecks.listForRef).not.toHaveBeenCalled();
  });

  test.each(['disabled_manually', 'wrong-path'])('rejects an unavailable producer workflow: %s', async mode => {
    const args = fixture();
    if (mode === 'wrong-path') {
      args.workflow.path = '.github/workflows/forged.yml';
    } else {
      args.workflow.state = mode;
    }
    await expect(waitForAssessment(args)).rejects.toThrow('workflow is unavailable');
  });

  test.each(['rerun', 'cancelled', 'metadata'])('rejects a race during final verification: %s', async mode => {
    const args = fixture();
    args.github.rest.actions.getWorkflowRun.mockResolvedValue({
      data: {
        ...args.run,
        run_attempt: mode === 'rerun' ? 3 : 2,
        conclusion: mode === 'cancelled' ? 'cancelled' : 'success',
      },
    });
    if (mode === 'metadata') {
      args.github.rest.pulls.get
        .mockResolvedValueOnce({ data: args.pull })
        .mockResolvedValueOnce({ data: args.pull })
        .mockResolvedValueOnce({ data: { ...args.pull, title: 'Edited' } });
    }
    await expect(waitForAssessment(args)).rejects.toThrow('changed during verification');
  });

  test('surfaces Actions API failures rather than accepting a successful custom check', async () => {
    const args = fixture();
    args.github.rest.actions.listWorkflowRuns.mockRejectedValue(new Error('Actions API unavailable'));
    await expect(waitForAssessment(args)).rejects.toThrow('Actions API unavailable');
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

  test('the gate is read-only and explicitly requires trusted-workflow identity enforcement', () => {
    const workflow = readFileSync(join(__dirname, '../../../.github/workflows/pr-risk-gate.yml'), 'utf8');
    expect(workflow).toContain('pull_request:');
    expect(workflow).toContain('name: PR risk policy');
    expect(workflow).toContain('actions: read');
    expect(workflow).not.toContain('checks:');
    expect(workflow).not.toContain('write');
    expect(workflow).not.toContain('secrets.');
    expect(workflow).toContain(
      'group: pr-risk-gate-${{ github.event.pull_request.number }}-${{ github.event.pull_request.head.sha }}',
    );
    expect(workflow).toContain('ref: ${{ steps.snapshot.outputs.base-sha }}');
    expect(workflow).toContain('trusted source/ref in an organization workflow ruleset');
  });
});
