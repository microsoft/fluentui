import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { OverlayBasicExample } from './examples/Overlay.Basic.Example';

const OverlayBasicExampleCode = require('./examples/Overlay.Basic.Example.tsx');

export class OverlayPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Overlay</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/Overlay'>Overlays</Link>
          <span> are used to render a semi transparent overlaying div on top of content. This can be used in modal situations, such as Dialogs, which render on top of existing content.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Overlay' code={ OverlayBasicExampleCode }>
          <OverlayBasicExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Overlay' />
      </div>
    );
  }

}
