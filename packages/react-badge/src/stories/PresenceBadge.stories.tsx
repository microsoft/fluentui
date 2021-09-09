import * as React from 'react';
import { Meta } from '@storybook/react';
import { PresenceBadge } from '../PresenceBadge';
import descriptionMd from '../BadgeDescription.md';
import bestPracticesMd from '../BadgeBestPractices.md';
export { Default } from './PresenceBadgeDefault.stories';
export { Sizes } from './PresenceBadgeSizes.stories';
export { Status } from './PresenceBadgeStatus.stories';
export { OutOfOffice } from './PresenceBadgeOutOfOffice.stories';

export default {
  title: 'Components/Presence Badge',
  component: PresenceBadge,
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
