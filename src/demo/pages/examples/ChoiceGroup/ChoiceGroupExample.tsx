import * as React from 'react';
import ChoiceGroup from '../../../../components/ChoiceGroup';

export default class ChoiceGroupExample extends React.Component<any, any> {
  private choiceGroupOptions = [
    {
      key: 'A',
      text: 'Option A'
    },
    {
      key: 'B',
      text: 'Option B',
      isChecked: true
    },
    {
      key: 'C',
      text: 'Option C',
      isDisabled: true
    }
  ]

  private onChangeCallback() {
    console.log('The option has been changed.');
  }

  public render() {
    return (
      <div className='ChoiceGroupExample'>
        <h1>ChoiceGroup</h1>

        <ChoiceGroup options={ this.choiceGroupOptions } onChanged={ this.onChangeCallback } />
      </div>
    );
  }

}
