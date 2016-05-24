import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import FocusTrapZoneBoxExample from './examples/FocusTrapZone.Box.Example';
let FocusTrapZoneBoxExampleCode = require('./examples/FocusTrapZone.Box.Example');

export class FocusTrapZonePage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-DialogPage'>
        <h1 className='ms-font-xxl'>Focus Trap Zone</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/utilities/FocusTrapZone'>FocusTrapZone</Link>
          <span> is used to trap the focus in any html element. Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Simple Box' code={ FocusTrapZoneBoxExampleCode }>
          <FocusTrapZoneBoxExample />
        </ExampleCard>

        <PropertiesTableSet componentName='FocusTrapZone' componentPath='utilities/focus/' />
      </div>
    );
  }
}
