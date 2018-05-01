import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListCustomGroupHeadersExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx') as string;

export class DetailsListCustomGroupHeadersComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Custom Group Headers'
        componentName='DetailsListCustomGroupHeadersExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        overview={ <div /> }
        exampleCards={
          <ExampleCard title='Rendering custom group headers' isOptIn={ true } code={ DetailsListCustomGroupHeadersExampleCode }>
            <DetailsListCustomGroupHeadersExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')
            ] }
          />
        }
        isHeaderVisible={ false }
      />
    );
  }
}