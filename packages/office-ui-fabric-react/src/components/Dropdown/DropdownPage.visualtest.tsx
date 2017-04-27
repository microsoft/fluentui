import * as React from 'react';
import { Dropdown } from './Dropdown';

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
      <div>
        <div>
          <Dropdown
            className='Dropdown'
            options={
              [
                { key: 'A', text: 'Option a' },
                { key: 'B', text: 'Option b' },
                { key: 'C', text: 'Option c' },
                { key: 'D', text: 'Option d' },
                { key: 'E', text: 'Option e' }
              ]
            }
          /></div>
        <div>
          <Dropdown
            label='Disabled uncontrolled with defaultSelectedKey:'
            className='DropdownDisabled'
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
        </div></div>
    );
  }
}
