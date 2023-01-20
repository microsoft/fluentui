import * as React from 'react';

import { Checkbox, Input, makeStyles, Radio, RadioGroup, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const Horizontal = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
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
      <Field orientation="horizontal" label="Favorite Color">
        <RadioGroup>
          <Radio label="Red" />
          <Radio label="Green" />
          <Radio label="Blue" />
        </RadioGroup>
      </Field>
      <Field
        orientation="horizontal"
        hint="Controls without a Field label are aligned with the rest (use a vertical orientation if not desired)."
      >
        <Checkbox label="Checkbox" />
      </Field>
    </div>
  );
};

Horizontal.storyName = 'Field orientation: horizontal';
Horizontal.parameters = {
  docs: {
    description: {
      story:
        'The field can have a horizontal orientation. If multiple fields are stacked together and all the same ' +
        'width, the inputs will be vertically aligned as well.',
    },
  },
};
