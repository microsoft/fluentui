import * as React from 'react';

import { Field, Text } from '@fluentui/react-components';
import { Radio, RadioGroup } from '@fluentui/react-modern-components-preview/radio-group';

export const LabelSubtext = (): React.ReactNode => (
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
