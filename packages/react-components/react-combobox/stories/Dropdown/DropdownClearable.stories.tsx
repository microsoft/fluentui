import * as React from 'react';
import { Dropdown, Label, makeStyles, Option, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const Clearable = () => {
  const dropdownId = useId('');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label id={dropdownId}>Pick a color</Label>
      <Dropdown clearable aria-labelledby={dropdownId} placeholder="Select a color">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Dropdown>
    </div>
  );
};

Clearable.parameters = {
  docs: {
    description: {
      story:
        'A Dropdown can be clearable and let users remove their selection. Note: this is not supported in multiselect mode yet.',
    },
  },
};
