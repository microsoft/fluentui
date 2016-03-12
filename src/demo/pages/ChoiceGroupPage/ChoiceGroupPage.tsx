import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import ChoiceGroupProps from './ChoiceGroupProps';
import ChoiceGroupBasicExample from './examples/ChoiceGroup.Basic.Example';
let ChoiceGroupBasicExampleCode = require('./examples/ChoiceGroup.Basic.Example.tsx');

export default class ChoiceGroupPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ChoiceGroupExample'>
        <h1 className='ms-font-xxl'>ChoiceGroup</h1>
        <div><Link target='_blank' text='ChoiceGroups' url='http://dev.office.com/fabric/components/choiceGroup' /> allow the user to choose one of many options.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ChoiceGroups' code={ ChoiceGroupBasicExampleCode }>
          <ChoiceGroupBasicExample />
        </ExampleCard>

      </div>
    );
  }

}
