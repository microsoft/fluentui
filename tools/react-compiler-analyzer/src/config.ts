import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';

import Ajv, { type ErrorObject } from 'ajv';

import { compilePathAliases, findDeadAliases } from './module-resolver';
import type { RcaConfig, RiskConfig } from './types';
import { CliError } from './commands/shared';

export const DEFAULT_CONFIG_FILE = 'rca.config.json';

const schemaPath = join(__dirname, '..', 'rca.config.schema.json');
const validateConfig = new Ajv({ allErrors: true }).compile(JSON.parse(readFileSync(schemaPath, 'utf-8')));

export interface LoadedRcaConfig {
  config: RcaConfig;
  path: string | undefined;
}

export function resolveRcaConfigPath(configPath: string | undefined, cwd = process.cwd()): string {
  return configPath === undefined ? join(cwd, DEFAULT_CONFIG_FILE) : resolve(cwd, configPath);
}

/** Read and schema-validate a config without normalizing config-relative values. */
export function readRcaConfigFile(resolvedPath: string): RcaConfig {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(resolvedPath, 'utf-8'));
  } catch (error) {
    throw new CliError(`could not read RCA config '${resolvedPath}': ${(error as Error).message}`);
  }

  return validateRcaConfig(parsed, `'${resolvedPath}'`);
}

/** Validate an in-memory config against the same schema used at runtime. */
export function validateRcaConfig(config: unknown, source: string): RcaConfig {
  const valid = validateConfig(config);

  if (!valid) {
    const errors = (validateConfig.errors ?? [])
      .map((error: ErrorObject) => `${error.instancePath || '/'} ${error.message}`)
      .join('\n    ');
    throw new CliError(`invalid RCA config ${source}:\n    ${errors}`);
  }

  return config as RcaConfig;
}

/** Load an explicit config, or an optional `rca.config.json` in the current working directory. */
export function loadRcaConfig(configPath: string | undefined, cwd = process.cwd()): LoadedRcaConfig {
  const explicit = configPath !== undefined;
  const resolvedPath = resolveRcaConfigPath(configPath, cwd);

  if (!existsSync(resolvedPath) && !explicit) {
    return { config: {}, path: undefined };
  }

  const { $schema, ...config } = readRcaConfigFile(resolvedPath);
  const risks = normalizeRiskConfig(config.analyze?.risks, resolvedPath);
  const normalized: RcaConfig = {
    ...config,
    analyze: config.analyze && { ...config.analyze, risks },
  };

  return { config: normalized, path: resolvedPath };
}

function normalizeRiskConfig(riskConfig: RiskConfig | undefined, configPath: string): RiskConfig | undefined {
  if (!riskConfig) {
    return undefined;
  }

  let normalized = riskConfig;
  if (riskConfig.pathAliases) {
    const { baseUrl } = riskConfig.pathAliases;
    const absoluteBaseUrl = isAbsolute(baseUrl) ? baseUrl : resolve(dirname(configPath), baseUrl);
    if (!existsSync(absoluteBaseUrl)) {
      throw new CliError(
        `RCA config '${configPath}' has analyze.risks.pathAliases.baseUrl '${baseUrl}' which resolves to ` +
          `'${absoluteBaseUrl}', but that directory does not exist.`,
      );
    }
    normalized = {
      ...riskConfig,
      pathAliases: { ...riskConfig.pathAliases, baseUrl: absoluteBaseUrl },
    };
  }

  warnOnNoOpRiskConfig(normalized, configPath);
  return normalized;
}

function warnOnNoOpRiskConfig(config: RiskConfig, configPath: string): void {
  if (!config.resolveWrappers) {
    return;
  }

  const hasLeafRule =
    config.detectGetStateReads === true ||
    typeof config.storeAccessorPattern === 'string' ||
    (config.selectorHookProperties?.length ?? 0) > 0;

  if (!hasLeafRule) {
    console.warn(
      `Warning: RCA config '${configPath}' sets analyze.risks.resolveWrappers but enables no leaf rule ` +
        '(detectGetStateReads / storeAccessorPattern / selectorHookProperties), so wrapper resolution will not run.',
    );
  }
  if (!config.pathAliases) {
    console.warn(
      `Warning: RCA config '${configPath}' sets analyze.risks.resolveWrappers without pathAliases - wrappers ` +
        'imported through workspace aliases will not resolve. Relative imports still work.',
    );
    return;
  }

  const dead = findDeadAliases(compilePathAliases(config.pathAliases.paths, config.pathAliases.baseUrl));
  if (dead.length > 0) {
    console.warn(
      `Warning: RCA config '${configPath}' has ${dead.length} pathAlias(es) whose target directories do not exist, ` +
        `so they can never resolve: ${dead.map(alias => `${alias.prefix}* -> ${alias.targets.join(', ')}`).join('; ')}`,
    );
  }
}
