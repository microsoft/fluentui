import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import './Dropdown.Basic.Example.scss';
import { DropdownMenuItemType } from './../Dropdown.Props';

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
              { key: '1', text: 'Option f' },
              { key: '2', text: 'Option g' },
              { key: '3', text: 'Option h' },
              { key: '4', text: 'Option i' },
              { key: '5', text: 'Option j' },
              { key: '6', text: 'Option a' },
              { key: '7', text: 'Option b' },
              { key: '8', text: 'Option c' },
              { key: '9', text: 'Option d' },
              { key: '10', text: 'Option e' },
              { key: '11', text: 'Option f' },
              { key: '12', text: 'Option g' },
              { key: '13', text: 'Option h' },
              { key: '14', text: 'Option i' },
              { key: '15', text: 'Option j' },
              { key: '16', text: 'Option a' },
              { key: '17', text: 'Option b' },
              { key: '18', text: 'Option c' },
              { key: '19', text: 'Option d' },
              { key: '20', text: 'Option e' },
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

      </div>

    );
  }

  public makeList(items) {
    let list = [];
    for (let i = 0; i < items; i++) {
      list.push({ key: i, text: 'Option ' + i });
    }

    return list;
  }

}
