import { Skeleton, SkeletonItem } from '@fluentui/react-headless-components-preview';

import descriptionMd from './SkeletonDescription.md';

export { Default } from './SkeletonDefault.stories';

export default {
  title: 'Headless Components/Skeleton',
  component: Skeleton,
  subcomponents: { SkeletonItem },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
