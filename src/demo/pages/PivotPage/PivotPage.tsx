import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PivotBasicExample } from './examples/Pivot.Basic.Example';
import { PivotLargeExample } from './examples/Pivot.Large.Example';
import { PivotTabsExample } from './examples/Pivot.Tabs.Example';
import { PivotTabsLargeExample } from './examples/Pivot.TabsLarge.Example';
import { PivotFabricExample } from './examples/Pivot.Fabric.Example';
import { PivotOnChangeExample } from './examples/Pivot.OnChange.Example';
import { PivotRemoveExample } from './examples/Pivot.Remove.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const PivotRemoveExampleCode = require('./examples/Pivot.Remove.Example.tsx');
const PivotBasicExampleCode = require('./examples/Pivot.Basic.Example.tsx');
const PivotLargeExampleCode = require('./examples/Pivot.Large.Example.tsx');
const PivotTabsExampleCode = require('./examples/Pivot.Tabs.Example.tsx');
const PivotTabsLargesExampleCode = require('./examples/Pivot.TabsLarge.Example.tsx');
const PivotFabricExampleCode = require('./examples/Pivot.Fabric.Example.tsx');
const PivotOnChangeExampleCode = require('./examples/Pivot.OnChange.Example.tsx');

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
            <ExampleCard title='Large link size' code={ PivotLargeExampleCode }>
              <PivotLargeExample />
            </ExampleCard>,
            <ExampleCard title='Links of tab style' code={ PivotTabsExampleCode }>
              <PivotTabsExample />
            </ExampleCard>,
            <ExampleCard title='Links of large tab style' code={ PivotTabsLargesExampleCode }>
              <PivotTabsLargeExample />
            </ExampleCard>,
            <ExampleCard title='Trigger onchange event' code={ PivotOnChangeExampleCode }>
              <PivotOnChangeExample />
            </ExampleCard>,
            <ExampleCard title='Rendering nested components within the Pivot' code={ PivotFabricExampleCode }>
              <PivotFabricExample />
            </ExampleCard>,
            <ExampleCard title='Show/Hide pivot item' code={ PivotRemoveExampleCode }>
              <PivotRemoveExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Pivot' />,
            <PropertiesTableSet componentPath='components/Pivot/' componentName='PivotItem' />
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
