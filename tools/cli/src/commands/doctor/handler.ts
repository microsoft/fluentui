import type { CommandHandler } from '../../utils/types';
import { inspectCatalogs, type MetadataMode } from '../../utils/api-query';
import { createEnvelope, emitOutput, formatDiagnostics } from '../../utils/output';
import { markdownCode, markdownTable } from '../../utils/markdown';
import { inspectProjectSetup } from '../init/setup';

export interface DoctorArgs {
  cwd?: string;
  path?: string;
  config?: string;
  system?: string[];
  package?: string;
  metadataMode?: MetadataMode;
  deep?: boolean;
  json?: boolean;
  output?: string;
}

export const handler: CommandHandler<DoctorArgs> = async argv => {
  const result = await inspectCatalogs({
    cwd: argv.cwd ?? argv.path,
    config: argv.config,
    system: cleanStringArray(argv.system),
    package: argv.package,
    metadataMode: argv.metadataMode,
    deep: argv.deep,
  });
  const setup = inspectProjectSetup(argv.cwd ?? argv.path);
  const envelope = createEnvelope(
    'fluentui.doctor',
    {
      workspaceRoot: result.workspaceRoot,
      roots: result.roots,
      deep: Boolean(argv.deep),
      setup,
    },
    result.diagnostics,
    result.coverage,
    result.status,
  );

  emitOutput({ json: argv.json, output: argv.output }, envelope, value => {
    const sources = {
      dependency: argv.package ? 'package selector' : 'auto-discovered',
      config: 'configured',
      preset: 'built-in preset',
      local: 'configured local path',
    };
    return [
      '# Fluent UI catalog doctor',
      '',
      `**Status:** ${value.status}`,
      `**Workspace:** ${markdownCode(result.workspaceRoot)}`,
      '',
      '## Project setup',
      '',
      `**Setup status:** ${setup.status}`,
      '',
      ...markdownTable(
        ['Artifact', 'Status', 'Path'],
        [
          [
            'Configuration',
            `${setup.config.status}${setup.config.inherited ? ' (inherited)' : ''}`,
            markdownCode(setup.config.path),
          ],
          ['Consumer skill', setup.skill.status, markdownCode(setup.skill.path)],
          ['AGENTS.md pointer', setup.agents.status, markdownCode(setup.agents.path)],
        ],
      ),
      ...(setup.diagnostics.length ? ['', '### Setup diagnostics', '', formatDiagnostics(setup.diagnostics)] : []),
      ...(setup.extensions.available.length
        ? [
            '',
            '### Package guidance',
            '',
            ...markdownTable(
              ['Package', 'Approval'],
              setup.extensions.available.map(extension => [
                markdownCode(extension.package),
                setup.extensions.approved.includes(extension.package) ? 'approved in configuration' : 'not approved',
              ]),
            ),
            '',
            'Available guidance is never activated automatically. Approve packages in configuration before running init.',
          ]
        : []),
      '',
      'Setup consistency is reported independently from API catalog coverage and health.',
      '',
      '## API catalogs',
      '',
      ...markdownTable(
        ['Package', 'Authority', 'API coverage', 'Health', 'API records', 'Selected via', 'Systems'],
        result.roots.map(root => {
          const identity = markdownCode(`${root.package}${root.version ? `@${root.version}` : ''}`);
          return [
            root.requestedPackage === root.package
              ? identity
              : `${markdownCode(root.requestedPackage)} (alias of ${identity})`,
            root.authority,
            root.apiCoverage,
            root.status,
            argv.deep
              ? `${root.recordsChecked}/${root.recordsAdvertised} checked`
              : `Not checked (${root.recordsAdvertised} advertised)`,
            sources[root.source],
            root.systems.map(markdownCode).join(', ') || 'unassigned',
          ];
        }),
      ),
      '',
      'API coverage is declared by the catalog. Records are API metadata files, not individual components or props.',
      ...(argv.deep ? [] : ['Record validation was not requested; use `doctor --deep` to check the advertised files.']),
      'Selected via describes how a catalog was selected, not how the package was installed.',
      'Configured catalogs are explicit config entries; auto-discovered catalogs come from installed packages with metadata.',
      ...(value.diagnostics.length ? ['', '## Diagnostics', '', formatDiagnostics(value.diagnostics)] : []),
    ].join('\n');
  });

  if (result.status === 'unavailable') {
    process.exitCode = 1;
  }
};

function cleanStringArray(values: string[] | undefined): string[] | undefined {
  const filtered = values?.filter((value): value is string => typeof value === 'string' && value.length > 0);
  return filtered?.length ? filtered : undefined;
}
