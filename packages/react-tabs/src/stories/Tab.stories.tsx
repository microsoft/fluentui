import * as React from 'react';
import { Meta } from '@storybook/react';
import { Tab } from '../index';
import descriptionMd from './TabDescription.md';
import bestPracticesMd from './TabBestPractices.md';

export { Default } from './TabDefault.stories';

export default {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;
