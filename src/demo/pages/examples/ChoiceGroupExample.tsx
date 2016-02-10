import * as React from 'react';
import ChoiceGroup from '../../../components/ChoiceGroup/ChoiceGroup';

export default class ChoiceGroupExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ChoiceGroupExample'>
        <h1>ChoiceGroup</h1>
        
        <ChoiceGroup text='Unselected item' />
        <ChoiceGroup text='Selected item' isSelected={ true } />
        <ChoiceGroup text='Disabled item' isEnabled={ false } />
      </div>
    );
  }

}
