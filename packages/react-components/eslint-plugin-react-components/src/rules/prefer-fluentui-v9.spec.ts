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
  ],
});
