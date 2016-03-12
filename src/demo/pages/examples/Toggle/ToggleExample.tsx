import * as React from 'react';

// Arg! I can't get TypeScript to like this, until they support path mappings.
//import { Toggle } from 'office-ui-fabric-react';

import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import ToggleProperties from './ToggleProperties';
import ToggleBasicExample from './examples/Toggle.Basic.Example';
let ToggleBasicExampleCode = require('./examples/Toggle.Basic.Example.tsx');

export default class ToggleExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ToggleExample'>
        <h1 className='ms-font-xxl'>Toggle</h1>
        <div><Link target='_blank' text='Toggles' url='http://dev.office.com/fabric/components/Toggle' /> provide a ui indicator for progress.</div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Toggle' code={ ToggleBasicExampleCode }>
          <ToggleBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ ToggleProperties } />
      </div>
    );
  }
}
