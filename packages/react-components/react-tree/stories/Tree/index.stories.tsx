import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-tree';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';

export { Default } from './TreeDefault.stories';
export { DefaultOpenTrees } from './TreeDefaultOpenTrees.stories';
export { Appearance } from './TreeAppearance.stories';
export { Size } from './TreeSize.stories';
export { OpenItemsControlled } from './TreeControllingOpenAndClose.stories';
export { FlattenTree as flattenTree } from './flattenTree.stories';
export { Virtualization } from './Virtualization.stories';

export default {
  title: 'Preview Components/Tree/Tree',
  component: Tree,
  subcomponents: { TreeItem, TreeItemLayout, TreeItemPersonaLayout },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
