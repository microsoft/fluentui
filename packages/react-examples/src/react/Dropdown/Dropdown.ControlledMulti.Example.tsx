import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const DropdownControlledMultiExampleOptions = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'watermelon', text: 'Watermelon', hidden: true },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];

export const DropdownControlledMultiExample: React.FunctionComponent = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      setSelectedKeys(
        item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key),
      );
    }
  };

  return (
    <Dropdown
      placeholder="Select options"
      label="Multi-select controlled example"
      selectedKeys={selectedKeys}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={onChange}
      multiSelect
      options={DropdownControlledMultiExampleOptions}
      styles={dropdownStyles}
    />
  );
};
