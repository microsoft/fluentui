import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

import { createRule } from './utils/create-rule';

// NOTE: The rule will be available in ESLint configs as "@fluentui/react-components/enforce-use-client"
export const RULE_NAME = 'enforce-use-client';

type MessageIds = 'missingUseClient' | 'unnecessaryUseClient';

/**
 * Rule options for configuring RSC-unsafe functions
 */
export interface RuleOptions {
  /**
   * Functions that require 'use client' directive when called or referenced.
   * These are functions that internally use browser APIs or client-side features.
   *
   * Consumers can override this list completely to customize which functions
   * are considered unsafe for React Server Components.
   *
   * @default ["canUseDOM", "makeStyles", "makeResetStyles", "makeStaticStyles"]
   * @example ["myCustomBrowserFunction", "useClientOnlyUtil"]
   */
  rscUnsafeFunctions?: string[];
}

/**
 * Represents the different types of client-side features that require the 'use client' directive
 */
type FeatureKind = 'react_api' | 'custom_hook' | 'event_handler' | 'browser_api' | 'rsc_unsafe_function';

/**
 * Combined client feature detection result
 */
interface ClientFeatureDetection {
  /** The detected feature information */
  feature: {
    kind: FeatureKind;
    name: string;
  };
  /** The AST node where the feature was detected */
  node: TSESTree.Node;
}

/**
 * State tracking interface for rule analysis
 */
interface RuleState {
  /** True if first statement already is the directive */
  topDirectivePresent: boolean;
  /** A later directive to relocate */
  misplacedDirective: TSESTree.ExpressionStatement | null;
  /** First detected client-side feature with its node (for early exit and error reporting) */
  firstClientFeature: ClientFeatureDetection | null;
  /** Set of imported custom hook names (e.g., useCustomHook from imports) */
  importedCustomHooks: Set<string>;
  /** Set of imported RSC-unsafe function names */
  importedRSCUnsafeFunctions: Set<string>;
  /** React namespace/default import names (e.g., 'React' from 'import React' or 'import * as React') */
  reactImportNames: Set<string>;
}

/**
 * React APIs (hooks and other APIs) that require client-side execution
 *
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
 *
 */
const SERVER_SAFE_HOOKS = new Set(['use', 'useId']);

/**
 * Browser-specific global objects that require client-side execution
 *
 */
const BROWSER_GLOBALS = new Set([
  'window',
  'document',
  'navigator',
  'localStorage',
  'sessionStorage',
  'history',
  'location',
  'globalThis',
]);

/**
 * Functions that internally use browser APIs and should only be called in 'use client' modules
 * These functions may have typeof checks internally, but when called at module scope they still
 * require client-side execution.
 */
const RSC_UNSAFE_FUNCTIONS = [
  'canUseDOM',
  // Griffel styling functions that require client-side execution
  'makeStyles',
  'makeResetStyles',
  'makeStaticStyles',
];

/**
 * Determines if a property name represents an event handler
 * @param name - The property name to check
 * @returns True if the name follows the onXxx pattern
 */
const isEventHandler = (name: string): boolean => /^on[A-Z]/.test(name);

/**
 * Determines if a function name represents a potential custom hook
 * @param name - The function name to check
 * @returns True if it follows the useXxx pattern and isn't server-safe
 */
const isPotentialCustomHook = (name: string): boolean =>
  name.startsWith('use') && name.length > 3 && !SERVER_SAFE_HOOKS.has(name);

/**
 * ESLint rule configuration and metadata
 */
