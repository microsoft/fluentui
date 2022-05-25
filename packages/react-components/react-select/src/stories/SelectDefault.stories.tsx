import * as React from 'react';
import { Select, SelectProps } from '../index';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',

    '> label': {
      display: 'block',
      marginBottom: '2px',
    },
  },
});

export const Default = (props: SelectProps) => {
  const selectId = useId();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor={selectId}>Color</label>
      <Select id={selectId} {...props}>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </div>
  );
};
