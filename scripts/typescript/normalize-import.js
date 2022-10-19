const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const yargsParser = require('yargs-parser');

/**
 * @type {Console['log']}
 */
// eslint-disable-next-line no-console
const log = console.log.bind(console);

const scope = '@fluentui';

main();

/**
 * Normalize cross package type imports in generated ambient types
 *
 * NOTE:
 * This is a temporary workaround to TypeScript bug that occurs when path aliases are used
 * For more info see: https://github.com/microsoft/TypeScript/issues/42349
 */
function main() {
  /**
   * @type {import('yargs').Arguments<{output?:string}>}
   */
  const args = yargsParser(process.argv.slice(2));

  if (!args.output) {
    throw new Error(`--output is missing`);
  }

  const sourceDir = path.resolve(process.cwd(), args.output);

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`${sourceDir} doesn't exist`);
  }

  if (!isDirectory(sourceDir)) {
    throw new Error(`${sourceDir} is not a directory`);
  }

  log(chalk.blue('Normalize ambient declarations...'));

  const files = getAllFiles(sourceDir);
  normalizeImports(files);

  log(chalk.blue('Normalize ambient declarations: ✅'));
}

/**
 *
 * @param {string[]} files
 */
function normalizeImports(files) {
  const regex = /(\.\.\/)+([a-z-]+)\/src/g;
  files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const updatedContent = content.replace(regex, `${scope}/$2`);
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
  });
}

/**
 * Get all files absolute paths recursively in a directory
 * @param {string} dirPath
 * @param {string[]} arrayOfFiles
 * @returns {string[]}
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  const allFiles = files.map(file => {
    const filePath = path.join(dirPath, '/', file);

    if (isDirectory(filePath)) {
      return getAllFiles(filePath, arrayOfFiles);
    }

    return filePath;
  });

  return /** @type {string[]} */ (allFiles.flat(Infinity));
}

/**
 *
 * @param {string} dirPath
 */
function isDirectory(dirPath) {
  return fs.statSync(dirPath).isDirectory();
}
