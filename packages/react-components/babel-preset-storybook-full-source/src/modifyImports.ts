import * as Babel from '@babel/core';
import * as pkgUp from 'pkg-up';
import * as fs from 'fs';
import { BabelPluginOptions } from './types';

interface PluginState extends Babel.PluginPass {
  imports: Record<string, string[]>;
}

export const PLUGIN_NAME = 'storybook-stories-modifyImports';

/**
 * Collects all relative import declarations starting with '.' and all @fluentui/ scoped imports
 * Replaces all import declarations with one single import declartion from @fluentui/react-components
 *
 * See test fixtures for usage examples
 */
export function modifyImportsPlugin(babel: typeof Babel, options: BabelPluginOptions): Babel.PluginObj<PluginState> {
  const { types: t } = babel;

  return {
    name: PLUGIN_NAME,
    manipulateOptions: (opts, parserOptions) => {
      parserOptions.plugins.push('classProperties');
      parserOptions.plugins.push('jsx');
      parserOptions.plugins.push('objectRestSpread');
      parserOptions.plugins.push('typescript');
    },
    pre() {
      this.imports = Object.keys(options).reduce((acc, cur) => {
        acc[options[cur].replace] = [];
        return acc;
      }, {} as PluginState['imports']);
    },
    visitor: {
      Program: {
        exit(path, pluginState) {
          Object.entries(pluginState.imports).forEach(([depName, importSpecifiers]) => {
            const specifiers = importSpecifiers.map(importSpecifier =>
              t.importSpecifier(t.identifier(importSpecifier), t.identifier(importSpecifier)),
            );

            if (specifiers.length) {
              path.node.body.unshift(t.importDeclaration(specifiers, t.stringLiteral(depName)));
            }
          });
        },
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration(path, pluginState) {
        let importSource = path.node.source;
        const isRelativeImport = importSource.value.startsWith('.');
        const isRelativeImportToIndexBarrel = importSource.value.endsWith('./index');

        if (isRelativeImport && !isRelativeImportToIndexBarrel) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              [
                `🚨 Relative import '${importSource.value}' found in ${pluginState.filename} - removing from output - this might create invalid code.`,
                `Relative imports not pointing to index barrel files are NOT ALLOWED in order to be able to generate valid 1 file code examples.`,
              ].join('\n'),
            );
          }

          path.remove();
          return;
        }

        if (isRelativeImportToIndexBarrel) {
          const pkgJsonPath = pkgUp.sync({ cwd: pluginState.filename });
          if (pkgJsonPath) {
            const pkgJsonRaw = fs.readFileSync(pkgJsonPath);
            importSource = t.stringLiteral(JSON.parse(pkgJsonRaw.toString()).name);
          } else {
            throw new Error(
              'Relative import without a package.json in the file tree. Please report this issue to maintainers',
            );
          }
        }

        if (t.isLiteral(path.node.source) && options[importSource.value]) {
          path.node.specifiers.forEach(specifier => {
            if (
              t.isImportSpecifier(specifier) &&
              t.isIdentifier(specifier.imported) &&
              t.isIdentifier(specifier.local)
            ) {
              pluginState.imports[options[importSource.value].replace].push(specifier.imported.name);
            }
          });

          path.remove();
        }
      },
    },
  };
}
