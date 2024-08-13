import { tree } from '@fluentui/scripts-monorepo';
import { createProjectGraphAsync, readNxJson } from '@nx/devkit';
import * as yargs from 'yargs';

import { PublishArgs, publish } from './publish';
import { getNorthstarGroup } from './utils';
import { VersionArgs, version } from './version';

export async function main() {
  const { options, command, specifier } = processArgs();

  const graph = await createProjectGraphAsync();
  const nxConfig = readNxJson(tree);
  const northstarGroup = getNorthstarGroup(graph);

  if (!nxConfig) {
    throw new Error(`nx.json doesn't exist at root of workspace`);
  }

  if (command === 'version') {
    await version({ args: { specifier, ...options } as VersionArgs, graph, group: northstarGroup, nxConfig });
    process.exit(0);
  }

  if (command === 'publish') {
    await publish({ args: options as PublishArgs, group: northstarGroup, nxConfig });
    process.exit(0);
  }

  throw new Error('unknown command specified');
}

function processArgs() {
  const args = yargs
    .version(false) // don't use the default meaning of version in yargs
    .scriptName('northstar-release')
    .command('version <specifier>', 'bump version', _yargs => {
      yargs
        .positional('specifier', {
          description: 'Explicit version specifier to use, if overriding conventional commits',
          type: 'string',
          choices: ['patch', 'minor'],
          demandOption: true,
        })
        .option('dryRun', {
          alias: 'd',
          description: 'Whether or not to perform a dry-run of the release process, defaults to false',
          type: 'boolean',
          default: false,
        })
        .option('verbose', {
          description: 'Whether or not to enable verbose logging, defaults to false',
          type: 'boolean',
          default: false,
        });
    })
    .command('publish', 'publish version to npm', _yargs => {
      yargs
        .option('dryRun', {
          alias: 'd',
          description: 'Whether or not to perform a dry-run of the release process, defaults to false',
          type: 'boolean',
          default: false,
        })
        .option('verbose', {
          description: 'Whether or not to enable verbose logging, defaults to false',
          type: 'boolean',
          default: false,
        });
    })
    .demandCommand()
    .strict()
    .help().argv;

  const { _, $0, ...options } = args;
  const [command, specifier] = _;

  return { command, options, specifier };
}
