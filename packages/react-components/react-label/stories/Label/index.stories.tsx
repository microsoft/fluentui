import * as React from 'react';
import { Meta } from '@storybook/react';
import { Label } from '@fluentui/react-components';

import descriptionMd from './LabelDescription.md';
export { Default } from './LabelDefault.stories';
export { Size } from './LabelSize.stories';
export { Weight } from './LabelWeight.stories';
export { Disabled } from './LabelDisabled.stories';
export { Required } from './LabelRequired.stories';

const meta: Meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
  argTypes: {
    required: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
