import { Skeleton, SkeletonItem } from '@fluentui/react-components';

import descriptionMd from './SkeletonDescription.md';
import bestPracticesMd from './SkeletonBestPractices.md';

export { Default } from './SkeletonDefault.stories';
export { Appearance } from './SkeletonAppearance.stories';
export { Animation } from './SkeletonAnimation.stories';
export { Row } from './SkeletonRow.stories';
export { Size } from './SkeletonItemSize.stories';
export { Shape } from './SkeletonItemShape.stories';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  subcomponents: {
    SkeletonItem,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
