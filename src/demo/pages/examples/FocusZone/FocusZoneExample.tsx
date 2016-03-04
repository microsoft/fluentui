import * as React from 'react';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import CardExample from './examples/Card.Example';
let cardExampleCode = require('./examples/Card.Example.tsx');

export default class FocusZoneExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='FocusZoneExample'>
        <h1 className='ms-font-xxl'>FocusZone</h1>
        <div><Link target='_blank' text='FocusZones' url='#' /> are used to delimit keyboard navigation behavior.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Nested FocusZones' code={ cardExampleCode }>
          <CardExample />
        </ExampleCard>

      </div>
    );
  }

}
