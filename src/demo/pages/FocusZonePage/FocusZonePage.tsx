import * as React from 'react';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import FocusZoneProps from './FocusZoneProps';

import FocusZoneCardExample from './examples/FocusZone.Card.Example';
let FocusZoneCardExampleCode = require('./examples/FocusZone.Card.Example.tsx');

import FocusZoneListExample from './examples/FocusZone.List.Example';
let FocusZoneListExampleCode = require('./examples/FocusZone.List.Example.tsx');

export default class FocusZonePage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-FocusZonePage'>
        <h1 className='ms-font-xxl'>FocusZone</h1>
        <div>FocusZones are used to delimit keyboard navigation behavior.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Nested FocusZones' code={ FocusZoneCardExampleCode }>
          <FocusZoneCardExample />
        </ExampleCard>
        <ExampleCard title='List FocusZones' code={ FocusZoneListExampleCode }>
          <FocusZoneListExample />
        </ExampleCard>
        <PropertiesTable properties={ FocusZoneProps } />
      </div>
    );
  }

}
