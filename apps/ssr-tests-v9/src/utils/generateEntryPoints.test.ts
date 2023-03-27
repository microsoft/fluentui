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
      path.resolve(storiesDir, 'index.stories.ts'),
      `
    export { Default } from './Default'
    export { Foo } from './Foo'
`,
    );

    await generateEntryPoints({
      cjsEntryPoint,
      esmEntryPoint,
      storiesGlobs: [`${storiesDir}/*.ts`],
      ignore: [],
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

      import { Default as ModuleDefault } from \\"stories/Module/Default\\";
      import { Foo as ModuleFoo } from \\"stories/Module/Foo\\";

      export const App = () => (
        <SSRProvider>
          <FluentProvider id=\\"root-provider\\" theme={teamsLightTheme}>
            <ModuleDefault />
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

  it('skips globs specified in "ignore"', async () => {
    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

    const cjsEntryPoint = path.resolve(filesDir, 'cjs.js');
    const esmEntryPoint = path.resolve(filesDir, 'esm.js');

    const storiesDir = path.resolve(filesDir, 'stories', 'Module');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(
      path.resolve(storiesDir, 'index.stories.ts'),
      `
    export { Foo } from './Foo'
    export { Bar } from './Bar'
    export { Baz } from './Baz'
    export { Qux } from './Qux'
`,
    );

    const { ignoredStories } = await generateEntryPoints({
      cjsEntryPoint,
      esmEntryPoint,
      storiesGlobs: [`${storiesDir}/*.ts`],
      ignore: ['**/Module/Bar', '**/Module/Baz'],
    });

    const storiesFile = await fs.promises.readFile(cjsEntryPoint, { encoding: 'utf8' });
    const ignoredStoriesNormalized = ignoredStories.map(filepath => filepath.replace(filesDir, '').replace(/\\/g, '/'));

    expect(ignoredStoriesNormalized).toMatchInlineSnapshot(`
      Array [
        "/stories/Module/Bar",
        "/stories/Module/Baz",
      ]
    `);
    expect(storiesFile).toMatchInlineSnapshot(`
      "import {
        FluentProvider,
        teamsLightTheme,
        SSRProvider,
      } from \\"@fluentui/react-components\\";
      import * as React from \\"react\\";

      import { Foo as ModuleFoo } from \\"stories/Module/Foo\\";
      import { Qux as ModuleQux } from \\"stories/Module/Qux\\";

      export const App = () => (
        <SSRProvider>
          <FluentProvider id=\\"root-provider\\" theme={teamsLightTheme}>
            <ModuleFoo />
            <ModuleQux />
          </FluentProvider>
        </SSRProvider>
      );
      "
    `);
  });
});
