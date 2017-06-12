import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import './Dropdown.Basic.Example.scss';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.Props';

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
      <div className='ms-DropdownBasicExample'>

        <Dropdown
          placeHolder='Select an Option'
          label='Basic uncontrolled example:'
          id='Basicdrop1'
          ariaLabel='Basic dropdown example'
          options={
            [
              { key: 'Header', text: 'Actions', itemType: SelectableOptionMenuItemType.Header },
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'divider_2', text: '-', itemType: SelectableOptionMenuItemType.Divider },
              { key: 'Header', text: 'People', itemType: SelectableOptionMenuItemType.Header },
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
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'divider_1', text: '-', itemType: SelectableOptionMenuItemType.Divider },
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
