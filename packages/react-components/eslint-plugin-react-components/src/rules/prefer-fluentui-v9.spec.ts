import { RuleTester } from '@typescript-eslint/rule-tester';
import { RULE_NAME, rule } from './prefer-fluentui-v9';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `import type { IDropdownOption } from '@fluentui/react';`,
    },
    {
      code: `import type { ITheme } from '@fluentui/react';`,
    },
    {
      code: `import { ThemeProvider } from '@fluentui/react';`,
    },
    {
      code: `import { Button } from '@fluentui/react-components';`,
    },
    {
      code: `import { Dialog } from '@fluentui/react-components';`,
    },
    {
      code: `import { DatePicker } from '@fluentui/react-datepicker-compat';`,
    },
    {
      code: `import { Calendar } from '@fluentui/react-calendar-compat';`,
    },
    {
      code: `const Calendar = React.lazy(() => import('@fluentui/react-calendar-compat').then(m => ({ default: m.Calendar })));`,
    },
    {
      code: `const Dialog = React.lazy(async () => { const m = await import('@fluentui/react-components'); return { default: m.Dialog }; });`,
    },
    {
      code: `import('@fluentui/react').then(m => items.map(m => m.Button));`,
    },
    {
      code: `const Button = 'ThemeProvider'; import('@fluentui/react').then(m => m[Button]);`,
    },
    {
      code: `const m = await import('@fluentui/react'); export const value = m[Button];`,
    },
    {
      code: `const { ['ThemeProvider']: ThemeProvider } = await import('@fluentui/react'); export { ThemeProvider };`,
    },
    {
      code: `import('@fluentui/react').then(m => m.constructor);`,
    },
    {
      code: `import('@fluentui/react').then(m => { m = {}; return m.Button; });`,
    },
    {
      code: `async function load() { let m = await import('@fluentui/react'); m = {}; const { Button } = m; return Button; }`,
    },
    {
      code: `const m = await import('@fluentui/react'); const g = (m) => m.Dialog;`,
    },
    {
      code: `import('@fluentui/react').then(m => { const Button = 'x'; return m[Button]; });`,
    },
    {
      code: `import('@fluentui/react').then(m => { const f = m => { const { Button } = m; }; });`,
    },
    {
      code: `import('@fluentui/react').then(({ ThemeProvider, [Button]: value }) => value);`,
    },
  ],
  invalid: [
    {
      code: `import { Dropdown, Icon } from '@fluentui/react';`,
      errors: [{ messageId: 'replaceFluent8With9' }, { messageId: 'replaceIconWithJsx' }],
    },
    {
      code: `import { Stack } from '@fluentui/react';`,
      errors: [{ messageId: 'replaceStackWithFlex' }],
    },
    {
      code: `import { DatePicker } from '@fluentui/react';`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'DatePicker', fluent9: 'DatePicker', package: '@fluentui/react-datepicker-compat' },
        },
      ],
    },
    {
      code: `const Calendar = React.lazy(() => import('@fluentui/react').then(m => ({ default: m.Calendar })));`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Calendar', fluent9: 'Calendar', package: '@fluentui/react-calendar-compat' },
        },
      ],
    },
    {
      code: `const Calendar = React.lazy(() => import('@fluentui/react').then(({ Calendar }) => ({ default: Calendar })));`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Calendar', fluent9: 'Calendar', package: '@fluentui/react-calendar-compat' },
        },
      ],
    },
    {
      code: `const Dialog = React.lazy(async () => { const m = await import('@fluentui/react'); return { default: m.Dialog }; });`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Dialog', fluent9: 'Dialog', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `const Dialog = React.lazy(async () => { const { Dialog } = await import('@fluentui/react'); return { default: Dialog }; });`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Dialog', fluent9: 'Dialog', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `function hello() { import('@fluentui/react').then(m => { window.v8 = m.Button; console.log('react loaded'); }); }`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Button', fluent9: 'Button', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `async function loadComponent() { const m = await import('@fluentui/react'); return m.Calendar; }`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Calendar', fluent9: 'Calendar', package: '@fluentui/react-calendar-compat' },
        },
      ],
    },
    {
      code: `import('@fluentui/react').then(({ Icon }) => Icon);`,
      errors: [{ messageId: 'replaceIconWithJsx' }],
    },
    {
      code: `import('@fluentui/react').then(m => m.Icon);`,
      errors: [{ messageId: 'replaceIconWithJsx' }],
    },
    {
      code: `const { Icon } = await import('@fluentui/react');`,
      errors: [{ messageId: 'replaceIconWithJsx' }],
    },
    {
      code: `const m = await import('@fluentui/react'); m.Icon;`,
      errors: [{ messageId: 'replaceIconWithJsx' }],
    },
    {
      code: `import('@fluentui/react').then(m => { a(m.Button); b(m.Button); });`,
      errors: [{ messageId: 'replaceFluent8With9' }],
    },
    {
      code: `const m = await import('@fluentui/react'); a(m.Button); b(m.Button);`,
      errors: [{ messageId: 'replaceFluent8With9' }],
    },
    {
      code: `const m = await import('@fluentui/react'); m.Dialog; const g = (m) => m.Button;`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Dialog', fluent9: 'Dialog', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `import('@fluentui/react').then(function(m) { const { Icon: FluentIcon, ThemeProvider } = m; return FluentIcon; });`,
      errors: [{ messageId: 'replaceIconWithJsx' }],
    },
    {
      code: `const m = await import('@fluentui/react'); const f = () => { const { Icon: FluentIcon } = m; return FluentIcon; };`,
      errors: [{ messageId: 'replaceIconWithJsx' }],
    },
    {
      code: `import('@fluentui/react').then(m => { m.Button; m = {}; return m.Dialog; });`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Button', fluent9: 'Button', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `import('@fluentui/react').then(m => m['Button']);`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Button', fluent9: 'Button', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `const m = await import('@fluentui/react'); export const Button = m.Button;`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Button', fluent9: 'Button', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `const m = await import('@fluentui/react'); export const Button = m['Button'];`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Button', fluent9: 'Button', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: "import('@fluentui/react').then(m => m[`Button`]);",
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'Button', fluent9: 'Button', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `import { CompoundButton } from '@fluentui/react/lib/Button';`,
      errors: [
        {
          messageId: 'replaceFluent8With9',
          data: { fluent8: 'CompoundButton', fluent9: 'CompoundButton', package: '@fluentui/react-components' },
        },
      ],
    },
    {
      code: `import { Stack } from '@fluentui/react/lib/Stack';`,
      errors: [{ messageId: 'replaceStackWithFlex' }],
    },
  ],
});
