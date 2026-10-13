import type { CommandHandler } from '../../utils/types';
import type { CatalogSelectionOptions } from '../../utils/catalog-inventory';
import type { CacheStatusResult, CatalogBuildProgress } from '../../utils/catalog-cache';
import { CliError, type CliCoverage, type CliDiagnostic } from '../../utils/diagnostics';
import { createEnvelope, emitOutput, formatDiagnostics } from '../../utils/output';
import { markdownCode, markdownTable } from '../../utils/markdown';
import { withCliProgress } from '../../utils/progress';

interface CacheArgs extends CatalogSelectionOptions {
  path?: string;
  json?: boolean;
  output?: string;
  force?: boolean;
}

type CacheOperation = 'status' | 'build' | 'clear';

export const cacheStatusHandler: CommandHandler<CacheArgs> = async argv => {
  const result = await runService('STATUS', async () => {
    const { inspectCatalogCache } = await import('../../utils/catalog-cache');
    return inspectCatalogCache(getSelection(argv));
  });
  emitCacheResult('status', result, argv);
};

export const cacheBuildHandler: CommandHandler<CacheArgs> = async argv => {
  const enabled = !argv.json && !argv.output;
  const result = await withCliProgress(
    'Building installed API catalog caches',
    progress =>
      runService('BUILD', async () => {
        const started = performance.now();
        const built = new Set<string>();
        const reused = new Set<string>();
        const onProgress = (event: CatalogBuildProgress) => {
          if (event.phase === 'generating') {
            progress.update(`Generating ${event.package} from declarations...`);
          } else if (event.phase === 'writing') {
            progress.update(`Writing ${event.package}: ${event.records ?? 0} records...`);
          } else if (event.phase === 'waiting') {
            progress.update(`Waiting for the existing ${event.package} build...`);
          } else if (event.phase === 'reused') {
            reused.add(event.packageRoot);
            progress.update(`Using ${event.source === 'metadata' ? 'shipped' : 'cached'} metadata: ${event.package}`);
          } else if (event.phase === 'ready') {
            built.add(event.packageRoot);
            progress.log(
              `${event.package}: ${event.records ?? 0} records generated in ${formatDuration(event.elapsedMs ?? 0)}`,
            );
          } else if (event.phase === 'failed') {
            progress.log(`${event.package}: build failed after ${formatDuration(event.elapsedMs ?? 0)}`);
          }
        };
        const { buildCatalogCache } = await import('../../utils/catalog-cache');
        const buildResult = await buildCatalogCache({
          ...getSelection(argv),
          force: argv.force,
          ...(enabled ? { onProgress } : {}),
        });
        if (enabled) {
          const incomplete = buildResult.packages.filter(entry => entry.state !== 'ready').length;
          progress.log(
            `Cache build ${incomplete ? 'incomplete' : 'finished'} in ${formatDuration(performance.now() - started)} (${
              built.size
            } built, ${reused.size} reused${incomplete ? `, ${incomplete} not ready` : ''})`,
          );
        }
        return buildResult;
      }),
    { enabled },
  );
  const failed = result.packages.filter(entry => entry.state !== 'ready');
  if (failed.length) {
    const diagnostics = cacheDiagnostics(result).map(diagnostic => ({ ...diagnostic, severity: 'error' as const }));
    throw new CliError(
      'CACHE_BUILD_FAILED',
      `Failed to build ${failed.length} installed API catalog cache${failed.length === 1 ? '' : 's'}`,
      1,
      diagnostics,
      result,
      cacheCoverage(result),
    );
  }
  emitCacheResult('build', result, argv);
};

