import * as React from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
  dropdownItem: { height: 'auto' },
};

const options: IDropdownOption[] = [
  {
    key: 'fruitsHeader',
    text: 'Fruits',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  {
    key: 'grape',
    text: 'Grape with some super long text, maybe this includes muscat too',
  },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  {
    key: 'vegetablesHeader',
    text: 'Vegetables',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

const stackTokens: IStackTokens = { childrenGap: 20 };

export const DropdownWrappingExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <Dropdown
        placeholder="Select an option"
        label="Wrapping option text example"
        options={options}
        styles={dropdownStyles}
      />
    </Stack>
  );
};
