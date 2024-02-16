import { List } from '@fluentui/react-list-preview';

import descriptionMd from './ListDescription.md';
import bestPracticesMd from './ListBestPractices.md';

export { Default } from './ListDefault.stories';
// export { ListHorizontal } from './ListHorizontal.stories';
// export { ListGrid } from './ListGrid.stories';
export { SingleAction } from './SingleAction.stories';
export { SingleActionSelection } from './SingleAction_selection.stories';
export { MultipleActionsNoPrimaryNoSelection } from './MultipleActions_no_primary_no_selection.stories';
export { MultipleActionsNoSelectionWithPrimary } from './MultipleActions_no_selection_with_primary.stories';
export { MultipleActionsPrimarySelection } from './MultipleActions_primary_selection.stories';
export { MultipleActionsDifferentPrimary } from './MultipleActions_different_primary.stories';
export { ListSelectionControlledBasic } from './ListSelectionControlledBasic.stories';
export { ListSelectionControlledWithState } from './ListSelectionControlledWithState.stories';
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
