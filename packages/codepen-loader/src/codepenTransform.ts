import * as babylon from 'babylon';
import * as prettier from 'prettier';
import * as fs from 'fs';
import * as path from 'path';

import { Recast, JSCodeShift, IASTPath, IASTSpecifier, IASTNode } from './interfaces';

// recast and jscodeshift have no @types :(
const recast: Recast = require('recast');
const jscodeshift: {
  withParser: (parser: string) => JSCodeShift;
} = require('jscodeshift');

const exampleData = fs.readFileSync(path.resolve(__dirname, '../lib/exampleData.ts')).toString();

const j = jscodeshift.withParser('babylon');

const parse = (source: string) =>
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
 *     [named variable export with example code inside]
 *
 * and
 *
 *     [imports]
 *     [named class export with example code inside]
 *
 * Currently, examples which are scattered across multiple files are NOT supported.
 *
 * @param file Example file contents to transform
 * @returns The transformed file contents
 */
export function transform(file: string): string {
  let sourceStr = file;
  // If the exampleData file was imported, append the file contents
  if (sourceStr.indexOf('/utilities/exampleData') !== -1) {
    sourceStr += `\n${exampleData}\n`;
  }

  const source = j(recast.parse(sourceStr, { parser: { parse } }));

  // Make a list of imported identifiers, and remove all imports
  const identifiers: string[] = [];
  source.find(j.ImportDeclaration).forEach((p: IASTPath) => {
    const importPath = p.node.source.value;
    // Ignore identifiers from the React import (which will be a global) and from exampleData
    // (since that whole file is appended to the example if needed)
    if (importPath !== 'react' && !/(exampleData|\.scss|\.css)$/.test(importPath)) {
      p.node.specifiers.forEach((spec: IASTSpecifier) => {
        identifiers.push(spec.local.loc.identifierName);
      });
    }

    // Remove the import
    p.prune();
  });

  let exampleName;
  // remove exports and replace with variable or class declarations, whichever the original example used
  source
    .find(
      j.ExportNamedDeclaration,
      (node: IASTNode) =>
        node.declaration.type === 'VariableDeclaration' ||
        node.declaration.type === 'FunctionDeclaration'
    )
    .replaceWith((p: IASTPath) => {
      if (p.node.declaration.type === 'VariableDeclaration') {
        exampleName = p.node.declaration.declarations[0].id.name;
      }
      return p.node.declaration;
    });

  source
    .find(
      j.ExportNamedDeclaration,
      (node: IASTNode) =>
        node.declaration.type === 'ClassDeclaration' ||
        node.declaration.type === 'TSInterfaceDeclaration'
    )
    .replaceWith((p: IASTPath) => {
      if (p.node.declaration.type === 'ClassDeclaration') {
        exampleName = p.node.declaration.id.name;
      }
      return p.node.declaration;
    });

  // Build the list of imports from window.Fabric
  let attachedWindowString = 'const {';
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
