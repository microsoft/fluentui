// @ts-check

const babylon = require('babylon');
/** @type {*} */
const recast = require('recast');
const prettier = require('prettier');
const jscodeshift = require('jscodeshift');
const path = require('path');
const fse = require('fs-extra');

const exampleData = fse.readFileSync(path.resolve(__dirname, '../../packages/office-ui-fabric-react/src/utilities/exampleData.ts'));

const api = { jscodeshift: jscodeshift.withParser('babylon'), stats: {} };

/** @type {(source: string) => any} */
const parse = source =>
  babylon.parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'classProperties', 'objectRestSpread']
  });

/**
 * This Transform modifies Fabric website code examples into a format that will allow them to be
 * rendered on Codepen, as part of the "Export to Codepen" feature.
 * There are two types of supported example templates:
 *
 *     [imports]
 *     [variable export named declaration with example code inside]
 *
 * and
 *
 *     [imports]
 *     [class export named declaration with example code inside]
 *
 * Currently, examples which are scattered across multiple files are NOT supported.
 *
 * @param {string} file - Example file contents to transform
 * @returns {string} The transformed file
 */
function transform(file) {
  let sourceStr = file;
  // If the exampleData file was imported, append the file contents
  if (sourceStr.indexOf('/utilities/exampleData') !== -1) {
    sourceStr += `\n${exampleData}\n`;
  }

  const j = api.jscodeshift;
  let source = j(recast.parse(sourceStr, { parser: { parse } }));

  // Make a list of imported identifiers, and remove all imports
  let identifiers = [];
  source.find(j.ImportDeclaration).forEach(path => {
    const importPath = path.node.source.value;
    // Ignore identifiers from the React import (which will be a global) and from exampleData
    // (since that whole file is appended to the example if needed)
    if (importPath !== 'react' && !/(exampleData|\.scss|\.css)$/.test(importPath)) {
      path.node.specifiers.forEach(spec => {
        identifiers.push(spec.local.loc.identifierName);
      });
    }

    // Remove the import
    path.prune();
  });

  let exampleName;
  // remove exports and replace with variable or class declarations, whichever the original example used
  source
    .find(
      j.ExportNamedDeclaration,
      node => node.declaration.type == 'VariableDeclaration' || node.declaration.type === 'FunctionDeclaration'
    )
    .replaceWith(p => {
      if (p.node.declaration.type === 'VariableDeclaration') {
        exampleName = p.node.declaration.declarations[0].id.name;
      }
      return p.node.declaration;
    });

  source
    .find(
      j.ExportNamedDeclaration,
      node => node.declaration.type == 'ClassDeclaration' || node.declaration.type == 'TSInterfaceDeclaration'
    )
    .replaceWith(p => {
      if (p.node.declaration.type === 'ClassDeclaration') {
        exampleName = p.node.declaration.id.name;
      }
      return p.node.declaration;
    });

  // Build the list of imports from window.Fabric
  let attachedWindowString = 'let {';
  if (identifiers.length > 0) {
    attachedWindowString += identifiers.join(',') + ',';
  }
  attachedWindowString += 'Fabric} = window.Fabric;\n';

  // add imports and React render footer
  const sourceWithFooter = [
    attachedWindowString,
    source.toSource(),
    `ReactDOM.render(<${exampleName}/>, document.getElementById("content"));`
  ].join('\n');

  return prettier.format(sourceWithFooter, {
    parser: 'typescript',
    printWidth: 120,
    tabWidth: 2,
    singleQuote: true
  });
}

module.exports = transform;
