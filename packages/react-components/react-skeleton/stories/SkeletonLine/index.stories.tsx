import { SkeletonLine } from '@fluentui/react-skeleton';

import descriptionMd from './SkeletonLineDescription.md';
import bestPracticesMd from './SkeletonLineBestPractices.md';

export { Default } from './SkeletonLineDefault.stories';

export default {
  title: 'Preview Components/SkeletonLine',
  component: SkeletonLine,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
