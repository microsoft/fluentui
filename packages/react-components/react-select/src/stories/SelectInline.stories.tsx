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

export const Inline = () => {
  const selectId = useId();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      Please select one of the following <span id={selectId}>colors</span>:
      <Select aria-labelledby={selectId} inline>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </div>
  );
};

Inline.parameters = {
  docs: {
    description: {
      story: 'A Select can be set to `inline`.',
    },
  },
};
