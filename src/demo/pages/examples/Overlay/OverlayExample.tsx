import * as React from 'react';
import Overlay from '../../../../components/Overlay';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class OverlayExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='OverlayExample'>
        <h1 className='ms-font-xxl'>Overlay</h1>
        <div><Link text='Overlays' url='http://dev.office.com/fabric/components/Overlay' /> are used to render an org chart.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Overlay'>
          <Overlay />
        </ExampleCard>
      </div>
    );
  }

}
