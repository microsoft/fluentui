import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';

import { OrgChartBasicExample } from './examples/OrgChart.Basic.Example';

const OrgChartBasicExampleCode = require('./examples/OrgChart.Basic.Example.tsx');

export class OrgChartPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>OrgChart</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/OrgChart'>OrgCharts</Link>
          <span> are used to render an org chart.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='OrgChart' code={ OrgChartBasicExampleCode }>
          <OrgChartBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ null } />
      </div>
    );
  }

}
