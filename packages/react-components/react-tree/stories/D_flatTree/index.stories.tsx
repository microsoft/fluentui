import descriptionMd from './flatTreeDescription.md';
import bestPracticesMd from './flatTreeBestPractices.md';

export { UseFlatTree as Default } from './useFlatTree.stories';
export { FlattenTree as flattenTree } from './flattenTree.stories';
export { Virtualization } from './Virtualization.stories';
export { AddRemoveTreeItem } from './TreeItemAddRemove.stories';
export { LazyLoading } from './TreeLazyLoading.stories';

export default {
  title: 'Preview Components/Tree/flatTree',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
