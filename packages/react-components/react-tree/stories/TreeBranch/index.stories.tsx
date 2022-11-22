import { TreeBranch } from '@fluentui/react-tree';

import descriptionMd from './TreeBranchDescription.md';
import bestPracticesMd from './TreeBranchBestPractices.md';

export { Default } from './TreeBranchDefault.stories';

export default {
  title: 'Preview Components/TreeBranch',
  component: TreeBranch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
