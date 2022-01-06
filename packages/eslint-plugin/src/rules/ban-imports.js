// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/experimental-utils');
const createRule = require('../utils/createRule');

// Nasty syntax required for type imports until https://github.com/microsoft/TypeScript/issues/22160 is implemented.
// For some reason just importing TSESTree and accessing properties off that doesn't work.
/**
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.ImportSpecifier} ImportSpecifier
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.ImportDeclaration} ImportDeclaration
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.ExportSpecifier} ExportSpecifier
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.ExportNamedDeclaration} ExportNamedDeclaration
 *
 * @typedef {{
 *   path?: string;
 *   pathRegex?: string;
 *   names?: (string | { regex: string })[];
 *   message?: string;
 * }} OptionsInput
 * @typedef {Pick<OptionsInput, 'path' | 'message'> & {
 *   pathRegex?: RegExp;
 *   names?: (string | RegExp)[];
 * }} Options
 */

/** */
module.exports = createRule({
  name: 'ban-imports', // inspired by TSLint import-blacklist
  meta: {
    type: 'problem',
    docs: {
      description: 'Ban importing (or re-exporting) certain identifiers from certain paths or modules.',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      pathNotAllowed: "Importing from '{{path}}' is not allowed{{message}}",
      nameNotAllowed: "Importing '{{name}}' from '{{path}}' is not allowed{{message}}",
    },
    schema: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path or module to ban importing from (non-regex)',
          },
          pathRegex: {
            type: 'string',
            description: 'Regex for path or module to ban importing from',
          },
          names: {
            type: 'array',
            items: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'object',
                  properties: {
                    regex: { type: 'string', description: 'Regex for names to ban' },
                  },
                },
              ],
            },
            description:
              'If specified, only ban importing these names (if not specified, ban all imports from this path)',
          },
          message: {
            type: 'string',
            description: 'Optional custom error message',
          },
        },
        additionalProperties: false,
      },
    },
  },
  defaultOptions: [],
  create: context => {
    const rawOptions = /** @type {OptionsInput[]} */ (context.options);

    /** @type {Options[]} */
    const options = rawOptions.map(entry => {
      if (!(entry.path || entry.pathRegex)) {
        throw new Error('ban-imports: each options object must specify `path` or `pathRegex`');
      }
      if (entry.path && entry.pathRegex) {
        throw new Error('ban-imports: each objects object must specify only one of `path` or `pathRegex`');
      }
      return {
        path: entry.path,
        pathRegex: entry.pathRegex ? new RegExp(entry.pathRegex) : undefined,
        names: entry.names
          ? entry.names.map(name => (typeof name === 'string' ? name : new RegExp(name.regex)))
          : undefined,
      };
    });

    /**
     * @param {ImportDeclaration | ExportNamedDeclaration} importOrExport
     */
    function checkImportOrExport(importOrExport) {
      if (
        !importOrExport.source ||
        importOrExport.source.type !== AST_NODE_TYPES.Literal ||
        typeof importOrExport.source.value !== 'string'
      ) {
        return;
      }

      const importPath = importOrExport.source.value;
      const specifiers =
        importOrExport.type === AST_NODE_TYPES.ExportNamedDeclaration
          ? importOrExport.specifiers
          : // Filter out default imports and namespace (star) imports
            /** @type {ImportSpecifier[]} */ (importOrExport.specifiers.filter(
              spec => spec.type === AST_NODE_TYPES.ImportSpecifier,
            ));

      for (const rule of options) {
        const { path, pathRegex, names, message = '' } = rule;
        const pathForErrors = path || /** @type {RegExp} */ (pathRegex).source;
        const messageForErrors = message && `: ${message}`;

        if ((path && path === importPath) || (pathRegex && pathRegex.test(importPath))) {
          if (!names) {
            // All imports from this path are banned
            context.report({
              node: importOrExport,
              messageId: 'pathNotAllowed',
              data: { path: pathForErrors, message: messageForErrors },
            });
          } else {
            // Only certain imports from this path are banned
            for (const spec of specifiers) {
              const identifier = spec.type === AST_NODE_TYPES.ExportSpecifier ? spec.local : spec.imported;
              if (
                names.some(name => (typeof name === 'string' ? name === identifier.name : name.test(identifier.name)))
              ) {
                context.report({
                  node: identifier,
                  messageId: 'nameNotAllowed',
                  data: { path: pathForErrors, name: identifier.name, message: messageForErrors },
                });
              }
            }
          }
        }
      }
    }

    return {
      ImportDeclaration: imprt => {
        checkImportOrExport(imprt);
      },
      ExportNamedDeclaration: exprt => {
        checkImportOrExport(exprt);
      },
    };
  },
});
