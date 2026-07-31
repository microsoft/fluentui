import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownDisabled.module.css';

export const Disabled = (props: Partial<DropdownProps>): JSXElement => {
  const comboId = useId('combo-disabled');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <div className={styles.root}>
      <label htmlFor={comboId}>Best pet</label>
      <Dropdown id={comboId} disabled placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option}>{option}</Option>
        ))}
      </Dropdown>
    </div>
  );
};
