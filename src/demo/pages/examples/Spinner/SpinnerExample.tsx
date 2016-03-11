import * as React from 'react';
import { default as Spinner, SpinnerType } from '../../../../components/Spinner/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import SpinnerProperties from './SpinnerProperties';

import BasicExample from './examples/BasicSpinner.Example';
let BasicExampleCode = require('./examples/BasicSpinner.Example.tsx');


export default class SpinnerExample extends React.Component<any, any> {
  public render() {

    return (
      <div className='SpinnerExample'>
        <h1 className='ms-font-xxl'>Spinner</h1>
        <div><Link target='_blank' text='Spinners' url='http://dev.office.com/fabric/components/Spinner' /> provide a ui indicator for progress.</div>

        <PropertiesTable properties={ SpinnerProperties } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='Various Spinner Types'
          code={ BasicExampleCode }
        >
          <BasicExample />
        </ExampleCard>
      </div>
    ); 
  }

}
