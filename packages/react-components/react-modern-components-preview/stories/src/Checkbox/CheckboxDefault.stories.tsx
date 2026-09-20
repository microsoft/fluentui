import * as React from 'react';

import { Checkbox } from '@fluentui/react-modern-components-preview/checkbox';
import type { CheckboxProps } from '@fluentui/react-modern-components-preview/checkbox';

export const Default = (props: CheckboxProps): React.ReactNode => <Checkbox {...props} />;
Default.argTypes = {
  label: {
    control: 'text',
    defaultValue: 'Checkbox',
    type: 'string',
  },
  checked: {
    control: {
      type: 'inline-radio',
      options: [undefined, false, true, 'mixed'],
    },
  },
  size: {
    control: {
      type: 'inline-radio',
    },
  },
  defaultChecked: {
    control: {
      type: 'inline-radio',
      options: [false, true, 'mixed'],
    },
  },
};
