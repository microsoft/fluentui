import * as React from 'react';
import { RadioItem } from '../index';

import descriptionMd from './RadioItemDescription.md';
import bestPracticesMd from './RadioItemBestPractices.md';

export { Default } from './RadioItemDefault.stories';

export default {
  title: 'Components/RadioItem',
  component: RadioItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};

export const RadioItemVariations = () => (
  <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
    <RadioItem label="Unchecked RadioItem" />
    <RadioItem label="Checked RadioItem" defaultChecked />
    <RadioItem label="RadioItem with label positioned inline" labelPosition="inline" />
    <RadioItem label="RadioItem with label positioned on the bottom" labelPosition="bottom" />
    <RadioItem label="Required RadioItem" required />
    <RadioItem label="Disabled RadioItem" disabled />
    <RadioItem label="RadioItem with subtext" subtext="subtext added here" />
    <RadioItem label="Disabled RadioItem with subtext" subtext="subtext added here" disabled />
  </div>
);
