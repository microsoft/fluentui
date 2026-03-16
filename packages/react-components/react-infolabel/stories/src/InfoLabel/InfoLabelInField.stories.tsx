import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, InfoLabel, Input, LabelProps } from '@fluentui/react-components';

export const InField = (): JSXElement => (
  <Field
    label={{
      children: (_: unknown, props: LabelProps) => (
        <InfoLabel {...props} info="Example info">
          Field with info label
        </InfoLabel>
      ),
    }}
  >
    <Input />
  </Field>
);

InField.storyName = 'In a Field';
InField.parameters = {
  docs: {
    description: {
      story:
        'An `InfoLabel` can be used in a `Field` by rendering the label prop as an InfoLabel. This uses the slot ' +
        '[render function]' +
        '(./?path=/docs/concepts-developer-customizing-components-with-slots--docs#replacing-the-entire-slot) ' +
        'support. See the code from this story for an example.',
    },
  },
};
