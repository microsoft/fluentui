import { createHash } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

import {
  CatalogConfigError,
  CATALOG_CONFIG_FILE,
  loadCatalogConfig,
  type LoadedCatalogConfig,
} from '../../utils/config';
import { CliError, type CliDiagnostic } from '../../utils/diagnostics';
import { getWorkspacePackageInventory } from '../../utils/package-inventory';
import { CATALOG_SYSTEM_PRESETS } from '../../utils/system-presets';
import { loadExtensionAssets, type ApprovedExtension } from './extensions';

export const CONSUMER_SKILL_VERSION = '3';
export const CONSUMER_SKILL_DIRECTORY = '.agents/skills/fluentui';
export const CONSUMER_SKILL_MANIFEST = `${CONSUMER_SKILL_DIRECTORY}/.fluentui-cli.json`;
export const AGENTS_FILE = 'AGENTS.md';
export const AGENTS_BLOCK_START = '<!-- fluentui-cli:init:start -->';
export const AGENTS_BLOCK_END = '<!-- fluentui-cli:init:end -->';

const MANAGED_ASSET = '@fluentui/cli:fluentui-skill';
const CANONICAL_FACADES: Readonly<Record<string, string>> = {
  'fluent-v9': '@fluentui/react-components',
  headless: '@fluentui/react-headless-components-preview',
};
const SKILL_FILES = [
  'SKILL.md',
  'references/api-lookup.md',
  'references/contracts.md',
  'references/extensions-contract.md',
] as const;
const CONFIG_SCHEMA_PATH = 'references/fluentui.config.schema.json';
const AGENTS_BLOCK = [
  AGENTS_BLOCK_START,
  '## Fluent UI agent guidance',
  '',
  'Use [the project-local Fluent UI skill](.agents/skills/fluentui/SKILL.md) before selecting or implementing Fluent UI APIs.',
  AGENTS_BLOCK_END,
].join('\n');

interface ManagedSkillManifest {
  schemaVersion: 1;
  asset: typeof MANAGED_ASSET;
  version: string;
  files: Record<string, string>;
}

interface SourceAssets {
  manifest: ManagedSkillManifest;
  files: Record<string, string>;
  extensions: ApprovedExtension[];
}

interface PlannedMutation {
  path: string;
  kind: 'write' | 'delete';
  content?: string;
}

export interface InitConflict {
  path: string;
  reason: string;
}

export interface InitFilesReceipt {
  created: string[];
  updated: string[];
  unchanged: string[];
  conflicting: InitConflict[];
}

export interface InitReceipt {
  projectRoot: string;
  workspaceRoot: string;
  configPath?: string;
  inheritedConfig: boolean;
  systems: string[];
  extensions: ApprovedExtension[];
  assetVersion: string;
  dryRun: boolean;
  applied: boolean;
  files: InitFilesReceipt;
}

export interface InitPlan {
  receipt: InitReceipt;
  mutations: PlannedMutation[];
}

export interface ProjectSetupReport {
  status: 'complete' | 'partial' | 'conflict';
  projectRoot: string;
  config: {
    status: 'current' | 'missing' | 'conflict';
    path: string;
    inherited: boolean;
  };
  skill: {
    status: 'current' | 'missing' | 'outdated' | 'edited' | 'unmanaged' | 'conflict';
    path: string;
    version?: string;
  };
  agents: {
    status: 'current' | 'missing' | 'edited' | 'malformed';
    path: string;
  };
  extensions: {
    approved: string[];
    available: Array<{ package: string; packageName: string; version?: string }>;
  };
  diagnostics: CliDiagnostic[];
}

