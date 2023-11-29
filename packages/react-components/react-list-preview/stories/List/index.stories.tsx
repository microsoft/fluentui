import { List } from '@fluentui/react-list-preview';

import descriptionMd from './ListDescription.md';
import bestPracticesMd from './ListBestPractices.md';

export { Default } from './ListDefault.stories';
export { ListHorizontal } from './ListHorizontal.stories';
export { ListGrid } from './ListGrid.stories';
export { ListWithAction } from './ListWithAction.stories';
export { ListMultipleActions } from './ListMultipleActions.stories';
export { ListSelectionUncontrolled } from './ListSelectionUncontrolled.stories';
export { ListSelectionControlledBasic } from './ListSelectionControlledBasic.stories';
export { ListSelectionControlledWithState } from './ListSelectionControlledWithState.stories';
export { VirtualizedList } from './VirtualizedList.stories';
export { VirtualizedListWithActionableItems } from './VirtualizedListWithActionableItems.stories';
export { ListV0Compat } from './ListV0Compat.stories';
export { ListV0CompatNavigable } from './ListV0CompatNavigable.stories';
export { ListV0CompatSelectable } from './ListV0CompatSelectable.stories';

export default {
  title: 'Preview Components/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
