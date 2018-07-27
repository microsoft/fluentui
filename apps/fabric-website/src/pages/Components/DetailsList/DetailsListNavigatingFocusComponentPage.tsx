import * as React from 'react';
import { ComponentPage, ExampleCard, PropertiesTableSet } from '@uifabric/example-app-base';
import { DetailsListNavigatingFocusExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.NavigatingFocus.Example';
const DetailsListNavigatingFocusExampleCode = require('raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx') as string;

export class DetailsListNavigatingFocusComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Inner Navigation DetailsList"
        componentName="DetailsListNavigatingFocusExample"
        componentUrl="https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList"
        exampleCards={
          <ExampleCard
            title="Navigating to new content preserving keyboard focus with initialFocusedIndex"
            isOptIn={true}
            code={DetailsListNavigatingFocusExampleCode}
          >
            <DetailsListNavigatingFocusExample />
          </ExampleCard>
        }
        isHeaderVisible={false}
      />
    );
  }
}