export function createInitPlan(options: { cwd?: string; system?: string[]; dryRun?: boolean }): InitPlan {
  const requestedCwd = path.resolve(options.cwd ?? process.cwd());
  assertDirectory(requestedCwd);
  const inventory = getWorkspacePackageInventory(requestedCwd);
  if (!inventory.workspaceManifest) {
    throw new CliError(
      'CLI_INIT_PACKAGE_REQUIRED',
      `No package.json was found for the selected project at ${inventory.selectedPackageRoot}.`,
      1,
    );
  }

  const projectRoot = fs.realpathSync(inventory.selectedPackageRoot);
  const workspaceRoot = fs.realpathSync(inventory.workspaceRoot);
  assertWithin(workspaceRoot, projectRoot, 'Selected project is outside the workspace boundary');

  const loadedConfig = loadConfig(projectRoot, workspaceRoot);
  const installedFacades = new Set(
    inventory.packages
      .filter(candidate => Object.values(CANONICAL_FACADES).includes(candidate.requestedPackage))
      .map(candidate => candidate.requestedPackage),
  );
  const systems = selectSystems(options.system, loadedConfig, installedFacades);
  const assetRoot = findBundledSkillRoot();
  const assets = createSourceAssets(assetRoot, projectRoot, loadedConfig);
  const files = emptyFilesReceipt();
  const mutations: PlannedMutation[] = [];

  const configPath = loadedConfig?.path ?? path.join(projectRoot, CATALOG_CONFIG_FILE);
  if (loadedConfig) {
    files.unchanged.push(configPath);
  } else {
    planTextFile(
      projectRoot,
      configPath,
      `${JSON.stringify(
        {
          $schema: `./${CONSUMER_SKILL_DIRECTORY}/${CONFIG_SCHEMA_PATH}`,
          schemaVersion: 1,
          systems: Object.fromEntries(
            systems.map(system => [system, { catalogs: [{ package: CANONICAL_FACADES[system] }] }]),
          ),
        },
        null,
        2,
      )}\n`,
      files,
      mutations,
    );
  }

  planSkill(projectRoot, assets, files, mutations);
  planAgentsFile(projectRoot, files, mutations);
  sortReceipt(files);
  mutations.sort((left, right) => left.path.localeCompare(right.path));

  return {
    receipt: {
      projectRoot,
      workspaceRoot,
      configPath,
      inheritedConfig: Boolean(loadedConfig && path.dirname(loadedConfig.path) !== projectRoot),
      systems,
      extensions: assets.extensions,
      assetVersion: CONSUMER_SKILL_VERSION,
      dryRun: Boolean(options.dryRun),
      applied: false,
      files,
    },
    mutations,
  };
}

export function applyInitPlan(plan: InitPlan): InitReceipt {
  if (plan.receipt.files.conflicting.length > 0 || plan.receipt.dryRun) {
    return plan.receipt;
  }

  const snapshots = new Map<string, { existed: boolean; content?: Buffer; mode?: number }>();
  const temporaryFiles: string[] = [];
  const createdDirectories: string[] = [];
  const committed: string[] = [];

  try {
    for (const mutation of plan.mutations) {
      const stats = safeLstat(mutation.path);
      snapshots.set(mutation.path, {
        existed: Boolean(stats),
        ...(stats?.isFile() ? { content: fs.readFileSync(mutation.path), mode: stats.mode } : {}),
      });
      if (mutation.kind === 'write') {
        ensureParentDirectories(path.dirname(mutation.path), plan.receipt.projectRoot, createdDirectories);
        const temporaryPath = `${mutation.path}.fluentui-cli-${process.pid}-${temporaryFiles.length}.tmp`;
        if (fs.existsSync(temporaryPath)) {
          throw new Error(`Temporary path already exists: ${temporaryPath}`);
        }
        fs.writeFileSync(temporaryPath, mutation.content!, { encoding: 'utf8', mode: stats?.mode ?? 0o644 });
        temporaryFiles.push(temporaryPath);
      }
    }

    let temporaryIndex = 0;
    for (const mutation of plan.mutations) {
      if (mutation.kind === 'write') {
        fs.renameSync(temporaryFiles[temporaryIndex++], mutation.path);
      } else if (fs.existsSync(mutation.path)) {
        fs.unlinkSync(mutation.path);
      }
      committed.push(mutation.path);
    }
    plan.receipt.applied = true;
    return plan.receipt;
  } catch (error) {
    const rollbackErrors: string[] = [];
    for (const targetPath of committed.reverse()) {
      const snapshot = snapshots.get(targetPath)!;
      try {
        if (snapshot.existed) {
          fs.writeFileSync(targetPath, snapshot.content!);
          if (snapshot.mode !== undefined) {
            fs.chmodSync(targetPath, snapshot.mode);
          }
        } else if (fs.existsSync(targetPath)) {
          fs.unlinkSync(targetPath);
        }
      } catch (rollbackError) {
        rollbackErrors.push(`${targetPath}: ${messageOf(rollbackError)}`);
      }
    }
    for (const temporaryFile of temporaryFiles) {
      try {
        if (fs.existsSync(temporaryFile)) {
          fs.unlinkSync(temporaryFile);
        }
      } catch (cleanupError) {
        rollbackErrors.push(`${temporaryFile}: ${messageOf(cleanupError)}`);
      }
    }
    for (const directory of createdDirectories.reverse()) {
      try {
        fs.rmdirSync(directory);
      } catch {
        // A non-empty directory either pre-existed or contains restored content.
      }
    }
    throw new CliError(
      'CLI_INIT_WRITE_FAILED',
      `Unable to apply Fluent UI setup: ${messageOf(error)}${
        rollbackErrors.length ? ` Rollback also failed for ${rollbackErrors.join('; ')}` : ''
      }`,
      1,
    );
  }
}

