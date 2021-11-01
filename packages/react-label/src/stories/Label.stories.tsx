import * as React from 'react';
import { Meta } from '@storybook/react';
import { Label } from '../index';

export { Default } from './LabelDefault.stories';
export { Size } from './LabelSize.stories';
export { Strong } from './LabelStrong.stories';
export { Disabled } from './LabelDisabled.stories';
export { Required } from './LabelRequired.stories';

export default {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: 'A label component provides a title or name to a component.',
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
} as Meta;
