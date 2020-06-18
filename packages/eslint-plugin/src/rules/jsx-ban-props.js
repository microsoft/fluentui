// @ts-check
const createRule = require('../utils/createRule');

module.exports = createRule({
  name: 'jsx-ban-props',
  meta: {
    type: 'problem',
    docs: {
      description: 'Bans the use of specific props.',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      bannedProp: "JSX prop '{{name}}' is not allowed{{message}}",
    },
    schema: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Prop name to ban',
          },
          message: {
            type: 'string',
            description: 'Optional custom message',
          },
        },
        additionalProperties: false,
      },
    },
  },
  defaultOptions: [],
  create: context => {
    const bannedProps = /** @type {{ name: string; message?: string; }[]} */ (context.options);

    return {
      JSXIdentifier: id => {
        for (const { name, message = '' } of bannedProps) {
          if (id.name === name) {
            context.report({
              messageId: 'bannedProp',
              node: id,
              data: { name, message: message && `: ${message}` },
            });
            break;
          }
        }
      },
    };
  },
});
