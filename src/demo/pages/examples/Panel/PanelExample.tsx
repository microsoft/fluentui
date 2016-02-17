import * as React from 'react';
import Panel from '../../../../components/Panel/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class PanelExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PanelExample'>
        <h1 className='ms-font-xxl'>Panel</h1>
        <div><Link target='_blank' text='Panels' url='http://dev.office.com/fabric/components/panel' /> are used to render an org chart.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Panel'>
          <Panel />
        </ExampleCard>
      </div>
    );
  }

}
