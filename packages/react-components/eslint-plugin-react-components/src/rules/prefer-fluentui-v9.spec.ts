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
  ],
});
