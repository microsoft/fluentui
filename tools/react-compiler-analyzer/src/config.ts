import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import Ajv, { type ErrorObject } from 'ajv';

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
  if (typeof config === 'object' && config !== null) {
    if ('parserPlugins' in config) {
      throw new CliError(
        `invalid RCA config ${source}: parserPlugins was removed. Oxc selects native TypeScript/JSX grammar by file extension; remove parserPlugins. Babel-only proposals and Flow are unsupported.`,
      );
    }
    const risks = (config as RcaConfig).analyze?.risks;
    if (typeof risks === 'object' && risks !== null && 'pathAliases' in risks) {
      throw new CliError(
        `invalid RCA config ${source}: analyze.risks.pathAliases was removed. Move aliases to the importing project's tsconfig paths or package.json exports/imports; Oxc discovers them per file.`,
      );
    }
  }
  const valid = validateConfig(config);

  if (!valid) {
    const errors = (validateConfig.errors ?? [])
      .map((error: ErrorObject) => `${error.instancePath || '/'} ${error.message}`)
      .join('\n    ');
    throw new CliError(`invalid RCA config ${source}:\n    ${errors}`);
  }

  const validated = config as RcaConfig;
  const pattern = validated.analyze?.risks?.storeAccessorPattern;
  if (pattern !== undefined) {
    try {
      RegExp(pattern);
    } catch (error) {
      throw new CliError(
        `invalid RCA config ${source}: analyze.risks.storeAccessorPattern is not a valid regex: ${
          (error as Error).message
        }`,
      );
    }
  }

  return validated;
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

  warnOnNoOpRiskConfig(riskConfig, configPath);
  return riskConfig;
}

function warnOnNoOpRiskConfig(config: RiskConfig, configPath: string): void {
  if (config.resolveWrappers !== true) {
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
}
