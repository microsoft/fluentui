import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';
import type { SwitchProps } from '@fluentui/react-components';

export const Default = (props: SwitchProps): JSXElement => <Switch label="This is a switch" {...props} />;

Default.argTypes = {
  checked: {
    control: {
      type: 'inline-radio',
      options: [undefined, false, true],
    },
  },
  defaultChecked: {
    control: {
      type: 'inline-radio',
      options: [false, true],
    },
  },
};
