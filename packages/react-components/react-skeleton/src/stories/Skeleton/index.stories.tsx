import { Skeleton } from '@fluentui/react-skeleton';

import descriptionMd from './SkeletonDescription.md';
import bestPracticesMd from './SkeletonBestPractices.md';

export { Default } from './SkeletonDefault.stories';

export default {
  title: 'Preview Components/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
