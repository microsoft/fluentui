import { fluentSkeleton } from './index';

export default {
  title: 'Components/Skeleton',
  component: fluentSkeleton,
  argTypes: {
    shape: {
      defaultValue: 'rect',
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
    style="margin-top: 10px; height: 50px; width: 50px"
  ></fluent-skeleton>
`;

export const Skeleton = SkeletonTemplate.bind({});

Skeleton.args = {
  shape: 'rect',
  shimmer: false,
};

const example = `
<fluent-skeleton style="height: 50px; width: 50px" shape="rect"></fluent-skeleton>
`;

Skeleton.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
