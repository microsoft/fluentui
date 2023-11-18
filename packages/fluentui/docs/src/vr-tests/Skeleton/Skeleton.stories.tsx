import { ComponentMeta } from '@storybook/react';
import { Skeleton } from '@fluentui/react-northstar';
import SkeletonExampleCard from '../../examples/components/Skeleton/Usage/SkeletonExampleCard';
import SkeletonExampleDefault from '../../examples/components/Skeleton/Usage/SkeletonExampleDefault';
import SkeletonExampleList from '../../examples/components/Skeleton/Usage/SkeletonExampleList';
import SkeletonExampleAnimations from '../../examples/components/Skeleton/Variations/SkeletonExampleAnimations';
import SkeletonExampleComponents from '../../examples/components/Skeleton/Variations/SkeletonExampleComponents';

export default { component: Skeleton, title: 'Skeleton' } as ComponentMeta<typeof Skeleton>;

export {
  SkeletonExampleCard,
  SkeletonExampleDefault,
  SkeletonExampleList,
  SkeletonExampleAnimations,
  SkeletonExampleComponents,
};
