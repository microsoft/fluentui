import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field, makeStyles } from '@fluentui/react-components';
import type { SearchBoxProps } from '@fluentui/react-search';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

const onChange: SearchBoxProps['onChange'] = (ev, data) => {
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Field label="Uncontrolled SearchBox with default value">
        <SearchBox defaultValue="default value" onChange={onChange} />
      </Field>
    </div>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story:
        'By default, a SearchBox is uncontrolled: it tracks all updates internally. ' +
        'You can optionally provide a default value.',
    },
  },
};
