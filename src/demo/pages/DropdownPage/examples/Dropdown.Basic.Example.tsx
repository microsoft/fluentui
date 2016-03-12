import * as React from 'react';
import {
  Dropdown,
  Label
} from '../../../../components/index';
import './Dropdown.Basic.Example.scss';

export default class DropdownBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-DropdownBasicExample'>
        <Dropdown
          label='Basic example:'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b', isSelected: true },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
            ]
          }
        />

        <Dropdown
          label='Disabled example:'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b', isSelected: true },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
            ]
          }
          isDisabled={ true }
        />
      </div>
    );
  }

}