export const rule = createRule<[RuleOptions?], MessageIds>({
  name: RULE_NAME,
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
    schema: [
      {
        type: 'object',
        properties: {
          rscUnsafeFunctions: {
            type: 'array',
            items: {
              type: 'string',
            },
            description:
              'Functions that require "use client" directive when called or referenced. Defaults to FluentUI-specific functions but can be overridden.',
          },
        },
        additionalProperties: false,
      },
    ],
    fixable: 'code',
  },
  defaultOptions: [{ rscUnsafeFunctions: RSC_UNSAFE_FUNCTIONS }],
  create(context, [options]) {
    const sourceCode = context.sourceCode;

    // Use configured RSC-unsafe functions (defaults are set in defaultOptions)
    const rscUnsafeFunctions = new Set(options?.rscUnsafeFunctions || RSC_UNSAFE_FUNCTIONS);

    // State tracking for rule analysis
    const ruleState: RuleState = {
      topDirectivePresent: false,
      misplacedDirective: null,
      firstClientFeature: null,
      importedCustomHooks: new Set(),
      importedRSCUnsafeFunctions: new Set(),
      reactImportNames: new Set(),
    };

    /**
     * Checks if a statement is a 'use client' directive
     */
    function isUseClientDirective(stmt: TSESTree.Statement): boolean {
      return (
        stmt.type === AST_NODE_TYPES.ExpressionStatement &&
        stmt.expression.type === AST_NODE_TYPES.Literal &&
        stmt.expression.value === 'use client'
      );
    }

    /**
     * Records the first client-side feature detected (for early exit and better error reporting)
     * @param kind - The type of feature
     * @param name - The name of the feature
     * @param node - The AST node where the feature was detected
     */
    function recordFirstClientFeature(kind: FeatureKind, name: string, node: TSESTree.Node): void {
      if (!ruleState.firstClientFeature) {
        ruleState.firstClientFeature = {
          feature: { kind, name },
          node,
        };
      }
    }

    /**
     * Helper to check if we should skip further analysis (early exit optimization)
     */
    function shouldSkipAnalysis(): boolean {
      // Skip only if we found a client feature and have the directive (everything is correct)
      return ruleState.firstClientFeature !== null && ruleState.topDirectivePresent;
    }

    /**
     * Checks if an identifier references an imported custom hook or RSC-unsafe function
     * and records it as a client feature if found.
     *
     * This is separated from the ImportDeclaration visitor for performance:
     * - ImportDeclaration builds O(n) lookup sets during import scanning
     * - This helper performs O(1) set membership checks per identifier
     *
     * Alternative approach of merging with scope-based analysis would require
     * O(scope depth) traversal per identifier, which is significantly slower.
     *
     * @param node - The identifier node to check
     * @param name - The identifier name
     */
    function checkImportedIdentifier(node: TSESTree.Identifier, name: string): void {
      // Check if this is a reference to an imported custom hook
      if (ruleState.importedCustomHooks.has(name)) {
        recordFirstClientFeature('custom_hook', name, node);
      }

      // Check if this is a reference to an imported RSC-unsafe function
      if (ruleState.importedRSCUnsafeFunctions.has(name)) {
        recordFirstClientFeature('rsc_unsafe_function', name, node);
      }
    }

    return {
      /**
       * Check for 'use client' directive at program start
       */
      Program() {
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
            ruleState.misplacedDirective = misplaced as TSESTree.ExpressionStatement;
          }
        }
      },

      /**
       * Track imported custom hooks and RSC-unsafe functions
       */
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        if (shouldSkipAnalysis()) {
          return;
        }

        // Track React default/namespace imports (import React from 'react', import * as React from 'react')
        const source = node.source.value;
        if (source === 'react') {
          for (const specifier of node.specifiers) {
            if (
              specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier ||
              specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier
            ) {
              ruleState.reactImportNames.add(specifier.local.name);
            }
          }
        }

        for (const specifier of node.specifiers) {
          if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
            const importedName =
              specifier.imported.type === AST_NODE_TYPES.Identifier
                ? specifier.imported.name
                : specifier.imported.value;

            // Track custom hooks
            if (isPotentialCustomHook(importedName)) {
              ruleState.importedCustomHooks.add(specifier.local.name);
            }

            // Track RSC-unsafe functions (including user-configured ones)
            if (rscUnsafeFunctions.has(importedName)) {
              ruleState.importedRSCUnsafeFunctions.add(specifier.local.name);
            }
          }
        }
      },

      /**
       * Detect when imported custom hooks or RSC-unsafe functions are referenced
       */
      Identifier(node: TSESTree.Identifier) {
        if (shouldSkipAnalysis()) {
          return;
        }

        // Defensive null check to satisfy TypeScript
        // In practice, identifiers in the AST should always have a parent node
        const parent = node.parent;
        if (!parent) {
          return;
        }

        // Skip type annotations, type parameters, and import/export declarations
        if (
          parent.type === AST_NODE_TYPES.TSTypeReference ||
          parent.type === AST_NODE_TYPES.TSTypeQuery ||
          parent.type === AST_NODE_TYPES.TSTypeAnnotation ||
          parent.type === AST_NODE_TYPES.TSTypeParameter ||
          parent.type === AST_NODE_TYPES.ImportSpecifier ||
          parent.type === AST_NODE_TYPES.ImportDefaultSpecifier ||
          parent.type === AST_NODE_TYPES.ImportNamespaceSpecifier ||
          parent.type === AST_NODE_TYPES.ExportSpecifier
        ) {
          return;
        }

        // Skip if it's a property key in an object (unless it's a shorthand property)
        if (parent.type === AST_NODE_TYPES.Property) {
          if (parent.key === node && !parent.shorthand && !parent.computed) {
            return;
          }
        }

        // Skip if it's the left side of an assignment or variable declarator
        if (
          (parent.type === AST_NODE_TYPES.AssignmentExpression && parent.left === node) ||
          (parent.type === AST_NODE_TYPES.VariableDeclarator && parent.id === node)
        ) {
          return;
        }

        // Check for direct browser global references (e.g., `const w = window;`)
        // But skip if:
        // - It's part of a MemberExpression (handled by MemberExpression visitor)
        // - It's used in typeof check (typeof window) - this is safe for SSR/RSC
        if (
          BROWSER_GLOBALS.has(node.name) &&
          parent.type !== AST_NODE_TYPES.MemberExpression &&
          !(parent.type === AST_NODE_TYPES.UnaryExpression && parent.operator === 'typeof')
        ) {
          recordFirstClientFeature('browser_api', node.name, node);
        }

        // Check if this identifier references an imported custom hook or RSC-unsafe function
        checkImportedIdentifier(node, node.name);
      },

      /**
       * Check function calls for React APIs and custom hooks
       */
      CallExpression(node: TSESTree.CallExpression) {
        if (shouldSkipAnalysis()) {
          return;
        }

        if (node.callee.type === AST_NODE_TYPES.Identifier) {
          const name = node.callee.name;
          if (CLIENT_REACT_APIS.has(name)) {
            recordFirstClientFeature('react_api', name, node);
          } else if (isPotentialCustomHook(name)) {
            recordFirstClientFeature('custom_hook', name, node);
          } else if (rscUnsafeFunctions.has(name)) {
            recordFirstClientFeature('rsc_unsafe_function', name, node);
          }
        } else if (node.callee.type === AST_NODE_TYPES.MemberExpression) {
          const memberExpr = node.callee;
          if (
            memberExpr.object.type === AST_NODE_TYPES.Identifier &&
            memberExpr.property.type === AST_NODE_TYPES.Identifier
          ) {
            const objectName = memberExpr.object.name;
            const prop = memberExpr.property.name;

            // Check if calling React.* where React is imported (import React from 'react')
            if (ruleState.reactImportNames.has(objectName)) {
              if (CLIENT_REACT_APIS.has(prop)) {
                recordFirstClientFeature('react_api', `${objectName}.${prop}`, node);
              } else if (isPotentialCustomHook(prop)) {
                recordFirstClientFeature('custom_hook', `${objectName}.${prop}`, node);
              } else if (prop === 'lazy') {
                // React.lazy() requires client-side execution
                recordFirstClientFeature('react_api', `${objectName}.lazy`, node);
              }
            } else {
              // Fallback for untracked React usage (e.g., from global scope)
              if (CLIENT_REACT_APIS.has(prop)) {
                recordFirstClientFeature('react_api', `${objectName}.${prop}`, node);
              } else if (isPotentialCustomHook(prop)) {
                recordFirstClientFeature('custom_hook', `${objectName}.${prop}`, node);
              }
            }
          }
        }
      },

      /**
       * Check JSX attributes for event handlers
       */
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (shouldSkipAnalysis()) {
          return;
        }

        if (node.name.type === AST_NODE_TYPES.JSXIdentifier && isEventHandler(node.name.name)) {
          recordFirstClientFeature('event_handler', node.name.name, node);
        }
      },

      /**
       * Check member expressions for browser APIs
       */
      MemberExpression(node: TSESTree.MemberExpression) {
        if (shouldSkipAnalysis()) {
          return;
        }

        if (node.object.type === AST_NODE_TYPES.Identifier && BROWSER_GLOBALS.has(node.object.name)) {
          recordFirstClientFeature('browser_api', node.object.name, node);
        }
      },

      /**
       * Handles program exit to generate final rule violations
       */
      'Program:exit'(program: TSESTree.Program) {
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
        if (!hasClientFeatures) {
          return;
        }

        // Already has correct directive
        if (ruleState.topDirectivePresent) {
          return;
        }

        // Report error on the specific problematic API call for better DX
        const clientFeatureDetection = ruleState.firstClientFeature!;
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
