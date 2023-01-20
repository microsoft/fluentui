import * as React from 'react';
import { Input, makeStyles, tokens } from '@fluentui/react-components';
import { Field } from '../../src/index';

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
        hint="Hint text does too."
      >
        <Input />
      </Field>
      <Field label="Longer labels will wrap to multiple lines" orientation="horizontal">
        <Input />
      </Field>
      <Field label="First Name" orientation="horizontal">
        <Input />
      </Field>
      <Field label="Last Name" orientation="horizontal">
        <Input />
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
