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
  let attachedWindowString = 'let {\n';

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
    attachedWindowString += '\t' + identifiers[i] + ',\n';
  }
  attachedWindowString += '\tFabric } = window.Fabric;';

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

  // remove exports and replace with variable or class declarations, whichever the original example used
  let variableExportDeclarations = source.find(
    j.ExportNamedDeclaration,
    node => node.declaration.type == 'VariableDeclaration'
  );
  let classExportDeclarations = source.find(
    j.ExportNamedDeclaration,
    node => node.declaration.type == 'ClassDeclaration'
  );
  let exampleName;

  // for examples with variable export declarations
  if (variableExportDeclarations.size() > 0) {
    // extract name
    variableExportDeclarations.forEach(p => {
      exampleName = p.node.declaration.declarations[0].id.name;
      source = source.find(j.ExportNamedDeclaration).replaceWith(p.node.declaration);
    });
  }

  // for examples which export react components as a class
  if (classExportDeclarations.size() > 0) {
    // extract name
    classExportDeclarations.forEach(p => {
      exampleName = p.node.declaration.id.name;
      source = source.find(j.ExportNamedDeclaration).replaceWith(p.node.declaration);
    });
  }

  // add React Render footer
  const sourceWithFooter =
    source.toSource() + '\n' + 'ReactDOM.render(<' + exampleName + '/>,document.getElementById("content"));';
  return sourceWithFooter;
}

module.exports = transform;
