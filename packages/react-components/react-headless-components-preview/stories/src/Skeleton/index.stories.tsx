import { Skeleton, SkeletonItem } from '@fluentui/react-headless-components-preview/skeleton';

import descriptionMd from './SkeletonDescription.md';
import skeletonCss from '../../../../../../bebop/components/skeleton.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'skeleton.module.css', source: skeletonCss }),
  },
};
