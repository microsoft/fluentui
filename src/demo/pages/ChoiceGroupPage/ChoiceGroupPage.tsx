import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';

const ChoiceGroupBasicExampleCode = require('./examples/ChoiceGroup.Basic.Example.tsx');

export class ChoiceGroupPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ChoiceGroupExample'>
        <h1 className='ms-font-xxl'>ChoiceGroup</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/choiceGroup'>ChoiceGroups</Link>
          <span> allow the user to choose one of many options.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='ChoiceGroups' code={ ChoiceGroupBasicExampleCode }>
          <ChoiceGroupBasicExample />
        </ExampleCard>

        <PropertiesTableSet componentName='ChoiceGroup' />

      </div>
    );
  }

}
