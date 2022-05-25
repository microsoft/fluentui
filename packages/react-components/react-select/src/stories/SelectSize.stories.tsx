import * as React from 'react';
import { Select } from '../index';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',

    '> * + label': { marginTop: '20px' },

    // Stack the label above the field with a 2px gap
    '> label': {
      display: 'block',
      marginBottom: '2px',
    },
  },
});

export const Size = () => {
  const selectId = useId();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <label htmlFor={`${selectId}-small`}>Small</label>
      <Select id={`${selectId}-small`} size="small">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-med`}>Medium</label>
      <Select id={`${selectId}-med`} size="medium">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-large`}>Large</label>
      <Select id={`${selectId}-large`} size="large">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Select's size can be set to `small`, `medium` (default), or `large`.",
    },
  },
};
