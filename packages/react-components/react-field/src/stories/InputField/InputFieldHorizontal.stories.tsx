import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { InputField } from '@fluentui/react-field';

const useStyles = makeStyles({
  stack: {
    display: 'inline-grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const Horizontal = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <InputField
        label="Horizontal"
        fieldOrientation="horizontal"
        status="success"
        statusText="Status text appears below the input"
        helperText="Helper text does too"
      />
      <InputField label="Longer labels will wrap to multiple lines" fieldOrientation="horizontal" />
      <InputField label="First Name" fieldOrientation="horizontal" />
      <InputField label="Last Name" fieldOrientation="horizontal" />
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
