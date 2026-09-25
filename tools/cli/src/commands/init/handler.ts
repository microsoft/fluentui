import type { CommandHandler } from '../../utils/types';
import { createEnvelope, emitOutput, emptyCoverage, formatDiagnostics } from '../../utils/output';
import { markdownCode, markdownTable } from '../../utils/markdown';
import { applyInitPlan, createInitPlan } from './setup';

export interface InitArgs {
  cwd?: string;
  system?: string[];
  dryRun?: boolean;
  json?: boolean;
}

export const handler: CommandHandler<InitArgs> = async argv => {
  const plan = createInitPlan({
    cwd: argv.cwd,
    system: cleanStringArray(argv.system),
    dryRun: argv.dryRun,
  });
  const receipt = applyInitPlan(plan);
  const diagnostics = receipt.files.conflicting.map(conflict => ({
    code: 'setup.conflict',
    severity: 'error' as const,
    message: conflict.reason,
    path: conflict.path,
  }));
  const status = diagnostics.length ? 'unavailable' : 'complete';
  const envelope = createEnvelope('fluentui.init', receipt, diagnostics, emptyCoverage(status), status);

  emitOutput({ json: argv.json }, envelope, value => {
    const rows = [
      ...receipt.files.created.map(file => ['created', markdownCode(file)]),
      ...receipt.files.updated.map(file => ['updated', markdownCode(file)]),
      ...receipt.files.unchanged.map(file => ['unchanged', markdownCode(file)]),
      ...receipt.files.conflicting.map(file => ['conflicting', markdownCode(file.path)]),
    ];
    return [
      '# Fluent UI project initialization',
      '',
      `**Project:** ${markdownCode(receipt.projectRoot)}`,
      `**Systems:** ${receipt.systems.map(markdownCode).join(', ')}`,
      ...(receipt.extensions.length
        ? [
            `**Approved extensions:** ${receipt.extensions
              .map(extension => markdownCode(`${extension.package}@${extension.version}`))
              .join(', ')}`,
          ]
        : []),
      `**Mode:** ${receipt.dryRun ? 'dry run' : receipt.applied ? 'applied' : 'not applied'}`,
      '',
      ...markdownTable(['State', 'File'], rows),
      ...(value.diagnostics.length ? ['', '## Diagnostics', '', formatDiagnostics(value.diagnostics)] : []),
    ].join('\n');
  });

  if (diagnostics.length) {
    process.exitCode = 1;
  }
};

function cleanStringArray(values: string[] | undefined): string[] | undefined {
  const filtered = values?.filter((value): value is string => typeof value === 'string' && value.length > 0);
  return filtered?.length ? filtered : undefined;
}
