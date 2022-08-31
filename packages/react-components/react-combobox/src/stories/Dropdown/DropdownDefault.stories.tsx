import * as React from 'react';
import { makeStyles, shorthands, useId } from '@fluentui/react-components';
import { Dropdown, Option } from '@fluentui/react-combobox';
import type { DropdownProps } from '@fluentui/react-combobox';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
});

export const Default = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown-default');
  const options = ['Cat', 'Caterpiller', 'Corgi', 'Chupacabra', 'Dog', 'Ferret', 'Fish', 'Fox', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={dropdownId}>Best pet</label>
      <Dropdown aria-labelledby={dropdownId} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};
