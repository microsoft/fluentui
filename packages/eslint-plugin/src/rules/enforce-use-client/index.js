// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/utils');
const createRule = require('../../utils/createRule');

/**
 * @import { TSESTree } from '@typescript-eslint/utils'
 */

/**
 * @typedef {'react_api' | 'custom_hook' | 'event_handler' | 'browser_api'} FeatureKind
 */

/**
 * @typedef {{
 *   feature: {
 *     kind: FeatureKind;
 *     name: string;
 *   };
 *   node: TSESTree.Node;
 * }} ClientFeatureDetection
 */

/**
 * @typedef {{
 *   topDirectivePresent: boolean;
 *   misplacedDirective: TSESTree.ExpressionStatement | null;
 *   firstClientFeature: ClientFeatureDetection | null;
 * }} RuleState
 */

/**
 * React APIs (hooks and other APIs) that require client-side execution
 */
const CLIENT_REACT_APIS = new Set([
  // React hooks
  'useState',
  'useEffect',
  'useLayoutEffect',
  'useReducer',
  'useCallback',
  'useMemo',
  'useRef',
  'useImperativeHandle',
  'useDebugValue',
  'useDeferredValue',
  'useTransition',
  'useSyncExternalStore',
  'useInsertionEffect',
  'useContext',
  // React 19 hooks
  'useActionState',
  'useOptimistic',
  // React APIs
  'createContext',
  'forwardRef',
  'memo',
  'startTransition',
]);

/**
 * React hooks that are safe to use on the server
 */
const SERVER_SAFE_HOOKS = new Set(['use', 'useId']);

/**
 * Browser-specific global objects that require client-side execution
 */
const BROWSER_GLOBALS = new Set([
  'window',
  'document',
  'navigator',
  'localStorage',
  'sessionStorage',
  'history',
  'location',
]);

/**
 * Determines if a property name represents an event handler
 * @param {string} name - The property name to check
 * @returns {boolean} True if the name follows the onXxx pattern
 */
const isEventHandler = name => /^on[A-Z]/.test(name);

/**
 * Determines if a function name represents a potential custom hook
 * @param {string} name - The function name to check
 * @returns {boolean} True if it follows the useXxx pattern and isn't server-safe
 */
const isPotentialCustomHook = name => name.startsWith('use') && name.length > 3 && !SERVER_SAFE_HOOKS.has(name);

