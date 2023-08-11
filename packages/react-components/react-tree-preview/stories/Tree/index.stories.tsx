import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout, FlatTree } from '@fluentui/react-tree-preview';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';

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

export default {
  title: 'Preview Components/Tree',
  component: Tree,
  subcomponents: { Tree, FlatTree, TreeItem, TreeItemLayout, TreeItemPersonaLayout },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
