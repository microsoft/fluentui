import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { FocusZonePhotosExample } from './examples/FocusZone.Photos.Example';
import { FocusZoneListExample } from './examples/FocusZone.List.Example';
import { FocusZoneDisabledExample } from './examples/FocusZone.Disabled.Example';
import { FocusZoneTabbableExample } from './examples/FocusZone.Tabbable.Example';

const FocusZonePhotosExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.Photos.Example.tsx') as string;
const FocusZoneListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.List.Example.tsx') as string;
const FocusZoneDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.Disabled.Example.tsx') as string;
const FocusZoneTabbableCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.Tabbable.Example.tsx') as string;

export class FocusZonePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='FocusZone'
        componentName='FocusZoneExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/FocusZone'
        exampleCards={
          <div>
            <ExampleCard title='Non-uniform photos within bidirectional FocusZone' code={ FocusZonePhotosExampleCode }>
              <FocusZonePhotosExample />
            </ExampleCard>
            <ExampleCard title='Nesting FocusZones in list rows' code={ FocusZoneListExampleCode }>
              <FocusZoneListExample />
            </ExampleCard>
            <ExampleCard title='Disabled FocusZone' code={ FocusZoneDisabledExampleCode }>
              <FocusZoneDisabledExample />
            </ExampleCard>
            <ExampleCard title='Tabbable FocusZone' code={ FocusZoneTabbableCode }>
              <FocusZoneTabbableExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/FocusZone/FocusZone.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/FocusZone/docs/FocusZoneOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}
