import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

import yargs from 'yargs';

main();

function main(): void {
  try {
    const { title, distPath } = processArgs();
    const normalizedDistPath = join(cwd(), distPath);

    const indexPath = join(normalizedDistPath, 'index.html');
    const iframePath = join(normalizedDistPath, 'iframe.html');

    rewriteTitle(indexPath, title);
    rewriteTitle(iframePath, title);

    console.log('Title rewrite complete.');
  } catch (error) {
    console.log('Title rewrite failed.');
    console.error(error);
    process.exit(1);
  }
}

function processArgs(): { title: string; distPath: string } {
  const argv = yargs(process.argv)
    .usage('CLI to update Storybook production build <title>')
    .option('title', { type: 'string', demandOption: true, describe: 'Title to set in the HTML files' })
    .option('distPath', {
      type: 'string',
      demandOption: true,
      describe: 'Relative path to the Storybook distribution folder',
    })
    .alias('h', 'help')
    .version(false).argv;

  return { title: argv.title, distPath: argv.distPath };
}

function rewriteTitle(filePath: string, title: string) {
  console.log(`Rewriting ${filePath} document title to "${title}".`);

  const htmlDocument = readFileSync(filePath, 'utf-8');
  const updatedHtmlDocument = htmlDocument.replace(/<title>.*<\/title>/, `<title>${title}</title>`);

  writeFileSync(filePath, updatedHtmlDocument);
}
