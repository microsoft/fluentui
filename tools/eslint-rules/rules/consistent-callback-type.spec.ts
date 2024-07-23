import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './consistent-callback-type';
const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Valid when prop is TSTypeAliasDeclaration and the callback uses EventHandler
    {
      code: `
        import { EventHandler, EventData } from '@fluentui/react-utilities';
        export type OnSomeEventData = EventData<'focus', React.FocusEvent<HTMLElement>> & {
          open: boolean,
        };
        export type SomeProps = {
          onSomeEvent?: EventHandler<OnSomeEventData>,
        };
      `,
      filename: 'src/components/SomeComponent/SomeComponent.type.ts',
    },
    // Valid when prop is TSIntersectionType and the callback uses EventHandler
    {
      code: `
        import { EventHandler, EventData } from '@fluentui/react-utilities';
        export type OnSomeEventData = EventData<'focus', React.FocusEvent<HTMLElement>> & {
          open: boolean,
        };
        export type SomeProps = SomeType & {
          onSomeEvent?: EventHandler<OnSomeEventData>,
        };
      `,
      filename: 'src/components/SomeComponent/SomeComponent.type.ts',
    },
    // Valid when prop has a function that is not callback, and not using EventHandler type
    {
      code: `
        type SomeArgBag = { one: number };
        export type SomeProps = {
          someFunction?: (args: SomeArgBag) => void;
          someFunction2?: (args: { onSomething: string }) => void; // test nested TSTypeLiteral node that starts with 'on'
        };
      `,
      filename: 'src/components/SomeComponent/SomeComponent.type.ts',
    },
  ],
  invalid: [
    // Invalid when callback in props is not using EventHandler
    {
      code: `
        export type SomeProps = {
          onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: {}) => void;
        };
      `,
      errors: [{ messageId: 'invalidType' }],
    },
    // Invalid when callback in props is not using EventHandler, and the props is TSIntersectionType
    {
      code: `
        export type SomeProps = SomeType & {
          onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: {}) => void;
        };
      `,
      errors: [{ messageId: 'invalidType' }],
    },
    // Invalid when callback in props is not using EventHandler, and the prop is two intersected TypeLiteral
    {
      code: `
      export type SomeProps = SomeType & { onClick?: (ev: React.ClickEvent<HTMLInputElement>) => void } & {
        onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: {}) => void,
      };
    `,
      errors: [{ messageId: 'invalidType' }, { messageId: 'invalidType' }],
    },
  ],
});
