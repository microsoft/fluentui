import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownDefault.module.css';

export const Default = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown-default');
  const options = ['Cat', 'Caterpillar', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];
  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown id={dropdownId} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};
