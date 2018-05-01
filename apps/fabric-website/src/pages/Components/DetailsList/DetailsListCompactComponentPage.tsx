import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListCompactExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Compact.Example';
const DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Compact.Example.tsx') as string;

export class DetailsListCompactComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Compact DetailsListExample'
        overview={ <div /> }
        componentName='DetailsListCompactExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        exampleCards={
          <ExampleCard title='Compact DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListCompactExampleCode }>
            <DetailsListCompactExample />
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
