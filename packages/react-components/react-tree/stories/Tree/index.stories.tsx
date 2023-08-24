import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout, FlatTree } from '@fluentui/react-components';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';
import a11yMd from './TreeA11y.md';

// VISUAL EXAMPLES
export { Default } from './TreeDefault.stories';
export { Size } from './TreeSize.stories';
export { Appearance } from './TreeAppearance.stories';
export { Layouts } from './TreeLayouts.stories';
export { ExpandIcon } from './TreeExpandIcon.stories';
export { IconBeforeAndAfter } from './TreeIconBeforeAndAfter.stories';
export { Aside } from './TreeAside.stories';
export { Actions } from './TreeActions.stories';

// FUNCTIONAL EXAMPLES
export { DefaultOpen } from './TreeDefaultOpen.stories';
export { OpenItemsControlled } from './OpenItemsControlled.stories';
export { CustomizingInteraction } from './TreeCustomizingInteraction.stories';
export { InlineStylingTreeItemLevel } from './TreeInlineStylingTreeItemLevel.stories';
export { FlatTree } from './FlatTree.stories';
export { Selection } from './TreeSelection.stories';

// SCENARIOS & FEATURES
export { Manipulation } from './TreeManipulation.stories';
export { LazyLoading } from './TreeLazyLoading.stories';
export { InfiniteScrolling } from './TreeInfiniteScrolling.stories';
export { Virtualization } from './Virtualization.stories';
export { DragAndDrop } from './TreeDragAndDrop.stories';

export default {
  title: 'Components/Tree',
  component: Tree,
  subcomponents: { Tree, FlatTree, TreeItem, TreeItemLayout, TreeItemPersonaLayout },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd, a11yMd].join('\n'),
      },
    },
  },
};
