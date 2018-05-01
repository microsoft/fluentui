import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListAdvancedExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx') as string;

export class DetailsListAdvancedComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Advanced'
        componentName='DetailsListAdvancedExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        overview={ <div /> }
        exampleCards={
          <ExampleCard title='Advanced DetailsList of 5000 items, variable row heights' isOptIn={ true } code={ DetailsListAdvancedExampleCode }>
            <DetailsListAdvancedExample />
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