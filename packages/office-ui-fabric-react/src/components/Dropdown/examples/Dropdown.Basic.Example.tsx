// @codepen
import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import './Dropdown.Basic.Example.scss';

export class DropdownBasicExample extends BaseComponent<
  {},
  {
    selectedItem?: { key: string | number | undefined };
    selectedItems: string[];
  }
> {
  private _basicDropdown = React.createRef<IDropdown>();

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selectedItems: []
    };
  }

  public render() {
    const { selectedItem, selectedItems } = this.state;

    return (
      <div className="docs-DropdownExample">
        <Dropdown
          placeholder="Select an Option"
          label="Basic uncontrolled example:"
          ariaLabel="Basic dropdown example"
          options={[
            { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
            { key: 'A', text: 'Option a', title: 'I am option a.' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c', disabled: true },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
            { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' },
            { key: 'H', text: 'Option h' },
            { key: 'I', text: 'Option i' },
            { key: 'J', text: 'Option j' }
          ]}
          onFocus={this._log('onFocus called')}
          onBlur={this._log('onBlur called')}
          componentRef={this._basicDropdown}
        />
        <PrimaryButton text="Set focus" onClick={this._onSetFocusButtonClicked} />
        <Dropdown
          label="Disabled uncontrolled example with defaultSelectedKey:"
          defaultSelectedKey="D"
          options={[
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' }
          ]}
          onFocus={this._log('onFocus called')}
          onBlur={this._log('onBlur called')}
          disabled={true}
        />

        <Dropdown
          label="Controlled example:"
          selectedKey={selectedItem ? selectedItem.key : undefined}
          onChange={this.changeState}
          onFocus={this._log('onFocus called')}
          onBlur={this._log('onBlur called')}
          placeholder="Select an Option"
          options={[
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'E', text: 'Option e' },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' }
          ]}
        />

        <Dropdown
          placeholder="Select options"
          label="Multi-Select uncontrolled example:"
          defaultSelectedKeys={['Apple', 'Banana', 'Orange']}
          onFocus={this._log('onFocus called')}
          onBlur={this._log('onBlur called')}
          multiSelect
          options={[
            { key: 'Header2', text: 'Fruits', itemType: DropdownMenuItemType.Header },
            { key: 'Apple', text: 'apple' },
            { key: 'Banana', text: 'banana' },
            { key: 'Orange', text: 'orange', disabled: true },
            { key: 'Grape', text: 'grape', disabled: true },
            { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'Header3', text: 'Lanuages', itemType: DropdownMenuItemType.Header },
            { key: 'English', text: 'english' },
            { key: 'French', text: 'french' },
            { key: 'Germany', text: 'germany' }
          ]}
        />

        <Dropdown
          placeholder="Select options"
          label="Multi-Select controlled example:"
          selectedKeys={selectedItems}
          onChange={this.onChangeMultiSelect}
          onFocus={this._log('onFocus called')}
          onBlur={this._log('onBlur called')}
          multiSelect
          options={[
            { key: 'Header4', text: 'Colors', itemType: DropdownMenuItemType.Header },
            { key: 'red', text: 'Red' },
            { key: 'green', text: 'Green' },
            { key: 'blue', text: 'Blue' },
            { key: 'yellow', text: 'Yellow' },
            { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'Header5', text: 'Flower', itemType: DropdownMenuItemType.Header },
            { key: 'rose', text: 'Rose' },
            { key: 'lily', text: 'Lily' },
            { key: 'sunflower', text: 'Sunflower' }
          ]}
        />
        <Dropdown
          label="Disabled uncontrolled example with defaultSelectedKey:"
          defaultSelectedKeys={['GG', 'FF']}
          multiSelect
          options={[
            { key: 'AA', text: 'Option a' },
            { key: 'BB', text: 'Option b' },
            { key: 'CC', text: 'Option c' },
            { key: 'DD', text: 'Option d' },
            { key: 'EE', text: 'Option e' },
            { key: 'FF', text: 'Option f' },
            { key: 'GG', text: 'Option g' }
          ]}
          disabled={true}
          onFocus={this._log('onFocus called')}
          onBlur={this._log('onBlur called')}
        />
      </div>
    );
  }

  public changeState = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    this.setState({ selectedItem: item });
  };

  public onChangeMultiSelect = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    const updatedSelectedItem = this.state.selectedItems ? this.copyArray(this.state.selectedItems) : [];
    if (item.selected) {
      // add the option if it's checked
      updatedSelectedItem.push(item.key);
    } else {
      // remove the option if it's unchecked
      const currIndex = updatedSelectedItem.indexOf(item.key);
      if (currIndex > -1) {
        updatedSelectedItem.splice(currIndex, 1);
      }
    }
    this.setState({
      selectedItems: updatedSelectedItem
    });
  };

  public copyArray = (array: any[]): any[] => {
    const newArray: any[] = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  };

  private _onSetFocusButtonClicked = (): void => {
    if (this._basicDropdown.current) {
      this._basicDropdown.current.focus(true);
    }
  };

  private _log(str: string): () => void {
    return (): void => {
      console.log(str);
    };
  }
}
