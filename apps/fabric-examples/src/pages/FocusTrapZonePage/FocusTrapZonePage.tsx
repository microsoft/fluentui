import * as React from 'react';
import {
  Link
} from 'office-ui-fabric-react/lib/Link';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import FocusTrapZoneBoxExample from './examples/FocusTrapZone.Box.Example';
let FocusTrapZoneBoxExampleCode = require('./examples/FocusTrapZone.Box.Example.tsx') as string;

import FocusTrapZoneBoxExampleWithFocusableItem from './examples/FocusTrapZone.Box.FocusOnCustomElement.Example';
let FocusTrapZoneBoxExampleWithFocusableItemCode = require('./examples/FocusTrapZone.Box.FocusOnCustomElement.Example.tsx') as string;

import FocusTrapZoneBoxClickExample from './examples/FocusTrapZone.Box.Click.Example';
let FocusTrapZoneBoxClickExampleCode = require('./examples/FocusTrapZone.Box.Click.Example.tsx') as string;

export class FocusTrapZonePage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='FocusTrapZone'
        componentName='FocusTrapZoneExample'
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
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('office-ui-fabric-react/lib/components/FocusTrapZone/FocusTrapZone.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/utilities/FocusTrapZone'>FocusTrapZone</Link>
            <span> is used to trap the focus in any html element. Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone.</span>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
