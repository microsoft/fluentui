import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownMultiselect.module.css';

export const Multiselect = (props: Partial<DropdownProps>): JSXElement => {
  const comboId = useId('combo-multi');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <div className={styles.root}>
      <label htmlFor={comboId}>Best pet</label>
      <Dropdown id={comboId} multiselect={true} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

Multiselect.parameters = {
  docs: {
    description: {
      story: 'Dropdown supports multiselect, and options within a multiselect will display checkbox icons.',
    },
  },
};