export function inspectProjectSetup(cwd?: string): ProjectSetupReport {
  const requestedCwd = path.resolve(cwd ?? process.cwd());
  const diagnostics: CliDiagnostic[] = [];
  let inventory: ReturnType<typeof getWorkspacePackageInventory>;
  try {
    assertDirectory(requestedCwd);
    inventory = getWorkspacePackageInventory(requestedCwd);
  } catch (error) {
    return unavailableSetup(requestedCwd, messageOf(error));
  }
  const projectRoot = fs.existsSync(inventory.selectedPackageRoot)
    ? fs.realpathSync(inventory.selectedPackageRoot)
    : inventory.selectedPackageRoot;
  const workspaceRoot = fs.existsSync(inventory.workspaceRoot)
    ? fs.realpathSync(inventory.workspaceRoot)
    : inventory.workspaceRoot;
  let loadedConfig: LoadedCatalogConfig | undefined;
  let configStatus: ProjectSetupReport['config']['status'] = 'missing';
  let configPath = path.join(projectRoot, CATALOG_CONFIG_FILE);
  try {
    loadedConfig = loadCatalogConfig({ cwd: projectRoot, workspaceRoot });
    if (loadedConfig) {
      configStatus = 'current';
      configPath = loadedConfig.path;
    }
  } catch (error) {
    configStatus = 'conflict';
    diagnostics.push({
      code: error instanceof CatalogConfigError ? error.code : 'setup.configConflict',
      severity: 'error',
      message: messageOf(error),
      path: error instanceof CatalogConfigError ? error.path : configPath,
    });
  }

  const skill = inspectInstalledSkill(projectRoot, loadedConfig);
  diagnostics.push(...skill.diagnostics);
  const agents = inspectAgents(projectRoot);
  diagnostics.push(...agents.diagnostics);
  const hasConflict =
    configStatus === 'conflict' ||
    ['edited', 'unmanaged', 'conflict'].includes(skill.status) ||
    ['edited', 'malformed'].includes(agents.status);
  const complete = configStatus === 'current' && skill.status === 'current' && agents.status === 'current';

  return {
    status: hasConflict ? 'conflict' : complete ? 'complete' : 'partial',
    projectRoot,
    config: {
      status: configStatus,
      path: configPath,
      inherited: Boolean(loadedConfig && path.dirname(loadedConfig.path) !== projectRoot),
    },
    skill: { status: skill.status, path: skill.path, version: skill.version },
    agents: { status: agents.status, path: agents.path },
    extensions: {
      approved: loadedConfig?.config.extensions ?? [],
      available: inventory.packages
        .filter(candidate => typeof candidate.manifest.fluentuiExtension === 'string')
        .map(candidate => ({
          package: candidate.requestedPackage,
          packageName: candidate.packageName,
          version: candidate.version,
        })),
    },
    diagnostics,
  };
}

