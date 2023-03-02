import * as React from 'react';

import { Input } from '@fluentui/react-components';
import { Field, InfoButton } from '@fluentui/react-components/unstable';

export const WithInfoButton = () => (
  <Field label="Example" required infoButton={<InfoButton content="This is example content for an InfoButton." />}>
    <Input />
  </Field>
);

WithInfoButton.storyName = 'With InfoButton';
WithInfoButton.parameters = {
  docs: {
    description: {
      story: 'The `infoButton` slot allows the addition of an `<InfoButton />` after the label.',
    },
  },
};
