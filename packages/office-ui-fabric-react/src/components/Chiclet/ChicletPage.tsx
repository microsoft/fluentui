import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ChicletBasicExample } from './examples/Chiclet.Basic.Example';

const ChicletBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Chiclet/examples/Chiclet.Basic.Example.tsx') as string;

export class ChicletPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Chiclet'
        componentName='ChicletExample'
        exampleCards={
          <div>
            <ExampleCard title='Default Chiclet' code={ ChicletBasicExampleCode }>
              <ChicletBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Chiclet/Chiclet.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Chiclet
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul />
          </div>
        }
        donts={
          <div>
            <ul />
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}