function selectSystems(
  requested: string[] | undefined,
  loadedConfig: LoadedCatalogConfig | undefined,
  installedFacades: Set<string>,
): string[] {
  const configured = loadedConfig?.config.systems ?? {};
  const names = requested?.filter(Boolean);
  const candidates =
    names && names.length > 0
      ? [...new Set(names)]
      : loadedConfig
      ? [
          ...new Set([
            ...Object.entries(configured)
              .filter(([, system]) => !system.disabled)
              .map(([name]) => name),
            ...Object.entries(CANONICAL_FACADES)
              .filter(([name, packageName]) => installedFacades.has(packageName) && configured[name]?.disabled !== true)
              .map(([name]) => name),
          ]),
        ]
      : Object.entries(CANONICAL_FACADES)
          .filter(([, packageName]) => installedFacades.has(packageName))
          .map(([name]) => name);

  for (const name of candidates) {
    if (configured[name]?.disabled) {
      throw prerequisite(`Fluent UI system "${name}" is disabled by ${loadedConfig!.path}.`);
    }
    if (configured[name]) {
      continue;
    }
    const facade = CANONICAL_FACADES[name];
    if (!facade || !CATALOG_SYSTEM_PRESETS[name]) {
      throw prerequisite(`Unknown Fluent UI system "${name}".`);
    }
    if (!installedFacades.has(facade)) {
      throw prerequisite(
        `System "${name}" requires the canonical facade ${facade} to be declared and installed in the selected project.`,
      );
    }
  }

  if (candidates.length === 0) {
    const expected = Object.values(CANONICAL_FACADES).join(' or ');
    throw prerequisite(
      `No canonical Fluent UI facade was found in the selected project. Declare and install ${expected}, or provide an enabled custom fluentui.config.json.`,
    );
  }
  return candidates.sort();
}

function planSkill(
  projectRoot: string,
  assets: SourceAssets,
  files: InitFilesReceipt,
  mutations: PlannedMutation[],
): void {
  const skillRoot = path.join(projectRoot, CONSUMER_SKILL_DIRECTORY);
  const manifestPath = path.join(projectRoot, CONSUMER_SKILL_MANIFEST);
  assertSafeTarget(projectRoot, manifestPath, files);
  for (const file of Object.keys(assets.files)) {
    assertSafeTarget(projectRoot, path.join(skillRoot, file), files);
  }
  if (files.conflicting.length > 0) {
    return;
  }

  const existingManifest = readManagedManifest(manifestPath, files);
  const skillExists = fs.existsSync(skillRoot);
  if (!existingManifest && skillExists && fs.readdirSync(skillRoot).length > 0) {
    files.conflicting.push({
      path: skillRoot,
      reason: 'The Fluent UI skill directory exists without @fluentui/cli ownership metadata.',
    });
    return;
  }
  if (existingManifest) {
    for (const file of Object.keys(assets.files)) {
      const target = path.join(skillRoot, file);
      if (!existingManifest.files[file] && fs.existsSync(target)) {
        files.conflicting.push({
          path: target,
          reason: 'A new bundled skill asset conflicts with an unowned existing file.',
        });
      }
    }
    for (const [relativePath, expectedHash] of Object.entries(existingManifest.files)) {
      const target = safeManagedPath(skillRoot, relativePath);
      if (target) {
        assertSafeTarget(projectRoot, target, files);
        if (files.conflicting.some(conflict => conflict.path === target)) {
          continue;
        }
      }
      if (!target || !fs.existsSync(target) || !safeLstat(target)?.isFile()) {
        files.conflicting.push({ path: target ?? skillRoot, reason: `Managed skill file is missing: ${relativePath}` });
        continue;
      }
      if (sha256(fs.readFileSync(target)) !== expectedHash) {
        files.conflicting.push({ path: target, reason: 'Managed skill content was edited after initialization.' });
      }
    }
  }
  if (files.conflicting.length > 0) {
    return;
  }

  for (const [file, content] of Object.entries(assets.files)) {
    const targetPath = path.join(skillRoot, file);
    planTextFile(projectRoot, targetPath, content, files, mutations);
  }
  if (existingManifest) {
    for (const oldFile of Object.keys(existingManifest.files)) {
      if (assets.manifest.files[oldFile]) {
        continue;
      }
      const oldPath = safeManagedPath(skillRoot, oldFile);
      if (oldPath && fs.existsSync(oldPath)) {
        files.updated.push(oldPath);
        mutations.push({ path: oldPath, kind: 'delete' });
      }
    }
  }
  planTextFile(projectRoot, manifestPath, `${JSON.stringify(assets.manifest, null, 2)}\n`, files, mutations);
}

