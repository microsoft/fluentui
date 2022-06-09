import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Dropdown, DropdownProps, Option } from '../index';

export const Default = (props: Partial<DropdownProps>) => {
  const dropdownId = useId('dropdown-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  return (
    <>
      <label id={dropdownId}>Best pet</label>
      <Dropdown aria-labelledby={dropdownId} placeholder="Select an animal" {...props}>
        {options.map(option => (
          <Option disabled={option === 'Ferret'}>{option}</Option>
        ))}
      </Dropdown>
    </>
  );
};
