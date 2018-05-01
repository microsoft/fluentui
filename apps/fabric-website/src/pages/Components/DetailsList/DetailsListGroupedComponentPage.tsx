import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListGroupedExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Grouped.Example.tsx') as string;

export class DetailsListGroupedComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Grouped DetailsListExample'
        componentName='DetailsListGroupedExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        overview={ <div /> }
        exampleCards={
          <ExampleCard title='Simple Grouped DetailsList' isOptIn={ true } code={ DetailsListGroupedExampleCode }>
            <DetailsListGroupedExample />
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