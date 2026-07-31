import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Label, Option, useId } from '@fluentui/react-components';

import styles from './DropdownClearable.module.css';

export const Clearable = (): JSXElement => {
  const dropdownId = useId('');

  return (
    <div className={styles.root}>
      <Label htmlFor={dropdownId}>Pick a color</Label>
      <Dropdown clearable id={dropdownId} placeholder="Select a color">
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
