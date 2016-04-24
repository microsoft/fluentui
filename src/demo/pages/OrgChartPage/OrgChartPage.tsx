import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import OrgChartProps from './OrgChartProps';

import OrgChartBasicExample from './examples/OrgChart.Basic.Example';
let OrgChartBasicExampleCode = require('./examples/OrgChart.Basic.Example.tsx');

export default class OrgChartPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>OrgChart</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/OrgChart'>OrgCharts</Link>
          are used to render an org chart.
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='OrgChart' code={ OrgChartBasicExampleCode }>
          <OrgChartBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ OrgChartProps } />
      </div>
    );
  }

}
