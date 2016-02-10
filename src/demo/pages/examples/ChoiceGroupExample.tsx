import * as React from 'react';
import ChoiceGroup from '../../../components/ChoiceGroup/ChoiceGroup';

export default class ChoiceGroupExample extends React.Component<any, any> {
  private choiceGroupOptions = [
    {
      key: 'A',
      text: 'Option A'
    },
    {
      key: 'B',
      text: 'Option B'
    },
    {
      key: 'C',
      text: 'Option C'
    }
  ]
  
  public render() {
    return (
      <div className='ChoiceGroupExample'>
        <h1>ChoiceGroup</h1>
        
        <ChoiceGroup options={ this.choiceGroupOptions } />
      </div>
    );
  }

}
