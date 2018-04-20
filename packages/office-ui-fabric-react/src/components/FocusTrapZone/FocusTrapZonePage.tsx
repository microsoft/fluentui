import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import FocusTrapZoneBoxExample from './examples/FocusTrapZone.Box.Example';
const FocusTrapZoneBoxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.Example.tsx') as string;

import FocusTrapZoneBoxExampleWithFocusableItem from './examples/FocusTrapZone.Box.FocusOnCustomElement.Example';
const FocusTrapZoneBoxExampleWithFocusableItemCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.FocusOnCustomElement.Example.tsx') as string;

import FocusTrapZoneBoxClickExample from './examples/FocusTrapZone.Box.Click.Example';
const FocusTrapZoneBoxClickExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.Click.Example.tsx') as string;

import FocusTrapZoneNestedExample from './examples/FocusTrapZone.Nested.Example';
const FocusTrapZoneNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Nested.Example.tsx') as string;

export class FocusTrapZonePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='FocusTrapZone'
        componentName='FocusTrapZoneExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/FocusTrapZone'
        exampleCards={
          <div>
            <ExampleCard title='Simple Box' code={ FocusTrapZoneBoxExampleCode }>
              <FocusTrapZoneBoxExample />
            </ExampleCard>
            <ExampleCard title='Simple Box with focus on custom focusable element' code={ FocusTrapZoneBoxExampleWithFocusableItemCode }>
              <FocusTrapZoneBoxExampleWithFocusableItem />
            </ExampleCard>
            <ExampleCard title='Simple Box with Clicking outside Trap Zone enabled' code={ FocusTrapZoneBoxClickExampleCode }>
              <FocusTrapZoneBoxClickExample />
            </ExampleCard>
            <ExampleCard title='Multiple Nest FocusTrapZones' code={ FocusTrapZoneNestedExampleCode }>
              <FocusTrapZoneNestedExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/FocusTrapZone.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/docs/FocusTrapZoneOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
