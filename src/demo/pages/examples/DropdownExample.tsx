import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';

export default class DropdownExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DropdownExample'>
        <h1>Dropdown</h1>

        <Dropdown
          label='Test values:'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b', isSelected: true },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
            ]
          }
        />

      </div>
    );
  }

}
