import type { CommandHandler } from '../../utils/types';
import { createEnvelope, emitOutput, emptyCoverage } from '../../utils/output';
import { getRegisteredCommandManifest } from '../registry';
import { markdownCode, markdownTable } from '../../utils/markdown';

export interface ManifestArgs {
  json?: boolean;
  output?: string;
}

export const handler: CommandHandler<ManifestArgs> = async argv => {
  const manifest = getRegisteredCommandManifest();
  const envelope = createEnvelope('fluentui.command-manifest', manifest, [], emptyCoverage());
  emitOutput({ json: argv.json, output: argv.output }, envelope, value =>
    [
      '# Fluent UI CLI commands',
      ...value.data.commands.map(command => {
        const options = Object.entries(command.options).filter(([, option]) => !option.hidden);
        return [
          `## ${markdownCode(command.command)}`,
          '',
          command.description,
          '',
          ...(options.length
            ? [
                '### Options',
                '',
                ...markdownTable(
                  ['Option', 'Description'],
                  options.map(([name, option]) => [markdownCode(`--${name}`), option.describe]),
                ),
                '',
              ]
            : []),
          ...(command.subcommands?.length
            ? [
                '### Subcommands',
                '',
                ...command.subcommands.map(subcommand => `- ${markdownCode(subcommand.command)}`),
                '',
              ]
            : []),
          `**Responses:** ${command.responses.map(markdownCode).join(', ')}`,
          '',
          '### Exit codes',
          '',
          ...markdownTable(['Code', 'Meaning'], Object.entries(command.exits)),
        ].join('\n');
      }),
    ].join('\n\n'),
  );
};
