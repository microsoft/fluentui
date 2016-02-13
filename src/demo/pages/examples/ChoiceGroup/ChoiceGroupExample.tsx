import * as React from 'react';
import ChoiceGroup from '../../../../components/ChoiceGroup';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

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
        <h1 className='ms-font-xxl'>ChoiceGroup</h1>
        <div><Link text='ChoiceGroups' url='http://dev.office.com/fabric/components/choiceGroup' /> allow the user to choose one of many options.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ChoiceGroups'>
          <ChoiceGroup options={ this.choiceGroupOptions } onChanged={ this.onChangeCallback } />
        </ExampleCard>

      </div>
    );
  }

}
