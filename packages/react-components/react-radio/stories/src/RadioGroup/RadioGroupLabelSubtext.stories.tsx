import * as React from 'react';

import { Field, Radio, RadioGroup, Text } from '@fluentui/react-components';

export const LabelSubtext = () => (
  <Field label="Favorite Fruit">
    <RadioGroup>
      <Radio
        value="A"
        label={
          <>
            Banana
            <br />
            <Text size={200}>This is an example subtext of the first option</Text>
          </>
        }
      />
      <Radio
        value="B"
        label={
          <>
            Pear
            <br />
            <Text size={200}>This is some more example subtext</Text>
          </>
        }
      />
    </RadioGroup>
  </Field>
);

LabelSubtext.parameters = {
  docs: {
    description: {
      story: "Radio's label supports any formatted text. In this example, smaller text is below the main label text.",
    },
  },
};
