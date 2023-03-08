import { Tree } from '@fluentui/react-tree';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';

export { Default } from './TreeDefault.stories';
export { OpenItemsControlled } from './TreeControllingOpenAndClose.stories';
export { ExpandCollapseIconOnly } from './TreeExpandCollapseIconOnly.stories';
export { DefaultOpenTrees } from './TreeDefaultOpenTrees.stories';
export { Actions } from './TreeActions.stories';
export { Aside } from './TreeAside.stories';
export { ExpandIcon } from './TreeExpandIcon.stories';
export { IconBefore } from './TreeIconBefore.stories';
export { IconAfter } from './TreeIconAfter.stories';
export { Layout } from './TreeLayout.stories';
export { Size } from './TreeSize.stories';
export { Appearance } from './TreeAppearance.stories';
export { WithInlineStyle } from './TreeWithInlineStyle.stories';
export { UseFlatTreeItems as useFlatTreeItems } from './useFlatTreeItems.stories';
export { FlattenTree as flattenTree } from './flattenTree.stories';
export { Virtualization } from './Virtualization.stories';

export default {
  title: 'Preview Components/Tree',
  component: Tree,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
