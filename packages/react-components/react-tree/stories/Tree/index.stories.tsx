import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout, FlatTree } from '@fluentui/react-tree';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';

// VISUAL EXAMPLES
export { Default } from './TreeDefault.stories';
export { Size } from './TreeSize.stories';
export { Appearance } from './TreeAppearance.stories';
export { Layouts } from './TreeLayouts.stories';
export { ExpandIcon } from './TreeExpandIcon.stories';
export { IconBeforeAfter } from './TreeIconBeforeAfter.stories';
export { Aside } from './TreeAside.stories';
export { Actions } from './TreeActions.stories';

// FUNCTIONAL EXAMPLES
export { DefaultOpenTrees } from './TreeDefaultOpenTrees.stories';
export { OpenItemsControlled } from './TreeControllingOpenAndClose.stories';
export { CustomizingInteractionAndControl } from './TreeCustomizingInteractionAndControl.stories';
export { InlineStylingForNestedTree } from './TreeInlineStylingForNestedTree.stories';
export { FlatTree } from './FlatTree.stories';
export { TreeSingleAndMultiSelection } from './TreeSelection.stories';

// SCENARIOS & FEATURES
export { TreeManipulation } from './TreeManipulation';
export { LazyLoading } from './TreeLazyLoading.stories';
export { InfiniteScrolling } from './TreeInfiniteScrolling.stories';
export { Virtualization } from './Virtualization.stories';

export { StickyTreeExample } from './StickyTree.stories';

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
