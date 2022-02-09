import * as React from 'react';
import { Meta } from '@storybook/react';
import { Checkbox } from './index';

export * from './CheckboxDefault.stories';
export * from './CheckboxChecked.stories';
export * from './CheckboxMixed.stories';
export * from './CheckboxDisabled.stories';
export * from './CheckboxLarge.stories';
export * from './CheckboxLabelBefore.stories';
export * from './CheckboxLabelWrapping.stories';
export * from './CheckboxRequired.stories';
export * from './CheckboxCircular.stories';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,

  decorators: [
    Story => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '12px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
