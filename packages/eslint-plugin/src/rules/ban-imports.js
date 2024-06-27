// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/utils');
const createRule = require('../utils/createRule');

// Nasty syntax required for type imports until https://github.com/microsoft/TypeScript/issues/22160 is implemented.
// For some reason just importing TSESTree and accessing properties off that doesn't work.
/**
 * @typedef {import("@typescript-eslint/utils").TSESTree.ExportNamedDeclaration} ExportNamedDeclaration
 * @typedef {import("@typescript-eslint/utils").TSESTree.ExportSpecifier} ExportSpecifier
 * @typedef {import("@typescript-eslint/utils").TSESTree.Identifier} Identifier
 * @typedef {import("@typescript-eslint/utils").TSESTree.ImportDeclaration} ImportDeclaration
 * @typedef {import("@typescript-eslint/utils").TSESTree.ImportSpecifier} ImportSpecifier
 *
 * @typedef {{
 *   path?: string;
 *   pathRegex?: string;
 *   names?: (string | { regex: string })[];
 *   message?: string;
 * }} OptionsInput
 * @typedef {{
 *   path: string | RegExp;
 *   names?: (string | RegExp)[];
 *   message?: string;
 * }} Options
 */

/** */
module.exports = createRule({
  name: 'ban-imports', // inspired by TSLint import-blacklist
  meta: {
    type: 'problem',
    docs: {
      description: 'Ban importing (or re-exporting) certain identifiers from certain paths or modules.',
      recommended: false,
    },
    messages: {
      pathNotAllowed: "{{verb}} from '{{path}}' is not allowed{{message}}",
      nameNotAllowed: "{{verb}} '{{name}}' from '{{path}}' is not allowed{{message}}",
    },
    schema: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path or module to ban importing or re-exporting from (non-regex)',
          },
          pathRegex: {
            type: 'string',
            description: 'Regex for path or module to ban importing or re-exporting from',
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
              'If specified, only ban importing or re-exporting these names (if not specified, ban all from this path)',
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
        path: entry.path || new RegExp(/** @type {string} */ (entry.pathRegex)),
        names: entry.names
          ? entry.names.map(name => (typeof name === 'string' ? name : new RegExp(name.regex)))
          : undefined,
      };
    });

    /**
     * @param {string} value
     * @param {string | RegExp} stringOrRegex
     */
    function isMatch(value, stringOrRegex) {
      return typeof stringOrRegex === 'string' ? value === stringOrRegex : stringOrRegex.test(value);
    }

    /**
     * @param {ImportDeclaration | ExportNamedDeclaration} importOrExport the whole import/export node
     * @param {string} importPath path importing/exporting from
     * @param {Identifier[]} identifiers imported/exported identifiers
     */
    function checkImportOrExport(importOrExport, importPath, identifiers) {
      for (const rule of options) {
        const { path, names, message } = rule;

        if (!isMatch(importPath, path)) {
          continue;
        }

        const errorData = {
          path: typeof path === 'string' ? path : path.source,
          message: message ? `: ${message}` : '',
          verb: importOrExport.type === AST_NODE_TYPES.ImportDeclaration ? 'Importing' : 'Exporting',
        };

        if (names) {
          // Only certain imports from this path are banned
          for (const identifier of identifiers) {
            if (names.some(name => isMatch(identifier.name, name))) {
              context.report({
                node: identifier,
                messageId: 'nameNotAllowed',
                data: { ...errorData, name: identifier.name },
              });
            }
          }
        } else {
          // All imports from this path are banned
          context.report({
            node: importOrExport,
            messageId: 'pathNotAllowed',
            data: errorData,
          });
        }
      }
    }

    return {
      ImportDeclaration: imprt => {
        // imprt.source.value is the import path (should always be a string in practice, but it's
        // typed to allow any literal type such as number for some reason)
        if (typeof imprt.source.value !== 'string') {
          return;
        }

        const specifiers = /** @type {ImportSpecifier[]} */ (
          imprt.specifiers.filter(
            // Filter out default imports and namespace (star) imports
            spec => spec.type === AST_NODE_TYPES.ImportSpecifier,
          )
        )
          // spec.imported is the original name: `foo` in `import { foo as bar } from 'whatever'`
          .map(spec => spec.imported);

        checkImportOrExport(imprt, imprt.source.value, specifiers);
      },
      ExportNamedDeclaration: exprt => {
        // Verify that the import or export is from a literal path, not an export of a local name
        if (exprt.source?.type !== AST_NODE_TYPES.Literal || typeof exprt.source.value !== 'string') {
          return;
        }

        checkImportOrExport(
          exprt,
          exprt.source.value,
          // spec.local is the original name: `foo` in `export { foo as bar } from 'whatever'`
          exprt.specifiers.map(spec => spec.local),
        );
      },
    };
  },
});
