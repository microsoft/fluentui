import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import './Dropdown.Basic.Example.scss';

export class DropdownBasicExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectedItem: null
    };
  }

  public render() {
    let { selectedItem } = this.state;

    return (
      <div className='dropdownExample'>

        <Dropdown
          placeHolder='Select an Option'
          label='Basic uncontrolled example:'
          id='Basicdrop1'
          ariaLabel='Basic dropdown example'
          options={
            [
              { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
              { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
              { key: 'H', text: 'Option h' },
              { key: 'I', text: 'Option i' },
              { key: 'J', text: 'Option j' },
            ]
          }
        />

        <Dropdown
          label='Disabled uncontrolled example with defaultSelectedKey:'
          defaultSelectedKey='D'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
          disabled={ true }
        />

        <Dropdown
          label='Controlled example:'
          selectedKey={ selectedItem && selectedItem.key }
          onChanged={ (item) => this.setState({ selectedItem: item }) }
          onBlur={ () => console.log('onBlur called') }
          placeHolder='Select an Option'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
        />

        <Dropdown
          placeHolder='Select options'
          label='Multi-Choice uncontrolled example:'
          defaultSelectedKeys={ ['Apple', 'Banana'] }
          onChanged={ (item) => this.changeState(item) }
          onBlur={ () => console.log('onBlur called') }
          multiSelect
          options={
            [
              { key: 'HeaderF', text: 'Fruits', itemType: DropdownMenuItemType.Header },
              { key: 'Apple', text: 'apple' },
              { key: 'Banana', text: 'banana' },
              { key: 'Cat', text: 'cat' },
              { key: 'Dog', text: 'dog' },
              { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
              { key: 'HeaderL', text: 'Lanuages', itemType: DropdownMenuItemType.Header },
              { key: 'English', text: 'english' },
              { key: 'French', text: 'french' },
              { key: 'Germany', text: 'germany' },
            ]
          }
        />

        <Dropdown
          placeHolder='Select options'
          label='Multi-Choice controlled example:'
          selectedKeys={ selectedItem && selectedItem.key }
          onChanged={ (item) => this.onChangeMultiSelect(item) }
          onBlur={ () => console.log('onBlur called') }
          multiSelect
          options={
            [
              { key: 'HeaderF', text: 'Fruits', itemType: DropdownMenuItemType.Header },
              { key: 'App', text: 'apple' },
              { key: 'Ban', text: 'banana' },
              { key: 'Ca', text: 'cat' },
              { key: 'Do', text: 'dog' },
              { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
              { key: 'HeaderF', text: 'Lanuages', itemType: DropdownMenuItemType.Header },
              { key: 'Eng', text: 'english' },
              { key: 'Fre', text: 'french' },
              { key: 'Ger', text: 'germany' },
            ]
          }
        />
        <Dropdown
          label='Disabled uncontrolled example with defaultSelectedKey:'
          defaultSelectedKeys={ ['GG'] }
          multiSelect
          options={
            [
              { key: 'AA', text: 'Option a' },
              { key: 'BB', text: 'Option b' },
              { key: 'CC', text: 'Option c' },
              { key: 'DD', text: 'Option d' },
              { key: 'EE', text: 'Option e' },
              { key: 'FF', text: 'Option f' },
              { key: 'GG', text: 'Option g' },
            ]
          }
          disabled={ true }
        />
      </div>

    );
  }

  public makeList(items: any) {
    let list = [];
    for (let i = 0; i < items; i++) {
      list.push({ key: i, text: 'Option ' + i });
    }

    return list;
  }

  public changeState(item: IDropdownOption) {
    console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    this.setState({ selectedItem: item });
  }

  public onChangeMultiSelect(item: IDropdownOption) {
    let updatedSelectedItem = { ...this.state.selectedItem };
    let updatedSelectedItemArr = Object.keys(updatedSelectedItem).map(key => updatedSelectedItem[Number(key)]);
    if (item.selected) {
      // add the option if it's checked
      updatedSelectedItemArr.push(item);
    } else {
      // remove the option if it's unchecked
      let currIndex = updatedSelectedItemArr.indexOf(item.index);
      if (currIndex > -1) {
        updatedSelectedItemArr.splice(currIndex, 1);
      }
    }
    this.setState({
      selectedItem: updatedSelectedItem
    });
  }

}
