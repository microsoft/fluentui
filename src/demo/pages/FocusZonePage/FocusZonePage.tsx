import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { FocusZonePhotosExample } from './examples/FocusZone.Photos.Example';
import { FocusZoneListExample } from './examples/FocusZone.List.Example';
import { FocusZoneDisabledExample } from './examples/FocusZone.Disabled.Example';

const FocusZonePhotosExampleCode = require('./examples/FocusZone.Photos.Example.tsx');
const FocusZoneListExampleCode = require('./examples/FocusZone.List.Example.tsx');
const FocusZoneDisabledExampleCode = require('./examples/FocusZone.Disabled.Example.tsx');

export class FocusZonePage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-FocusZonePage'>
        <h1 className='ms-font-xxl'>FocusZone</h1>

        <p>FocusZones abstract arrow key navigation behaviors. Tabbable elements (buttons, anchors, and elements with data-is-focusable='true' attributes) are considered when pressing directional arrow keys and focus is moved appropriately. Tabbing to a zone sets focus only to the current "active" element, making it simple to use the tab key to transition from one zone to the next, rather than through every focusable element.</p>

        <p>Using a FocusZone is simple. Just wrap a bunch of content inside of a FocusZone, and arrows and tabbling will be handled for you! See examples below.</p>

        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Non-uniform photos within bidirectional FocusZone' code={ FocusZonePhotosExampleCode }>
          <FocusZonePhotosExample />
        </ExampleCard>
        <ExampleCard title='Nesting FocusZones in list rows' code={ FocusZoneListExampleCode }>
          <FocusZoneListExample />
        </ExampleCard>
        <ExampleCard title='Disabled FocusZone' code={ FocusZoneDisabledExampleCode }>
          <FocusZoneDisabledExample />
        </ExampleCard>
        <PropertiesTableSet componentName='FocusZone' />
      </div>
    );
  }

}
