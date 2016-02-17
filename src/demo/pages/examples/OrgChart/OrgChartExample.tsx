import * as React from 'react';
import OrgChart from '../../../../components/OrgChart/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class OrgChartExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='OrgChartExample'>
        <h1 className='ms-font-xxl'>OrgChart</h1>
        <div><Link target='_blank' text='OrgCharts' url='http://dev.office.com/fabric/components/OrgChart' /> are used to render an org chart.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='OrgChart'>
          <OrgChart />
        </ExampleCard>
      </div>
    );
  }

}
