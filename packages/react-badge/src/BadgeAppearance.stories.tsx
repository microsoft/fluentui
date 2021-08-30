import { Badge, BadgeAppearance } from './index';
import descriptionMd from './BadgeDescription.md';
import bestPracticesMd from './BadgeBestPractices.md';
import { Template } from './Badge.stories';

export const { ghost: Ghost, outline: Outline, tint: Tint } = ([
  'tint',
  'outline',
  'ghost',
] as BadgeAppearance[]).reduce((acc, curr) => {
  acc[curr] = Template.bind({});
  acc[curr].args = {
    appearance: curr,
    children: ['+999'],
  };
  return acc;
}, {} as Record<BadgeAppearance, typeof Template>);

export default {
  title: 'Components/Badge/Appearance',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
