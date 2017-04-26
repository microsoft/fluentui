import * as React from 'react';
import { Dropdown } from './Dropdown';
import { DropdownMenuItemType } from './Dropdown.Props';

export class DropdownVPage extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectedItem: null
    };
  }

  public render() {
    let { selectedItem } = this.state;
    return (
      <div style={ { width: '600px' } }>
        <Dropdown
          label='Basic uncontrolled :'
          id='Dropdown'
          ariaLabel='Basic dropdown'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' }
            ]
          }
        />
        <Dropdown
          label='Disabled uncontrolled with defaultSelectedKey:'
          id='DropdownDisabled'
          defaultSelectedKey='D'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
            ]
          }
          disabled={ true }
        />
      </div>
    );
  }
}
