import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const workflow = readFileSync(resolve(__dirname, '../../../.github/workflows/create-experimental-branch.yml'), 'utf8');
const steps = workflow.split(/^ {6}- name: /m).slice(1);
const featureNameExpression = '${{ github.event.inputs.feature-name }}';
const repository = 'example/workflow-test';

function getScript(step: string) {
  const match = step.match(/^ {8}run: \|\n((?: {10}.*(?:\n|$)|\n)+)/m);
  if (!match) {
    throw new Error('Expected a workflow run block');
  }
  return match[1].replace(/^ {10}/gm, '').replace(/\$\{\{ github\.repository \}\}/g, repository);
}

describe('create-experimental-branch workflow', () => {
  let directory: string;
  let callsPath: string;

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'experimental-branch-'));
    callsPath = join(directory, 'gh-calls');
    writeFileSync(callsPath, '');
    writeFileSync(
      join(directory, 'gh'),
      `#!/bin/bash
printf '%s\\0' "$@" >> "$GH_CALLS"
printf '\\0' >> "$GH_CALLS"
if [[ "$1" != api ]]; then
  exit 2
fi
case "$2" in
  repos/${repository}/branches/master)
    printf '%s' test-master-sha
    ;;
  repos/${repository}/branches/experimental/*)
    [[ "$BRANCH_EXISTS" == true ]]
    ;;
  repos/${repository}/git/refs)
    exit 0
    ;;
  *)
    exit 2
    ;;
esac
`,
      { mode: 0o700 },
    );
  });

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true });
  });

  function runStep(index: number, featureName: string, branchExists = false) {
    const script = getScript(steps[index]);
    if (script.includes('${{')) {
      throw new Error('Workflow expressions must not be interpolated into the shell script');
    }
    const result = spawnSync('/bin/bash', ['--noprofile', '--norc', '-e', '-o', 'pipefail', '-c', script], {
      cwd: directory,
      encoding: 'utf8',
      timeout: 5000,
      env: {
        PATH: directory,
        FEATURE_NAME: featureName,
        GH_TOKEN: 'unused-test-token',
        GH_CALLS: callsPath,
        BRANCH_EXISTS: String(branchExists),
      },
    });
    if (result.error) {
      throw result.error;
    }
    return result;
  }

  function getCalls() {
    return readFileSync(callsPath, 'utf8')
      .split('\0\0')
      .filter(Boolean)
      .map(call => call.split('\0'));
  }

  it('passes the feature name as environment data in both steps', () => {
    expect(steps).toHaveLength(2);
    for (const step of steps) {
      expect(step).toMatch(
        /^ {8}env:\n(?:(?: {10}.*)?\n)*? {10}FEATURE_NAME: \$\{\{ github\.event\.inputs\.feature-name \}\}/m,
      );
      expect(getScript(step)).not.toContain(featureNameExpression);
    }
    expect(steps[1]).toContain('GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}');
  });

  it.each(['a', '123', 'foo-bar', 'feature-123'])('creates the expected branch for %s', featureName => {
    expect(runStep(0, featureName).status).toBe(0);
    expect(runStep(1, featureName).status).toBe(0);
    expect(getCalls()).toEqual([
      ['api', `repos/${repository}/branches/experimental/${featureName}`, '--silent'],
      ['api', `repos/${repository}/branches/master`, '--template', '{{.commit.sha}}'],
      [
        'api',
        `repos/${repository}/git/refs`,
        '-f',
        `ref=refs/heads/experimental/${featureName}`,
        '-f',
        'sha=test-master-sha',
      ],
    ]);
  });

  it.each(['', 'Foo', 'foo bar', '-foo', 'foo-', 'foo--bar', 'foo/bar', 'foo_bar', '"foo"', 'foo\nbar', 'foo;bar'])(
    'rejects invalid input %j before branch creation',
    featureName => {
      const validation = runStep(0, featureName);
      if (validation.status === 0) {
        runStep(1, featureName);
      }
      expect(validation.status).toBe(1);
      expect(validation.stdout).toContain('::error::Invalid feature name');
      expect(getCalls()).toEqual([]);
    },
  );

  it.each(['foo$(printf injected)', 'foo`printf injected`', 'foo"; printf injected; #'])(
    'keeps shell-like input %j literal in both steps',
    featureName => {
      const validation = runStep(0, featureName);
      expect(validation.status).toBe(1);
      expect(validation.stdout).toContain(`Invalid feature name '${featureName}'`);
      expect(getCalls()).toEqual([]);

      // Exercise the second step independently so it cannot reintroduce input parsing.
      expect(runStep(1, featureName).status).toBe(0);
      expect(getCalls()[2]).toEqual([
        'api',
        `repos/${repository}/git/refs`,
        '-f',
        `ref=refs/heads/experimental/${featureName}`,
        '-f',
        'sha=test-master-sha',
      ]);
    },
  );

  it('rejects an existing branch without looking up master or creating a ref', () => {
    expect(runStep(0, 'foo-bar').status).toBe(0);
    const creation = runStep(1, 'foo-bar', true);
    expect(creation.status).toBe(1);
    expect(creation.stdout).toContain("::error::Branch 'experimental/foo-bar' already exists.");
    expect(getCalls()).toEqual([['api', `repos/${repository}/branches/experimental/foo-bar`, '--silent']]);
  });
});
