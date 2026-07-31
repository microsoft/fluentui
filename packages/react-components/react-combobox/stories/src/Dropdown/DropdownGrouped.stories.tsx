import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Dropdown, Option, OptionGroup, useId } from '@fluentui/react-components';
import type { DropdownProps } from '@fluentui/react-components';

import styles from './DropdownGrouped.module.css';

export const Grouped = (props: Partial<DropdownProps>): JSXElement => {
  const dropdownId = useId('dropdown-grouped');
  const land = ['Cat', 'Dog', 'Ferret', 'Hamster'];
  const water = ['Fish', 'Jellyfish', 'Octopus', 'Seal'];
  return (
    <div className={styles.root}>
      <label htmlFor={dropdownId}>Best pet</label>
      <Dropdown id={dropdownId} placeholder="Select an animal" {...props}>
        <OptionGroup label="Land">
          {land.map(option => (
            <Option key={option} disabled={option === 'Ferret'}>
              {option}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup label="Sea">
          {water.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </OptionGroup>
      </Dropdown>
    </div>
  );
};

Grouped.parameters = {
  docs: {
    description: {
      story:
        'Dropdown options can be semantically grouped with the `OptionGroup` element, with an optional group label.',
    },
  },
};
