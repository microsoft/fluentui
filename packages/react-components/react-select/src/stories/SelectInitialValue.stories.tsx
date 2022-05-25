import * as React from 'react';
import { Select } from '../index';
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

export const InitialValue = () => {
  const selectId = useId();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor={selectId}>Color</label>
      <Select id={selectId}>
        <option>Red</option>
        <option selected>Green</option>
        <option>Blue</option>
      </Select>
    </div>
  );
};

InitialValue.parameters = {
  docs: {
    description: {
      story: 'A Select can have its initial value defined by using `selected` on a child `option`',
    },
  },
};
