/*
This Transform modifies Fabric website code examples into a format that will allow them to be rendered on Codepen, as part of the "Export to Codepen" feature.
There are two types of supported example templates:
1)
[imports]
[variable export named declaration with example code inside]
and
2)
[imports]
[class export named declaration with example code inside. Having multiple methods and keeping track of state is supported]
Currently, examples which are scattered across multiple files are NOT supported.
*/
const babylon = require('babylon');
const recast = require('recast');
const prettier = require('prettier');

function parseRaw(code) {
  const parse = source =>
    babylon.parse(source, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties']
    });
  return recast.parse(code, { parser: { parse } }).program.body;
}

function transform(file, api) {
  const parse = source =>
    babylon.parse(source, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties']
    });

  const j = api.jscodeshift;
  let source = j(recast.parse(file.source, { parser: { parse } }));

  //remove css imports
  source = source
    .find(j.ImportDeclaration, node => node.source.value.endsWith('.scss'))
    .remove()
    .toSource();
  source = j(recast.parse(source, { parser: { parse } }));

  //remove scss imports
  source = source
    .find(j.ImportDeclaration, node => node.source.value.endsWith('.css'))
    .remove()
    .toSource();
  source = j(recast.parse(source, { parser: { parse } }));

  // attach all imported components to the window
  let attachedWindowString = 'let {';

  let imports = source.find(j.ImportDeclaration);

  let identifiers = [];
  imports.forEach(p => {
    p.node.specifiers.forEach(spec => {
      const identifier = spec.local.loc.identifierName;
      if (identifier.toLowerCase() != 'react') {
        identifiers.push(identifier);
      }
    });
  });

  for (var i = 0; i < identifiers.length; i++) {
    attachedWindowString += identifiers[i] + ',';
  }
  attachedWindowString += 'Fabric} = window.Fabric;';

  let parsedAttachedWindowString = parseRaw(attachedWindowString);

  source = source
    .find(j.ImportDeclaration, node => node.source.value.toLowerCase() == 'react')
    .remove()
    .insertBefore(parsedAttachedWindowString)
    .toSource();
  source = j(recast.parse(source, { parser: { parse } }));

  // remove the rest of the import declarations
  source = source
    .find(j.ImportDeclaration)
    .remove()
    .toSource();
  source = j(recast.parse(source, { parser: { parse } }));

  let exampleName;

  // remove exports and replace with variable or class declarations, whichever the original example used
  source.find(j.ExportNamedDeclaration, node => node.declaration.type == 'VariableDeclaration').replaceWith(p => {
    exampleName = p.node.declaration.declarations[0].id.name;
    source = source
      .find(j.ExportNamedDeclaration, node => node.declaration.type == 'VariableDeclaration')
      .replaceWith(p.node.declaration);
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
    })
    .toSource();

  // add React Render footer
  const sourceWithFooter =
    source.toSource() + '\n' + 'ReactDOM.render(<' + exampleName + '/>, document.getElementById("content"));';

  return prettier.format(sourceWithFooter, {
    parser: 'typescript',
    printWidth: 120,
    tabWidth: 2,
    singleQuote: true
  });
}

module.exports = transform;
