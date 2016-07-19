import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';

const DropdownBasicExampleCode = require('./examples/Dropdown.Basic.Example.tsx');

export class DropdownPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='DropdownExample'>
        <h1 className='ms-font-xxl'>Dropdown</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/dropdown'>Dropdowns</Link>
          <span> provide a way for users to choose an option.</span>
        </div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Dropdown' code={ DropdownBasicExampleCode }>
          <DropdownBasicExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Dropdown' />
      </div>
    );
  }
}
