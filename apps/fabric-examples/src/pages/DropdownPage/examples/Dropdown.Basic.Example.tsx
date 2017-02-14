import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
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
      <div className='ms-DropdownBasicExample'>

        <Dropdown
          label='Basic example:'
          id='Basicdrop1'
          ariaLabel='Basic dropdown example'
          options={ this.makeList(10) }
          onChanged={ (item) => this.setState({ selectedItem: item }) }
        />
        <div>{ `Item selected: ${selectedItem ? selectedItem.text : '<none>'}` }</div>

        <Dropdown
          label='Disabled example:'
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
      </div>
    );
  }

  public makeList(items) {
    let list = [];
    for (var i = 0; i < items; i++) {
      list.push({ key: i, text: 'Option ' + i })
    };
    return list;
  }

}
