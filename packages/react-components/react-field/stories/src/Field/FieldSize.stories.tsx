import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Field, Input, makeResetStyles, tokens } from '@fluentui/react-components';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const Size = (): JSXElement => (
  <div className={useStackClassName()}>
    <Field label="Size small" size="small">
      <Input />
    </Field>
    <Field label="Size medium" size="medium">
      <Input />
    </Field>
    <Field label="Size large" size="large">
      <Input />
    </Field>
  </div>
);

Size.parameters = {
  docs: {
    description: {
      story:
        "The `size` prop affects the size of the Field's label, as well as form controls that support a `size` prop.",
    },
  },
};
