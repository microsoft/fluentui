import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListNavigatingFocusExample } from 'office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example';
const DetailsListNavigatingFocusExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx') as string;

export class DetailsListNavigatingFocusComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Grouped DetailsListExample'
        componentName='DetailsListNavigatingFocusExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        overview={ <div /> }
        exampleCards={
          <ExampleCard title='Navigating to new content preserving keyboard focus with initialFocusedIndex' isOptIn={ true } code={ DetailsListNavigatingFocusExampleCode }>
            <DetailsListNavigatingFocusExample />
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