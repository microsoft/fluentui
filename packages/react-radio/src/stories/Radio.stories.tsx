import * as React from 'react';
import { Radio } from '../index';

import descriptionMd from './RadioDescription.md';
import bestPracticesMd from './RadioBestPractices.md';

export { Default } from './RadioDefault.stories';

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

export const RadioVariations = () => (
  <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
    <Radio label="Unchecked Radio" />
    <Radio label="Checked Radio" defaultChecked />
    <Radio label="Radio with label positioned inline" labelPosition="inline" />
    <Radio label="Radio with label positioned on the bottom" labelPosition="bottom" />
    <Radio label="Required Radio" required />
    <Radio label="Disabled Radio" disabled />
    <Radio label="Radio with subtext" subtext="subtext added here" />
    <Radio label="Disabled Radio with subtext" subtext="subtext added here" disabled />
  </div>
);
