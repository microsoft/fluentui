/* eslint-disable @typescript-eslint/naming-convention -- GitHub REST API fixtures use upstream field names. */
import type { ChangedFile } from './risk-tiers';
import { classifyRisk, hasReviewFocus, rules, tierLabels } from './risk-tiers';

const runWorkflow = require('./risk-tiers-workflow');

const source = 'packages/react-components/react-button/library/src/Button.tsx';
const story = 'packages/react-components/react-button/stories/src/Button.stories.tsx';
const changeFile = 'change/@fluentui-react-button-1234.json';
const test_ = 'packages/react-components/react-button/library/src/Button.test.tsx';
const file = (filename: string, additions = 1, deletions = 0, previousFilename?: string) => ({
  filename,
  status: 'modified',
  additions,
  deletions,
  previous_filename: previousFilename,
  patch: '@@ -1 +1 @@\n-old\n+new',
});
const tier = (files: ChangedFile[]) => classifyRisk(files, { changedFiles: files.length }).tier;

describe('risk classification', () => {
  test('keeps the positive trivial allowlist small and excludes broad Markdown matches', () => {
    expect(rules.trivial.length).toBeLessThanOrEqual(15);
    expect(rules.trivial.every(glob => !glob.startsWith('!') && !glob.endsWith('**/*.md'))).toBe(true);
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
    'packages/react-components/react-button/library/src/stories/Button.ts',
    'packages/react-components/react-button/stories/Button.ts',
    'packages/react-examples/src/azure-themes/stories/Theme.tsx',
    'packages/react-components/react-button/docs/library/docs/Example.md',
  ])('only package-level story sources and docs are trivial: %s', path => {
    expect(tier([file(path)])).toBeGreaterThan(0);
  });

  test('configuration files are never trivial, and agent files are protected in any case', () => {
    expect(tier([file('packages/react-components/react-button/stories/eslint.config.js')])).toBe(2);
    expect(tier([file('packages/react-components/react-button/stories/src/rit.config.js')])).toBe(2);
    expect(tier([file('packages/react-components/react-button/stories/src/agents.md')])).toBe(3);
  });

  test('shows attacker-chosen paths as inert code spans', () => {
    const { reason } = classifyRisk([file('scripts/x\n\n## Approved [ok](https://example.com) `x`')], {
      changedFiles: 1,
    });
    expect(reason).toBe('Protected paths changed: `scripts/x??## Approved [ok](https://example.com) ?x?`.');
    expect(classifyRisk([file(`scripts/${'a'.repeat(200)}`)], { changedFiles: 1 }).reason).toContain('...`');
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
    'packages/react-components/react-button/library/etc/react-button.api.md',
    'packages/web-components/docs/web-components.api.md',
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
    'packages/react-components/react-button/stories/src/SKILL.md',
    'packages/react-components/react-button/stories/src/AGENTS.md',
    'packages/react-components/react-button/library/docs/CLAUDE.md',
    'packages/react-components/react-button/stories/src/.agents/rules.md',
    'packages/react-components/react-button/stories/src/.hidden/AGENTS.md',
    'packages/react-components/react-button/library/src/.hidden/package.json',
    'packages/react-components/react-utilities/.swcrc',
    'packages/react-components/react-utilities/library/src/foo/.internal.ts',
    'packages/react-components/react-theme/.hidden/theme.test.ts',
    'packages/.hidden/react-theme/library/src/theme.ts',
    '.github/workflows/.hidden/file.yml',
    'packages/react-components/react-button/stories/src/AGENTS.override.md',
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
    expect(tier([file(story, 0, 0, 'packages/react-components/react-button/stories/src/AGENTS.override.md')])).toBe(3);
    expect(tier([file('packages/react-components/react-button/stories/src/AGENTS.override.md', 0, 0, story)])).toBe(3);
  });

  test.each([
    'packages/react-components/react-button/library/src/Button.test.tsx',
    'packages/react-components/react-button/library/src/Button.spec.ts',
    'packages/react-components/react-button/stories/src/Button.test.tsx',
    'packages/react-components/react-button/stories/src/__snapshots__/Button.snap',
    'packages/react-components/react-button/library/docs/example.snap',
    'packages/react-components/react-button/stories/src/__snapshots__/Button.png',
  ])('tests and snapshots require tier 1 human review: %s', path => {
    expect(tier([file(path, 500)])).toBe(1);
  });

  test('counts added plus deleted source lines, not net changes', () => {
    expect(tier([file(source, 25, 25)])).toBe(1);
    expect(tier([file(source, 26, 25)])).toBe(2);
    expect(tier([file(source, 25), file(source.replace('Button.tsx', 'useButton.ts'), 25)])).toBe(1);
    expect(tier([file(source, 25), file(source.replace('Button.tsx', 'useButton.ts'), 26)])).toBe(2);
  });

  test('a small fix may carry its change file, which does not count; its tests count', () => {
    expect(tier([file(source, 9), file(changeFile, 7)])).toBe(1);
    expect(tier([file(source, 50), file(changeFile, 7)])).toBe(1);
    expect(tier([file(source, 51), file(changeFile, 7)])).toBe(2);
    expect(tier([file(source, 9), file(test_, 41), file(changeFile, 7)])).toBe(1);
    expect(tier([file(source, 9), file(test_, 42)])).toBe(2);
  });

  test('small fixes are limited to library/src and the web components source', () => {
    expect(tier([file('packages/web-components/src/switch/switch.styles.ts', 4), file(changeFile, 7)])).toBe(1);
    expect(tier([file('packages/charts/react-charts/library/src/components/Chart.ts', 3)])).toBe(1);
    // Tooling, legacy v8 and core runtime packages keep their source in src/ and are not fast-lane material.
    for (const path of [
      'packages/eslint-plugin/src/rules/a.js',
      'packages/react-components/babel-preset-global-context/src/index.ts',
      'packages/react-components/react-jsx-runtime/src/index.ts',
      'packages/react-file-type-icons/src/FileTypeIconMap.ts',
      'packages/react-components/react-button/stories/src/Button/Default.tsx',
    ]) {
      expect(tier([file(path, 2), file(changeFile, 7)])).toBe(2);
    }
  });

  test('a listed protected path wins over an incomplete listing', () => {
    expect(classifyRisk([file('.github/workflows/pr.yml'), file('package.json')], { changedFiles: 5000 }).tier).toBe(3);
  });

  test('newlines in paths cannot escape protected directories', () => {
    expect(tier([file('.github/workflows/a\nb.yml')])).toBe(3);
    expect(tier([file('packages/react-components/react-theme/library/src/a\nb.ts')])).toBe(3);
  });

  test('a file renamed into change/ is still reviewed by its old path', () => {
    expect(
      tier([
        file(source, 2),
        file('change/x.json', 0, 0, 'packages/react-components/react-input/library/src/Input.tsx'),
      ]),
    ).toBe(2);
  });

  test('a file without a text diff keeps any change out of the fast lane, except binary snapshots', () => {
    expect(
      tier([{ ...file('packages/react-components/react-button/stories/src/assets/icon.png', 0), patch: '' }]),
    ).toBe(2);
    expect(tier([{ ...file(story, 0, 0, story.replace('Button.stories', 'Old.stories')), patch: undefined }])).toBe(2);
    expect(
      tier([{ ...file('packages/react-components/react-button/stories/src/__snapshots__/Button.png', 0), patch: '' }]),
    ).toBe(1);
  });

  test('a small fix stays in one package source root and needs text patches', () => {
    expect(tier([file(source), file(source.replace('react-button', 'react-input'))])).toBe(2);
    expect(tier([file(source), file(story)])).toBe(2);
    expect(tier([file('packages/react-components/react-button/library/config/tests.js')])).toBe(2);
    expect(tier([{ ...file(source), patch: undefined }])).toBe(2);
    expect(tier([{ ...file(source), patch: '' }])).toBe(2);
    expect(tier([file(source.replace('Button.tsx', '__snapshots__/helper.ts'), 51)])).toBe(2);
    expect(tier([file(changeFile, 7)])).toBe(2);
  });

  test.each(['Button.test.tsx', 'Button.spec.ts', 'Button.cy.tsx'])(
    'unavailable test code is not exempt from the missing-diff fallback: %s',
    name => {
      const path = `packages/react-components/react-button/library/src/${name}`;
      expect(tier([{ ...file(path), patch: undefined }])).toBe(2);
      expect(tier([{ ...file(path, 2000), patch: undefined }])).toBe(2);
      expect(tier([{ ...file(path), patch: '' }])).toBe(2);
      expect(tier([file(path)])).toBe(1);
      const snapshot = 'packages/react-components/react-button/library/src/__snapshots__/Button.snap';
      expect(tier([{ ...file(snapshot, 0, 0, path), patch: undefined }])).toBe(2);
      expect(tier([{ ...file(path, 0, 0, snapshot), patch: undefined }])).toBe(2);
      expect(tier([{ ...file(snapshot, 0), patch: undefined }])).toBe(1);
    },
  );

  test('a change file keeps docs and stories out of tier 0', () => {
    expect(tier([file(story), file(changeFile)])).toBe(2);
  });

  test('hidden files never qualify as stories or documentation', () => {
    expect(tier([file('packages/react-components/react-button/stories/src/.eslintrc.js')])).toBe(2);
    expect(tier([file('packages/react-components/react-button/library/docs/.notes.md')])).toBe(2);
  });

  test('Cypress component tests count as tests', () => {
    expect(tier([file('packages/react-components/react-drawer/library/src/Drawer.cy.tsx', 300)])).toBe(1);
  });

  test('typical Dependabot changes are protected without reading the author', () => {
    expect(tier([file('package.json'), file('yarn.lock')])).toBe(3);
    expect(tier([file('.github/workflows/pr.yml')])).toBe(3);
  });

  test('labels an empty or truncated listing as standard instead of guessing', () => {
    expect(classifyRisk([], { changedFiles: 0 }).tier).toBe(2);
    expect(classifyRisk([file(story)], { changedFiles: 2 }).tier).toBe(2);
    expect(
      classifyRisk(
        Array.from({ length: 3000 }, () => file(story)),
        { changedFiles: 3000 },
      ).tier,
    ).toBe(2);
  });

  test('fails explicitly on invalid file metadata', () => {
    expect(() => tier([file(source, -1)])).toThrow('metadata');
    expect(() => tier([file(source, Number.NaN)])).toThrow('metadata');
  });

  test('rejects glob syntax the matcher does not support', () => {
    jest.isolateModules(() => {
      jest.doMock('node:fs', () => ({
        readFileSync: () => JSON.stringify({ trivial: [], protected: ['{a,b}/**'] }),
      }));
      expect(() => require('./risk-tiers')).toThrow('Unsupported syntax');
    });
    jest.dontMock('node:fs');
  });

  test('review focus must be actual prose, not a template comment or code sample', () => {
    expect(hasReviewFocus('Review focus: Check the API compatibility.')).toBe(true);
    expect(hasReviewFocus('Review focus: x')).toBe(true);
    expect(hasReviewFocus('**Review focus:** Check keyboard navigation.')).toBe(true);
    expect(hasReviewFocus('**Review focus:**')).toBe(false);
    expect(hasReviewFocus('**Review focus:**   ')).toBe(false);
    expect(hasReviewFocus('<!-- Review focus: placeholder -->')).toBe(false);
    expect(hasReviewFocus('```\nReview focus: example\n```')).toBe(false);
    expect(hasReviewFocus('Review focus:  ')).toBe(false);
    expect(hasReviewFocus('Review focus:\n\n## Related issues')).toBe(false);
    for (const spelling of ['- Review focus: x', '**Review focus**: x', 'Review Focus : x', '* **Review focus:** x']) {
      expect(hasReviewFocus(spelling)).toBe(true);
    }
    expect(hasReviewFocus(null)).toBe(false);
  });
});

