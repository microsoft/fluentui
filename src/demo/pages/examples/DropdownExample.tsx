import * as React from 'react';
import Dropdown from '../../../components/dropdown/Dropdown';

export default class DropdownExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DropdownExample'>
        <h1>Dropdown</h1>
        <Dropdown />
      </div>
    );
  }

}
