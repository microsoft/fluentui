import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { makeStyles, shorthands, useId, Label } from '@fluentui/react-components';

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

export const Disabled = () => {
  const searchBoxId = useId('searchBox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={searchBoxId}>Disabled SearchBox</Label>
      <SearchBox disabled id={searchBoxId} defaultValue="disabled value" />
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A SearchBox can be disabled.',
    },
  },
};
