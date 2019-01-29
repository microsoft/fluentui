// @ts-check

const path = require('path');
const transformer = require('../codepen/codepen-examples-transform');
const glob = require('glob');
const fs = require('fs-extra');
const async = require('async');
const { logger } = require('just-task');
const readConfig = require('../read-config');

module.exports = function() {
  // Start by making a list of folders (absolute paths) for which we should build codepen examples.
  // By default, only codepen examples for the current package will be built.
  // For packages which need to build examples from other packages, they can create a file
  // config/build-codepen-examples.json listing repo root-relative paths to those packages.
  // Example from fabric-website-resources:
  // {
  //   "forPackages": ["packages/office-ui-fabric-react"]
  // }
  let folders = [process.cwd()];
  const configPath = path.resolve(process.cwd(), 'config/build-codepen-examples.json');
  if (fs.existsSync(configPath)) {
    const config = readConfig(configPath);
    const root = path.resolve(__dirname, '../..');
    folders = folders.concat(config.forPackages.map(pkg => path.join(root, pkg)));
  }

  // Get the files inside each folder which match the example filename pattern
  /** @type {string[]} */
  const files = [].concat(
    ...folders.map(folder => {
      return glob.sync(path.resolve(folder, 'src/components/**/examples/*Example*.tsx'));
    })
  );

  // Do the transforms (max concurrency 5)
  return new Promise((resolve, reject) => {
    async.eachLimit(files, 5, transformFile, err => {
      err ? reject(err) : resolve();
    });
  });
};

/**
 * Read the start of a file.
 * @param {string} filePath Path to the file
 * @param {number} len Number of bytes to read
 * @returns {string} The file contents read
 */
function readFileStart(filePath, len) {
  const buffer = Buffer.alloc(len);
  let fileSource = '';
  let fd;
  try {
    fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, len, 0);
    fileSource = buffer.toString();
  } finally {
    if (fd) {
      fs.closeSync(fd);
    }
  }
  return fileSource;
}

/**
 * If a file has `@codepen` at the beginning, transform it into a codepen-friendly .Codepen.txt
 * output to the project's lib folder.
 *
 * @param {string} file - Path to the file
 * @param {Function} callback - Callback when done
 */
function transformFile(file, callback) {
  if (readFileStart(file, 150).includes('@codepen')) {
    let fileSource = fs.readFileSync(file).toString();
    const exampleName = path.basename(file, '.tsx');

    // extract the name of the component (relies on component/examples/examplefile.tsx structure)
    const transformResult = transformer(fileSource);
    const dirPath = path.dirname(path.dirname(file)).replace(/((\b)src(\b))(?!.*\1)/, '$2lib/codepen$3');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirpSync(dirPath);
    }

    const outPath = path.join(dirPath, exampleName + '.Codepen.txt');
    logger.info('Writing codepen: ' + outPath);
    fs.writeFileSync(outPath, transformResult);
  }

  callback();
}

// This is run as a CLI when we do 'npm start' - otherwise, it is simply a module to be run by build.js as a task
// @ts-ignore
if (require.main == module) {
  module.exports();
}
