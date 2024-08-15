import { List } from '@fluentui/react-list-preview';

import descriptionMd from './ListDescription.md';
import bestPracticesMd from './ListBestPractices.md';

export { Default } from './ListDefault.stories';
export { SingleAction } from './SingleAction.stories';
export { SingleActionSelection } from './SingleActionSelection.stories';
export { SingleActionSelectionControlled } from './SingleActionSelectionControlled.stories';
export { SingleActionSelectionDifferentPrimary } from './SingleActionSelectionDifferentPrimary.stories';
export { MultipleActionsWithPrimary } from './MultipleActionsWithPrimary.stories';
export { MultipleActionsSelection } from './MultipleActionsSelection.stories';
export { MultipleActionsDifferentPrimary } from './MultipleActionsDifferentPrimary.stories';
export { VirtualizedList } from './VirtualizedList.stories';
export { VirtualizedListWithActionableItems } from './VirtualizedListWithActionableItems.stories';
export { ListActiveElement } from './ListActiveElement.stories';

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
