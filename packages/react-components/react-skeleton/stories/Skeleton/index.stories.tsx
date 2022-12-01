import { Skeleton } from '../../src/Skeleton';

import descriptionMd from './SkeletonDescription.md';
import bestPracticesMd from './SkeletonBestPractices.md';

export { Default } from './SkeletonDefault.stories';
export { Row } from './SkeletonRow.stories';
export { Pulse } from './SkeletonPulse.stories';

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
