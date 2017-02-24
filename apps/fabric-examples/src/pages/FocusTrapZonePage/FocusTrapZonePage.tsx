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

import FocusTrapZoneBestExample from './examples/FocusTrapZone.Best.Example';
let FocusTrapZoneBestExampleCode = require('./examples/FocusTrapZone.Best.Example.tsx') as string;

export class FocusTrapZonePage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='FocusTrapZone'
        componentName='FocusTrapZoneExample'
        exampleCards={
          <div>
            <ExampleCard title='Best Example' code={ FocusTrapZoneBestExampleCode }>
              <FocusTrapZoneBestExample />
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
