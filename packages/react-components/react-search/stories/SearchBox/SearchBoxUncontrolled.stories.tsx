import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { makeStyles, shorthands, useId, Label } from '@fluentui/react-components';
import type { SearchBoxProps } from '@fluentui/react-search';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

const onChange: SearchBoxProps['onChange'] = (ev, data) => {
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => {
  const searchBoxId = useId('searchBox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={searchBoxId}>Uncontrolled SearchBox with default value</Label>
      <SearchBox defaultValue="default value" onChange={onChange} id={searchBoxId} />
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
