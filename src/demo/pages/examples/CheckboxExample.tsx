import * as React from 'react';
import Checkbox from '../../../components/checkbox/Checkbox';

export default class CheckboxExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='CheckboxExample'>
        <h1>Checkbox</h1>
        
        <Checkbox text='Unselected item' />
        <Checkbox text='Selected item' isSelected={ true } />
        <Checkbox text='Disabled item' isEnabled={ false } />
      </div>
    );
  }

}
