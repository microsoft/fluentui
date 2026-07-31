import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Combobox, Label, Option, useId } from '@fluentui/react-components';

import styles from './ComboboxClearable.module.css';

export const Clearable = (): JSXElement => {
  const comboboxId = useId('combobox');

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
