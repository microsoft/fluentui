import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  ComponentPage
} from '../../components/index';

import { OrgChartBasicExample } from './examples/OrgChart.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';

const OrgChartBasicExampleCode = require('./examples/OrgChart.Basic.Example.tsx');

export class OrgChartPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState('Basic components', 'OrgChart');
  }

  public render() {
    return (
      <ComponentPage
        title='OrgChart'
        componentName='OrgChartExample'
        exampleCards={
          [
            <ExampleCard title='OrgChart' code={ OrgChartBasicExampleCode }>
              <OrgChartBasicExample />
            </ExampleCard>
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/OrgChart'>OrgCharts</Link>
            <span> are used to render an org chart.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
