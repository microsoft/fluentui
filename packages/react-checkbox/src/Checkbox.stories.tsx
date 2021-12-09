import * as React from 'react';
import { Meta } from '@storybook/react';
import { Checkbox } from './index';

export { Default } from './Checkbox.Default.stories';
export { Checked } from './Checkbox.Checked.stories';
export { Mixed } from './Checkbox.Mixed.stories';
export { Disabled } from './Checkbox.Disabled.stories';
export { Large } from './Checkbox.Large.stories';
export { LabelBefore } from './Checkbox.LabelBefore.stories';
export { LabelWrapping } from './Checkbox.LabelWrapping.stories';
export { Required } from './Checkbox.Required.stories';
export { Circular } from './Checkbox.Circular.stories';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,

  decorators: [
    Story => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
