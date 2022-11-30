import type { IDropdownOption, IDropdownStyles } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react';
import * as React from 'react';

const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

const divStyles = mergeStyles({ display: 'flex', gap: 20, flexDirection: 'column' });

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: {
    width: 300,
  },
};

export const DropdownExample: React.FunctionComponent = () => {
  return (
    <div className={divStyles}>
      <Dropdown
        placeholder="Select an option"
        label="Basic uncontrolled example"
        options={options}
        styles={dropdownStyles}
      />

      <Dropdown
        label="Disabled example with defaultSelectedKey"
        defaultSelectedKey="broccoli"
        options={options}
        disabled={true}
        styles={dropdownStyles}
      />

      <Dropdown
        placeholder="Select options"
        label="Multi-select uncontrolled example"
        defaultSelectedKeys={['apple', 'banana', 'grape']}
        multiSelect
        options={options}
        styles={dropdownStyles}
      />
    </div>
  );
};
