import * as React from 'react';
import { Combobox, Label, makeStyles, Option, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    justifyItems: 'start',
    gap: '2px',
  },
});

export const Clearable = () => {
  const comboboxId = useId('combobox');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label id={comboboxId}>Pick a color</Label>
      <Combobox clearable aria-labelledby={comboboxId} placeholder="Select a color">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>
    </div>
  );
};

Clearable.parameters = {
  docs: {
    description: {
      story:
        'A Combobox can be clearable and let users remove their selection. Note: this is not supported in multiselect mode yet.',
    },
  },
};
