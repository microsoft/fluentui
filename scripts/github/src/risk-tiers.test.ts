/* eslint-disable @typescript-eslint/naming-convention -- GitHub REST API fixtures use upstream field names. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { revisionKey } from './risk-policy';
import type { ChangedFile } from './risk-tiers';
import { classifyRisk, hasReviewFocus, tierLabels } from './risk-tiers';

const rules = JSON.parse(readFileSync(join(__dirname, '../../../.github/risk-tiers.json'), 'utf8'));
const runWorkflow = require('./risk-tiers-workflow');

const source = 'packages/react-components/react-button/library/src/Button.tsx';
const story = 'packages/react-components/react-button/stories/Button.stories.tsx';
const pull = { author: 'contributor', title: 'fix(button): correct behavior' };
const file = (filename: string, additions = 1, deletions = 0, previousFilename?: string) => ({
  filename,
  status: 'modified',
  additions,
  deletions,
  previous_filename: previousFilename,
  patch: '@@ -1 +1 @@\n-old\n+new',
});
const tier = (files: ChangedFile[], metadata = pull) => classifyRisk(files, metadata).tier;

describe('risk classification', () => {
  test('keeps the positive trivial allowlist small and excludes broad Markdown matches', () => {
    const globs: string[] = rules['Risk: trivial'][0]['changed-files'][0]['any-glob-to-all-files'];
    expect(globs).toHaveLength(1);
    expect(globs[0].split(',').length).toBeLessThanOrEqual(15);
    expect(globs.every(glob => !glob.startsWith('!') && glob !== '**/*.md')).toBe(true);
  });

  test('matches the union of story and documentation paths across packages', () => {
    expect(
      tier([
        file(story),
        file('packages/react/README.md'),
        file('packages/react-components/react-input/library/docs/Usage.md'),
      ]),
    ).toBe(0);
  });

  test.each([
    'change/react-button-example.json',
    'apps/public-docsite-v9/README.md',
    'packages/react-components/react-button/unknown.ts',
    'packages/react-components/react-button/library/src/Button.tsx',
  ])('does not ignore mixed nontrivial changes: %s', path => {
    expect(tier([file(story), file(path)])).toBe(2);
  });

  test.each([
    'packages/react-components/react-button/etc/react-button.api.md',
    'packages/react-components/react-button/package.json',
    'package.json',
    '.github/risk-tiers.json',
    '.github/workflows/pr.yml',
    '.devops/release.yml',
    'scripts/github/risk-tiers.js',
    'tools/workspace-plugin/index.ts',
    'yarn.lock',
    'nx.json',
    'beachball.config.js',
    'packages/react-components/react-theme/library/src/theme.ts',
    'packages/tokens/src/index.ts',
    'packages/react-components/react-utilities/library/src/index.ts',
    'packages/react-components/react-shared-contexts/library/src/index.ts',
    'AGENTS.md',
    'CLAUDE.md',
    '.agents/skills/example/SKILL.md',
    'packages/react-components/react-button/stories/SKILL.md',
    'packages/react-components/react-button/stories/AGENTS.md',
    'packages/react-components/react-button/library/docs/CLAUDE.md',
    'packages/react-components/react-button/stories/.agents/rules.md',
    'packages/react-components/react-button/stories/.hidden/AGENTS.md',
    'packages/react-components/react-button/library/src/.hidden/package.json',
    'packages/react-components/react-utilities/.swcrc',
    'packages/react-components/react-utilities/library/src/foo/.internal.ts',
    'packages/react-components/react-theme/.hidden/theme.test.ts',
    'packages/.hidden/react-theme/library/src/theme.ts',
    '.github/workflows/.hidden/file.yml',
    'packages/react-components/react-button/stories/AGENTS.override.md',
    'packages/react-components/react-button/library/docs/review.instructions.md',
  ])('protected paths override trivial and low rules: %s', path => {
    expect(tier([file(path)])).toBe(3);
    expect(tier([file(story), file(path)])).toBe(3);
  });

  test('checks both sides of renames', () => {
    expect(tier([file(story, 0, 0, 'AGENTS.md')])).toBe(3);
    expect(tier([file('AGENTS.md', 0, 0, story)])).toBe(3);
    expect(tier([file(story, 0, 0, source)])).toBe(2);
    expect(tier([file(source, 1, 0, 'packages/react-components/react-input/library/src/Input.tsx')])).toBe(2);
    expect(tier([file(story, 0, 0, 'packages/react-components/react-button/stories/AGENTS.override.md')])).toBe(3);
    expect(tier([file('packages/react-components/react-button/stories/AGENTS.override.md', 0, 0, story)])).toBe(3);
  });

  test.each([
    'packages/react-components/react-button/library/src/Button.test.tsx',
    'packages/react-components/react-button/library/src/Button.spec.ts',
    'packages/react-components/react-button/stories/Button.test.tsx',
    'packages/react-components/react-button/stories/__snapshots__/Button.snap',
    'packages/react-components/react-button/library/docs/example.snap',
    'packages/react-components/react-button/stories/__snapshots__/Button.png',
  ])('tests and snapshots require tier 1 human review: %s', path => {
    expect(tier([file(path, 500)])).toBe(1);
  });

  test('counts added plus deleted lines, not net changes', () => {
    expect(tier([file(source, 25, 25)])).toBe(1);
    expect(tier([file(source, 26, 25)])).toBe(2);
    expect(tier([file(source, 25), file(source.replace('Button.tsx', 'useButton.ts'), 25)])).toBe(1);
    expect(tier([file(source, 25), file(source.replace('Button.tsx', 'useButton.ts'), 26)])).toBe(2);
  });

  test('requires a fix claim and one package source root', () => {
    expect(tier([file(source)], { ...pull, title: 'feat(button): new feature' })).toBe(2);
    expect(tier([file(source)], { ...pull, title: 'fix!: breaking change' })).toBe(2);
    expect(tier([file(source), file(source.replace('react-button', 'react-input'))])).toBe(2);
    expect(tier([file(source), file('change/react-button.json')])).toBe(2);
    expect(tier([{ ...file(source), patch: undefined }])).toBe(2);
    expect(tier([{ ...file(source), patch: '' }])).toBe(2);
    expect(tier([file(source.replace('Button.tsx', '__snapshots__/helper.ts'), 51)])).toBe(2);
  });

  test('Dependabot cannot use either fast lane', () => {
    const dependabot = { ...pull, author: 'dependabot[bot]' };
    expect(tier([file(story)], dependabot)).toBe(2);
    expect(tier([file(source)], dependabot)).toBe(2);
    expect(tier([file('package.json')], dependabot)).toBe(3);
  });

  test('fails explicitly on empty or invalid file metadata', () => {
    expect(() => tier([])).toThrow('empty');
    expect(() => tier([file(source, -1)])).toThrow('metadata');
    expect(() => tier([file(source, Number.NaN)])).toThrow('metadata');
  });

  test('review focus must be actual prose, not a template comment or code sample', () => {
    expect(hasReviewFocus('Review focus: Check the API compatibility.')).toBe(true);
    expect(hasReviewFocus('Review focus: x')).toBe(true);
    expect(hasReviewFocus('**Review focus:** Check keyboard navigation.')).toBe(true);
    expect(hasReviewFocus('<!-- Review focus: placeholder -->')).toBe(false);
    expect(hasReviewFocus('```\nReview focus: example\n```')).toBe(false);
    expect(hasReviewFocus('Review focus:  ')).toBe(false);
    expect(hasReviewFocus('Review focus:\n\n## Related issues')).toBe(false);
    expect(hasReviewFocus(null)).toBe(false);
  });
});

