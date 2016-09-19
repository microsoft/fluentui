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
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const OrgChartBasicExampleCode = require('./examples/OrgChart.Basic.Example.tsx');

export class OrgChartPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'OrgChart');
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
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/OrgChart.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
