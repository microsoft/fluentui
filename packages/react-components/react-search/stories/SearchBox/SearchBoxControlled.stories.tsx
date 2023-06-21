import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { makeStyles, shorthands, useId, Label } from '@fluentui/react-components';
import type { InputProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

export const Controlled = () => {
  const inputId = useId('input');
  const [value, setValue] = React.useState('initial value');
  const styles = useStyles();

  const onChange: SearchBoxProps['onChange'] = (ev, data) => {
    // The controlled input pattern can be used for other purposes besides validation,
    // but validation is a useful example
    if (data.value.length <= 20) {
      setValue(data.value);
    }
  };

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Controlled input limiting the value to 20 characters</Label>
      <SearchBox value={value} onChange={onChange} id={inputId} />
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        "A SearchBox can be controlled: the consuming component tracks the input's value in its state " +
        'and manually handles all updates.',
    },
  },
};