function planAgentsFile(projectRoot: string, files: InitFilesReceipt, mutations: PlannedMutation[]): void {
  const agentsPath = path.join(projectRoot, AGENTS_FILE);
  assertSafeTarget(projectRoot, agentsPath, files);
  if (files.conflicting.some(conflict => conflict.path === agentsPath)) {
    return;
  }
  if (!fs.existsSync(agentsPath)) {
    planTextFile(projectRoot, agentsPath, `${AGENTS_BLOCK}\n`, files, mutations);
    return;
  }
  const current = readUtf8File(agentsPath);
  const startCount = countOccurrences(current, AGENTS_BLOCK_START);
  const endCount = countOccurrences(current, AGENTS_BLOCK_END);
  if (startCount !== endCount || startCount > 1) {
    files.conflicting.push({ path: agentsPath, reason: 'AGENTS.md has duplicate or orphaned Fluent UI markers.' });
    return;
  }
  if (startCount === 1) {
    const start = current.indexOf(AGENTS_BLOCK_START);
    const end = current.indexOf(AGENTS_BLOCK_END, start) + AGENTS_BLOCK_END.length;
    if (current.slice(start, end) !== AGENTS_BLOCK) {
      files.conflicting.push({ path: agentsPath, reason: 'The @fluentui/cli managed AGENTS.md block was edited.' });
    } else {
      files.unchanged.push(agentsPath);
    }
    return;
  }
  const separator = current.length === 0 ? '' : current.endsWith('\n\n') ? '' : current.endsWith('\n') ? '\n' : '\n\n';
  planTextFile(projectRoot, agentsPath, `${current}${separator}${AGENTS_BLOCK}\n`, files, mutations);
}

function planTextFile(
  projectRoot: string,
  targetPath: string,
  content: string,
  files: InitFilesReceipt,
  mutations: PlannedMutation[],
): void {
  assertSafeTarget(projectRoot, targetPath, files);
  if (files.conflicting.some(conflict => conflict.path === targetPath)) {
    return;
  }
  if (!fs.existsSync(targetPath)) {
    files.created.push(targetPath);
    mutations.push({ path: targetPath, kind: 'write', content });
    return;
  }
  const stats = safeLstat(targetPath);
  if (!stats?.isFile()) {
    files.conflicting.push({ path: targetPath, reason: 'Expected a regular file.' });
    return;
  }
  const current = readUtf8File(targetPath);
  if (current === content) {
    files.unchanged.push(targetPath);
  } else {
    files.updated.push(targetPath);
    mutations.push({ path: targetPath, kind: 'write', content });
  }
}

