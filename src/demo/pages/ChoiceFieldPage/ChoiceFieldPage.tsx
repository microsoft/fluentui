import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { ChoiceFieldBasicExample } from './examples/ChoiceField.Basic.Example';

const ChoiceFieldBasicExampleCode = require('./examples/ChoiceField.Basic.Example.tsx');

export class ChoiceFieldPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ChoiceFieldExample'>
        <h1 className='ms-font-xxl'>ChoiceField</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/ChoiceField'>ChoiceFields</Link>
          <span> allow the user to enable or disable a setting.</span>
        </div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ChoiceFields' code={ ChoiceFieldBasicExampleCode }>
          <ChoiceFieldBasicExample />
        </ExampleCard>

        <PropertiesTableSet componentName='ChoiceField' />
      </div>
    );
  }
}
