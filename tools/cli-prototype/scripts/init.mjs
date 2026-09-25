import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const configuredRoot = process.env.FLUENTUI_PLAYGROUND_ROOT;
if (!configuredRoot) {
  throw new Error('FLUENTUI_PLAYGROUND_ROOT is required');
}
const root = resolve(configuredRoot);
const output = join(root, 'artifacts/cli-init');
const cli = join(root, 'node_modules/@fluentui/cli/bin/fluentui-cli.js');
const skillRoot = join(root, '.agents/skills/fluentui');
const skillPath = join(skillRoot, 'SKILL.md');
const agentsPath = join(root, 'AGENTS.md');
const configPath = join(root, 'fluentui.config.json');
const records = [];
mkdirSync(output, { recursive: true });

const original = snapshot();
const protectedFiles = snapshot(true);
const config = readFileSync(configPath, 'utf8');
const dryRun = run('dry-run', ['init', '--cwd', root, '--dry-run', '--json']);
assertReceipt(dryRun, true);
assertSame(snapshot(), original, 'Dry-run modified project files');

const initialized = run('initialize', ['init', '--json']);
assertReceipt(initialized, false);
if (readFileSync(configPath, 'utf8') !== config) {
  throw new Error('Initialization rewrote the existing facade configuration');
}
assertSame(snapshot(true), protectedFiles, 'Initialization changed application files');
const ownership = JSON.parse(readFileSync(join(skillRoot, '.fluentui-cli.json'), 'utf8'));
if (
  ownership.schemaVersion !== 1 ||
  ownership.asset !== '@fluentui/cli:fluentui-skill' ||
  ownership.version !== initialized.data.assetVersion
) {
  throw new Error('Missing versioned skill ownership contract');
}
for (const [path, hash] of Object.entries(ownership.files)) {
  const copied = readFileSync(join(skillRoot, path));
  if (digest(copied) !== hash) {
    throw new Error(`Installed skill asset does not match its ownership receipt: ${path}`);
  }
  if (path === 'references/extensions.md') {
    if (initialized.data.extensions.length || !copied.toString('utf8').includes('No package guidance is approved.')) {
      throw new Error('The baseline forum must not activate unapproved package guidance');
    }
    continue;
  }
  const packed = readFileSync(
    path === 'references/fluentui.config.schema.json'
      ? join(root, 'node_modules/@fluentui/cli/schemas/fluentui.config.schema.json')
      : join(root, 'node_modules/@fluentui/cli/assets/consumer-skill', path),
  );
  if (!copied.equals(packed) || digest(copied) !== hash) {
    throw new Error(`Installed skill asset differs from its shipped bytes: ${path}`);
  }
}
const agents = readFileSync(agentsPath, 'utf8');
const start = '<!-- fluentui-cli:init:start -->';
const end = '<!-- fluentui-cli:init:end -->';
const block = agents.slice(agents.indexOf(start), agents.indexOf(end) + end.length);
if (
  agents.split(start).length !== 2 ||
  agents.split(end).length !== 2 ||
  !block.includes('.agents/skills/fluentui/SKILL.md') ||
  block.length > 800 ||
  block.includes('```') ||
  /\|.+\|/.test(block)
) {
  throw new Error('AGENTS.md must contain one small skill pointer, not a duplicated command/catalog guide');
}

const initializedFiles = snapshot();
const repeat = run('repeat', ['init', '--cwd', root, '--json']);
assertReceipt(repeat, false);
if (repeat.data.files.created.length || repeat.data.files.updated.length) {
  throw new Error('Repeated initialization planned unnecessary file changes');
}
assertSame(snapshot(), initializedFiles, 'Repeated initialization was not byte-stable');
const doctor = run('doctor-current', ['doctor', '--metadata-mode', 'required', '--json']);
assertSetup(doctor, 'complete', 'current');

const originalSkill = readFileSync(skillPath);
try {
  writeFileSync(skillPath, Buffer.concat([originalSkill, Buffer.from('\nUser-owned skill adjustment.\n')]));
  const editedState = snapshot();
  run('edited-skill-conflict', ['init', '--json'], true);
  assertSame(snapshot(), editedState, 'Conflicting initialization wrote a partial update');
  const editedDoctor = run('doctor-edited-skill', ['doctor', '--metadata-mode', 'required', '--json']);
  if (editedDoctor.data.setup.skill.status !== 'edited') {
    throw new Error('Doctor failed to report an edited installed skill');
  }
  assertSame(editedDoctor.coverage, doctor.coverage, 'Setup drift changed API coverage');
  if (editedDoctor.status !== doctor.status) {
    throw new Error('Setup drift changed the catalog-derived doctor status');
  }
} finally {
  writeFileSync(skillPath, originalSkill);
}

