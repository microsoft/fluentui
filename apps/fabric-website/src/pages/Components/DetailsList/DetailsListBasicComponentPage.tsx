import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';

import { DetailsListBasicExample } from 'office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx') as string;

export class DetailsListBasicComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Grouped DetailsListExample'
        componentName='DetailsListNavigatingFocusExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList' // @TODO(keco): UPDATE
        exampleCards={
          <ExampleCard title='Simple DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListBasicExampleCode }>
            <DetailsListBasicExample />
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