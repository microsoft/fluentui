// @ts-check
const createRule = require('../utils/createRule');

module.exports = createRule({
  name: 'no-tslint-comments',
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid tslint:disable/tslint:enable comments after ESLint migration.',
      recommended: 'error',
    },
    messages: {
      tslint: 'tslint:{{verb}} comments are unnecessary with ESLint',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    const tslintCommentRegex = /^\s*tslint ?: ?(disable|enable)/;
    const sourceCode = context.getSourceCode();

    return {
      Program: () => {
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          const tslintMatch = comment.value.match(tslintCommentRegex);
          if (tslintMatch) {
            context.report({
              node: comment,
              messageId: 'tslint',
              data: { verb: tslintMatch[1] },
            });
          }
        }
      },
    };
  },
});
