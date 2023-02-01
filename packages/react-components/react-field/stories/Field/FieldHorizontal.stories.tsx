import * as React from 'react';

import { Checkbox, Input, makeResetStyles, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

const useStackClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: tokens.spacingVerticalL,
});

export const Horizontal = () => (
  <div className={useStackClassName()}>
    <Field
      label="Horizontal"
      orientation="horizontal"
      validationState="success"
      validationMessage="Validation message appears below the input."
    >
      <Input />
    </Field>
    <Field
      label="Longer labels wrap to multiple lines"
      orientation="horizontal"
      hint="Hint text also appears below the input."
    >
      <Input />
    </Field>
    <Field
      orientation="horizontal"
      hint="Controls without a Field label are aligned with the rest (use a vertical orientation if not desired)."
    >
      <Checkbox label="Checkbox" />
    </Field>
  </div>
);

Horizontal.storyName = 'Field orientation: horizontal';
Horizontal.parameters = {
  docs: {
    description: {
      story: `The horizontal orientation places the label on the left of the control, taking up 33% the width of the
        Field. If multiple Fields are stacked together and all the same width, the inputs will be vertically aligned.`,
    },
  },
};
