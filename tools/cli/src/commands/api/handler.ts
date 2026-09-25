import type { CommandHandler } from '../../utils/types';
import { queryApi, type ApiRouteSummary, type ApiSymbolDetail, type MetadataMode } from '../../utils/api-query';
import { formatApiDetail, formatApiIndex } from '../../utils/api-format';
import { createDenseApiDetail, createDenseApiIndex } from '../../utils/api-dense';
import { createEnvelope, emitOutput } from '../../utils/output';

export interface ApiArgs {
  symbol?: string;
  cwd?: string;
  path?: string;
  config?: string;
  system?: string[];
  from?: string;
  package?: string;
  entrypoint?: string;
  namespace?: 'type' | 'value';
  metadataMode?: MetadataMode;
  json?: boolean;
  dense?: boolean;
  output?: string;
  verbose?: boolean;
  includeInherited?: boolean;
  expandTypes?: boolean;
}

export const handler: CommandHandler<ApiArgs> = async argv => {
  const result = await queryApi({
    symbol: argv.symbol,
    cwd: argv.cwd ?? argv.path,
    config: argv.config,
    system: cleanStringArray(argv.system),
    from: argv.from,
    package: argv.package,
    entrypoint: argv.entrypoint,
    namespace: argv.namespace,
    metadataMode: argv.metadataMode,
  });
  if (argv.json && argv.dense) {
    const options = { verbose: argv.verbose, includeInherited: argv.includeInherited, expandTypes: argv.expandTypes };
    const envelope = createEnvelope(
      result.kind === 'index' ? 'fluentui.api-index.dense' : 'fluentui.api-detail.dense',
      {
        ...(argv.verbose ? { workspaceRoot: result.workspaceRoot } : {}),
        result:
          result.kind === 'index'
            ? createDenseApiIndex(result.data as ApiRouteSummary[], options)
            : createDenseApiDetail(result.data as ApiSymbolDetail, options),
      },
      result.diagnostics,
      result.coverage,
      result.status,
    );
    emitOutput({ json: true, output: argv.output }, envelope, () => '');
    return;
  }
  const envelope = createEnvelope(
    result.kind === 'index' ? 'fluentui.api-index' : 'fluentui.api-detail',
    {
      workspaceRoot: result.workspaceRoot,
      result: result.data,
    },
    result.diagnostics,
    result.coverage,
    result.status,
  );

  emitOutput({ json: argv.json, output: argv.output }, envelope, value => {
    if (result.kind === 'index') {
      return formatApiIndex(result.data as ApiRouteSummary[], value.diagnostics, argv.verbose);
    }
    return formatApiDetail(
      result.data as ApiSymbolDetail,
      value.diagnostics,
      argv.verbose,
      argv.includeInherited,
      argv.expandTypes,
    );
  });
};

function cleanStringArray(values: string[] | undefined): string[] | undefined {
  const filtered = values?.filter((value): value is string => typeof value === 'string' && value.length > 0);
  return filtered?.length ? filtered : undefined;
}
