import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp';

import { getImportsFromIndexFile } from './getImportsFromIndexFile';
import { generateEntryPoints } from './generateEntryPoints';

jest.mock('./getImportsFromIndexFile');

describe('generateEntryPoints', () => {
  it('creates entry point files', async () => {
    (getImportsFromIndexFile as jest.Mock).mockReturnValue([]).mockReturnValueOnce([
      {
        local: 'Foo',
        imported: 'ModuleFoo',
        path: './Foo',
      },
    ]);

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

    const cjsEntryPoint = path.resolve(filesDir, 'cjs.js');
    const esmEntryPoint = path.resolve(filesDir, 'esm.js');

    await generateEntryPoints({ cjsEntryPoint, esmEntryPoint });

    const storiesFile = await fs.promises.readFile(cjsEntryPoint, { encoding: 'utf8' });
    const appFile = await fs.promises.readFile(esmEntryPoint, { encoding: 'utf8' });

    expect(storiesFile).toMatchInlineSnapshot(`
      "import {
        FluentProvider,
        teamsLightTheme,
        SSRProvider,
      } from \\"@fluentui/react-components\\";
      import * as React from \\"react\\";

      import { Foo as ModuleFoo } from \\"./Foo\\";

      export const App = () => (
        <SSRProvider>
          <FluentProvider theme={teamsLightTheme}>
            <ModuleFoo />
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
