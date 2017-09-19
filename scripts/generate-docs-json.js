const glob = require('glob');
const fs = require('fs');
const parser = require('../packages/example-app-base/lib/utilities/parser');

const globConfig = { ignore: '**/node_modules/**' };
const encoding = { encoding: 'utf-8' };

let docs = {};

glob("**/*.Props.ts", globConfig, (err, files) => {
  if (files) {
    parseFiles(files);
    writeJsonTofile();
  }
  if (err) {
    console.error('ERROR: ', err);
  }
});

/**
 * Loops through each `*.Props.ts` filepath and reads file, parses it for documentation, and adds each property to `docs` array.
 * @param {string[]} files Array of strings containing filepaths to *.Props.ts files
 */
function parseFiles(files) {
  files.forEach(file => {
    let props = parser.parse(fs.readFileSync(file, encoding));

    props.forEach(prop => {
      // Add prop to `docs` only if it's not already there
      // if (docs.filter(item => item.name === prop.name).length === 0) {
      //   docs.push(prop);
      // }

      // Add prop to `docs` only if it's not already there
      if (!docs[prop.name]) {
        docs[prop.name] = prop;
      }
    });
  });
}

/**
 * Save `docs` to json file.
 */
function writeJsonTofile() {
  fs.writeFile('packages/example-app-base/docs.json', JSON.stringify(docs), err => {
    if (!err)
      console.log('Successfully saved docs.json.');
    else
      console.error(err);
  });
}