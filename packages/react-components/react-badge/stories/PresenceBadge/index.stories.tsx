import * as React from 'react';
import { Meta } from '@storybook/react';
import { PresenceBadge } from '@fluentui/react-components';
import descriptionMd from './PresenceBadgeDescription.md';
import bestPracticesMd from './PresenceBadgeBestPractices.md';
export { Default } from './PresenceBadgeDefault.stories';
export { Sizes } from './PresenceBadgeSizes.stories';
export { Status } from './PresenceBadgeStatus.stories';
export { OutOfOffice } from './PresenceBadgeOutOfOffice.stories';

export default {
  title: 'Components/Badge/PresenceBadge',
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
