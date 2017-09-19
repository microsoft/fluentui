import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PivotBasicExample } from './examples/Pivot.Basic.Example';
import { PivotIconCountExample } from './examples/Pivot.IconCount.Example';
import { PivotLargeExample } from './examples/Pivot.Large.Example';
import { PivotTabsExample } from './examples/Pivot.Tabs.Example';
import { PivotTabsLargeExample } from './examples/Pivot.TabsLarge.Example';
import { PivotFabricExample } from './examples/Pivot.Fabric.Example';
import { PivotOnChangeExample } from './examples/Pivot.OnChange.Example';
import { PivotRemoveExample } from './examples/Pivot.Remove.Example';
import { PivotOverrideExample } from './examples/Pivot.Override.Example';
import { PivotSeparateExample } from './examples/Pivot.Separate.Example';

const PivotRemoveExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Remove.Example.tsx') as string;
const PivotBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Basic.Example.tsx') as string;
const PivotLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Large.Example.tsx') as string;
const PivotTabsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Tabs.Example.tsx') as string;
const PivotTabsLargesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.TabsLarge.Example.tsx') as string;
const PivotFabricExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Fabric.Example.tsx') as string;
const PivotOnChangeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.OnChange.Example.tsx') as string;
const PivotIconCountExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.IconCount.Example.tsx') as string;
const PivotOverrideExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Override.Example.tsx') as string;
const PivotSeparateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Pivot/examples/Pivot.Separate.Example.tsx') as string;

export class PivotPage extends React.Component<IComponentDemoPageProps, {}> {
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
            <ExampleCard title='Count and Icon' code={ PivotIconCountExampleCode }>
              <PivotIconCountExample />
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
            <ExampleCard title='Override selected item' code={ PivotOverrideExampleCode }>
              <PivotOverrideExample />
            </ExampleCard>
            <ExampleCard title='Render content separately' code={ PivotSeparateExampleCode }>
              <PivotSeparateExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/Pivot.Props.ts')
            ] }
          />
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
          <div />
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
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