const diffText = 'diff --git a/example b/example\n+change';
const config = { tenantId: '22222222-2222-2222-2222-222222222222' };
const decision = (suggested: number) => ({
  tier: suggested,
  model: 'example-model-1',
  confidence: 0.9,
  inputTokens: 100,
  outputTokens: 1,
});

function workflowFixture(paths = [file(source)]) {
  const data = {
    head: { sha: 'head-sha' },
    base: { sha: 'base-sha', ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
    user: { login: 'author' },
    author_association: 'MEMBER',
    title: 'fix(button): correct behavior',
    body: 'Review focus: Confirm the intended behavior.',
    changed_files: paths.length,
    labels: tierLabels.map(name => ({ name })).concat([{ name: 'CI' }]),
  };
  const github = {
    rest: {
      pulls: {
        get: jest
          .fn()
          .mockImplementation(params =>
            Promise.resolve({ data: params.mediaType?.format === 'diff' ? diffText : data }),
          ),
        listFiles: jest.fn(),
      },
      issues: { addLabels: jest.fn(), removeLabel: jest.fn() },
      repos: { getCollaboratorPermissionLevel: jest.fn().mockResolvedValue({ data: { permission: 'write' } }) },
      checks: { update: jest.fn() },
    },
    paginate: jest.fn().mockResolvedValue(paths),
  };
  const core = {
    summary: { addRaw: jest.fn().mockReturnThis(), write: jest.fn() },
    setFailed: jest.fn(),
    setOutput: jest.fn(),
  };
  return {
    data,
    github,
    core,
    env: { RISK_MODEL_MODE: 'raise' } as Record<string, string>,
    assessRisk: jest.fn().mockResolvedValue(decision(0)),
    checkRun: { id: 456, headSha: data.head.sha },
    context: { repo: { owner: 'microsoft', repo: 'fluentui' }, issue: { number: 123 } },
  };
}

type Fixture = ReturnType<typeof workflowFixture>;
const labelsAdded = (args: Fixture) => args.github.rest.issues.addLabels.mock.calls.map(([arg]) => arg.labels[0]);
const conclusion = (args: Fixture) => args.github.rest.checks.update.mock.calls.at(-1)?.[0].conclusion;
const checkOutput = (args: Fixture) => args.github.rest.checks.update.mock.calls.at(-1)?.[0].output;
const summary = (args: Fixture) => args.github.rest.checks.update.mock.calls.at(-1)?.[0].output.summary;

describe('risk workflow', () => {
  test('paginates, reconciles only risk labels, and completes the bootstrap check', async () => {
    const args = workflowFixture();
    await runWorkflow(args);
    expect(args.github.paginate).toHaveBeenCalledWith(
      args.github.rest.pulls.listFiles,
      expect.objectContaining({ per_page: 100 }),
    );
    expect(labelsAdded(args)).toEqual(['Risk: low']);
    expect(args.github.rest.issues.removeLabel.mock.calls.map(([arg]) => arg.name)).toEqual([
      'Risk: trivial',
      'Risk: standard',
      'Risk: high',
    ]);
    expect(args.github.rest.checks.update).toHaveBeenCalledWith(
      expect.objectContaining({ check_run_id: 456, conclusion: 'success' }),
    );
    expect(args.core.setOutput).toHaveBeenCalledWith('check-completed', 'true');
  });

  test('reminds tier 2 and 3 authors of the review focus line without failing the pilot', async () => {
    for (const [path, reminder] of [
      [story, false],
      [source, false],
      ['apps/example/index.ts', true],
      ['AGENTS.md', true],
    ] as const) {
      const args = workflowFixture([file(path)]);
      args.data.body = '';
      await runWorkflow(args);
      expect(conclusion(args)).toBe('success');
      expect(args.core.setFailed).not.toHaveBeenCalled();
      expect(checkOutput(args).summary.includes('Reminder: add a nonempty `Review focus')).toBe(reminder);
      expect(JSON.parse(checkOutput(args).text).reviewFocus).toBe(false);
      expect(checkOutput(args).title).toContain(reminder ? 'add a review focus line' : 'policy satisfied');
      // The check is complete, so the workflow finalizer must not overwrite it.
      expect(args.core.setOutput).toHaveBeenCalledWith('check-completed', 'true');
    }
  });

  test('records each assessment as one machine-readable line for measuring the pilot', async () => {
    const args = workflowFixture([file(source)]);
    args.env = {};
    args.assessRisk.mockResolvedValue(decision(2));
    await runWorkflow(args);
    expect(JSON.parse(checkOutput(args).text)).toEqual({
      tier: 1,
      deterministicTier: 1,
      modelTier: 2,
      modelConfidence: expect.any(Number),
      mode: 'shadow',
      reviewFocus: true,
    });
    expect(args.assessRisk).toHaveBeenCalledWith({ diff: expect.any(String), deterministic: expect.any(Object) });
  });

  test('labels a truncated listing as standard', async () => {
    const args = workflowFixture();
    args.data.changed_files = 2;
    await runWorkflow(args);
    expect(labelsAdded(args)).toEqual(['Risk: standard']);
  });

  test.each(['head', 'body'])('does not certify concurrent changes to %s', async key => {
    const args = workflowFixture();
    args.github.rest.pulls.get
      .mockResolvedValueOnce({ data: args.data })
      .mockResolvedValueOnce({ data: diffText })
      .mockResolvedValueOnce({ data: { ...args.data, [key]: key === 'head' ? { sha: 'new-head' } : 'edited' } });
    await expect(runWorkflow(args)).rejects.toThrow('changed during classification');
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(conclusion(args)).toBe('failure');
  });

  test.each([
    { sha: 'new-base', ref: 'master', repo: { full_name: 'microsoft/fluentui' } },
    { sha: 'base-sha', ref: 'release', repo: { full_name: 'microsoft/fluentui' } },
    { sha: 'base-sha', ref: 'master', repo: { full_name: 'other/fluentui' } },
  ])('does not certify a changed PR base: %j', async base => {
    const args = workflowFixture();
    args.github.rest.pulls.get
      .mockResolvedValueOnce({ data: args.data })
      .mockResolvedValueOnce({ data: diffText })
      .mockResolvedValueOnce({ data: { ...args.data, base } });
    await expect(runWorkflow(args)).rejects.toThrow('changed during classification');
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
  });

  test.each([
    ['a stale head', { id: 456, headSha: 'old-head' }],
    ['an invalid check id', { id: 0, headSha: 'head-sha' }],
  ])('rejects %s before calling the model or changing labels', async (_, checkRun) => {
    const args = workflowFixture();
    await expect(runWorkflow({ ...args, checkRun })).rejects.toThrow('head changed since this run started');
    expect(args.assessRisk).not.toHaveBeenCalled();
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(conclusion(args)).toBe('failure');
  });

  test('does not remove labels or report success if adding the new label fails', async () => {
    const args = workflowFixture();
    args.github.rest.issues.addLabels.mockRejectedValue(new Error('API unavailable'));
    await expect(runWorkflow(args)).rejects.toThrow('API unavailable');
    expect(args.github.rest.issues.removeLabel).not.toHaveBeenCalled();
    expect(conclusion(args)).toBe('failure');
  });

  test('keeps API failures visible as failed policy checks', async () => {
    const args = workflowFixture();
    args.github.paginate.mockRejectedValue(new Error('API unavailable'));
    await expect(runWorkflow(args)).rejects.toThrow('API unavailable');
    expect(args.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(conclusion(args)).toBe('failure');
  });

  test('deterministic high risk needs no model call or diff', async () => {
    const args = workflowFixture([file('AGENTS.md')]);
    await runWorkflow(args);
    expect(args.assessRisk).not.toHaveBeenCalled();
    expect(args.github.rest.pulls.get).toHaveBeenCalledTimes(2);
    expect(labelsAdded(args)).toEqual(['Risk: high']);
  });

  test.each([0, 1, 2].flatMap(floor => [0, 1, 2, 3].map(suggestion => [floor, suggestion])))(
    'enforces deterministic floor %i against model tier %i',
    async (floor, suggestion) => {
      const args = workflowFixture([file([story, source, 'apps/example/index.ts'][floor])]);
      args.assessRisk.mockResolvedValue(decision(suggestion));
      await runWorkflow(args);
      expect(labelsAdded(args)).toEqual([tierLabels[Math.max(floor, suggestion)]]);
    },
  );

  test('model escalation also asks for the human review focus', async () => {
    const args = workflowFixture([file(story)]);
    args.data.body = '';
    args.assessRisk.mockResolvedValue(decision(2));
    await runWorkflow(args);
    expect(checkOutput(args).title).toBe('Tier 2: add a review focus line');
    expect(conclusion(args)).toBe('success');
  });

  test.each([
    ['provider failure', new Error('Model unavailable')],
    ['oversized diff', new Error('The diff is too large for the model (48 KiB request limit)')],
  ])('a %s still labels the PR, but never in the fast lane', async (_, error) => {
    for (const [path, expected] of [
      [story, 'Risk: standard'],
      [source, 'Risk: standard'],
      ['apps/example/index.ts', 'Risk: standard'],
    ]) {
      const args = workflowFixture([file(path)]);
      args.assessRisk.mockRejectedValue(error);
      await runWorkflow(args);
      expect(labelsAdded(args)).toEqual([expected]);
      expect(summary(args)).toContain(`Model could not assess the change (${error.message})`);
    }
  });

  test('a broken model configuration fails every model call instead of disabling the model', async () => {
    const args = workflowFixture([file(story)]);
    await runWorkflow({
      ...args,
      assessRisk: undefined,
      env: { ...args.env, RISK_MODEL_ENDPOINT: 'http://insecure.test' },
    });
    expect(labelsAdded(args)).toEqual(['Risk: standard']);
    expect(summary(args)).toContain('partly or wrongly configured');
  });

  test('shadow mode, the default, reports the model without changing the label', async () => {
    const args = workflowFixture([file(source)]);
    args.assessRisk.mockResolvedValue(decision(3));
    await runWorkflow({ ...args, env: {} });
    expect(labelsAdded(args)).toEqual(['Risk: low']);
    expect(summary(args)).toContain('Shadow mode, not applied: with the model this would be tier 3.');

    const failing = workflowFixture([file(source)]);
    failing.assessRisk.mockRejectedValue(new Error('Model unavailable'));
    await runWorkflow({ ...failing, env: { RISK_MODEL_MODE: 'shadow' } });
    expect(labelsAdded(failing)).toEqual(['Risk: low']);
    expect(summary(failing)).toContain('Model could not assess the change (Model unavailable). The deterministic');
  });

  test('a failure to fetch the diff is a model failure, not a workflow failure', async () => {
    const args = workflowFixture([file(story)]);
    args.github.rest.pulls.get.mockImplementation(params =>
      params.mediaType ? Promise.reject(new Error('diff unavailable')) : Promise.resolve({ data: args.data }),
    );
    await runWorkflow(args);
    expect(labelsAdded(args)).toEqual(['Risk: standard']);
    expect(summary(args)).toContain('Model could not assess the change (diff unavailable)');
  });

  test('a failed classification keeps its specific check text', async () => {
    const args = workflowFixture();
    args.github.paginate.mockRejectedValue(new Error('API unavailable'));
    await expect(runWorkflow(args)).rejects.toThrow('API unavailable');
    expect(args.github.rest.checks.update).toHaveBeenLastCalledWith(
      expect.objectContaining({ output: expect.objectContaining({ title: 'Risk classification failed' }) }),
    );
    expect(args.core.setOutput).toHaveBeenCalledWith('check-completed', 'true');
  });

  test('without a configured model, shadow mode keeps the deterministic tier and raise mode leaves the fast lane', async () => {
    const shadow = workflowFixture([file(story)]);
    // The repository's shared AZURE_TENANT_ID secret alone does not configure the model.
    await runWorkflow({ ...shadow, assessRisk: undefined, env: { RISK_MODEL_AZURE_TENANT_ID: config.tenantId } });
    expect(labelsAdded(shadow)).toEqual(['Risk: trivial']);
    expect(summary(shadow)).toContain('Model not configured. The deterministic tier stands.');

    const raise = workflowFixture([file(story)]);
    await runWorkflow({ ...raise, assessRisk: undefined });
    expect(labelsAdded(raise)).toEqual(['Risk: standard']);
    expect(summary(raise)).toContain('Model not configured. A fast-lane tier needs a model assessment');
  });

  test('an author without write access gets the model only after a maintainer adds ai-review', async () => {
    for (const [env, expected] of [
      [{}, 'Risk: trivial'],
      [{ RISK_MODEL_MODE: 'raise' }, 'Risk: standard'],
    ] as const) {
      const args = workflowFixture([file(story)]);
      args.github.rest.repos.getCollaboratorPermissionLevel.mockResolvedValue({ data: { permission: 'read' } });
      await runWorkflow({ ...args, env });
      expect(args.assessRisk).not.toHaveBeenCalled();
      expect(labelsAdded(args)).toEqual([expected]);
      expect(summary(args)).toContain('repository write access is not established');
    }

    const labeled = workflowFixture([file(story)]);
    labeled.github.rest.repos.getCollaboratorPermissionLevel.mockResolvedValue({ data: { permission: 'none' } });
    labeled.data.labels.push({ name: 'ai-review' });
    labeled.assessRisk.mockResolvedValue(decision(3));
    await runWorkflow(labeled);
    expect(labelsAdded(labeled)).toEqual(['Risk: high']);
    expect(labeled.github.rest.repos.getCollaboratorPermissionLevel).not.toHaveBeenCalled();
  });

  test.each([
    ['admin', true],
    ['write', true],
    ['read', false],
    ['none', false],
  ])('repository permission %s decides whether the author is trusted', async (permission, trusted) => {
    const args = workflowFixture([file(story)]);
    args.data.author_association = 'MEMBER';
    args.github.rest.repos.getCollaboratorPermissionLevel.mockResolvedValue({ data: { permission } });
    await runWorkflow(args);
    expect(args.github.rest.repos.getCollaboratorPermissionLevel).toHaveBeenCalledWith({
      owner: 'microsoft',
      repo: 'fluentui',
      username: 'author',
    });
    expect(args.assessRisk).toHaveBeenCalledTimes(trusted ? 1 : 0);
  });

  test('an unknown author is untrusted', async () => {
    const missing = workflowFixture([file(story)]);
    missing.github.rest.repos.getCollaboratorPermissionLevel.mockRejectedValue(
      Object.assign(new Error(), { status: 404 }),
    );
    await runWorkflow(missing);
    expect(missing.assessRisk).not.toHaveBeenCalled();
  });

  test.each(['OWNER', 'MEMBER', 'COLLABORATOR', 'CONTRIBUTOR'])(
    'permission lookup failures never authorize the %s association',
    async association => {
      for (const status of [403, 500]) {
        for (const mode of ['shadow', 'raise']) {
          const args = workflowFixture([file(story)]);
          args.data.author_association = association;
          args.env.RISK_MODEL_MODE = mode;
          args.github.rest.repos.getCollaboratorPermissionLevel.mockRejectedValue(
            Object.assign(new Error('Permission lookup unavailable'), { status }),
          );
          await runWorkflow(args);
          expect(args.assessRisk).not.toHaveBeenCalled();
          expect(labelsAdded(args)).toEqual([mode === 'raise' ? 'Risk: standard' : 'Risk: trivial']);
          expect(summary(args)).toContain('Author permission could not be verified');
          expect(summary(args)).toContain('maintainer can add the `ai-review` label');
          args.data.labels.push({ name: 'ai-review' });
          await runWorkflow(args);
          expect(args.assessRisk).toHaveBeenCalledTimes(1);
        }
      }
    },
  );

  test('a tier 3 change never looks up the author', async () => {
    const args = workflowFixture([file('AGENTS.md')]);
    await runWorkflow(args);
    expect(args.github.rest.repos.getCollaboratorPermissionLevel).not.toHaveBeenCalled();
  });

  test('a trusted author with the ai-review label gets the model once', async () => {
    const args = workflowFixture([file(story)]);
    args.data.labels.push({ name: 'ai-review' });
    await runWorkflow(args);
    expect(args.assessRisk).toHaveBeenCalledTimes(1);
  });

  test('files without a text diff keep the change out of the fast lane even if the model selects trivial', async () => {
    const args = workflowFixture([
      {
        ...file(
          'packages/react-components/react-button/stories/src/after.png',
          0,
          0,
          'packages/react-components/react-button/stories/src/before.png',
        ),
        status: 'renamed',
        patch: '',
      },
    ]);
    await runWorkflow(args);
    expect(args.assessRisk).toHaveBeenCalled();
    expect(labelsAdded(args)).toEqual(['Risk: standard']);
  });
});
