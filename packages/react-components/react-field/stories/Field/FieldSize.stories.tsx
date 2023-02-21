import * as React from 'react';

import { Input, makeResetStyles, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const Size = () => (
  <div className={useStackClassName()}>
    <Field label="Size small" size="small">
      <Input size="small" />
    </Field>
    <Field label="Size medium" size="medium">
      <Input size="medium" />
    </Field>
    <Field label="Size large" size="large">
      <Input size="large" />
    </Field>
  </div>
);

Size.parameters = {
  docs: {
    description: {
      story:
        "The `size` prop affects the size of the Field's label.<br />" +
        "Note: This does not affect the size of the control inside the Field. You must also set the control's own " +
        'size prop.',
    },
  },
};
