import { ESLintUtils, AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-enforce-use-client"
export const RULE_NAME = 'enforce-use-client';

type MessageIds = 'missingUseClient';

/**
 * Represents the different types of client-side features that require the 'use client' directive
 */
type FeatureKind = 'React API' | 'custom hook' | 'event handler' | 'browser API';

/**
 * Record structure for tracking detected client-side features
 */
interface FeatureRecord {
  kind: FeatureKind;
  name: string;
}

/**
 * State tracking interface for rule analysis
 */
interface RuleState {
  /** True if first statement already is the directive */
  topDirectivePresent: boolean;
  /** A later directive to relocate */
  misplacedDirective: TSESTree.ExpressionStatement | null;
  /** Map of detected client-side features (key => record) */
  featureSet: Map<string, FeatureRecord>;
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
]);

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
export const rule = ESLintUtils.RuleCreator(() => __filename)<[], MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce 'use client' directive for Client React components",
    },
    messages: {
      missingUseClient:
        "The module uses client-side features ({{clientFeatures}}) and must include 'use client' directive at the top of the file.",
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;

    // State tracking for rule analysis
    const ruleState: RuleState = {
      topDirectivePresent: false,
      misplacedDirective: null,
      featureSet: new Map<string, FeatureRecord>(),
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
     * Records a client-side feature for later analysis
     * @param kind - The type of feature
     * @param name - The name of the feature
     */
    function recordFeature(kind: FeatureKind, name: string): void {
      const key = `${kind}:${name}`;
      if (!ruleState.featureSet.has(key)) {
        ruleState.featureSet.set(key, { kind, name });
      }
    }

    /**
     * Traverses the AST to find all client-side features
     * @param node - The AST node to traverse
     */
    function traverseForClientFeatures(node: TSESTree.Node): void {
      if (ruleState.topDirectivePresent) return; // early exit if directive already present

      switch (node.type) {
        case AST_NODE_TYPES.CallExpression:
          if (node.callee.type === AST_NODE_TYPES.Identifier) {
            const name = node.callee.name;
            if (CLIENT_REACT_APIS.has(name)) {
              recordFeature('React API', name);
            } else if (isPotentialCustomHook(name)) {
              recordFeature('custom hook', name);
            }
          } else if (node.callee.type === AST_NODE_TYPES.MemberExpression) {
            const memberExpr = node.callee;
            if (memberExpr.property.type === AST_NODE_TYPES.Identifier) {
              const prop = memberExpr.property.name;
              if (CLIENT_REACT_APIS.has(prop)) {
                recordFeature('React API', `React.${prop}`);
              } else if (isPotentialCustomHook(prop)) {
                recordFeature('custom hook', `React.${prop}`);
              }
            }
          }
          break;
        case AST_NODE_TYPES.JSXAttribute:
          if (node.name.type === AST_NODE_TYPES.JSXIdentifier && isEventHandler(node.name.name)) {
            recordFeature('event handler', node.name.name);
          }
          break;
        case AST_NODE_TYPES.MemberExpression:
          if (node.object.type === AST_NODE_TYPES.Identifier && BROWSER_GLOBALS.has(node.object.name)) {
            recordFeature('browser API', node.object.name);
          }
          break;
      }

      // Recursively traverse child nodes
      for (const key of Object.keys(node)) {
        if (key === 'parent' || key === 'range' || key === 'loc') continue;
        const value = (node as any)[key];
        if (Array.isArray(value)) {
          for (const child of value) {
            if (child && typeof child === 'object' && child.type) {
              traverseForClientFeatures(child);
            }
          }
        } else if (value && typeof value === 'object' && value.type) {
          traverseForClientFeatures(value);
        }
      }
    }

    return {
      /**
       * Handles program start to analyze the entire AST for client-side features
       */
      Program(program: TSESTree.Program) {
        const { body } = sourceCode.ast;

        // Check if 'use client' is the first statement
        if (body.length > 0) {
          const firstStatement = body[0];
          if (isUseClientDirective(firstStatement)) {
            ruleState.topDirectivePresent = true;
            return;
          }
        }

        // Look for misplaced directive
        if (!ruleState.topDirectivePresent) {
          const misplaced = body.find(stmt => isUseClientDirective(stmt));
          if (misplaced) {
            ruleState.misplacedDirective = misplaced as TSESTree.ExpressionStatement;
          }
        }

        traverseForClientFeatures(program);
      },
      /**
       * Handles program exit to generate final rule violations
       */
      'Program:exit'(program: TSESTree.Program) {
        // If there are no client features we ignore the file entirely.
        if (ruleState.featureSet.size === 0) return;

        // Already has correct directive
        if (ruleState.topDirectivePresent) return;

        // Any file using client-only React/browser features must opt-in with the directive.
        // This covers utility modules that directly touch browser APIs or React hooks
        // even if they don't declare a component, preventing accidental server usage.
        const clientFeatures = Array.from(ruleState.featureSet.values())
          .map(f => `${f.kind}: ${f.name}`)
          .join(', ');

        context.report({
          node: program,
          messageId: 'missingUseClient',
          data: { clientFeatures },
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
