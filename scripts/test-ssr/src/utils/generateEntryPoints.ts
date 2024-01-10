import * as fs from 'fs';
import * as path from 'path';

import * as prettier from 'prettier';

import { PROVIDER_ID } from './constants';
import { getExportFromFile } from './getExportFromFile';
import type { StoryImport } from './getExportFromFile';

type GenerateEntryPointsConfig = {
  cjsEntryPoint: string;
  esmEntryPoint: string;
  storiesPaths: string[];
};

export async function generateEntryPoints(config: GenerateEntryPointsConfig): Promise<void> {
  const distDir = path.dirname(config.cjsEntryPoint);
  const imports = (await Promise.all(config.storiesPaths.map(filename => getExportFromFile(distDir, filename)))).filter(
    Boolean,
  ) as StoryImport[];

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
}
