import { join } from 'node:path';
import { cwd } from 'node:process';
import yargs from 'yargs';

import type { Args, StorybookRef } from './types';
import { extractStorybookData, writeSummaryFile, writeFullDocsFiles } from './utils';

main().catch(reason => {
  console.error(reason);
  process.exit(1);
});

async function main() {
  console.log(`━━ Storybook LLM Docs Generator ━━`);

  const args = await processArgs();

  console.log(`ℹ️ Storybook dist path: ${args.distPath}`);

  const data = await extractStorybookData(args);

  // Write summary/llms.txt file
  await writeSummaryFile(args, data);

  // Write per component/page files
  await writeFullDocsFiles(args, data);

  console.log(`✅ LLMs docs generation complete.`);
  console.log(`ℹ️ You can find the generated files in the Storybook dist folder: ${args.distPath}`);
}

/**
 * Type guard for StorybookRef
 */
function isStorybookRef(obj: unknown): obj is StorybookRef {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    typeof obj.title === 'string' &&
    'url' in obj &&
    typeof obj.url === 'string'
  );
}

/**
 * Parses refs from CLI arguments.
 */
function parseRefs(refs: unknown[]): StorybookRef[] {
  if (Array.isArray(refs)) {
    return refs
      .map(ref => {
        if (typeof ref === 'string') {
          try {
            return JSON.parse(ref);
          } catch {
            return null;
          }
        }
        return ref;
      })
      .filter(isStorybookRef);
  }

  return [];
}

/**
 * Processes CLI arguments for `distPath`, `refs`, and other options.
 *
 * Users are encouraged to provide a yargs-compatible config file (e.g., llms.config.js)
 * that exports all needed options, including a normalized refs array if desired.
 */
async function processArgs(): Promise<Required<Args>> {
  const argv = await yargs(process.argv)
    .usage('CLI to generate LLMs docs for Storybook docs')
    .option('distPath', {
      type: 'string',
      demandOption: true,
      describe: 'Relative path to the Storybook distribution folder',
    })
    .option('summaryBaseUrl', {
      type: 'string',
      default: '/',
      describe: 'Base URL for the Storybook docs',
    })
    .option('summaryTitle', {
      type: 'string',
      default: 'Summary',
      describe: 'Title for the summary file',
    })
    .option('summaryDescription', {
      type: 'string',
      default: '',
      describe: 'Description for the summary file',
    })
    .option('refs', {
      type: 'array',
      default: [] as StorybookRef[],
      describe: 'Array of composed Storybook refs (objects with id, title, url)',
    })
    .config()
    .alias('h', 'help')
    .version(false).argv;

  return {
    ...argv,
    distPath: join(cwd(), argv.distPath),
    refs: parseRefs(argv.refs),
  };
}
