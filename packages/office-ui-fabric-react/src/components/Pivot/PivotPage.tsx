import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
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
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { PivotStatus } from './Pivot.checklist';

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
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Pivot'
        componentName='PivotExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Pivot'
        exampleCards={
          <div>
            <ExampleCard title='Default Pivot' code={ PivotBasicExampleCode }>
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
        allowNativeProps={ 'PivotItem' }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/Pivot.types.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/PivotItem.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Pivot/docs/PivotDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...PivotStatus }
          />
        }
      />
    );
  }
}
