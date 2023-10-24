import * as React from 'react';

import { Field, Input, LabelProps } from '@fluentui/react-components';
import { InfoLabel } from '@fluentui/react-components';

export const Info = () => (
  <Field
    label={{
      // Setting children to a render function allows you to replace the entire slot.
      // The first param is the component for the slot (Label), which we're ignoring to use InfoLabel instead.
      // The second param are the props for the slot, which need to be passed to the InfoLabel.
      children: (_: unknown, slotProps: LabelProps) => (
        <InfoLabel {...slotProps} info="Example info">
          Field with an info button
        </InfoLabel>
      ),
    }}
  >
    <Input />
  </Field>
);

Info.storyName = 'Info button';
Info.parameters = {
  docs: {
    description: {
      story:
        "Add an info button to the label by replacing the Field's label with an `InfoLabel`. " +
        'This can be done using a [slot render function]' +
        '(./?path=/docs/concepts-developer-customizing-components-with-slots--page#replacing-the-entire-slot). ' +
        'See the code from this story for more details.',
    },
  },
};
