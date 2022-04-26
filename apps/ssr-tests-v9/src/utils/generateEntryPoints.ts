// @ts-expect-error There are no typings for this module
// eslint-disable-next-line import/no-extraneous-dependencies
import { getVnextStories } from '@fluentui/public-docsite-v9/.storybook/main.utils';
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';

import { getImportsFromIndexFile } from './getImportsFromIndexFile';

type GenerateEntryPointsConfig = { cjsEntryPoint: string; esmEntryPoint: string };

export async function generateEntryPoints(config: GenerateEntryPointsConfig): Promise<void> {
  const rawStoriesGlobs = getVnextStories() as string[];
  const storiesGlobs = rawStoriesGlobs
    // TODO: Find a better way for this. Pass the path via params? 👇
    .map(pattern => path.resolve(__dirname, '..', pattern));

  const storiesFiles = storiesGlobs.map(pattern => glob.sync(pattern)).flatMap(pattern => pattern);

  // TODO: Can removed after the issue will be solved https://github.com/microsoft/fluentui/issues/23393
  const indexStoriesFiles = storiesFiles.filter(filename =>
    fs.readFileSync(filename, { encoding: 'utf8' }).includes('export { Default } from'),
  );

  const distDir = path.dirname(config.cjsEntryPoint);
  const imports = (
    await Promise.all(indexStoriesFiles.map(filename => getImportsFromIndexFile(distDir, filename)))
  ).flatMap(entries => entries);

  const appTemplate = `
  import { RendererProvider, createDOMRenderer } from '@griffel/react';
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';

  import { App } from './stories';

  const renderer = createDOMRenderer();

  ReactDOM.hydrate(
    <RendererProvider renderer={renderer}>
      <App />
    </RendererProvider>,
    document.querySelector('#root'),
  );
  `;

  const storiesTemplate = `
  import { FluentProvider, teamsLightTheme, SSRProvider } from '@fluentui/react-components';
  import * as React from 'react';

  ${imports.map(entry => `import { ${entry.local} as ${entry.imported} } from '${entry.path}'; `).join('\n')}

  export const App = () => (
      <SSRProvider>
    <FluentProvider theme={teamsLightTheme}>
      ${imports.map(entry => `<${entry.imported} />`).join('\n')}
    </FluentProvider>
    </SSRProvider>
  )
  `;

  fs.writeFileSync(config.esmEntryPoint, prettier.format(appTemplate, { parser: 'typescript' }));
  fs.writeFileSync(config.cjsEntryPoint, prettier.format(storiesTemplate, { parser: 'typescript' }));
}
