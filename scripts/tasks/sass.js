module.exports = function (options) {
  const glob = require('glob');
  const path = require('path');

  const _fileNameToClassMap = {};

  // Return a promise.
  return processFiles();

  function processFiles() {
    const promises = [];
    const files = glob.sync(path.resolve(process.cwd(), 'src/**/*.scss'));

    if (files.length) {
      const execSync = require('../exec-sync');
      const sass = require('node-sass');
      const fs = require('fs');
      const postcss = require('postcss');
      const autoprefixer = require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions', 'ie >= 11'] });
      const modules = require('postcss-modules')({
        getJSON,
        generateScopedName
      });

      files.forEach(fileName => {

        fileName = path.resolve(fileName);

        promises.push(new Promise((resolve, reject) => {
          sass.render(
            {
              file: fileName,
              outputStyle: 'compressed',
              importer: patchSassUrl,
              includePaths: [
                path.resolve(process.cwd(), 'node_modules')
              ]
            },
            (err, result) => {
              if (err) {
                reject(path.relative(process.cwd(), fileName) + ': ' + err);
              } else {
                const css = result.css.toString();

                postcss([autoprefixer, modules])
                  .process(css, { from: fileName })
                  .then(result => {
                    fs.writeFileSync(fileName + '.ts', createTypeScriptModule(fileName, result.css));
                    resolve();
                  });
              }
            });
        }));
      });
    }

    return Promise.all(promises);
  }

  function generateScopedName(name, fileName, css) {
    const crypto = require('crypto');

    return name + '_' + crypto.createHmac('sha1', fileName).update(css).digest('hex').substring(0, 8);
  }

  function getJSON(cssFileName, json) {
    _fileNameToClassMap[path.resolve(cssFileName)] = json;
  }

  function createTypeScriptModule(fileName, css) {
    const { splitStyles } = require("@microsoft/load-themed-styles");

    // Create a source file.
    const source = [
      `/* tslint:disable */`,
      `import { loadStyles } from \'@microsoft/load-themed-styles\';`,
      `loadStyles(${JSON.stringify(splitStyles(css))});`
    ];

    const map = _fileNameToClassMap[fileName];

    for (let prop in map) {
      source.push(`export const ${prop} = "${map[prop]}";`);
    }

    return source.join('\n');
  }

  function patchSassUrl(url, prev, done) {
    let newUrl = url;

    if (url[0] === '~') {
      newUrl = path.resolve(process.cwd(), 'node_modules', url.substr(1));
    }
    else if (url === 'stdin') {
      newUrl = '';
    }

    return { file: newUrl };
  }
};