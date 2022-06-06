import * as React from 'react';
import { Overflow } from '../components/Overflow';
import { ComponentMeta } from '@storybook/react';

export { DomOrder } from './DomOrder.stories';
export { ReverseDomOrder } from './ReverseDomOrder.stories';
export { MinimumVisible } from './MinimumVisible.stories';
export { CustomPriorities } from './CustomPriorities.stories';
export { Pinned } from './Pinned.stories';
export { Dividers } from './Dividers.stories';
export { PriorityWithDividers } from './PriorityWithDividers.stories';
export { Selection } from './Selection.stories';

export default {
  title: 'Overflow',
  component: Overflow,
  decorators: [
    Story => (
      <div style={{ resize: 'horizontal', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Overflow>;
