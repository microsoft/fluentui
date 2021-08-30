import { Badge, BadgeColors } from './index';
import descriptionMd from './BadgeDescription.md';
import bestPracticesMd from './BadgeBestPractices.md';
import { Template } from './Badge.stories';

export const {
  brand: Brand,
  danger: Danger,
  important: Important,
  informative: Informative,
  severe: Severe,
  subtle: Subtle,
  success: Success,
  warning: Warning,
} = (['brand', 'danger', 'important', 'informative', 'severe', 'subtle', 'success', 'warning'] as BadgeColors[]).reduce(
  (acc, curr) => {
    acc[curr] = Template.bind({});
    acc[curr].args = {
      color: curr,
      children: ['+999'],
      appearance: 'filled',
    };
    return acc;
  },
  {} as Record<BadgeColors, typeof Template>,
);

export default {
  title: 'Components/Badge/Colors',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
