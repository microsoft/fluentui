import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp';

import { getImportsFromIndexFile } from './getImportsFromIndexFile';

describe('getImportsFromIndexFile', () => {
  it('parses export and returns information to create imports', async () => {
    const template = `
export { Foo } from './foo/foo';
export { Bar } from './bar/bar';
    `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;
    const moduleFile = path.resolve(filesDir, 'Module.js');

    await fs.promises.writeFile(moduleFile, template);
    const imports = await getImportsFromIndexFile(filesDir, moduleFile);

    expect(imports).toMatchObject([
      { imported: 'ModuleFoo', local: 'Foo', path: 'foo/foo' },
      { imported: 'ModuleBar', local: 'Bar', path: 'bar/bar' },
    ]);
  });

  it('throws an error when a file exports multiple components', async () => {
    const template = `
export { Foo, Bar } from './foo';
    `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;
    const moduleFile = path.resolve(filesDir, 'Module.js');

    await fs.promises.writeFile(moduleFile, template);

    await expect(getImportsFromIndexFile(filesDir, moduleFile)).rejects.toThrowError(
      'Multiple exports from a single file are not supported',
    );
  });
});
