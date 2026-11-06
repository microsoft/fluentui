const { transformSync } = require('esbuild');
const { pathToFileURL } = require('node:url');

// Keep Oxc's native package loader intact while adapting ESM for Jest's CommonJS runtime.
module.exports = {
  process(source, filename) {
    return transformSync(source, {
      format: 'cjs',
      target: 'node22',
      sourcefile: filename,
      sourcemap: 'inline',
      define: { 'import.meta.url': JSON.stringify(pathToFileURL(filename).href) },
    });
  },
};
