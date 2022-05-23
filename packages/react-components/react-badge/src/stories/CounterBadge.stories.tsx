import * as React from 'react';
import { Meta } from '@storybook/react';
import { CounterBadge } from '../CounterBadge';
import descriptionMd from '../BadgeDescription.md';
import bestPracticesMd from '../BadgeBestPractices.md';
export { Default } from './CounterBadgeDefault.stories';
export { Appearance } from './CounterBadgeAppearance.stories';
export { Shapes } from './CounterBadgeShapes.stories';
export { Sizes } from './CounterBadgeSizes.stories';
export { Color } from './CounterBadgeColor.stories';
export { Dot } from './CounterBadgeDot.stories';

export default {
  title: 'Components/Counter Badge',
  component: CounterBadge,
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
