import * as fs from 'fs';
import * as path from 'path';

import * as tmp from 'tmp';

import { buildAssets } from './buildAssets';

function stripComments(content: string): string {
  return content.replace(/\/\/ .+/g, '');
}

describe('buildAssets', () => {
  it('compiles code to CJS & ESM', async () => {
    const template = `
      import { hello } from '@proj/hello';

      export const Foo = 'foo' + hello
      `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

    const cjsEntryPoint = path.resolve(filesDir, 'cjs.js');
    const esmEntryPoint = path.resolve(filesDir, 'esm.js');

    const cjsOutfile = path.resolve(filesDir, 'cjs-out.js');
    const esmOutfile = path.resolve(filesDir, 'esm-out.js');

    await fs.promises.writeFile(
      path.resolve(filesDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@proj/hello': ['packages/hello/index.ts'],
          },
        },
      }),
    );
    await fs.promises.mkdir(path.resolve(filesDir, 'packages/hello'), { recursive: true });
    await fs.promises.writeFile(path.resolve(filesDir, 'packages/hello/index.ts'), `export const hello = 'hello';`);
    await fs.promises.writeFile(cjsEntryPoint, template);
    await fs.promises.writeFile(esmEntryPoint, template);

    await buildAssets({
      chromeVersion: 100,
      cjsEntryPoint,
      cjsOutfile,
      esmEntryPoint,
      esmOutfile,
      distDirectory: filesDir,
    });

    const cjsContent = stripComments(await fs.promises.readFile(cjsOutfile, { encoding: 'utf8' }));
    const esmContent = stripComments(await fs.promises.readFile(esmOutfile, { encoding: 'utf8' }));

    const cjsContentWithoutHelpers = cjsContent.split('\n').slice(-8).join('\n');

    expect(cjsContentWithoutHelpers).toMatchInlineSnapshot(`
      "module.exports = __toCommonJS(cjs_exports);


      var hello = \\"hello\\";


      var Foo = \\"foo\\" + hello;
      "
    `);
    expect(esmContent).toMatchInlineSnapshot(`
      "(() => {
        
        var hello = \\"hello\\";

        
        var Foo = \\"foo\\" + hello;
      })();
      "
    `);
  }, /* Sets 15s timeout to allow for the build to complete */ 15000);
});
