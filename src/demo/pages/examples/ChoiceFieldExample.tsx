import * as React from 'react';
import ChoiceField from '../../../components/choiceField/ChoiceField';

export default class ChoiceFieldExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ChoiceFieldExample'>
        <h1>ChoiceField</h1>
        <ChoiceField text='Unselected item' />
        <ChoiceField text='Selected item' isSelected={ true } />
        <ChoiceField text='Disabled item' isEnabled={ false } />
      </div>
    );
  }

}
