import * as React from 'react';

import { Input, LabelProps } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';
import { InfoLabel } from '@fluentui/react-infobutton';

export const InField = () => (
  <Field
    label={{
      children: (_Component: React.ComponentType<LabelProps>, props: LabelProps) => (
        <InfoLabel {...props} content="Example info">
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
        '(./?path=/docs/concepts-developer-customizing-components-with-slots--page#replacing-the-entire-slot) ' +
        'support. See the code from this story for an example.',
    },
  },
};
