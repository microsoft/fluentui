import * as React from 'react';
import { Radio } from '../index';
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
  <fieldset style={{ display: 'flex', gap: '14px', flexDirection: 'column', alignItems: 'start' }}>
    <legend>Hello World</legend>
    <Radio name="xfoo" label="Unchecked Radio" />
    <Radio name="xfoo" label="Checked Radio" defaultChecked />
    <Radio name="xfoo" label="Radio with label positioned before" labelPosition="before" />
    <Radio name="xfoo" label="Radio with label positioned on the bottom" labelPosition="below" />
    <Radio name="xfoo" label="Required Radio" required />
    <Radio name="xfoo" label="Disabled Radio" disabled />
    <Radio
      name="xfoo"
      label={
        <>
          <span>Radio with subtext</span>
          <Text size={200} block>
            subtext added here
          </Text>
        </>
      }
    />
    {/* <Radio label="Disabled Radio with subtext" subtext="subtext added here" disabled /> */}
  </fieldset>
);
