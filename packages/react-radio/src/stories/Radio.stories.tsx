import * as React from 'react';
import { Radio, RadioGroup } from '../index';
import { Text } from '@fluentui/react-text';

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
  <RadioGroup>
    <Radio label="Unchecked Radio" />
    <Radio label="Checked Radio" defaultChecked />
    <Radio label="Label below" labelPosition="below" />
    <Radio label="Required Radio" required />
    <Radio label="Disabled Radio" disabled />
    <Radio
      label={
        <>
          Radio with subtext
          <Text block size={200}>
            subtext added here
          </Text>
        </>
      }
    />
  </RadioGroup>
);
