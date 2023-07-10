import * as fs from 'fs';
import * as path from 'path';

import * as tmp from 'tmp';

import { getExportFromFile } from './getExportFromFile';

describe('getExportFromFile', () => {
  it('parses export and returns information to create imports', async () => {
    const template = 'export const Bar = () => <div>Bar</div>';

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;
    const storiesDir = path.resolve(filesDir, 'stories', 'Module');
    const moduleFile = path.resolve(storiesDir, 'Module.js');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(moduleFile, template);

    const storyImport = await getExportFromFile(filesDir, moduleFile);

    expect(storyImport).toMatchObject({ imported: 'ModuleBar', local: 'Bar', path: 'stories/Module/Module.js' });
  });

  it('throws an error when a file exports multiple components', async () => {
    const template = `
export const Foo = () => <div>Foo</div>
export const Bar = () => <div>Bar</div>
    `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;
    const storiesDir = path.resolve(filesDir, 'stories', 'Module');
    const moduleFile = path.resolve(storiesDir, 'Module.js');

    await fs.promises.mkdir(storiesDir, { recursive: true });
    await fs.promises.writeFile(moduleFile, template);

    await expect(getExportFromFile(filesDir, moduleFile)).rejects.toThrowError(
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

    await expect(getExportFromFile(filesDir, moduleFile)).rejects.toThrowError(
      'has an incorrect location a directory name',
    );
  });
});
