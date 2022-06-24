// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/experimental-utils');
const createRule = require('../../utils/createRule');

/**
 * @typedef {import("@typescript-eslint/types/dist/ts-estree").ImportClause} ImportClause
 *
 * Lookup for insertion point for new imports when moving a restricted import to a preferred import.
 * @typedef {{[preferredPkgName: string] : ImportClause}} FixMap
 *
 * @typedef {{
 *   forbidden: string[],
 *   preferred?: string
 * }} PathOptions
 *
 * @typedef {{
 *   paths: PathOptions[];
 * }} Options
 */

module.exports = createRule({
  name: 'no-restricted-imports',
  meta: {
    type: 'problem',
    docs: {
      description: 'Restricts imports of certain packages',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      restrictedImport: 'Import from {{ packageName }} detected which is not allowed.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          paths: {
            type: 'array',
            minItems: 1,
            items: {
              forbidden: {
                type: 'array',
                minItems: 1,
                items: {
                  type: 'string',
                },
              },
              preferred: {
                type: 'string',
              },
            },
          },
        },
      },
    ],
  },
  defaultOptions: [],
  create: context => {
    /** @type {Options[]} */
    const options = context.options;

    if (!options.length) {
      throw new Error('no-restricted-imports: Must specify a paths object.');
    }

    /** @type {FixMap}*/
    const typeImportKindFix = {};
    /** @type {FixMap}*/
    const valueImportKindFix = {};

    const paths = options[0].paths;
    /** @type {Map<string, string | undefined>} */
    const forbiddenPkgs = new Map();
    /** @type {Set<string>} */
    const preferredPkgNames = new Set();
    /** @type {string[]} */
    const overlappingPkgs = [];

    paths.forEach(path => {
      const { forbidden, preferred } = path;
      forbidden.forEach(pkg => {
        forbiddenPkgs.set(pkg, preferred);
      });
    });

    forbiddenPkgs.forEach(preferred => {
      if (preferred) {
        preferredPkgNames.add(preferred);
      }
    });

    forbiddenPkgs.forEach((_, forbidden) => {
      if (preferredPkgNames.has(forbidden)) {
        overlappingPkgs.push(forbidden);
      }
    });

    if (overlappingPkgs.length) {
      throw new Error(
        `no-restricted-imports: The package(s) ${overlappingPkgs.join(
          ', ',
        )} are not mutually exclusive as they are both forbidden and preferred. `,
      );
    }

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration: imprt => {
        if (!imprt.source || (imprt.source && imprt.source.type !== AST_NODE_TYPES.Literal)) {
          return;
        }

        if (typeof imprt.source.value !== 'string') {
          return;
        }

        const packageName = imprt.source.value;
        const specifiers = imprt.specifiers;

        if (!forbiddenPkgs.has(packageName) && !preferredPkgNames.has(packageName)) {
          return;
        }

        /**
         * @param {FixMap} fixMap object mapping to track if a restricted package's preferred import is
         * already present in the file.
         */
        function runLintRule(fixMap) {
          const preferredImportForCurrentPkg = forbiddenPkgs.get(packageName);
          if (preferredPkgNames.has(packageName) && !fixMap[packageName]) {
            fixMap[packageName] = specifiers[specifiers.length - 1];
          }

          if (forbiddenPkgs.has(packageName)) {
            if (
              !preferredImportForCurrentPkg ||
              (preferredImportForCurrentPkg && !fixMap[preferredImportForCurrentPkg])
            ) {
              if (preferredImportForCurrentPkg) {
                fixMap[preferredImportForCurrentPkg] = specifiers[specifiers.length - 1];
              }
              context.report({
                node: imprt,
                messageId: 'restrictedImport',
                data: { packageName },
                fix: fixer => {
                  const [start, end] = imprt.source.range;
                  return preferredImportForCurrentPkg
                    ? fixer.replaceTextRange([start + 1, end - 1], preferredImportForCurrentPkg)
                    : null;
                },
              });
            } else {
              context.report({
                node: imprt,
                messageId: 'restrictedImport',
                data: { packageName },
                fix: fixer => {
                  const importsToAdd = `, ${imprt.specifiers.map(specifier => specifier.local.name).join(', ')}`;
                  return preferredImportForCurrentPkg
                    ? [
                        fixer.insertTextAfterRange(fixMap[preferredImportForCurrentPkg].range, importsToAdd),
                        fixer.remove(imprt),
                      ]
                    : null;
                },
              });
            }
          }
        }

        if (imprt.importKind === 'value') {
          runLintRule(valueImportKindFix);
        }

        if (imprt.importKind === 'type') {
          runLintRule(typeImportKindFix);
        }
      },
    };
  },
});
