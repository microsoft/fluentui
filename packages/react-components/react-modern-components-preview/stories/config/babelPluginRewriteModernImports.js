const fs = require('fs');
const path = require('path');

const babel = require('@babel/core');
const parser = require('@babel/parser');

const modernPackageName = '@fluentui/react-modern-components-preview';
const modernSourceRoot = path.resolve(__dirname, '../../library/src');

const stableComponentPackages = new Set([
  '@fluentui/react-accordion',
  '@fluentui/react-avatar',
  '@fluentui/react-badge',
  '@fluentui/react-breadcrumb',
  '@fluentui/react-button',
  '@fluentui/react-card',
  '@fluentui/react-checkbox',
  '@fluentui/react-color-picker',
  '@fluentui/react-combobox',
  '@fluentui/react-components',
  '@fluentui/react-dialog',
  '@fluentui/react-divider',
  '@fluentui/react-drawer',
  '@fluentui/react-field',
  '@fluentui/react-image',
  '@fluentui/react-infolabel',
  '@fluentui/react-input',
  '@fluentui/react-label',
  '@fluentui/react-link',
  '@fluentui/react-menu',
  '@fluentui/react-message-bar',
  '@fluentui/react-nav',
  '@fluentui/react-overflow',
  '@fluentui/react-persona',
  '@fluentui/react-popover',
  '@fluentui/react-progress',
  '@fluentui/react-radio',
  '@fluentui/react-rating',
  '@fluentui/react-search',
  '@fluentui/react-select',
  '@fluentui/react-skeleton',
  '@fluentui/react-slider',
  '@fluentui/react-spinbutton',
  '@fluentui/react-spinner',
  '@fluentui/react-swatch-picker',
  '@fluentui/react-switch',
  '@fluentui/react-tabs',
  '@fluentui/react-tag-picker',
  '@fluentui/react-tags',
  '@fluentui/react-teaching-popover',
  '@fluentui/react-textarea',
  '@fluentui/react-toast',
  '@fluentui/react-toolbar',
  '@fluentui/react-tooltip',
]);

function getExportedName(exported) {
  return exported.type === 'Identifier' ? exported.name : exported.value;
}

function getModernExport(importedName) {
  const directImportPath = modernExportMap.get(importedName);

  if (directImportPath) {
    return { importPath: directImportPath, importedName };
  }

  const stableName = importedName.replace(/_unstable$/, '');
  const stableImportPath = modernExportMap.get(stableName);

  return stableImportPath ? { importPath: stableImportPath, importedName: stableName } : undefined;
}

function createModernExportMap() {
  const exportMap = new Map();
  const entryPoints = fs
    .readdirSync(modernSourceRoot)
    .filter(fileName => fileName.endsWith('.ts') && fileName !== 'index.ts')
    .sort();

  for (const entryPoint of entryPoints) {
    const source = fs.readFileSync(path.join(modernSourceRoot, entryPoint), 'utf8');
    const ast = parser.parse(source, {
      sourceType: 'module',
      plugins: ['typescript'],
    });
    const importPath = `${modernPackageName}/${entryPoint.slice(0, -3)}`;

    for (const statement of ast.program.body) {
      if (statement.type !== 'ExportNamedDeclaration') {
        continue;
      }

      for (const specifier of statement.specifiers) {
        const exportName = getExportedName(specifier.exported);
        exportMap.set(exportName, exportMap.get(exportName) ?? importPath);
      }
    }
  }

  return exportMap;
}

const modernExportMap = createModernExportMap();

function rewriteModernImports(babelApi, options = {}) {
  if (options.fullSource) {
    return rewriteModernFullSource(babelApi);
  }

  const { types: t } = babelApi;

  return {
    name: 'rewrite-fluent-modern-component-imports',
    visitor: {
      ImportDeclaration(importPath) {
        const source = importPath.node.source.value;

        if (!stableComponentPackages.has(source)) {
          return;
        }

        const originalSpecifiers = [];
        const modernSpecifiers = new Map();

        for (const specifier of importPath.node.specifiers) {
          if (!t.isImportSpecifier(specifier)) {
            originalSpecifiers.push(specifier);
            continue;
          }

          const importedName =
            specifier.imported.type === 'Identifier' ? specifier.imported.name : specifier.imported.value;
          const modernExport = getModernExport(importedName);

          if (!modernExport) {
            originalSpecifiers.push(specifier);
            continue;
          }

          const specifiers = modernSpecifiers.get(modernExport.importPath) ?? [];
          const modernSpecifier = t.cloneNode(specifier);
          modernSpecifier.imported = t.identifier(modernExport.importedName);
          specifiers.push(modernSpecifier);
          modernSpecifiers.set(modernExport.importPath, specifiers);
        }

        if (modernSpecifiers.size === 0) {
          return;
        }

        const declarations = [];

        if (originalSpecifiers.length > 0) {
          const declaration = t.importDeclaration(originalSpecifiers, t.stringLiteral(source));
          declaration.importKind = importPath.node.importKind;
          declarations.push(declaration);
        }

        for (const [modernImportPath, specifiers] of modernSpecifiers) {
          const declaration = t.importDeclaration(specifiers, t.stringLiteral(modernImportPath));
          declaration.importKind = importPath.node.importKind;
          declarations.push(declaration);
        }

        importPath.replaceWithMultiple(declarations);
      },
    },
  };
}

function transformModernImports(source) {
  return (
    babel.transformSync(source, {
      babelrc: false,
      configFile: false,
      filename: 'modern-story-source.tsx',
      parserOpts: {
        plugins: ['classProperties', 'jsx', 'objectRestSpread', 'typescript'],
      },
      plugins: [rewriteModernImports],
    })?.code ?? source
  );
}

function rewriteModernFullSource({ types: t }) {
  return {
    name: 'rewrite-fluent-modern-full-source',
    visitor: {
      Program: {
        exit(programPath) {
          programPath.traverse({
            AssignmentExpression(assignmentPath) {
              const { left, right } = assignmentPath.node;
              const isFullSourceAssignment =
                t.isMemberExpression(left) &&
                ((t.isIdentifier(left.property) && left.property.name === 'fullSource') ||
                  (left.computed && t.isStringLiteral(left.property, { value: 'fullSource' })));

              if (isFullSourceAssignment && t.isStringLiteral(right)) {
                right.value = transformModernImports(right.value);
              }
            },
          });
        },
      },
    },
  };
}

module.exports = rewriteModernImports;
module.exports.rewriteModernFullSource = rewriteModernFullSource;
module.exports.transformModernImports = transformModernImports;
