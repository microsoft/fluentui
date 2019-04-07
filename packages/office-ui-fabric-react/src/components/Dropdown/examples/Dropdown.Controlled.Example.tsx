import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface IDropdownControlledExampleState {
  selectedItem?: { key: string | number | undefined };
}

export class DropdownControlledExample extends React.Component<{}, IDropdownControlledExampleState> {
  public state: IDropdownControlledExampleState = {
    selectedItem: undefined
  };

  public render() {
    const { selectedItem } = this.state;

    return (
      <Dropdown
        label="Controlled example"
        selectedKey={selectedItem ? selectedItem.key : undefined}
        onChange={this._onChange}
        placeholder="Select an option"
        options={[
          { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
          { key: 'apple', text: 'Apple' },
          { key: 'banana', text: 'Banana' },
          { key: 'orange', text: 'Orange', disabled: true },
          { key: 'grape', text: 'Grape' },
          { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
          { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
          { key: 'broccoli', text: 'Broccoli' },
          { key: 'carrot', text: 'Carrot' },
          { key: 'lettuce', text: 'Lettuce' }
        ]}
        styles={{ dropdown: { width: 300 } }}
      />
    );
  }

  private _onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    console.log(`Selection change: ${item.text} ${item.selected ? 'selected' : 'unselected'}`);
    this.setState({ selectedItem: item });
  };
}
