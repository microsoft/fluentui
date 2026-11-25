import { Overflow, OverflowItem } from '@fluentui/react-headless-components-preview/overflow';

import descriptionMd from './OverflowDescription.md';
export { Default } from './OverflowDefault.stories';
export { Vertical } from './OverflowVertical.stories';
export { ReverseDomOrder } from './OverflowReverseDomOrder.stories';
export { LargerDividers } from './OverflowLargerDividers.stories';
export { Pinned } from './OverflowPinned.stories';
export { PriorityWithDividers } from './OverflowPriorityWithDividers.stories';

export default {
  title: 'Components/Overflow',
  component: Overflow,
  subcomponents: {
    OverflowItem,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