function assertSafeTarget(projectRoot: string, targetPath: string, files: InitFilesReceipt): void {
  const resolved = path.resolve(targetPath);
  try {
    assertWithin(projectRoot, resolved, 'Target path escapes the selected project');
    let current = resolved;
    while (current !== projectRoot) {
      const stats = safeLstat(current);
      if (stats?.isSymbolicLink()) {
        throw new Error(`Refusing to write through symbolic link ${current}`);
      }
      current = path.dirname(current);
    }
  } catch (error) {
    files.conflicting.push({ path: resolved, reason: messageOf(error) });
  }
}

function readManagedManifest(manifestPath: string, files: InitFilesReceipt): ManagedSkillManifest | undefined {
  if (!fs.existsSync(manifestPath)) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(readUtf8File(manifestPath)) as Partial<ManagedSkillManifest>;
    if (
      parsed.schemaVersion !== 1 ||
      parsed.asset !== MANAGED_ASSET ||
      typeof parsed.version !== 'string' ||
      !parsed.files ||
      typeof parsed.files !== 'object' ||
      Array.isArray(parsed.files)
    ) {
      throw new Error('Invalid managed skill manifest');
    }
    for (const [file, hash] of Object.entries(parsed.files)) {
      if (
        !safeManagedPath(path.dirname(manifestPath), file) ||
        typeof hash !== 'string' ||
        !/^[a-f0-9]{64}$/.test(hash)
      ) {
        throw new Error(`Invalid managed skill entry: ${file}`);
      }
    }
    return parsed as ManagedSkillManifest;
  } catch (error) {
    files.conflicting.push({ path: manifestPath, reason: messageOf(error) });
    return undefined;
  }
}

function createSourceAssets(assetRoot: string, projectRoot: string, config?: LoadedCatalogConfig): SourceAssets {
  const extensionAssets = loadExtensionAssets(projectRoot, config);
  const files: Record<string, string> = {
    ...extensionAssets.files,
    [CONFIG_SCHEMA_PATH]: readUtf8File(path.resolve(assetRoot, '../../schemas/fluentui.config.schema.json')),
    'references/extensions.md': extensionAssets.index,
  };
  for (const file of SKILL_FILES) {
    files[file] = readUtf8File(path.join(assetRoot, file));
  }
  return {
    files,
    extensions: extensionAssets.extensions,
    manifest: {
      schemaVersion: 1,
      asset: MANAGED_ASSET,
      version: CONSUMER_SKILL_VERSION,
      files: Object.fromEntries(Object.entries(files).map(([file, text]) => [file, sha256(Buffer.from(text))])),
    },
  };
}

function findBundledSkillRoot(): string {
  const candidates = [
    path.resolve(__dirname, '../../../../assets/consumer-skill'),
    path.resolve(__dirname, '../../../assets/consumer-skill'),
  ];
  for (const candidate of candidates) {
    if (SKILL_FILES.every(file => safeLstat(path.join(candidate, file))?.isFile())) {
      return fs.realpathSync(candidate);
    }
  }
  throw new CliError(
    'CLI_INIT_ASSETS_MISSING',
    `The bundled Fluent UI consumer skill is incomplete. Checked: ${candidates.join(', ')}`,
    1,
  );
}

