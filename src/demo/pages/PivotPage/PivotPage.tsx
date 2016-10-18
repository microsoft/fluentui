import * as React from 'react';
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
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const PivotRemoveExampleCode = require('./examples/Pivot.Remove.Example.tsx');
const PivotBasicExampleCode = require('./examples/Pivot.Basic.Example.tsx');
const PivotLargeExampleCode = require('./examples/Pivot.Large.Example.tsx');
const PivotTabsExampleCode = require('./examples/Pivot.Tabs.Example.tsx');
const PivotTabsLargesExampleCode = require('./examples/Pivot.TabsLarge.Example.tsx');
const PivotFabricExampleCode = require('./examples/Pivot.Fabric.Example.tsx');
const PivotOnChangeExampleCode = require('./examples/Pivot.OnChange.Example.tsx');

export class PivotPage extends React.Component<IComponentDemoPageProps, any> {
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
          <div>
            <ExampleCard title='Basic example' code={ PivotBasicExampleCode }>
              <PivotBasicExample />
            </ExampleCard>
            <ExampleCard title='Large link size' code={ PivotLargeExampleCode }>
              <PivotLargeExample />
            </ExampleCard>
            <ExampleCard title='Links of tab style' code={ PivotTabsExampleCode }>
              <PivotTabsExample />
            </ExampleCard>
            <ExampleCard title='Links of large tab style' code={ PivotTabsLargesExampleCode }>
              <PivotTabsLargeExample />
            </ExampleCard>
            <ExampleCard title='Trigger onchange event' code={ PivotOnChangeExampleCode }>
              <PivotOnChangeExample />
            </ExampleCard>
            <ExampleCard title='Rendering nested components within the Pivot' code={ PivotFabricExampleCode }>
              <PivotFabricExample />
            </ExampleCard>
            <ExampleCard title='Show/Hide pivot item' code={ PivotRemoveExampleCode }>
              <PivotRemoveExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <div>
            <PropertiesTableSet componentName='Pivot' />
            <PropertiesTableSet componentPath='components/Pivot/' componentName='PivotItem' />
          </div>
        }
        overview={
          <div>
            <p>
              The Pivot control and related tabs pattern are used for navigating frequently accessed, distinct content categories. Pivots allow for navigation between two or more content views and relies on text headers to articulate the different sections of content.
            </p>

            <ul>
              <li>Tapping on a pivot item header navigates to that header's section content.</li>
              <li>Swiping left or right on a pivot item header navigates to the adjacent section.</li>
              <li>Swiping left or right on section content navigates to the adjacent section. </li>
              <li>Pivots are stationary when all pivot headers fit within the allowed space.</li>
              <li>Pivots carousel when all pivot headers don't fit within the allowed space.</li>
            </ul>

            <p>
              Tabs are a visual variant of Pivot that use a combination of icons and text or just icons to articulate section content.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use on content-heavy pages that require a significant amount of scrolling to access the various sections.</li>
              <li>Be concise on the navigation labels, ideally one or two words rather than a phrase.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use on pages which doesn’t scroll.</li>
              <li>Don’t use the Pivot to link to a new page.</li>
              <li>Don’t use the Pivot to link to hidden content.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Pivot.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
