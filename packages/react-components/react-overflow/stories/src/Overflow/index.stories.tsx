import { Overflow, OverflowItem } from '@fluentui/react-components';
import descriptionMd from './OverflowDescription.md';

export { Default } from './Default.stories';
export { ReverseDomOrder } from './ReverseDomOrder.stories';
export { MinimumVisible } from './MinimumVisible.stories';
export { Vertical } from './Vertical.stories';
export { OverflowByPriority } from './OverflowByPriority.stories';
export { Wrapped } from './Wrapped.stories';
export { Pinned } from './Pinned.stories';
export { Dividers } from './Dividers.stories';
export { LargerDividers } from './LargerDividers.stories';
export { PriorityWithDividers } from './PriorityWithDividers.stories';
export { CustomComponent } from './CustomComponent.stories';
export { ListenToChanges } from './ListenToChanges.stories';

// Typing with as Meta<typeof Overflow> generates a type error for the `subcomponents` property.
// https://github.com/storybookjs/storybook/issues/27535
//
// TODO: bring back typing when the issue is resolved
export default {
  title: 'Components/Overflow',
  component: Overflow,
  subcomponents: {
    OverflowItem,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
