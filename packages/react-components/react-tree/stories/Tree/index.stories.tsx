import { Tree } from '@fluentui/react-tree';

import descriptionMd from './TreeDescription.md';
import bestPracticesMd from './TreeBestPractices.md';

export { Default } from './TreeDefault.stories';
export { ControllingOpenAndClose } from './TreeControllingOpenAndClose.stories';

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
