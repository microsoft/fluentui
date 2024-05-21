import * as fs from 'fs';
import * as path from 'path';

import * as tmp from 'tmp';

import { renderToHTML } from './renderToHTML';

/**
 * Used to evaluate fixtures in the same module context.
 */
const REQUIRE_CALL = (moduleName: string): string =>
  `require(require.resolve('${moduleName}', { paths: ${JSON.stringify(module.paths)} }))`;

describe('renderToHTML', () => {
  it('successfully renders a component with styles into HTML file', async () => {
    const template = `
const { makeStyles } = ${REQUIRE_CALL('@griffel/react')};
const React = ${REQUIRE_CALL('react')};

const useClasses = makeStyles({
  root: { color: 'red' },
});

function App() {
  const classes = useClasses();

  return React.createElement('div', { className: classes.root }, 'Hello world!');
}

exports.App = App;
      `;

    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

    const cjsOutfile = path.resolve(filesDir, 'cjs.js');
    const esmOutfile = path.resolve(filesDir, 'esm.js');
    const htmlOutfile = path.resolve(filesDir, 'index.html');

    await fs.promises.writeFile(cjsOutfile, template);

    await renderToHTML({ cjsOutfile, esmOutfile, htmlOutfile });
    const htmlContent = await fs.promises.readFile(htmlOutfile, { encoding: 'utf8' });

    // <style> element with rehydration attribute
    expect(htmlContent).toContain(
      '<style data-make-styles-bucket="d" data-priority="0" data-make-styles-rehydration="true">',
    );
    // <script> element with proper "src"
    expect(htmlContent).toContain('<script src="esm.js"></script>');
    // Contents of App component
    expect(htmlContent).toContain('Hello world!');
  });

  it('throws an error on a non-existing file', async () => {
    await expect(
      renderToHTML({ cjsOutfile: 'foo.js', esmOutfile: 'foo.js', htmlOutfile: 'foo.html' }),
    ).rejects.toThrowError('A file "foo.js" does not exist');
  });

  it('throws an error on a missing export', async () => {
    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

    const cjsOutfile = path.resolve(filesDir, 'cjs.js');
    const esmOutfile = path.resolve(filesDir, 'esm.js');
    const htmlOutfile = path.resolve(filesDir, 'index.html');

    await fs.promises.writeFile(cjsOutfile, `module.exports = false`);

    await expect(renderToHTML({ cjsOutfile, esmOutfile, htmlOutfile })).rejects.toThrowError(
      /does not have an export named "App", please check the matching file/,
    );
  });

  it('throws on undefined calls', async () => {
    const filesDir = tmp.dirSync({ unsafeCleanup: true }).name;

    const cjsOutfile = path.resolve(filesDir, 'cjs.js');
    const esmOutfile = path.resolve(filesDir, 'esm.js');
    const htmlOutfile = path.resolve(filesDir, 'index.html');

    await fs.promises.writeFile(
      cjsOutfile,
      `
const React = ${REQUIRE_CALL('react')}
    
exports.App = function App() {
  return React.createElement(Foo);
}
    `,
    );

    await expect(renderToHTML({ cjsOutfile, esmOutfile, htmlOutfile })).rejects.toThrowError('Foo is not defined');
  });
});
