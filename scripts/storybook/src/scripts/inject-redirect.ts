import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import dedent from 'dedent';

import yargs from 'yargs';

main();

function main(): void {
  try {
    const { distPath, redirectUrl } = processArgs();
    const normalizedDistPath = join(cwd(), distPath);

    const indexPath = join(normalizedDistPath, 'index.html');

    injectRedirect(indexPath, redirectUrl);

    console.log(`root index.html redirect to ${distPath} has been added.`);
  } catch (error) {
    console.log('Failed to add redirect.');
    console.error(error);
    process.exit(1);
  }
}

function processArgs(): { distPath: string; redirectUrl: string } {
  const argv = yargs(process.argv)
    .usage('CLI to inject html redirect')
    .option('distPath', {
      type: 'string',
      demandOption: true,
      describe: 'Relative path to the Storybook distribution folder',
    })
    .option('redirectUrl', {
      type: 'string',
      demandOption: true,
      describe: 'URL to redirect to',
    })
    .alias('h', 'help')
    .version(false).argv;

  return { redirectUrl: argv.redirectUrl, distPath: argv.distPath };
}

function injectRedirect(filePath: string, url: string) {
  const content = dedent`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Redirecting...</title>
        <script>
          var target = "${url}" + window.location.search + window.location.hash;
          window.location.replace(target);
        </script>
      </head>
      <body>
        <p>The page has moved to <a id="redirectLink" href="${url}">${url}</a>.
        You will be automatically redirected.</p>
      </body>
    </html>
`;

  writeFileSync(filePath, content, 'utf-8');
}
