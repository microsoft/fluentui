import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import OverlayProps from './OverlayProps';

import OverlayBasicExample from './examples/Overlay.Basic.Example';
let OverlayBasicExampleCode = require('./examples/Overlay.Basic.Example.tsx');

export default class OverlayPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Overlay</h1>
        <div><Link target='_blank' text='Overlays' url='http://dev.office.com/fabric/components/Overlay' /> are used to render an org chart.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Overlay' code={ OverlayBasicExampleCode }>
          <OverlayBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ OverlayProps } />
      </div>
    );
  }

}
