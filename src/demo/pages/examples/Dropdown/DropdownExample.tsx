import * as React from 'react';
import Dropdown from '../../../../components/Dropdown/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import DropdownProperties from './DropdownProperties';

import DropdownBasicExample from './examples/Dropdown.Basic.Example';
let DropdownBasicExampleCode = require('./examples/Dropdown.Basic.Example.tsx');

export default class DropdownExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DropdownExample'>
        <h1 className='ms-font-xxl'>Dropdown</h1>
        <div><Link target='_blank' text='Dropdowns' url='http://dev.office.com/fabric/components/dropdown' /> provide a way for users to choose an option.</div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Dropdown' code={ DropdownBasicExampleCode }>
          <DropdownBasicExample />
        </ExampleCard>

        <PropertiesTable properties={ DropdownProperties } />
      </div>
    );
  }
}
