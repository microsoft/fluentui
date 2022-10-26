import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { InputField } from '@fluentui/react-field';

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
      <InputField label="Size small" size="small" />
      <InputField label="Size medium" size="medium" />
      <InputField label="Size large" size="large" />
    </div>
  );
};
