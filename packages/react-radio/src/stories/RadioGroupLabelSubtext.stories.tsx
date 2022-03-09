import * as React from 'react';
import { Text } from '@fluentui/react-components';
import { Radio, RadioGroup } from '../index';

export const LabelSubtext = () => (
  <RadioGroup>
    <Radio
      value="A"
      label={
        <>
          Option A<br />
          <Text size={200}>This is an example subtext of the first option</Text>
        </>
      }
    />
    <Radio
      value="B"
      label={
        <>
          Option B<br />
          <Text size={200}>This is some more example subtext</Text>
        </>
      }
    />
  </RadioGroup>
);
LabelSubtext.parameters = {
  docs: {
    description: {
      story: "Radio's label supports any formatted text. In this example, smaller text is below the main label text.",
    },
  },
};
