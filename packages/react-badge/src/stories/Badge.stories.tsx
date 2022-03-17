import * as React from 'react';
import { Meta } from '@storybook/react';
import { Badge } from '../Badge';
import descriptionMd from '../BadgeDescription.md';
import bestPracticesMd from '../BadgeBestPractices.md';
export { Default } from './BadgeDefault.stories';
export { Appearance } from './BadgeAppearance.stories';
export { Sizes } from './BadgeSizes.stories';
export { Shapes } from './BadgeShapes.stories';
export { Color } from './BadgeColor.stories';
export { Icon } from './BadgeIcon.stories';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
