const { RuleTester } = require('@typescript-eslint/rule-tester');
const rule = require('./index');

const ruleTester = new RuleTester();

ruleTester.run('ban-instanceof-htmlelement', rule, {
  valid: [
    {
      code: `
        event.currentTarget instanceof Object
      `,
    },
    {
      code: `
        isHTMLElement(event.currentTarget)
      `,
    },
  ],
  invalid: [
    {
      code: `
        event.currentTarget instanceof HTMLElement
        event.currentTarget instanceof HTMLInputElement
      `,
      errors: [{ messageId: 'invalidBinaryExpression' }, { messageId: 'invalidBinaryExpression' }],
    },
    {
      code: `
        if (event.currentTarget instanceof HTMLElement) {}
        if (event.currentTarget instanceof HTMLInputElement) {}
      `,
      errors: [{ messageId: 'invalidBinaryExpression' }, { messageId: 'invalidBinaryExpression' }],
    },
  ],
});
