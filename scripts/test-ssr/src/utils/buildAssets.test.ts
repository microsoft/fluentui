import * as fs from 'fs';
import * as path from 'path';

import { stripIndents } from '@nx/devkit';
import * as tmp from 'tmp';

import { buildAssets } from './buildAssets';

function stripComments(content: string): string {
  return content.replace(/\/\/ .+/g, '');
}

async function setup(code: string) {
  const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

  const cjsEntryPoint = path.resolve(filesDir, 'cjs.js');
  const esmEntryPoint = path.resolve(filesDir, 'esm.js');

  const cjsOutfile = path.resolve(filesDir, 'cjs-out.js');
  const esmOutfile = path.resolve(filesDir, 'esm-out.js');

  await fs.promises.writeFile(cjsEntryPoint, code);
  await fs.promises.writeFile(esmEntryPoint, code);

  await fs.promises.mkdir(path.resolve(filesDir, 'packages/hello'), { recursive: true });
  await fs.promises.writeFile(path.resolve(filesDir, 'packages/hello/index.ts'), `export const hello = 'hello';`);

  const tsConfigPath = path.resolve(filesDir, 'tsconfig.json');
  const tsConfigContent = {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@proj/hello': ['packages/hello/index.ts'],
      },
    },
  };

  await fs.promises.writeFile(tsConfigPath, JSON.stringify(tsConfigContent, null, 2), { encoding: 'utf8' });

  const getCjsContent = async () =>
    stripIndents`${stripComments(await fs.promises.readFile(cjsOutfile, { encoding: 'utf8' }))}`;
  const getEsmContent = async () =>
    stripIndents`${stripComments(await fs.promises.readFile(esmOutfile, { encoding: 'utf8' }))}`;

  const getCjsContentWithoutHelpers = (content: string) => content.split('\n').slice(-8).join('\n');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTsConfig = async (updater: (content: Record<string, any>) => typeof content) => {
    const updatedContent = updater(tsConfigContent);
    await fs.promises.writeFile(tsConfigPath, JSON.stringify(updatedContent, null, 2), { encoding: 'utf-8' });
  };

  return {
    cjsOutfile,
    esmOutfile,
    cjsEntryPoint,
    esmEntryPoint,
    distDirectory: filesDir,
    updateTsConfig,
    getCjsContent,
    getEsmContent,
    getCjsContentWithoutHelpers,
  };
}

describe('buildAssets', () => {
  it('compiles code to CJS & ESM', async () => {
    const template = stripIndents`
      export const Foo = 'foo';
    `;

    const { getCjsContent, getEsmContent, getCjsContentWithoutHelpers, ...apiArgs } = await setup(template);

    await buildAssets({
      chromeVersion: 100,
      ...apiArgs,
    });

    const cjsContent = await getCjsContent();
    const esmContent = await getEsmContent();

    const cjsContentWithoutHelpers = getCjsContentWithoutHelpers(cjsContent);

    expect(cjsContentWithoutHelpers).toMatchInlineSnapshot(`
      "

      var cjs_exports = {};
      __export(cjs_exports, {
      Foo: () => Foo
      });
      module.exports = __toCommonJS(cjs_exports);
      var Foo = \\"foo\\";"
    `);
    expect(esmContent).toMatchInlineSnapshot(`
      "(() => {

      var Foo = \\"foo\\";
      })();"
    `);
  }, /* Sets 15s timeout to allow for the build to complete */ 15000);

  it('resolves package imports via TS path aliases', async () => {
    const template = stripIndents`
      import { hello } from '@proj/hello';

      export const Foo = 'foo' + hello
      `;

    const {
      getCjsContent,
      getEsmContent,
      getCjsContentWithoutHelpers,
      updateTsConfig: _,
      ...apiArgs
    } = await setup(template);

    await buildAssets({
      chromeVersion: 100,
      ...apiArgs,
    });

    const cjsContent = await getCjsContent();
    const esmContent = await getEsmContent();

    const cjsContentWithoutHelpers = getCjsContentWithoutHelpers(cjsContent);

    expect(cjsContentWithoutHelpers).toMatchInlineSnapshot(`
      "});
      module.exports = __toCommonJS(cjs_exports);


      var hello = \\"hello\\";


      var Foo = \\"foo\\" + hello;"
    `);
    expect(esmContent).toMatchInlineSnapshot(`
      "(() => {

      var hello = \\"hello\\";


      var Foo = \\"foo\\" + hello;
      })();"
    `);
  });

  it('fails if TS path aliases path mapping contains unsupported pattern', async () => {
    const template = stripIndents`
      import { hello } from '@proj/hello';

      export const Foo = 'foo' + hello
      `;

    const { getCjsContent, getEsmContent, getCjsContentWithoutHelpers, updateTsConfig, ...apiArgs } = await setup(
      template,
    );

    await updateTsConfig(content => {
      const currentMapping = content.compilerOptions.paths['@proj/hello'];
      content.compilerOptions.paths['@proj/hello'] = [...currentMapping, 'packages/hello/foo.ts'];
      return content;
    });

    await expect(
      buildAssets({
        chromeVersion: 100,
        ...apiArgs,
      }),
    ).rejects.toMatchInlineSnapshot(
      `[Error: Multiple TS path mappings are not supported. Please adjust your config. "@proj/hello": [ packages/hello/index.ts,packages/hello/foo.ts ]"]`,
    );
  });
});
