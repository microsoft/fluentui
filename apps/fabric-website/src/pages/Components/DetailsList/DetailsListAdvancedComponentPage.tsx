import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListAdvancedExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx') as string;

export class DetailsListAdvancedComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Advanced DetailsList'
        componentName='DetailsListAdvancedExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        exampleCards={
          <ExampleCard title='Advanced DetailsList of 5000 items, variable row heights' isOptIn={ true } code={ DetailsListAdvancedExampleCode }>
            <DetailsListAdvancedExample />
          </ExampleCard>
        }
        isHeaderVisible={ false }
      />
    );
  }
}