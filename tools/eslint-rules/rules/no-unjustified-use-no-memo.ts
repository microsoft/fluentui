import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-no-unjustified-use-no-memo"
export const RULE_NAME = 'no-unjustified-use-no-memo';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        "Require a `// justified: <reason>` comment on every `'use no memo'` directive. " +
        'Directives without justification are auto-removed.',
    },
    messages: {
      missingJustification:
        "`'use no memo'` must have a trailing `// justified: <reason>` comment explaining " +
        'why the React Compiler should skip this function.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ExpressionStatement(node: TSESTree.ExpressionStatement) {
        if (node.expression.type !== 'Literal' || node.expression.value !== 'use no memo') {
          return;
        }

        const sourceCode = context.sourceCode ?? context.getSourceCode();
        // Trailing line comments may attach to the statement or the next token;
        // check all comments on the same line as the directive.
        const directiveLine = node.loc.start.line;
        const allComments = sourceCode.getAllComments();
        const hasJustification = allComments.some(
          c => c.type === 'Line' && c.loc.start.line === directiveLine && /^\s*justified:\s*\S/.test(c.value),
        );

        if (!hasJustification) {
          context.report({
            node,
            messageId: 'missingJustification',
            fix(fixer) {
              // Remove the entire statement including its trailing newline
              const tokenAfter = sourceCode.getTokenAfter(node);
              const rangeEnd = tokenAfter ? tokenAfter.range[0] : node.range[1];
              return fixer.removeRange([node.range[0], rangeEnd]);
            },
          });
        }
      },
    };
  },
});
