import * as glob from 'glob';
import * as fs from 'fs';
import * as match from 'micromatch';
import * as path from 'path';
import * as prettier from 'prettier';

import { PROVIDER_ID } from './constants';
import { getImportsFromIndexFile } from './getImportsFromIndexFile';

type GenerateEntryPointsConfig = {
  cjsEntryPoint: string;
  esmEntryPoint: string;
  storiesGlobs: string[];
  ignore: string[];
};

export async function generateEntryPoints(config: GenerateEntryPointsConfig): Promise<{ ignoredStories: string[] }> {
  const storiesFiles = config.storiesGlobs.map(pattern => glob.sync(pattern)).flatMap(pattern => pattern);
  const indexStoriesFiles = storiesFiles.filter(filename => filename.includes('index.stories.ts'));

  const distDir = path.dirname(config.cjsEntryPoint);
  const ignoredStories: string[] = [];

  const imports = (await Promise.all(indexStoriesFiles.map(filename => getImportsFromIndexFile(distDir, filename))))
    .flatMap(entries => entries)
    .filter(entry => {
      const isIgnoredStory = match.isMatch(entry.filepath, config.ignore);

      if (isIgnoredStory) {
        ignoredStories.push(entry.filepath);
      }

      return !isIgnoredStory;
    });

  const appTemplate = `
  import { RendererProvider, createDOMRenderer } from '@griffel/react';
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';

  import { App } from './stories';

  const renderer = createDOMRenderer();

  // .hydrate() is used to trigger hydration on pre-generated markup in "index.html"
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
    <FluentProvider id="${PROVIDER_ID}" theme={teamsLightTheme}>
      ${imports.map(entry => `<${entry.imported} />`).join('\n')}
    </FluentProvider>
    </SSRProvider>
  )
  `;

  fs.writeFileSync(config.esmEntryPoint, prettier.format(appTemplate, { parser: 'typescript' }));
  fs.writeFileSync(config.cjsEntryPoint, prettier.format(storiesTemplate, { parser: 'typescript' }));

  return {
    ignoredStories,
  };
}
