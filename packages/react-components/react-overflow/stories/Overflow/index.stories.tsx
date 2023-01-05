import * as React from 'react';
import { Overflow } from '@fluentui/react-overflow';
import { ComponentMeta } from '@storybook/react';
import descriptionMd from './OverflowDescription.md';

export { Default } from './Default.stories';
export { ReverseDomOrder } from './ReverseDomOrder.stories';
export { MinimumVisible } from './MinimumVisible.stories';
export { OverflowByPriority } from './OverflowByPriority.stories';
export { Wrapped } from './Wrapped.stories';
export { Pinned } from './Pinned.stories';
export { Dividers } from './Dividers.stories';
export { PriorityWithDividers } from './PriorityWithDividers.stories';

export default {
  title: 'Components/Overflow',
  component: Overflow,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ resize: 'horizontal', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Overflow>;
