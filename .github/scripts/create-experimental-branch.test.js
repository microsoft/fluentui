const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { test } = require('node:test');
const { readYamlFile } = require('nx/src/devkit-internals');

const workflow = readYamlFile(path.join(__dirname, '../workflows/create-experimental-branch.yml'));
const [validate, create] = workflow.jobs['create-branch'].steps;
const inputExpression = '${{ github.event.inputs.feature-name }}';
const ghStub = `
gh() {
  case "$2" in
    repos/test/repository/branches/master)
      if [[ "$FAIL_MASTER" == 1 ]]; then
        echo "Failed to fetch master" >&2
        return 1
      fi
      printf 'test-master-sha'
      ;;
    repos/test/repository/branches/*)
      [[ "$BRANCH_EXISTS" == 1 ]]
      ;;
    repos/test/repository/git/refs)
      if [[ "$FAIL_CREATE" == 1 ]]; then
        echo "Failed to create branch" >&2
        return 1
      fi
      printf 'GH_ARG:%s\\n' "$@"
      ;;
    *)
      echo "Unexpected gh invocation" >&2
      return 1
      ;;
  esac
}
mscr_probe() {
  echo "Injected command executed" >&2
}
`;

function run(step, featureName, overrides = {}) {
  const script = step.run.replaceAll('${{ github.repository }}', 'test/repository');
  const result = spawnSync('bash', ['--noprofile', '--norc', '-eo', 'pipefail', '-c', `${ghStub}\n${script}`], {
    encoding: 'utf8',
    env: { PATH: process.env.PATH, GH_TOKEN: 'test-token', FEATURE_NAME: featureName, ...overrides },
  });
  if (result.error) {
    throw result.error;
  }
  assert.equal(result.signal, null);
  return result;
}

test('dispatch input is transported through env in both steps, never shell source', () => {
  for (const step of [validate, create]) {
    assert.equal(step.env.FEATURE_NAME, inputExpression);
    assert.ok(!step.run.includes(inputExpression));
  }
  assert.equal(validate.env.GH_TOKEN, undefined);
  assert.equal(create.env.GH_TOKEN, '${{ secrets.GITHUB_TOKEN }}');
  assert.equal(workflow.jobs['create-branch'].permissions.contents, 'write');
});

for (const name of ['foo', 'foo-bar', 'feature-123', '123']) {
  test(`accepts ${name} and creates the expected branch from master`, () => {
    assert.equal(run(validate, name).status, 0);
    const result = run(create, name);
    assert.equal(result.status, 0);
    assert.equal(result.stderr, '');
    assert.ok(result.stdout.includes(`GH_ARG:ref=refs/heads/experimental/${name}\n`));
    assert.ok(result.stdout.includes('GH_ARG:sha=test-master-sha\n'));
  });
}

for (const name of [
  '',
  'Foo',
  'foo bar',
  '-foo',
  'foo-',
  'foo--bar',
  'foo/bar',
  '$(mscr_probe; printf foo-bar)',
  '`mscr_probe; printf foo-bar`',
  '"; mscr_probe; #',
  "foo'; mscr_probe; #",
  'foo\nmscr_probe',
]) {
  test(`rejects ${JSON.stringify(name)} without executing input in either step`, () => {
    const validation = run(validate, name);
    assert.equal(validation.status, 1);
    assert.equal(validation.stderr, '');
    assert.ok(validation.stdout.startsWith('::error::Invalid feature name'));

    // Exercise the privileged script independently even though validation would prevent reaching it.
    const creation = run(create, name);
    assert.equal(creation.status, 0);
    assert.equal(creation.stderr, '');
    assert.ok(creation.stdout.includes(`GH_ARG:ref=refs/heads/experimental/${name}\n`));
  });
}

test('an existing branch prevents creation', () => {
  const result = run(create, 'foo-bar', { BRANCH_EXISTS: '1' });
  assert.equal(result.status, 1);
  assert.ok(result.stdout.includes("::error::Branch 'experimental/foo-bar' already exists."));
  assert.ok(!result.stdout.includes('GH_ARG:'));
});

for (const failure of ['FAIL_MASTER', 'FAIL_CREATE']) {
  test(`${failure} stops the workflow with an error`, () => {
    const result = run(create, 'foo-bar', { [failure]: '1' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Failed to (fetch master|create branch)/);
    assert.ok(!result.stdout.includes('GH_ARG:'));
  });
}
