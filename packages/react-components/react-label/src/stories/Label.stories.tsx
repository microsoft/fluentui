import * as React from 'react';
import { Meta } from '@storybook/react';
import { Label } from '../index';

import descriptionMd from './LabelDescription.md';
export { Default } from './LabelDefault.stories';
export { Size } from './LabelSize.stories';
export { Strong } from './LabelStrong.stories';
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
