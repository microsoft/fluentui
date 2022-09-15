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
    const storiesDir = path.resolve(filesDir, 'stories', 'Module');
    const moduleFile = path.resolve(storiesDir, 'Module.js');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(moduleFile, template);
    const imports = await getImportsFromIndexFile(filesDir, moduleFile);

    expect(imports).toMatchObject([
      { imported: 'ModuleFoo', local: 'Foo', path: 'stories/Module/foo/foo' },
      { imported: 'ModuleBar', local: 'Bar', path: 'stories/Module/bar/bar' },
    ]);
  });

  it('throws an error when a file exports multiple components', async () => {
    const template = `
export { Foo, Bar } from './foo';
    `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;
    const storiesDir = path.resolve(filesDir, 'stories', 'Module');
    const moduleFile = path.resolve(storiesDir, 'Module.js');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(moduleFile, template);

    await expect(getImportsFromIndexFile(filesDir, moduleFile)).rejects.toThrowError(
      'Multiple exports from a single file are not supported',
    );
  });

  it('throws when stories are in "stories" directory', async () => {
    const template = `
export { Foo, Bar } from './foo';
    `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;
    const storiesDir = path.resolve(filesDir, 'stories');
    const moduleFile = path.resolve(storiesDir, 'Module.js');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(moduleFile, template);

    await expect(getImportsFromIndexFile(filesDir, moduleFile)).rejects.toThrowError(
      'has an incorrect location a directory name',
    );
  });

  it('throws when stories are in a directory that starts with lowercase', async () => {
    const template = `
export { Foo, Bar } from './foo';
    `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;
    const storiesDir = path.resolve(filesDir, 'stories', 'module');
    const moduleFile = path.resolve(storiesDir, 'Module.js');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(moduleFile, template);

    await expect(getImportsFromIndexFile(filesDir, moduleFile)).rejects.toThrowError(
      'has an incorrect location a directory name',
    );
  });
});
