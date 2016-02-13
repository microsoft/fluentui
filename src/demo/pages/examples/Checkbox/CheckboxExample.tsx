import * as React from 'react';
import Checkbox from '../../../../components/Checkbox';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class CheckboxExample extends React.Component<any, any> {

  private onChangeCallback() {
    console.log('The option has been changed.');
  }

  public render() {
    return (
      <div className='CheckboxExample'>
        <h1 className='ms-font-xxl'>CheckBox</h1>
        <div><Link text='CheckBoxes' url='http://dev.office.com/fabric/components/checkbox' /> allow the user to enable or disable a setting.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Checkboxes'>
          <Checkbox text='Unselected item' onChanged={ this.onChangeCallback } />
          <Checkbox text='Selected item' onChanged={ this.onChangeCallback } isSelected={ true } />
          <Checkbox text='Disabled item' isEnabled={ false } />
        </ExampleCard>

      </div>
    );
  }

}