function inspectInstalledSkill(
  projectRoot: string,
  config?: LoadedCatalogConfig,
): {
  status: ProjectSetupReport['skill']['status'];
  path: string;
  version?: string;
  diagnostics: CliDiagnostic[];
} {
  const skillRoot = path.join(projectRoot, CONSUMER_SKILL_DIRECTORY);
  const manifestPath = path.join(projectRoot, CONSUMER_SKILL_MANIFEST);
  const diagnostics: CliDiagnostic[] = [];
  if (!fs.existsSync(skillRoot)) {
    return { status: 'missing', path: skillRoot, diagnostics };
  }
  if (!fs.existsSync(manifestPath)) {
    return {
      status: 'unmanaged',
      path: skillRoot,
      diagnostics: [
        {
          code: 'setup.skillUnmanaged',
          severity: 'error',
          message: 'The Fluent UI skill exists without @fluentui/cli ownership metadata.',
          path: skillRoot,
        },
      ],
    };
  }
  const receipt = emptyFilesReceipt();
  assertSafeTarget(projectRoot, manifestPath, receipt);
  if (receipt.conflicting.length) {
    return {
      status: 'conflict',
      path: skillRoot,
      diagnostics: receipt.conflicting.map(conflict => ({
        code: 'setup.skillPathInvalid',
        severity: 'error',
        message: conflict.reason,
        path: conflict.path,
      })),
    };
  }
  const manifest = readManagedManifest(manifestPath, receipt);
  if (!manifest) {
    return {
      status: 'conflict',
      path: skillRoot,
      diagnostics: receipt.conflicting.map(conflict => ({
        code: 'setup.skillManifestInvalid',
        severity: 'error',
        message: conflict.reason,
        path: conflict.path,
      })),
    };
  }
  for (const [file, expectedHash] of Object.entries(manifest.files)) {
    const target = safeManagedPath(skillRoot, file);
    if (target) {
      assertSafeTarget(projectRoot, target, receipt);
    }
    if (
      !target ||
      receipt.conflicting.some(conflict => conflict.path === target) ||
      !safeLstat(target)?.isFile() ||
      sha256(fs.readFileSync(target)) !== expectedHash
    ) {
      diagnostics.push({
        code: 'setup.skillEdited',
        severity: 'error',
        message: `Managed Fluent UI skill file is missing or edited: ${file}`,
        path: target ?? skillRoot,
      });
    }
  }
  if (diagnostics.length === 0) {
    try {
      const bundled = createSourceAssets(findBundledSkillRoot(), projectRoot, config).manifest;
      if (manifest.version !== bundled.version || JSON.stringify(manifest.files) !== JSON.stringify(bundled.files)) {
        return {
          status: 'outdated',
          path: skillRoot,
          version: manifest.version,
          diagnostics: [
            {
              code: 'setup.skillOutdated',
              severity: 'warning',
              message: `The managed Fluent UI skill is version ${manifest.version}; run fluentui-cli init to update it to ${bundled.version}.`,
              path: skillRoot,
            },
          ],
        };
      }
    } catch (error) {
      diagnostics.push({
        code: error instanceof CliError ? error.code : 'setup.skillAssetsUnavailable',
        severity: 'error',
        message: messageOf(error),
        path: skillRoot,
      });
      return { status: 'conflict', path: skillRoot, version: manifest.version, diagnostics };
    }
  }
  return {
    status: diagnostics.length ? 'edited' : 'current',
    path: skillRoot,
    version: manifest.version,
    diagnostics,
  };
}

function inspectAgents(projectRoot: string): {
  status: ProjectSetupReport['agents']['status'];
  path: string;
  diagnostics: CliDiagnostic[];
} {
  const agentsPath = path.join(projectRoot, AGENTS_FILE);
  if (!fs.existsSync(agentsPath)) {
    return { status: 'missing', path: agentsPath, diagnostics: [] };
  }
  const content = readUtf8File(agentsPath);
  const starts = countOccurrences(content, AGENTS_BLOCK_START);
  const ends = countOccurrences(content, AGENTS_BLOCK_END);
  if (starts !== 1 || ends !== 1) {
    return {
      status: starts === 0 && ends === 0 ? 'missing' : 'malformed',
      path: agentsPath,
      diagnostics:
        starts === 0 && ends === 0
          ? []
          : [
              {
                code: 'setup.agentsMalformed',
                severity: 'error',
                message: 'AGENTS.md has duplicate or orphaned Fluent UI markers.',
                path: agentsPath,
              },
            ],
    };
  }
  const start = content.indexOf(AGENTS_BLOCK_START);
  const end = content.indexOf(AGENTS_BLOCK_END, start) + AGENTS_BLOCK_END.length;
  const current = content.slice(start, end);
  return current === AGENTS_BLOCK
    ? { status: 'current', path: agentsPath, diagnostics: [] }
    : {
        status: 'edited',
        path: agentsPath,
        diagnostics: [
          {
            code: 'setup.agentsEdited',
            severity: 'error',
            message: 'The @fluentui/cli managed AGENTS.md block was edited.',
            path: agentsPath,
          },
        ],
      };
}

