import globals from 'globals';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-restricted-globals';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: 'foo.bar',
      options: ['bar'],
    },
    {
      options: ['window'],
      code: `let ev = new KeyboardEvent('keydown');`,
    },
    {
      code: 'event',
      options: ['foo'],
      languageOptions: {
        globals: globals.browser,
      },
    },
    { options: ['KeyboardEvent'], code: `let ev: KeyboardEvent;` },
    {
      options: ['setTimeout'],
      code: `let timerID: ReturnType<typeof setTimeout> | undefined = undefined;`,
    },
    {
      options: ['ResizeObserver'],
      code: `const resizeObserverRef = React.useRef<ResizeObserver | null>(null);`,
    },
  ],
  invalid: [
    {
      code: 'bar',
      options: ['bar'],
      errors: [{ messageId: 'defaultMessage' }],
    },
    {
      code: `let ev = new KeyboardEvent('keydown');`,
      options: ['KeyboardEvent'],
      errors: [{ messageId: 'defaultMessage', data: { name: 'KeyboardEvent' } }],
    },
    {
      code: 'event',
      options: ['foo', 'event'],
      languageOptions: {
        globals: globals.browser,
      },
      errors: [
        {
          messageId: 'defaultMessage',
          data: { name: 'event' },
          type: AST_NODE_TYPES.Identifier,
        },
      ],
    },
    {
      options: ['setTimeout'],
      code: `let timerID = setTimeout(()=>{},0);`,
      errors: [{ messageId: 'defaultMessage' }],
    },
    {
      options: ['setTimeout'],
      code: `
        let timerID = setTimeout(()=>{},0);

        let futureSetTimerId: ReturnType<typeof setTimeout> | undefined = undefined;
      `,
      errors: [{ messageId: 'defaultMessage', data: { name: 'setTimeout' }, type: AST_NODE_TYPES.Identifier, line: 2 }],
    },
    {
      options: ['ResizeObserver'],
      code: `const resizeObserverRef = new ResizeObserver((entries,observer)=>{ return; });`,
      errors: [{ messageId: 'defaultMessage' }],
    },
    // assert usage if both as value and as type are used within same scope
    {
      options: ['ResizeObserver'],
      code: `
        let roInstance: ResizeObserver;

        const resizeObserverRef = new ResizeObserver((entries,observer)=>{ return; });

        console.log(roInstance);
      `,
      errors: [
        { messageId: 'defaultMessage', data: { name: 'ResizeObserver' }, type: AST_NODE_TYPES.Identifier, line: 4 },
      ],
    },
  ],
});
