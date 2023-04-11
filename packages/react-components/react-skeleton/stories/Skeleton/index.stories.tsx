import { Skeleton } from '@fluentui/react-components/unstable';

import descriptionMd from './SkeletonDescription.md';
import bestPracticesMd from './SkeletonBestPractices.md';

export { Default } from './SkeletonDefault.stories';
export { Appearance } from './SkeletonAppearance.stories';
export { Animation } from './SkeletonAnimation.stories';
export { Row } from './SkeletonRow.stories';

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
