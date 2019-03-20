import * as React from 'react';
import { ExampleCard, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { CompositeListExample } from './Examples/CompositeList.example';

const CompositeListExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/CompositeList/Examples/CompositeList.example.tsx') as string;

export class CompositeListPage extends React.PureComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ComponentPage
        title="CompositeList"
        componentName="CompositeListExample"
        exampleCards={
          <div>
            <ExampleCard title="composite list" code={CompositeListExampleCode}>
              <CompositeListExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/CompositeList/CompositeList.types.ts')]}
          />
        }
      />
    );
  }
}
