import * as React from 'react';
import { Meta } from '@storybook/react';
import { CounterBadge } from '@fluentui/react-components';
import descriptionMd from './CounterBadgeDescription.md';
import bestPracticesMd from './CounterBadgeBestPractices.md';
export { Default } from './CounterBadgeDefault.stories';
export { Appearance } from './CounterBadgeAppearance.stories';
export { Shapes } from './CounterBadgeShapes.stories';
export { Sizes } from './CounterBadgeSizes.stories';
export { Color } from './CounterBadgeColor.stories';
export { Dot } from './CounterBadgeDot.stories';

export default {
  title: 'Components/Badge/Counter Badge',
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
