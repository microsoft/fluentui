import { TreeLeaf } from '@fluentui/react-tree';

import descriptionMd from './TreeLeafDescription.md';
import bestPracticesMd from './TreeLeafBestPractices.md';

export { Default } from './TreeLeafDefault.stories';

export default {
  title: 'Preview Components/TreeLeaf',
  component: TreeLeaf,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