try {
  const note = '\n## Application notes\n\nPreserve the forum interaction contracts.\n';
  writeFileSync(agentsPath, agents + note);
  const customized = snapshot();
  run('preserve-agent-notes', ['init', '--json']);
  assertSame(snapshot(), customized, 'Initialization rewrote unrelated agent instructions');

  writeFileSync(agentsPath, `${agents}\n${start}\nDuplicate managed block\n${end}\n`);
  const malformed = snapshot();
  run('duplicate-marker-conflict', ['init', '--json'], true);
  assertSame(snapshot(), malformed, 'Malformed managed blocks caused a partial update');
} finally {
  writeFileSync(agentsPath, agents);
}
assertSame(snapshot(), initializedFiles, 'Negative setup checks did not restore their fixtures');
assertSetup(run('doctor-restored', ['doctor', '--metadata-mode', 'required', '--json']), 'complete', 'current');

for (const args of [
  ['metadata', '--json'],
  ['metadata', '--entry', 'dist/index.d.ts', '--reporter', 'json', '--json'],
]) {
  const result = run(`removed-metadata-${records.length}`, args, true);
  if (result.data.code !== 'CLI_USAGE' || records.at(-1).status !== 2) {
    throw new Error('Removed metadata syntax must fail with actionable usage and exit code 2');
  }
}
writeFileSync(
  join(output, 'summary.json'),
  `${JSON.stringify(
    {
      completedAt: new Date().toISOString(),
      packedAssetsVerified: Object.keys(ownership.files),
      dryRunNonDestructive: true,
      applicationPreserved: true,
      configPreserved: true,
      byteStableRepeat: true,
      editedAssetsProtected: true,
      malformedMarkersProtected: true,
      unrelatedAgentInstructionsPreserved: true,
      setupIndependentOfApiCoverage: true,
      legacyMetadataRejected: true,
      commands: records,
    },
    null,
    2,
  )}\n`,
);
console.log(`Packed init acceptance passed; evidence: ${output}`);

function run(name, args, failure = false) {
  const probePath = join(output, `${name}.probe.json`);
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    env: {
      ...process.env,
      FLUENTUI_CLI_PROBE_OUTPUT: probePath,
      NODE_OPTIONS: [process.env.NODE_OPTIONS, `--require=${join(root, 'scripts/module-probe.cjs')}`]
        .filter(Boolean)
        .join(' '),
    },
  });
  records.push({ name, args, status: result.status, stdout: result.stdout, stderr: result.stderr });
  writeFileSync(join(output, `${name}.json`), `${JSON.stringify(records.at(-1), null, 2)}\n`);
  if (result.error || (failure ? result.status === 0 : result.status !== 0)) {
    throw new Error(`${name}: ${result.error?.message ?? result.stderr ?? result.stdout}`);
  }
  const probe = JSON.parse(readFileSync(probePath, 'utf8'));
  if (probe.typeScriptModules.length || probe.generatorModules.length) {
    throw new Error(`${name} initialized compiler/generator modules`);
  }
  const response = JSON.parse(result.stdout);
  if (response.apiVersion !== '1') {
    throw new Error(`${name} did not emit the versioned JSON contract`);
  }
  return response;
}

function assertReceipt(response, dryRun) {
  const receipt = response.data;
  if (
    response.type !== 'fluentui.init' ||
    receipt.projectRoot !== root ||
    receipt.configPath !== configPath ||
    receipt.dryRun !== dryRun ||
    receipt.applied !== !dryRun ||
    receipt.files.conflicting.length ||
    JSON.stringify(receipt.systems) !== JSON.stringify(['fluent-v9', 'headless']) ||
    !receipt.files.unchanged.includes(configPath)
  ) {
    throw new Error(`Invalid initialization receipt: ${JSON.stringify(receipt)}`);
  }
}

function assertSetup(response, status, skill) {
  if (
    response.data.setup.status !== status ||
    response.data.setup.config.status !== 'current' ||
    response.data.setup.skill.status !== skill ||
    response.data.setup.agents.status !== 'current'
  ) {
    throw new Error(`Unexpected setup status: ${JSON.stringify(response.data.setup)}`);
  }
}

function snapshot(protectedOnly = false) {
  const files = {};
  visit(root);
  return files;

  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = join(directory, entry.name);
      const local = relative(root, path);
      if (
        ['node_modules', 'artifacts', '.git'].includes(local) ||
        (protectedOnly && (local === '.agents' || local === 'AGENTS.md'))
      ) {
        continue;
      }
      if (entry.isDirectory()) {
        files[`${local}/`] = 'directory';
        visit(path);
      } else if (entry.isFile()) {
        files[local] = digest(readFileSync(path));
      } else {
        throw new Error(`Unexpected nonregular project fixture: ${path}`);
      }
    }
  }
}

function assertSame(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(message);
  }
}

function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}
