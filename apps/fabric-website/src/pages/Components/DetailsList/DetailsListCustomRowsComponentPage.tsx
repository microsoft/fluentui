import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListCustomRowsExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx') as string;

export class DetailsListCustomRowsComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Custom Item Rows'
        componentName='DetailsListCustomRowsExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        overview={ <div /> }
        exampleCards={
          <ExampleCard title='Rendering custom item rows' isOptIn={ true } code={ DetailsListCustomRowsExampleCode }>
            <DetailsListCustomRowsExample />
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