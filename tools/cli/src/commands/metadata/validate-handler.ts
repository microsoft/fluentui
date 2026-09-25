import type { CommandHandler } from '../../utils/types';
import { CliError } from '../../utils/diagnostics';
import { createEnvelope, emitOutput, emptyCoverage, formatDiagnostics } from '../../utils/output';
import { validateMetadataInput } from './v1';
import { markdownCode } from '../../utils/markdown';

export interface MetadataValidateArgs {
  input?: string;
  json?: boolean;
  output?: string;
}

export const validateHandler: CommandHandler<MetadataValidateArgs> = async argv => {
  let result: ReturnType<typeof validateMetadataInput>;
  try {
    result = validateMetadataInput(argv.input ?? process.cwd());
  } catch (error) {
    if (error instanceof CliError) {
      throw error;
    }
    throw new CliError('CLI_METADATA_VALIDATE_FAILED', error instanceof Error ? error.message : String(error), 1);
  }
  const status = result.valid ? 'complete' : 'unavailable';
  const coverage = {
    ...emptyCoverage(status),
    selectedRoots: 1,
    metadataRoots: result.valid ? 1 : 0,
    unavailableRoots: result.valid ? 0 : 1,
  };
  const envelope = createEnvelope(
    'fluentui.metadata-validation',
    {
      input: result.input,
      kind: result.kind,
      package: result.package,
      recordsAdvertised: result.recordsAdvertised,
      recordsValidated: result.recordsValidated,
      valid: result.valid,
    },
    result.diagnostics,
    coverage,
    status,
  );

  emitOutput({ json: argv.json, output: argv.output }, envelope, value =>
    [
      '# API metadata validation',
      '',
      result.valid ? 'API metadata is valid.' : 'API metadata is invalid.',
      '',
      `- **Input:** ${markdownCode(result.input)}`,
      `- **Records validated:** ${result.recordsValidated}/${result.recordsAdvertised}`,
      ...(value.diagnostics.length ? ['', '## Diagnostics', '', formatDiagnostics(value.diagnostics)] : []),
    ].join('\n'),
  );

  if (!result.valid) {
    process.exitCode = 1;
  }
};
