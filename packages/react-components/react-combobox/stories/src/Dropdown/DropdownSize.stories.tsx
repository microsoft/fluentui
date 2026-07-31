import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownSize.module.css';

export const Size = (props: Partial<DropdownProps>): JSXElement => {
  const comboId = useId('combobox');

  return (
    <div className={styles.root}>
      <div>
        <h3>Small</h3>
        <label htmlFor={`${comboId}-small`}>Best pet</label>
        <Dropdown id={`${comboId}-small`} placeholder="Select an animal" size="small" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Medium</h3>
        <label htmlFor={`${comboId}-med`}>Best pet</label>
        <Dropdown id={`${comboId}-med`} placeholder="Select an animal" size="medium" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>

      <div>
        <h3>Large</h3>
        <label htmlFor={`${comboId}-large`}>Best pet</label>
        <Dropdown id={`${comboId}-large`} placeholder="Select an animal" size="large" {...props}>
          <Option>Cat</Option>
          <Option>Dog</Option>
          <Option>Bird</Option>
        </Dropdown>
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: "A Dropdown's size can be set to `small`, `medium` (default), or `large`.",
    },
  },
};
