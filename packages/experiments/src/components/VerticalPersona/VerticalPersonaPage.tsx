import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { VerticalPersonaExample } from './examples/VerticalPersona.Example';

const VerticalPersonaExampleCode = require('!raw-loader!@uifabric/experiments/src/components/VerticalPersona/examples/VerticalPersona.Example.tsx') as string;

export class VerticalPersonaPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" VerticalPersona"
        componentName=" VerticalPersona"
        exampleCards={
          <div>
            <ExampleCard title="VerticalPersona basic usage" code={VerticalPersonaExampleCode}>
              <VerticalPersonaExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/VerticalPersona/VerticalPersona.types.ts')]}
          />
        }
        // overview={<div />}
        // bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Provide as few props as needed to render the coin</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul />
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