function formatDuration(elapsedMs: number): string {
  if (elapsedMs < 60_000) {
    return `${(elapsedMs / 1000).toFixed(1)}s`;
  }
  const seconds = Math.round(elapsedMs / 1000);
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

export const cacheClearHandler: CommandHandler<CacheArgs> = async argv => {
  const result = await runService('CLEAR', async () => {
    const { clearCatalogCache } = await import('../../utils/catalog-cache');
    return clearCatalogCache(getSelection(argv));
  });
  emitCacheResult('clear', result, argv);
};

function getSelection(argv: CacheArgs): CatalogSelectionOptions {
  const system = argv.system?.filter(value => value.length > 0);
  return {
    cwd: argv.cwd ?? argv.path,
    config: argv.config,
    system: system?.length ? system : undefined,
    package: argv.package,
    metadataMode: argv.metadataMode,
  };
}

async function runService<Result>(operation: string, action: () => Result | Promise<Result>): Promise<Result> {
  try {
    return await action();
  } catch (error) {
    if (error instanceof CliError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    const code = `CACHE_${operation}_FAILED`;
    throw new CliError(code, message, 1, [{ code, severity: 'error', message }]);
  }
}

function emitCacheResult(operation: CacheOperation, result: CacheStatusResult, options: CacheArgs): void {
  const coverage = cacheCoverage(result);
  const envelope = createEnvelope(
    `fluentui.cache-${operation}`,
    result,
    cacheDiagnostics(result),
    coverage,
    coverage.status,
  );
  emitOutput({ json: options.json, output: options.output }, envelope, () => formatCacheResult(operation, result));
}

function cacheCoverage(result: CacheStatusResult): CliCoverage {
  const failed = result.packages.filter(entry => entry.state === 'failed').length;
  const pending = result.packages.some(entry => entry.state === 'building' || entry.state === 'stale');
  const status =
    failed === result.packages.length && failed > 0 ? 'unavailable' : failed || pending ? 'partial' : 'complete';
  return {
    status,
    selectedRoots: result.packages.length,
    metadataRoots: result.packages.filter(entry => entry.source === 'metadata').length,
    declarationFallbackRoots: result.packages.filter(entry => entry.source === 'declarations').length,
    unavailableRoots: failed,
  };
}

function cacheDiagnostics(result: CacheStatusResult): CliDiagnostic[] {
  return result.packages.flatMap(entry => {
    if (entry.state === 'ready') {
      return [];
    }
    return [
      {
        code: `CACHE_${entry.state.toUpperCase()}`,
        severity: entry.state === 'failed' ? 'error' : entry.state === 'building' ? 'info' : 'warning',
        message: entry.error ?? `Catalog cache is ${entry.state}`,
        package: entry.package,
        path: entry.packageRoot,
      },
    ];
  });
}

function formatCacheResult(operation: CacheOperation, result: CacheStatusResult): string {
  const active = result.packages.filter(entry => entry.state === 'building');
  const lines = [
    `# API catalog cache ${operation}`,
    '',
    `**Workspace:** ${markdownCode(result.workspaceRoot)}`,
    `**Cache root:** ${markdownCode(result.cacheRoot)}`,
    ...(operation === 'clear' ? ['**Action:** Selected catalog caches cleared.'] : []),
    `**Active builds:** ${active.length}`,
    '',
    '## Catalogs',
    '',
    ...markdownTable(
      ['Package', 'Package root', 'Source', 'Readiness', 'Records', 'Error'],
      result.packages.map(entry => [
        entry.requestedPackage === entry.package
          ? markdownCode(entry.package)
          : `${markdownCode(entry.requestedPackage)} -> ${markdownCode(entry.package)}`,
        markdownCode(entry.packageRoot),
        entry.source,
        entry.state,
        String(entry.records),
        entry.error ?? '-',
      ]),
    ),
    '',
    '## Active builds',
    '',
    ...(active.length
      ? active.map(entry => `- ${markdownCode(entry.requestedPackage)} at ${markdownCode(entry.packageRoot)}`)
      : ['- None']),
  ];
  const diagnostics = cacheDiagnostics(result);
  if (diagnostics.length) {
    lines.push('', '## Diagnostics', '', formatDiagnostics(diagnostics));
  }
  return lines.join('\n');
}
