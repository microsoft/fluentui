import * as React from 'react';
import { Input, makeStyles, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-field';

const useStyles = makeStyles({
  stack: {
    display: 'inline-grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const Size = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Small field" size="small">
        <Input />
      </Field>
      <Field label="Medium field" size="medium">
        <Input />
      </Field>
      <Field label="Large field" size="large">
        <Input />
      </Field>
    </div>
  );
};
