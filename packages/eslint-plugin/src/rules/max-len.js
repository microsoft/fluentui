// @ts-check
const createRule = require('../utils/createRule');

module.exports = createRule({
  name: 'max-len',
  meta: {
    type: 'layout',
    docs: {
      // The default max-len rule is surprisingly slow, because:
      // - it has options to detect and specially handle comments, strings, etc
      // - it checks the ignore regex without even a preliminary length check first
      description: 'Enforces a maximum line length, more cheaply than default ESLint version',
      recommended: false,
    },
    messages: {
      max: 'This line has a length of {{lineLength}}. Maximum allowed is {{max}}.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignorePatterns: {
            description: 'regular expressions to ignore',
            type: 'array',
            items: { type: 'string' },
          },
          max: {
            type: 'integer',
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [],
  create: context => {
    const options = /** @type {{ max?: number; ignorePatterns?: string[]; }} */ (context.options[0] || {});
    const { ignorePatterns = /** @type {string[]} */ ([]), max = 120 } = options;

    const ignoreRegexes = ignorePatterns.map(pat => new RegExp(pat));

    const sourceCode = context.getSourceCode();

    return {
      Program: program => {
        sourceCode.getLines().forEach((line, i) => {
          // Check length FIRST. Important for performance.
          if (line.length > max && !ignoreRegexes.some(r => r.test(line))) {
            const lineNumber = i + 1;
            context.report({
              node: program,
              loc: {
                start: { line: lineNumber, column: 0 },
                end: { line: lineNumber, column: line.length },
              },
              messageId: 'max',
              data: { lineLength: line.length, max },
            });
          }
        });
      },
    };
  },
});
