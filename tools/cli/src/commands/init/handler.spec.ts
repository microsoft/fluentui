import * as fs from 'node:fs';
import * as path from 'node:path';

import { handler } from './handler';
import {
  AGENTS_BLOCK_END,
  AGENTS_BLOCK_START,
  applyInitPlan,
  CONSUMER_SKILL_MANIFEST,
  createInitPlan,
  inspectProjectSetup,
} from './setup';

const fixtureRoot = path.resolve(__dirname, '__fixtures__/__init-output__');

describe('init command', () => {
  beforeEach(() => {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
    fs.mkdirSync(fixtureRoot, { recursive: true });
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    process.exitCode = undefined;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.exitCode = undefined;
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  });

  it('fails missing prerequisites without partial mutation', () => {
    const project = createProject('missing', []);

    expect(() => createInitPlan({ cwd: project })).toThrow(expect.objectContaining({ code: 'CLI_INIT_PREREQUISITE' }));
    expect(fs.existsSync(path.join(project, 'AGENTS.md'))).toBe(false);
    expect(fs.existsSync(path.join(project, 'fluentui.config.json'))).toBe(false);
  });

  it('does not promote an installed leaf package to a public facade', () => {
    const project = createProject('leaf-only', ['@fluentui/react-button']);

    expect(() => createInitPlan({ cwd: project })).toThrow(expect.objectContaining({ code: 'CLI_INIT_PREREQUISITE' }));
  });

  it('initializes both detected canonical systems and emits a JSON receipt', async () => {
    const project = createProject('both', [
      '@fluentui/react-components',
      '@fluentui/react-headless-components-preview',
    ]);

    await handler({ _: ['init'], $0: 'fluentui-cli', cwd: project, json: true });

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.type).toBe('fluentui.init');
    expect(output.data.systems).toEqual(['fluent-v9', 'headless']);
    expect(output.data.applied).toBe(true);
    expect(output.data.files.created).toEqual(
      expect.arrayContaining([
        path.join(project, 'fluentui.config.json'),
        path.join(project, 'AGENTS.md'),
        path.join(project, CONSUMER_SKILL_MANIFEST),
      ]),
    );
    expect(readJson(path.join(project, 'fluentui.config.json')).systems).toEqual({
      'fluent-v9': { catalogs: [{ package: '@fluentui/react-components' }] },
      headless: { catalogs: [{ package: '@fluentui/react-headless-components-preview' }] },
    });
    const generated = JSON.parse(fs.readFileSync(path.join(project, 'fluentui.config.json'), 'utf8'));
    expect(fs.existsSync(path.resolve(project, generated.$schema))).toBe(true);
  });

  it('supports an explicitly selected single system', () => {
    const project = createProject('single', [
      '@fluentui/react-components',
      '@fluentui/react-headless-components-preview',
    ]);

    applyInitPlan(createInitPlan({ cwd: project, system: ['headless'] }));

    expect(readJson(path.join(project, 'fluentui.config.json')).systems).toEqual({
      headless: { catalogs: [{ package: '@fluentui/react-headless-components-preview' }] },
    });
  });

  it('respects an inherited custom config without creating a project config', () => {
    const workspace = path.join(fixtureRoot, 'inherited');
    const project = path.join(workspace, 'apps/forum');
    fs.mkdirSync(project, { recursive: true });
    writeJson(path.join(workspace, 'package.json'), { private: true, workspaces: ['apps/*'] });
    writeJson(path.join(project, 'package.json'), { name: 'forum', private: true });
    writeJson(path.join(workspace, 'fluentui.config.json'), {
      schemaVersion: 1,
      systems: { product: { catalogs: [{ path: './catalog' }] } },
    });

    const receipt = applyInitPlan(createInitPlan({ cwd: project }));

    expect(receipt.systems).toEqual(['product']);
    expect(receipt.inheritedConfig).toBe(true);
    expect(receipt.configPath).toBe(path.join(workspace, 'fluentui.config.json'));
    expect(fs.existsSync(path.join(project, 'fluentui.config.json'))).toBe(false);
  });

  it('honors disabled systems', () => {
    const project = createProject('disabled', ['@fluentui/react-components']);
    writeJson(path.join(project, 'fluentui.config.json'), {
      schemaVersion: 1,
      systems: { 'fluent-v9': { disabled: true } },
    });

    expect(() => createInitPlan({ cwd: project, system: ['fluent-v9'] })).toThrow(
      expect.objectContaining({ code: 'CLI_INIT_PREREQUISITE' }),
    );
  });

  it('detects edited managed skills before writing', () => {
    const project = createProject('edited-skill', ['@fluentui/react-components']);
    applyInitPlan(createInitPlan({ cwd: project }));
    const skill = path.join(project, '.agents/skills/fluentui/SKILL.md');
    fs.appendFileSync(skill, '\ncustom edit\n');

    const plan = createInitPlan({ cwd: project });

    expect(plan.receipt.files.conflicting).toEqual([
      expect.objectContaining({ path: skill, reason: expect.stringContaining('edited') }),
    ]);
    expect(applyInitPlan(plan).applied).toBe(false);
    expect(fs.readFileSync(skill, 'utf8')).toContain('custom edit');
  });

  it('preserves unmanaged AGENTS.md text and is byte-stable on repeat', () => {
    const project = createProject('agents', ['@fluentui/react-components']);
    const agentsPath = path.join(project, 'AGENTS.md');
    const unmanaged = '# Existing project instructions\n\nKeep this text exactly.\n';
    fs.writeFileSync(agentsPath, unmanaged);

    const first = applyInitPlan(createInitPlan({ cwd: project }));
    const firstContents = snapshotOwnedFiles(project);
    const second = applyInitPlan(createInitPlan({ cwd: project }));
    const secondContents = snapshotOwnedFiles(project);

    expect(fs.readFileSync(agentsPath, 'utf8')).toMatch(new RegExp(`^${escapeRegex(unmanaged)}`));
    expect(first.applied).toBe(true);
    expect(second.applied).toBe(true);
    expect(second.files.created).toEqual([]);
    expect(second.files.updated).toEqual([]);
    expect(secondContents).toEqual(firstContents);
    expect(inspectProjectSetup(project).status).toBe('complete');
  });

  it.each([
    ['duplicate', `${AGENTS_BLOCK_START}\n${AGENTS_BLOCK_END}\n${AGENTS_BLOCK_START}\n${AGENTS_BLOCK_END}\n`],
    ['orphan', `${AGENTS_BLOCK_START}\n`],
  ])('rejects %s AGENTS.md markers', (_name, contents) => {
    const project = createProject(`agents-${_name}`, ['@fluentui/react-components']);
    const agentsPath = path.join(project, 'AGENTS.md');
    fs.writeFileSync(agentsPath, contents);

    const plan = createInitPlan({ cwd: project });

    expect(plan.receipt.files.conflicting).toContainEqual({
      path: agentsPath,
      reason: 'AGENTS.md has duplicate or orphaned Fluent UI markers.',
    });
    expect(plan.mutations).toEqual(expect.not.arrayContaining([expect.objectContaining({ path: agentsPath })]));
  });

  it('rejects symlink and managed-manifest path escapes', () => {
    const project = createProject('symlink', ['@fluentui/react-components']);
    const outside = path.join(fixtureRoot, 'outside');
    fs.mkdirSync(outside);
    fs.mkdirSync(path.join(project, '.agents'));
    fs.symlinkSync(outside, path.join(project, '.agents/skills'));

    expect(createInitPlan({ cwd: project }).receipt.files.conflicting).toEqual(
      expect.arrayContaining([expect.objectContaining({ reason: expect.stringContaining('symbolic link') })]),
    );

    fs.rmSync(path.join(project, '.agents'), { recursive: true, force: true });
    const skillRoot = path.join(project, '.agents/skills/fluentui');
    fs.mkdirSync(skillRoot, { recursive: true });
    writeJson(path.join(project, CONSUMER_SKILL_MANIFEST), {
      schemaVersion: 1,
      asset: '@fluentui/cli:fluentui-skill',
      version: '1',
      files: { '../escape.md': 'a'.repeat(64) },
    });
    expect(createInitPlan({ cwd: project }).receipt.files.conflicting).toEqual(
      expect.arrayContaining([expect.objectContaining({ reason: expect.stringContaining('Invalid managed skill') })]),
    );
  });

  it('rolls back every write when a commit fails', () => {
    const project = createProject('rollback', ['@fluentui/react-components']);
    const plan = createInitPlan({ cwd: project });
    const rename = fs.renameSync;
    let calls = 0;
    jest.spyOn(fs, 'renameSync').mockImplementation((from, to) => {
      calls++;
      if (calls === 2) {
        throw new Error('injected write failure');
      }
      return rename(from, to);
    });

    expect(() => applyInitPlan(plan)).toThrow(expect.objectContaining({ code: 'CLI_INIT_WRITE_FAILED' }));
    expect(fs.existsSync(path.join(project, 'AGENTS.md'))).toBe(false);
    expect(fs.existsSync(path.join(project, 'fluentui.config.json'))).toBe(false);
    expect(fs.existsSync(path.join(project, '.agents'))).toBe(false);
  });

  it('reports dry-run changes without writing', async () => {
    const project = createProject('dry-run', ['@fluentui/react-components']);

    await handler({ _: ['init'], $0: 'fluentui-cli', cwd: project, dryRun: true, json: true });

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.data).toEqual(expect.objectContaining({ dryRun: true, applied: false }));
    expect(output.data.files.created.length).toBeGreaterThan(0);
    expect(fs.existsSync(path.join(project, 'AGENTS.md'))).toBe(false);
    expect(fs.existsSync(path.join(project, 'fluentui.config.json'))).toBe(false);
  });

  it('discovers extension markers without reading or activating unapproved guidance', () => {
    const project = createExtensionProject('unapproved', false);
    fs.writeFileSync(extensionSource(project, 'fluentui-extension.json'), 'not JSON');
    const receipt = applyInitPlan(createInitPlan({ cwd: project }));
    expect(receipt.extensions).toEqual([]);
    expect(fs.existsSync(extensionCopy(project))).toBe(false);
    expect(inspectProjectSetup(project).extensions).toEqual({
      approved: [],
      available: [{ package: '@acme/ui', packageName: '@acme/ui', version: '1.0.0' }],
    });
  });

  it('installs an approved custom-only extension and preserves relative references', () => {
    const project = createExtensionProject('approved');
    const configBefore = fs.readFileSync(path.join(project, 'fluentui.config.json'), 'utf8');
    const receipt = applyInitPlan(createInitPlan({ cwd: project }));
    expect(receipt.systems).toEqual(['acme']);
    expect(receipt.extensions).toEqual([
      {
        package: '@acme/ui',
        packageName: '@acme/ui',
        version: '1.0.0',
        system: 'acme',
        skill: 'extensions/@acme/ui/guidance/SKILL.md',
      },
    ]);
    expect(fs.readFileSync(extensionCopy(project), 'utf8')).toContain('[Buttons](references/buttons.md)');
    expect(fs.readFileSync(path.join(path.dirname(extensionCopy(project)), 'references/buttons.md'), 'utf8')).toContain(
      'Button',
    );
    expect(fs.readFileSync(path.join(project, '.agents/skills/fluentui/references/extensions.md'), 'utf8')).toContain(
      '@acme/ui@1.0.0',
    );
    expect(fs.readFileSync(path.join(project, 'fluentui.config.json'), 'utf8')).toBe(configBefore);
    const repeat = applyInitPlan(createInitPlan({ cwd: project }));
    expect(repeat.files.updated).toEqual([]);
    expect(repeat.files.created).toEqual([]);
    expect(inspectProjectSetup(project).status).toBe('complete');
  });

  it('updates versioned package guidance only while the installed copy remains unedited', () => {
    const project = createExtensionProject('upgrade');
    applyInitPlan(createInitPlan({ cwd: project }));
    const manifestPath = extensionSource(project, 'package.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    writeJson(manifestPath, { ...manifest, version: '2.0.0' });
    fs.writeFileSync(extensionSource(project, 'guidance/SKILL.md'), '# Updated package guide\n');
    expect(inspectProjectSetup(project).skill.status).toBe('outdated');
    const update = applyInitPlan(createInitPlan({ cwd: project }));
    expect(update.extensions[0].version).toBe('2.0.0');
    expect(fs.readFileSync(extensionCopy(project), 'utf8')).toBe('# Updated package guide\n');

    fs.appendFileSync(extensionCopy(project), 'local changes\n');
    const blocked = createInitPlan({ cwd: project });
    expect(blocked.receipt.files.conflicting).toContainEqual(expect.objectContaining({ path: extensionCopy(project) }));
    expect(applyInitPlan(blocked).applied).toBe(false);
    expect(inspectProjectSetup(project).skill.status).toBe('edited');
  });

  it('revokes guidance without deleting user-edited files or changing catalogue registration', () => {
    const project = createExtensionProject('revoke');
    applyInitPlan(createInitPlan({ cwd: project }));
    const configPath = path.join(project, 'fluentui.config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    writeJson(configPath, { ...config, extensions: [] });
    fs.appendFileSync(extensionCopy(project), 'keep this edit\n');
    expect(applyInitPlan(createInitPlan({ cwd: project })).applied).toBe(false);
    fs.writeFileSync(extensionCopy(project), fs.readFileSync(extensionSource(project, 'guidance/SKILL.md')));
    expect(applyInitPlan(createInitPlan({ cwd: project })).applied).toBe(true);
    expect(fs.existsSync(extensionCopy(project))).toBe(false);
    expect(JSON.parse(fs.readFileSync(configPath, 'utf8')).systems.acme).toEqual(config.systems.acme);
    expect(inspectProjectSetup(project).status).toBe('complete');
  });

  it.each([
    ['escape', { schemaVersion: 1, system: 'acme', skill: '../outside.md' }],
    ['remote', { schemaVersion: 1, system: 'acme', skill: 'https://example.test/guide.md' }],
    ['code', { schemaVersion: 1, system: 'acme', skill: './guidance/SKILL.md', hooks: './execute.js' }],
    ['system', { schemaVersion: 1, system: 'other', skill: './guidance/SKILL.md' }],
    ['missing', { schemaVersion: 1, system: 'acme', skill: './missing.md' }],
  ])('rejects %s extension descriptors without writing', (name, descriptor) => {
    const project = createExtensionProject(name);
    writeJson(extensionSource(project, 'fluentui-extension.json'), descriptor);
    expect(() => createInitPlan({ cwd: project })).toThrow(
      expect.objectContaining({ code: 'CLI_INIT_EXTENSION_INVALID' }),
    );
    expect(fs.existsSync(path.join(project, '.agents'))).toBe(false);
  });

  it('rejects unexported descriptors, symlinked assets, and oversized guidance', () => {
    const project = createExtensionProject('asset-bounds');
    const manifestPath = extensionSource(project, 'package.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    writeJson(manifestPath, { ...manifest, exports: { '.': './index.js' } });
    expect(() => createInitPlan({ cwd: project })).toThrow(/string JSON export/);
    writeJson(manifestPath, manifest);

    const guide = extensionSource(project, 'guidance/SKILL.md');
    const outside = path.join(fixtureRoot, 'outside-guide.md');
    fs.writeFileSync(outside, 'outside');
    fs.unlinkSync(guide);
    fs.symlinkSync(outside, guide);
    expect(() => createInitPlan({ cwd: project })).toThrow(/symbolic links/);
    fs.unlinkSync(guide);
    fs.writeFileSync(guide, 'x'.repeat(128 * 1024 + 1));
    expect(() => createInitPlan({ cwd: project })).toThrow(/no larger than/);
    fs.unlinkSync(guide);
    fs.mkdirSync(guide);
    expect(() => createInitPlan({ cwd: project })).toThrow(/regular file/);
  });

  it('preserves npm alias identity without changing the descriptor system', () => {
    const project = createExtensionProject('alias');
    fs.renameSync(extensionSource(project, '.'), path.join(project, 'node_modules/acme-ui-alias'));
    writeJson(path.join(project, 'package.json'), {
      name: 'alias-consumer',
      dependencies: { 'acme-ui-alias': 'npm:@acme/ui@1.0.0' },
    });
    writeJson(path.join(project, 'fluentui.config.json'), {
      schemaVersion: 1,
      systems: { acme: { catalogs: [{ package: 'acme-ui-alias' }] } },
      extensions: ['acme-ui-alias'],
    });
    const receipt = applyInitPlan(createInitPlan({ cwd: project }));
    expect(receipt.extensions).toEqual([
      expect.objectContaining({
        package: 'acme-ui-alias',
        packageName: '@acme/ui',
        system: 'acme',
        skill: 'extensions/acme-ui-alias/guidance/SKILL.md',
      }),
    ]);
    expect(inspectProjectSetup(project).skill.status).toBe('current');
  });

  it('rejects case-colliding guidance paths before creating files', () => {
    const project = createExtensionProject('case-collision');
    writeJson(extensionSource(project, 'fluentui-extension.json'), {
      schemaVersion: 1,
      system: 'acme',
      skill: './guidance/SKILL.md',
      references: ['./guidance/skill.md'],
    });
    expect(() => createInitPlan({ cwd: project })).toThrow(/case-insensitive/);
    expect(fs.existsSync(path.join(project, '.agents'))).toBe(false);
  });

  it('rejects symlinked previously managed extension directories even after revocation', () => {
    const project = createExtensionProject('managed-link');
    applyInitPlan(createInitPlan({ cwd: project }));
    const directory = path.dirname(extensionCopy(project));
    const moved = path.join(fixtureRoot, 'moved-guidance');
    fs.renameSync(directory, moved);
    fs.symlinkSync(moved, directory);
    const configPath = path.join(project, 'fluentui.config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    writeJson(configPath, { ...config, extensions: [] });
    const plan = createInitPlan({ cwd: project });
    expect(plan.receipt.files.conflicting).toContainEqual(
      expect.objectContaining({ reason: expect.stringContaining('symbolic link') }),
    );
    expect(applyInitPlan(plan).applied).toBe(false);
    expect(inspectProjectSetup(project).status).toBe('conflict');
    expect(fs.existsSync(path.join(moved, 'SKILL.md'))).toBe(true);
  });

  it('enforces the exact per-file and aggregate Markdown byte bounds', () => {
    const project = createExtensionProject('aggregate');
    const fullFile = 'x'.repeat(128 * 1024);
    fs.writeFileSync(extensionSource(project, 'guidance/SKILL.md'), fullFile);
    const references = Array.from({ length: 15 }, (_, index) => `./guidance/reference-${index}.md`);
    for (const file of references) {
      fs.writeFileSync(extensionSource(project, file), fullFile);
    }
    const descriptor = { schemaVersion: 1, system: 'acme', skill: './guidance/SKILL.md', references };
    writeJson(extensionSource(project, 'fluentui-extension.json'), descriptor);
    expect(createInitPlan({ cwd: project }).receipt.files.conflicting).toEqual([]);
    fs.writeFileSync(extensionSource(project, 'guidance/extra.md'), 'x');
    writeJson(extensionSource(project, 'fluentui-extension.json'), {
      ...descriptor,
      references: [...references, './guidance/extra.md'],
    });
    expect(() => createInitPlan({ cwd: project })).toThrow(/2 MiB aggregate/);
    expect(fs.existsSync(path.join(project, '.agents'))).toBe(false);
  });

  it('rolls back ownership, generated index, and guide updates together', () => {
    const project = createExtensionProject('extension-rollback');
    applyInitPlan(createInitPlan({ cwd: project }));
    const files = [
      extensionCopy(project),
      path.join(project, CONSUMER_SKILL_MANIFEST),
      path.join(project, '.agents/skills/fluentui/references/extensions.md'),
    ];
    const before = files.map(file => fs.readFileSync(file, 'utf8'));
    fs.writeFileSync(extensionSource(project, 'guidance/SKILL.md'), '# New release\n');
    const plan = createInitPlan({ cwd: project });
    const rename = fs.renameSync;
    let count = 0;
    jest.spyOn(fs, 'renameSync').mockImplementation((from, to) => {
      if (++count === 2) {
        throw new Error('injected extension commit failure');
      }
      return rename(from, to);
    });
    expect(() => applyInitPlan(plan)).toThrow(expect.objectContaining({ code: 'CLI_INIT_WRITE_FAILED' }));
    expect(files.map(file => fs.readFileSync(file, 'utf8'))).toEqual(before);
  });
});

function createExtensionProject(name: string, approved = true): string {
  const project = createProject(`extension-${name}`, ['@acme/ui']);
  writeJson(extensionSource(project, 'package.json'), {
    name: '@acme/ui',
    version: '1.0.0',
    fluentuiCatalog: './metadata.json',
    fluentuiExtension: './fluentui-extension.json',
    exports: {
      '.': './index.js',
      './metadata.json': './dist/metadata/index.json',
      './fluentui-extension.json': './fluentui-extension.json',
    },
  });
  fs.writeFileSync(
    extensionSource(project, 'index.js'),
    'throw new Error("Package code must not execute during init");',
  );
  writeJson(extensionSource(project, 'fluentui-extension.json'), {
    schemaVersion: 1,
    system: 'acme',
    skill: './guidance/SKILL.md',
    references: ['./guidance/references/buttons.md'],
  });
  fs.mkdirSync(extensionSource(project, 'guidance/references'), { recursive: true });
  fs.writeFileSync(extensionSource(project, 'guidance/SKILL.md'), '# Acme guide\n\n[Buttons](references/buttons.md)\n');
  fs.writeFileSync(extensionSource(project, 'guidance/references/buttons.md'), '# Button\n');
  writeJson(path.join(project, 'fluentui.config.json'), {
    schemaVersion: 1,
    systems: { acme: { catalogs: [{ package: '@acme/ui' }] } },
    ...(approved ? { extensions: ['@acme/ui'] } : {}),
  });
  return project;
}

function extensionSource(project: string, file: string): string {
  return path.join(project, 'node_modules/@acme/ui', file);
}

function extensionCopy(project: string): string {
  return path.join(project, '.agents/skills/fluentui/extensions/@acme/ui/guidance/SKILL.md');
}

function createProject(name: string, dependencies: string[]): string {
  const project = path.join(fixtureRoot, name);
  fs.mkdirSync(project, { recursive: true });
  writeJson(path.join(project, 'package.json'), {
    name,
    private: true,
    dependencies: Object.fromEntries(dependencies.map(dependency => [dependency, '1.0.0'])),
  });
  fs.writeFileSync(path.join(project, 'package-lock.json'), '{}\n');
  for (const dependency of dependencies) {
    const packageRoot = path.join(project, 'node_modules', ...dependency.split('/'));
    fs.mkdirSync(packageRoot, { recursive: true });
    writeJson(path.join(packageRoot, 'package.json'), { name: dependency, version: '1.0.0', main: 'index.js' });
    fs.writeFileSync(path.join(packageRoot, 'index.js'), 'module.exports = {};\n');
  }
  return fs.realpathSync(project);
}

function writeJson(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(filePath: string): { systems?: unknown } {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as { systems?: unknown };
}

function snapshotOwnedFiles(project: string): Record<string, string> {
  const files = [
    'AGENTS.md',
    'fluentui.config.json',
    '.agents/skills/fluentui/.fluentui-cli.json',
    '.agents/skills/fluentui/SKILL.md',
    '.agents/skills/fluentui/references/api-lookup.md',
    '.agents/skills/fluentui/references/contracts.md',
  ];
  return Object.fromEntries(files.map(file => [file, fs.readFileSync(path.join(project, file), 'utf8')]));
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
