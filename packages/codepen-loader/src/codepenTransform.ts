import * as babylon from 'babylon';
import * as prettier from 'prettier';

import { Recast, JSCodeShift, IASTPath, IASTSpecifier, IASTNode } from './interfaces';

// recast and jscodeshift have no @types :(
const recast: Recast = require('recast');
const jscodeshift: {
  withParser: (parser: string) => JSCodeShift;
} = require('jscodeshift');

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
  const sourceStr = file;
  const source = j(recast.parse(sourceStr, { parser: { parse } }));

  // Make a list of imported identifiers (normal and for example data), and remove all imports
  const identifiers: string[] = [];
  const exampleIdentifiers: string[] = [];
  source.find(j.ImportDeclaration).forEach((p: IASTPath) => {
    const importPath = p.node.source.value;
    // Ignore identifiers from:
    // - the React import (which will be a global)
    // - css/scss
    if (importPath !== 'react' && !/\.s?css$/.test(importPath)) {
      const isExample = importPath.startsWith('@uifabric/example-data');
      p.node.specifiers.forEach((spec: IASTSpecifier) => {
        if (isExample) {
          exampleIdentifiers.push(spec.local.loc.identifierName);
        } else {
          identifiers.push(spec.local.loc.identifierName);
        }
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
      (node: IASTNode) => node.declaration.type === 'VariableDeclaration' || node.declaration.type === 'FunctionDeclaration'
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
      (node: IASTNode) => node.declaration.type === 'ClassDeclaration' || node.declaration.type === 'TSInterfaceDeclaration'
    )
    .replaceWith((p: IASTPath) => {
      if (p.node.declaration.type === 'ClassDeclaration') {
        exampleName = p.node.declaration.id.name;
      }
      return p.node.declaration;
    });

  // add imports and React render footer (with the component wrapped in a <Fabric> for styling)
  const sourceWithFooter = [
    'const FabricWrapper = window.Fabric.Fabric',
    source.toSource(),
    `ReactDOM.render(<FabricWrapper><${exampleName}/></FabricWrapper>, document.getElementById("content"));`
  ];

  // Build the list of imports from window.Fabric and window.FabricExampleData
  if (identifiers.length) {
    sourceWithFooter.unshift(`const {${identifiers.join(',')}} = window.Fabric;\n`);
  }
  if (exampleIdentifiers.length) {
    sourceWithFooter.unshift(`const {${exampleIdentifiers.join(',')}} = window.FabricExampleData;\n`);
  }

  return prettier.format(sourceWithFooter.join('\n'), {
    parser: 'typescript',
    printWidth: 100,
    tabWidth: 2,
    singleQuote: true
  });
}
