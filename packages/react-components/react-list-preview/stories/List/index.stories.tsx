import { List } from '@fluentui/react-list-preview';

import descriptionMd from './ListDescription.md';
import bestPracticesMd from './ListBestPractices.md';

export { Default } from './ListDefault.stories';
export { ListHorizontal } from './ListHorizontal.stories';
export { ListGrid } from './ListGrid.stories';
export { ListArrowNavigation } from './ListArrowNavigation.stories';
export { ListOverflowing } from './ListOverflowing.stories';
export { ListWithMultipleActions } from './ListWithMultipleActions.stories';
export { VirtualizedList } from './VirtualizedList.stories';

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
