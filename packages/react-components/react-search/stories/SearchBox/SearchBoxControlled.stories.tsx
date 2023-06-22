import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field, makeStyles } from '@fluentui/react-components';
import type { SearchBoxProps } from '@fluentui/react-search';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

export const Controlled = () => {
  const [value, setValue] = React.useState('initial value');
  const styles = useStyles();

  const onChange: SearchBoxProps['onChange'] = (ev, data) => {
    if (data.value.length <= 20) {
      setValue(data.value);
    }
  };

  return (
    <div className={styles.root}>
      <Field label="Controlled SearchBox limiting the value to 20 characters">
        <SearchBox value={value} onChange={onChange} />
      </Field>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        "A SearchBox can be controlled: the consuming component tracks the SearchBox's value in its state " +
        'and manually handles all updates.',
    },
  },
};
