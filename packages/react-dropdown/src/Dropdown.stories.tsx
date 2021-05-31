import * as React from 'react';
import { Dropdown, DropdownList, DropdownOption, DropdownProps, DropdownTrigger } from './index';

export const Default = (props: Partial<DropdownProps>) => (
  <Dropdown {...props}>
    <DropdownTrigger>Select a Fruit</DropdownTrigger>
    <DropdownList>
      <DropdownOption>Apple</DropdownOption>
      <DropdownOption>Pear</DropdownOption>
      <DropdownOption>Raspberry</DropdownOption>
    </DropdownList>
  </Dropdown>
);

export default {
  // use the Components prefix and (react-dropdown) suffix to have the same naming convention as react-examples
  title: 'Components/Dropdown (react-dropdown)',
  // Explicit id used in story URL
  id: 'Components/Dropdown',
  component: Dropdown,
};
