import * as fs from 'fs';
import * as path from 'path';

import * as tmp from 'tmp';

import { generateEntryPoints } from './generateEntryPoints';

describe('generateEntryPoints', () => {
  it('creates entry point files', async () => {
    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

    const cjsEntryPoint = path.resolve(filesDir, 'cjs.js');
    const esmEntryPoint = path.resolve(filesDir, 'esm.js');

    const storiesDir = path.resolve(filesDir, 'stories', 'Module');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(
      path.resolve(storiesDir, 'FooBar.stories.tsx'),
      'export const FooBar = () => <div>FooBar</div>',
    );
    await fs.promises.writeFile(
      path.resolve(storiesDir, 'FooBaz.stories.tsx'),
      'export const FooBaz = () => <div>FooBaz</div>',
    );

    await generateEntryPoints({
      cjsEntryPoint,
      esmEntryPoint,
      storiesPaths: [path.resolve(storiesDir, 'FooBar.stories.tsx'), path.resolve(storiesDir, 'FooBaz.stories.tsx')],
    });

    const storiesFile = await fs.promises.readFile(cjsEntryPoint, { encoding: 'utf8' });
    const appFile = await fs.promises.readFile(esmEntryPoint, { encoding: 'utf8' });

    expect(storiesFile).toMatchInlineSnapshot(`
      "import {
        FluentProvider,
        teamsLightTheme,
        SSRProvider,
      } from \\"@fluentui/react-components\\";
      import * as React from \\"react\\";

      import { FooBar as ModuleFooBar } from \\"stories/Module/FooBar.stories.tsx\\";
      import { FooBaz as ModuleFooBaz } from \\"stories/Module/FooBaz.stories.tsx\\";

      export const App = () => (
        <SSRProvider>
          <FluentProvider id=\\"root-provider\\" theme={teamsLightTheme}>
            <ModuleFooBar />
            <ModuleFooBaz />
          </FluentProvider>
        </SSRProvider>
      );
      "
    `);
    expect(appFile).toMatchInlineSnapshot(`
      "import { RendererProvider, createDOMRenderer } from \\"@griffel/react\\";
      import * as React from \\"react\\";
      import * as ReactDOM from \\"react-dom\\";

      import { App } from \\"./stories\\";

      const renderer = createDOMRenderer();

      // .hydrate() is used to trigger hydration on pre-generated markup in \\"index.html\\"
      ReactDOM.hydrate(
        <RendererProvider renderer={renderer}>
          <App />
        </RendererProvider>,
        document.querySelector(\\"#root\\")
      );
      "
    `);
  });
});
