import * as React from 'react';
import ChoiceField from '../../../components/choiceField/ChoiceField';

export default class ChoiceFieldExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ChoiceFieldExample'>
        <h1>ChoiceField</h1>
        
        <h2>Radio buttons</h2>
        <ChoiceField text='Unselected item' />
        <ChoiceField text='Selected item' isSelected={ true } />
        <ChoiceField text='Disabled item' isEnabled={ false } />
        
        <h2>Checkboxes</h2>
        <ChoiceField text='Unselected item' isMultipleSelect={ true } />
        <ChoiceField text='Selected item' isMultipleSelect={ true } isSelected={ true } />
        <ChoiceField text='Disabled item' isMultipleSelect={ true } isEnabled={ false } />
      </div>
    );
  }

}
