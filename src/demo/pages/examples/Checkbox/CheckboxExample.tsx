import * as React from 'react';
import Checkbox from '../../../../components/Checkbox';

export default class CheckboxExample extends React.Component<any, any> {

  private onChangeCallback() {
    console.log('The option has been changed.');
  }

  public render() {
    return (
      <div className='CheckboxExample'>
        <h1>Checkbox</h1>

        <Checkbox text='Unselected item' onChanged={ this.onChangeCallback } />
        <Checkbox text='Selected item' onChanged={ this.onChangeCallback } isSelected={ true } />
        <Checkbox text='Disabled item' isEnabled={ false } />
      </div>
    );
  }

}
