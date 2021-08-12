import { fluentSkeleton } from './index';

export default {
  title: 'Components/Skeleton',
  component: fluentSkeleton,
  argTypes: {
    shape: {
      options: ['circle', 'rect'],
      control: { type: 'radio' },
    },
    shimmer: {
      control: { type: 'boolean' },
    },
  },
};

const SkeletonTemplate = ({ shape, shimmer }) => `
  <fluent-skeleton 
    ${shape ? `shape="${shape}"` : ''}
    ${shimmer ? 'shimmer' : ''} 
    style="border-radius: 4px; margin-top: 10px; height: 10px" width: 100px"
  ></fluent-skeleton>
`;

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {
  shape: 'rect',
  shimmer: false,
};
