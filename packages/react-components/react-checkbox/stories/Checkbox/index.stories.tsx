import * as React from 'react';
import { Meta } from '@storybook/react';
import { tokens, Checkbox } from '@fluentui/react-components';

export { Default } from './CheckboxDefault.stories';
export { Checked } from './CheckboxChecked.stories';
export { Mixed } from './CheckboxMixed.stories';
export { Disabled } from './CheckboxDisabled.stories';
export { Large } from './CheckboxLarge.stories';
export { LabelBefore } from './CheckboxLabelBefore.stories';
export { LabelWrapping } from './CheckboxLabelWrapping.stories';
export { Required } from './CheckboxRequired.stories';
export { Circular } from './CheckboxCircular.stories';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,

  decorators: [
    Story => (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: tokens.spacingHorizontalM }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