module.exports = createRule({
  name: 'enforce-use-client',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce 'use client' directive for Client React components",
    },
    messages: {
      missingUseClient:
        "The module uses client-side features ({{clientFeatures}}) and must include 'use client' directive at the top of the file.",
      unnecessaryUseClient:
        "The module does not use any client-side features and should not include the 'use client' directive.",
    },
    schema: [],
    fixable: 'code',
  },
  create(context) {
    const sourceCode = context.sourceCode;

    // State tracking for rule analysis
    /** @type {RuleState} */
    const ruleState = {
      topDirectivePresent: false,
      misplacedDirective: null,
      firstClientFeature: null,
    };

    /**
     * Checks if a statement is a 'use client' directive
     * @param {TSESTree.Statement} stmt
     * @returns {boolean}
     */
    function isUseClientDirective(stmt) {
      return (
        stmt.type === AST_NODE_TYPES.ExpressionStatement &&
        stmt.expression.type === AST_NODE_TYPES.Literal &&
        stmt.expression.value === 'use client'
      );
    }

    /**
     * Records the first client-side feature detected (for early exit and better error reporting)
     * @param {FeatureKind} kind - The type of feature
     * @param {string} name - The name of the feature
     * @param {TSESTree.Node} node - The AST node where the feature was detected
     */
    function recordFirstClientFeature(kind, name, node) {
      if (!ruleState.firstClientFeature) {
        ruleState.firstClientFeature = {
          feature: { kind, name },
          node,
        };
      }
    }

    /**
     * Helper to check if we should skip further analysis (early exit optimization)
     * @returns {boolean}
     */
    function shouldSkipAnalysis() {
      // Skip only if we found a client feature and have the directive (everything is correct)
      return ruleState.firstClientFeature !== null && ruleState.topDirectivePresent;
    }

    return {
      /**
       * Check for 'use client' directive at program start
       * @param {TSESTree.Program} node
       */
      Program(node) {
        const { body } = sourceCode.ast;

        // Check if 'use client' is the first statement
        if (body.length > 0) {
          const firstStatement = body[0];
          if (isUseClientDirective(firstStatement)) {
            ruleState.topDirectivePresent = true;
          }
        }

        // Look for misplaced directive
        if (!ruleState.topDirectivePresent) {
          const misplaced = body.find(stmt => isUseClientDirective(stmt));
          if (misplaced) {
            ruleState.misplacedDirective = /** @type {TSESTree.ExpressionStatement} */ (misplaced);
          }
        }
      },

      /**
       * Check function calls for React APIs and custom hooks
       * @param {TSESTree.CallExpression} node
       */
      CallExpression(node) {
        if (shouldSkipAnalysis()) return;

        if (node.callee.type === AST_NODE_TYPES.Identifier) {
          const name = node.callee.name;
          if (CLIENT_REACT_APIS.has(name)) {
            recordFirstClientFeature('react_api', name, node);
          } else if (isPotentialCustomHook(name)) {
            recordFirstClientFeature('custom_hook', name, node);
          }
        } else if (node.callee.type === AST_NODE_TYPES.MemberExpression) {
          const memberExpr = node.callee;
          if (memberExpr.property.type === AST_NODE_TYPES.Identifier) {
            const prop = memberExpr.property.name;
            if (CLIENT_REACT_APIS.has(prop)) {
              recordFirstClientFeature('react_api', `React.${prop}`, node);
            } else if (isPotentialCustomHook(prop)) {
              recordFirstClientFeature('custom_hook', `React.${prop}`, node);
            }
          }
        }
      },

      /**
       * Check JSX attributes for event handlers
       * @param {TSESTree.JSXAttribute} node
       */
      JSXAttribute(node) {
        if (shouldSkipAnalysis()) return;

        if (node.name.type === AST_NODE_TYPES.JSXIdentifier && isEventHandler(node.name.name)) {
          recordFirstClientFeature('event_handler', node.name.name, node);
        }
      },

      /**
       * Check member expressions for browser APIs
       * @param {TSESTree.MemberExpression} node
       */
      MemberExpression(node) {
        if (shouldSkipAnalysis()) return;

        if (node.object.type === AST_NODE_TYPES.Identifier && BROWSER_GLOBALS.has(node.object.name)) {
          recordFirstClientFeature('browser_api', node.object.name, node);
        }
      },

      /**
       * Check function declarations for custom hooks
       * @param {TSESTree.FunctionDeclaration} node
       */
      FunctionDeclaration(node) {
        if (shouldSkipAnalysis()) return;

        if (node.id && isPotentialCustomHook(node.id.name)) {
          recordFirstClientFeature('custom_hook', node.id.name, node);
        }
      },

      /**
       * Check variable declarations for custom hooks (const useHook = () => {...})
       * @param {TSESTree.VariableDeclarator} node
       */
      VariableDeclarator(node) {
        if (shouldSkipAnalysis()) return;

        if (
          node.id.type === AST_NODE_TYPES.Identifier &&
          isPotentialCustomHook(node.id.name) &&
          (node.init?.type === AST_NODE_TYPES.FunctionExpression || node.init?.type === AST_NODE_TYPES.ArrowFunctionExpression)
        ) {
          recordFirstClientFeature('custom_hook', node.id.name, node);
        }
      },

      /**
       * Handles program exit to generate final rule violations
       * @param {TSESTree.Program} program
       */
      'Program:exit'(program) {
        const hasClientFeatures = ruleState.firstClientFeature !== null;

        // Handle unnecessary 'use client' directive
        if (!hasClientFeatures && ruleState.topDirectivePresent) {
          context.report({
            node: program.body[0], // The 'use client' directive
            messageId: 'unnecessaryUseClient',
            fix: fixer => {
              const sourceCodeText = sourceCode.getText();
              const firstStatement = program.body[0];

              if (program.body.length === 1) {
                // Check if there's any content after the directive
                const directiveEnd = firstStatement.range[1];
                const restOfFile = sourceCodeText.slice(directiveEnd);

                if (restOfFile.trim() === '') {
                  // No meaningful content after directive, remove everything
                  return fixer.removeRange([0, sourceCodeText.length]);
                } else {
                  // There's content (like comments) after the directive, preserve it
                  // Remove directive and its trailing newline
                  const nextNonWhitespaceIndex = directiveEnd + (restOfFile.match(/^\s*/) || [''])[0].length;
                  return fixer.removeRange([0, nextNonWhitespaceIndex]);
                }
              } else {
                // Remove directive and any trailing whitespace up to the next statement
                const secondStatement = program.body[1];
                return fixer.removeRange([0, secondStatement.range[0]]);
              }
            },
          });
          return;
        }

        // If there are no client features and no directive, nothing to do
        if (!hasClientFeatures) return;

        // Already has correct directive
        if (ruleState.topDirectivePresent) return;

        // Report error on the specific problematic API call for better DX
        const clientFeatureDetection = ruleState.firstClientFeature;
        const clientFeatureString = `${clientFeatureDetection.feature.kind}: ${clientFeatureDetection.feature.name}`;

        context.report({
          node: clientFeatureDetection.node, // Report on the specific problematic node
          messageId: 'missingUseClient',
          data: { clientFeatures: clientFeatureString },
          fix: fixer => {
            const fixes = [];
            const firstNode = program.body[0];

            // Add directive at the top
            if (firstNode) {
              fixes.push(fixer.insertTextBefore(firstNode, '"use client";\n'));
            } else {
              fixes.push(fixer.insertTextBeforeRange([0, 0], '"use client";\n'));
            }

            // Remove misplaced directive if it exists
            if (ruleState.misplacedDirective) {
              fixes.push(fixer.remove(ruleState.misplacedDirective));
            }

            return fixes;
          },
        });
      },
    };
  },
});