function workflowFixture(paths = [file(source)]) {
  const data = {
    head: { sha: 'head-sha' },
    base: { sha: 'base-sha', ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
    user: { login: pull.author },
    title: pull.title,
    body: 'Review focus: Confirm the intended behavior.',
    changed_files: paths.length,
    labels: tierLabels.map(name => ({ name })).concat([{ name: 'CI' }]),
  };
  const github = {
    rest: {
      pulls: {
        get: jest.fn().mockImplementation(params =>
          Promise.resolve({
            data: params.mediaType?.format === 'diff' ? 'diff --git a/example b/example\n+change' : data,
          }),
        ),
        listFiles: jest.fn(),
      },
      issues: { addLabels: jest.fn(), removeLabel: jest.fn() },
      checks: { create: jest.fn().mockResolvedValue({ data: { id: 456 } }), update: jest.fn() },
    },
    paginate: jest.fn().mockResolvedValue(paths),
  };
  const core = {
    summary: { addRaw: jest.fn().mockReturnThis(), write: jest.fn() },
    setFailed: jest.fn(),
  };
  return {
    data,
    github,
    core,
    assessRisk: jest.fn().mockResolvedValue({
      tier: 0,
      model: 'microsoft-decision-1',
      confidence: 0.9,
      inputTokens: 100,
      outputTokens: 1,
    }),
    context: { repo: { owner: 'microsoft', repo: 'fluentui' }, issue: { number: 123 } },
  };
}

describe('risk workflow', () => {
  test('paginates, reconciles only risk labels, and certifies the exact head SHA', async () => {
    const args = workflowFixture();
    await runWorkflow(args);
    expect(args.github.paginate).toHaveBeenCalledWith(
      args.github.rest.pulls.listFiles,
      expect.objectContaining({ per_page: 100 }),
    );
    expect(args.github.rest.issues.addLabels).toHaveBeenCalledWith(expect.objectContaining({ labels: ['Risk: low'] }));
    expect(args.github.rest.issues.removeLabel.mock.calls.map(([arg]) => arg.name)).toEqual([
      'Risk: trivial',
      'Risk: standard',
      'Risk: high',
    ]);
    expect(args.github.rest.checks.create).toHaveBeenCalledWith(
      expect.objectContaining({ head_sha: 'head-sha', name: 'PR risk assessment', status: 'in_progress' }),
    );
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(
      expect.objectContaining({ check_run_id: 456, conclusion: 'success' }),
    );
  });

  test('requires review focus for tiers 2 and 3, but not tiers 0 and 1', async () => {
    for (const [path, conclusion] of [
      [story, 'success'],
      [source, 'success'],
      ['apps/example/index.ts', 'failure'],
      ['AGENTS.md', 'failure'],
    ]) {
      const args = workflowFixture([file(path)]);
      args.data.body = '';
      await runWorkflow(args);
      expect(args.github.rest.checks.update).toHaveBeenCalledWith(expect.objectContaining({ conclusion }));
      expect(args.core.setFailed).toHaveBeenCalledTimes(conclusion === 'failure' ? 1 : 0);
    }
  });

  test('refuses truncated listings, including the GitHub file limit', async () => {
    for (const count of [2, 3000]) {
      const args = workflowFixture();
      args.data.changed_files = count;
      if (count === 3000) {
        args.github.paginate.mockResolvedValue(Array.from({ length: count }, () => file(source)));
      }
      await expect(runWorkflow(args)).rejects.toThrow('complete diff');
      expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
      expect(args.github.rest.checks.update).toHaveBeenCalledWith(expect.objectContaining({ conclusion: 'failure' }));
    }
  });

  test.each(['head', 'body', 'title'])('does not certify concurrent changes to %s', async key => {
    const args = workflowFixture();
    args.github.rest.pulls.get
      .mockResolvedValueOnce({ data: args.data })
      .mockResolvedValueOnce({ data: 'diff --git a/example b/example\n+change' })
      .mockResolvedValueOnce({ data: { ...args.data, [key]: key === 'head' ? { sha: 'new-head' } : 'edited' } });
    await expect(runWorkflow(args)).rejects.toThrow('changed during classification');
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(expect.objectContaining({ conclusion: 'failure' }));
  });

  test.each([
    { sha: 'new-base', ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
    { sha: 'base-sha', ref: 'release', repo: { full_name: 'microsoft/fluentui' } },
    { sha: 'base-sha', ref: 'master', repo: { full_name: 'other/fluentui' } },
  ])('does not certify a changed PR base: %j', async base => {
    const args = workflowFixture();
    args.github.rest.pulls.get
      .mockResolvedValueOnce({ data: args.data })
      .mockResolvedValueOnce({ data: 'diff --git a/example b/example\n+change' })
      .mockResolvedValueOnce({ data: { ...args.data, base } });
    await expect(runWorkflow(args)).rejects.toThrow('changed during classification');
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
  });

  test('updates the bootstrap check rather than creating a second check', async () => {
    const args = workflowFixture();
    await runWorkflow({
      ...args,
      checkRun: {
        id: 789,
        headSha: 'head-sha',
        baseSha: 'base-sha',
        identity: revisionKey(args.data),
      },
    });
    expect(args.github.rest.checks.create).not.toHaveBeenCalled();
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(
      expect.objectContaining({ check_run_id: 789, conclusion: 'success' }),
    );
  });

  test('rejects stale workflow events before calling the provider or changing labels', async () => {
    const args = workflowFixture();
    await expect(
      runWorkflow({
        ...args,
        checkRun: {
          id: 789,
          headSha: 'head-sha',
          baseSha: 'old-base',
          identity: revisionKey(args.data),
        },
      }),
    ).rejects.toThrow('trusted workflow revision');
    expect(args.assessRisk).not.toHaveBeenCalled();
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(
      expect.objectContaining({ check_run_id: 789, conclusion: 'failure' }),
    );
  });

  test('does not remove labels or report success if adding the new label fails', async () => {
    const args = workflowFixture();
    args.github.rest.issues.addLabels.mockRejectedValue(new Error('API unavailable'));
    await expect(runWorkflow(args)).rejects.toThrow('API unavailable');
    expect(args.github.rest.issues.removeLabel).not.toHaveBeenCalled();
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(expect.objectContaining({ conclusion: 'failure' }));
  });

  test('keeps API failures visible as failed policy checks', async () => {
    const args = workflowFixture();
    args.github.paginate.mockRejectedValue(new Error('API unavailable'));
    await expect(runWorkflow(args)).rejects.toThrow('API unavailable');
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(expect.objectContaining({ conclusion: 'failure' }));
  });

  test('the model can escalate, but never downgrade, the deterministic result', async () => {
    const args = workflowFixture([file(story)]);
    args.assessRisk.mockResolvedValue({
      tier: 3,
      model: 'microsoft-decision-1',
      confidence: 0.7,
      inputTokens: 100,
      outputTokens: 1,
    });
    await runWorkflow(args);
    expect(args.github.rest.issues.addLabels).toHaveBeenCalledWith(expect.objectContaining({ labels: ['Risk: high'] }));
    expect(args.assessRisk).toHaveBeenCalledWith(
      expect.objectContaining({ deterministic: expect.objectContaining({ tier: 0 }) }),
    );

    const standard = workflowFixture([file('apps/example/index.ts')]);
    await runWorkflow(standard);
    expect(standard.github.rest.issues.addLabels).toHaveBeenCalledWith(
      expect.objectContaining({ labels: ['Risk: standard'] }),
    );
  });

  test('deterministic high risk needs no provider call', async () => {
    const args = workflowFixture([file('AGENTS.md')]);
    await runWorkflow(args);
    expect(args.assessRisk).not.toHaveBeenCalled();
    expect(args.github.rest.pulls.get).toHaveBeenCalledTimes(2);
  });

  test('model failures do not silently fall back to deterministic fast-lane labels', async () => {
    const args = workflowFixture([file(story)]);
    args.assessRisk.mockRejectedValue(new Error('Decision unavailable'));
    await expect(runWorkflow(args)).rejects.toThrow('Decision unavailable');
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(expect.objectContaining({ conclusion: 'failure' }));
  });

  test('unavailable patches cannot enter the fast lane even if the model selects trivial', async () => {
    const args = workflowFixture([{ ...file(story), patch: '' }]);
    await runWorkflow(args);
    expect(args.github.rest.issues.addLabels).toHaveBeenCalledWith(
      expect.objectContaining({ labels: ['Risk: standard'] }),
    );
  });

  test('renamed binaries with unavailable patches cannot bypass the standard floor', async () => {
    const args = workflowFixture([
      {
        ...file(
          'packages/react-components/react-button/stories/after.png',
          0,
          0,
          'packages/react-components/react-button/stories/before.png',
        ),
        status: 'renamed',
        patch: '',
      },
    ]);
    args.github.rest.pulls.get.mockImplementation(params =>
      Promise.resolve({
        data:
          params.mediaType?.format === 'diff'
            ? 'diff --git a/before.png b/after.png\nsimilarity index 90%\nBinary files a/before.png and b/after.png differ\n'
            : args.data,
      }),
    );
    await runWorkflow(args);
    expect(args.github.rest.issues.addLabels).toHaveBeenCalledWith(
      expect.objectContaining({ labels: ['Risk: standard'] }),
    );
  });

  test.each([0, 1, 2].flatMap(floor => [0, 1, 2, 3].map(suggestion => [floor, suggestion])))(
    'enforces deterministic floor %i against model tier %i',
    async (floor, suggestion) => {
      const args = workflowFixture([file([story, source, 'apps/example/index.ts'][floor])]);
      args.assessRisk.mockResolvedValue({
        tier: suggestion,
        model: 'microsoft-decision-1',
        confidence: 0.9,
        inputTokens: 100,
        outputTokens: 1,
      });
      await runWorkflow(args);
      expect(args.github.rest.issues.addLabels).toHaveBeenCalledWith(
        expect.objectContaining({ labels: [tierLabels[Math.max(floor, suggestion)]] }),
      );
    },
  );

  test('model escalation also escalates the required human review focus', async () => {
    const args = workflowFixture([file(story)]);
    args.data.body = '';
    args.assessRisk.mockResolvedValue({
      tier: 2,
      model: 'microsoft-decision-1',
      confidence: 0.9,
      inputTokens: 100,
      outputTokens: 1,
    });
    await runWorkflow(args);
    expect(args.core.setFailed).toHaveBeenCalledTimes(1);
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(expect.objectContaining({ conclusion: 'failure' }));
  });
});
