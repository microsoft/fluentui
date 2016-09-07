import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { PivotBasicExample } from './examples/Pivot.Basic.Example';
import { PivotVariationsExample } from './examples/Pivot.Variations.Example';
import { PivotCustomExample } from './examples/Pivot.Custom.Example';

const PivotBasicExampleCode = require('./examples/Pivot.Basic.Example.tsx');
const PivotVariationsExampleCode = require('./examples/Pivot.Variations.Example.tsx');
const PivotCustomExampleCode = require('./examples/Pivot.Custom.Example.tsx');

export class PivotPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Pivot');
  }

  public render() {
    return (
      <ComponentPage
        title='Pivot'
        componentName='PivotExample'
        exampleCards={
          [
            <ExampleCard title='Basic example' code={ PivotBasicExampleCode }>
              <PivotBasicExample />
            </ExampleCard>,
            <ExampleCard title='Pivot variations' code={ PivotVariationsExampleCode }>
              <PivotVariationsExample />
            </ExampleCard>,
            <ExampleCard title='Custom tab rendering' code={ PivotCustomExampleCode }>
              <PivotCustomExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Pivot' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Pivot'>Pivots</Link>
            <span> are used for grouping components under a set of Links or Tabs</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
