import * as React from 'react';
import { Meta } from '@storybook/react';
import { Tooltip } from '../index';
import descriptionMd from './TooltipDescription.md';
export * from './TooltipDefault.stories';
export { Aria } from './TooltipAria.stories';
export { Controlled } from './TooltipControlled.stories';
export { Positioning } from './TooltipPositioning.stories';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          flexDirection: 'row',
          margin: '16px 0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
