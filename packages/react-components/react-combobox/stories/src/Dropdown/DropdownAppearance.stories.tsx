import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownAppearance.module.css';

export const Appearance = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown');

  return (
    <div className={styles.root}>
      <div>
        <h3>Outline</h3>
        <label htmlFor={`${dropdownId}-outline`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-outline`} placeholder="-" appearance="outline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Underline</h3>
        <label htmlFor={`${dropdownId}-underline`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-underline`} placeholder="-" appearance="underline" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={styles.filledDarker}>
        <h3>Filled Darker</h3>
        <label htmlFor={`${dropdownId}-filledDarker`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-filledDarker`} placeholder="-" appearance="filled-darker" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div className={styles.filledLighter}>
        <h3>Filled Lighter</h3>
        <label htmlFor={`${dropdownId}-filledLighter`}>Select an animal</label>
        <Dropdown id={`${dropdownId}-filledLighter`} placeholder="-" appearance="filled-lighter" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A Dropdown can have the following `appearance` variants:\n' +
        '- `outline` (default): has a border around all four sides.\n' +
        '- `underline`: only has a bottom border.\n' +
        '- `filled-darker`: no border, only a subtle background color difference against a white page.\n' +
        '- `filled-lighter`: no border, and a white background.\n',
    },
  },
};
