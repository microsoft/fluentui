import * as React from 'react';
import { Badge, BadgeProps } from './index';
import descriptionMd from './BadgeDescription.md';
import bestPracticesMd from './BadgeBestPractices.md';
import { BadgeShape } from './components/Badge/Badge.types';

export const Template = (args: BadgeProps) => <Badge {...args} />;
Template.args = {} as BadgeProps;

export const { square: Square, circular: Circular, rounded: Rounded } = ([
  'square',
  'circular',
  'rounded',
] as BadgeShape[]).reduce((acc, curr) => {
  acc[curr] = Template.bind({});
  acc[curr].args = {
    shape: curr,
  };
  return acc;
}, {} as Record<BadgeShape, typeof Template>);

export default {
  title: 'Components/Badge/Shapes',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
