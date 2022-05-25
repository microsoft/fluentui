import * as React from 'react';
import { Select } from '../index';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',

    '> label': {
      display: 'block',
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

export const Disabled = () => {
  const selectId = useId();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor={selectId}>Color</label>
      <Select disabled id={selectId}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A Select can be disabled through the native `disabled` prop',
    },
  },
};
