import { SkeletonCircle } from '@fluentui/react-skeleton';

import descriptionMd from './SkeletonCircleDescription.md';
import bestPracticesMd from './SkeletonCircleBestPractices.md';

export { Default } from './SkeletonCircleDefault.stories';

export default {
  title: 'Preview Components/SkeletonCircle',
  component: SkeletonCircle,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
