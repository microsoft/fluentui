import * as React from 'react';

import { Input, makeStyles, tokens } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  stack: {
    display: 'grid',
    rowGap: tokens.spacingVerticalM,
    width: '400px',
  },
});

export const Size = () => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
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
};
