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
  <>
    <RadioGroup label="Radio Variations" required>
      <Radio label="Unchecked" />
      <Radio label="Checked" defaultChecked />
      <Radio label="Disabled" disabled />
      <Radio
        aria-describedby="subtext"
        label={
          <>
            Radio with subtext
            <Text size={200} block aria-hidden id="subtext">
              descriptive text
            </Text>
          </>
        }
      />
    </RadioGroup>
  </>
);

export const HorizontalGroup = () => (
  <RadioGroup label="Horizontal" layout="horizontal">
    <Radio label="First" />
    <Radio label="Second" />
    <Radio label="Third" />
  </RadioGroup>
);

export const HorizontalStackedGroup = () => (
  <RadioGroup label="Horizontal Stacked" layout="horizontalStacked">
    <Radio label="One" />
    <Radio label="Two" />
    <Radio label="Three" />
  </RadioGroup>
);
