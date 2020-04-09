import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const DropdownControlledMultiExampleOptions = [
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

export const DropdownControlledMultiExample: React.FC = () => {
  const [selectedItems, setSelectedItems] = React.useState();

  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    setSelectedItems(item);
    const newSelectedItems = selectedItems;
    if (item.selected) {
      newSelectedItems.push(item.key as string);
    } else {
      const currIndex = newSelectedItems.indexOf(item.key as string);
      if (currIndex > -1) {
        newSelectedItems.splice(currIndex, 1);
      }
    }
    setSelectedItems(newSelectedItems);
  };

  return (
    <Dropdown
      placeholder="Select options"
      label="Multi-select controlled example"
      selectedKeys={selectedItems}
      onChange={onChange}
      multiSelect
      options={DropdownControlledMultiExampleOptions}
      styles={{ dropdown: { width: 300 } }}
    />
  );
};

// export class DropdownControlledMultiExample extends React.Component<{}, IDropdownControlledMultiExampleState> {
//   public state: IDropdownControlledMultiExampleState = {
//     selectedItems: [],
//   };

//   public render() {
//     const { selectedItems } = this.state;

//     return (
//       <Dropdown
//         placeholder="Select options"
//         label="Multi-select controlled example"
//         selectedKeys={selectedItems}
//         onChange={this._onChange}
//         multiSelect
//         options={[
//           { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
//           { key: 'apple', text: 'Apple' },
//           { key: 'banana', text: 'Banana' },
//           { key: 'orange', text: 'Orange', disabled: true },
//           { key: 'grape', text: 'Grape' },
//           { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
//           { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
//           { key: 'broccoli', text: 'Broccoli' },
//           { key: 'carrot', text: 'Carrot' },
//           { key: 'lettuce', text: 'Lettuce' },
//         ]}
//         styles={{ dropdown: { width: 300 } }}
//       />
//     );
//   }
