import * as React from 'react';
import { Select } from '../index';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    maxWidth: '400px',

    // Stack the label above the field with a 2px gap
    '> label': {
      display: 'block',
      marginBottom: tokens.spacingVerticalXXS,
    },

    '> button': {
      marginTop: tokens.spacingVerticalXS,
    },
  },
});

export const Controlled = () => {
  const selectId = useId();
  const styles = useStyles();
  const [value, setValue] = React.useState<'red' | 'green' | 'blue'>('red');

  return (
    <div className={styles.root}>
      <label htmlFor={selectId}>Color</label>
      <Select id={selectId}>
        <option selected={value === 'red'}>Red</option>
        <option selected={value === 'green'}>Green</option>
        <option selected={value === 'blue'}>Blue</option>
      </Select>
      <button onClick={() => setValue('blue')}>Select Blue</button>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: 'The value of a Select can be controlled by updating the `selected` prop on `option` elements.',
    },
  },
};