function unavailableSetup(projectRoot: string, message: string): ProjectSetupReport {
  return {
    status: 'conflict',
    projectRoot,
    config: { status: 'conflict', path: path.join(projectRoot, CATALOG_CONFIG_FILE), inherited: false },
    skill: { status: 'conflict', path: path.join(projectRoot, CONSUMER_SKILL_DIRECTORY) },
    agents: { status: 'malformed', path: path.join(projectRoot, AGENTS_FILE) },
    extensions: { approved: [], available: [] },
    diagnostics: [{ code: 'setup.unavailable', severity: 'error', message, path: projectRoot }],
  };
}

function loadConfig(projectRoot: string, workspaceRoot: string): LoadedCatalogConfig | undefined {
  try {
    return loadCatalogConfig({ cwd: projectRoot, workspaceRoot });
  } catch (error) {
    if (error instanceof CatalogConfigError) {
      throw new CliError(error.code, error.message, 1, [
        { code: error.code, severity: 'error', message: error.message, path: error.path },
      ]);
    }
    throw error;
  }
}

function safeManagedPath(root: string, relativePath: string): string | undefined {
  if (!relativePath || path.isAbsolute(relativePath)) {
    return undefined;
  }
  const resolved = path.resolve(root, relativePath);
  try {
    assertWithin(root, resolved, 'Managed skill path escapes its directory');
    return resolved;
  } catch {
    return undefined;
  }
}

function ensureParentDirectories(directory: string, boundary: string, created: string[]): void {
  assertWithin(boundary, directory, 'Parent directory escapes the selected project');
  const missing: string[] = [];
  let current = directory;
  while (!fs.existsSync(current)) {
    missing.push(current);
    current = path.dirname(current);
  }
  if (!safeLstat(current)?.isDirectory()) {
    throw new Error(`Parent path is not a directory: ${current}`);
  }
  for (const item of missing.reverse()) {
    fs.mkdirSync(item);
    created.push(item);
  }
}

function assertDirectory(directory: string): void {
  const stats = safeLstat(directory);
  if (!stats?.isDirectory()) {
    throw new CliError('CLI_INIT_CWD_INVALID', `Selected cwd is not a directory: ${directory}`, 2);
  }
}

function assertWithin(parent: string, child: string, message: string): void {
  const relation = path.relative(path.resolve(parent), path.resolve(child));
  if (relation.startsWith('..') || path.isAbsolute(relation)) {
    throw new Error(`${message}: ${child}`);
  }
}

function readUtf8File(filePath: string): string {
  const content = fs.readFileSync(filePath);
  const text = content.toString('utf8');
  if (!Buffer.from(text, 'utf8').equals(content)) {
    throw new Error(`Expected UTF-8 text file: ${filePath}`);
  }
  return text;
}

function safeLstat(filePath: string): fs.Stats | undefined {
  try {
    return fs.lstatSync(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }
}

function sha256(content: Buffer): string {
  return createHash('sha256').update(content).digest('hex');
}

function countOccurrences(content: string, value: string): number {
  return content.split(value).length - 1;
}

function prerequisite(message: string): CliError {
  return new CliError('CLI_INIT_PREREQUISITE', message, 1, [
    {
      code: 'CLI_INIT_PREREQUISITE',
      severity: 'error',
      message,
      hint: 'Init never installs dependencies. Update the selected project, then run init again.',
    },
  ]);
}

function emptyFilesReceipt(): InitFilesReceipt {
  return { created: [], updated: [], unchanged: [], conflicting: [] };
}

function sortReceipt(files: InitFilesReceipt): void {
  files.created.sort();
  files.updated.sort();
  files.unchanged.sort();
  files.conflicting.sort(
    (left, right) => left.path.localeCompare(right.path) || left.reason.localeCompare(right.reason),
  );
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
