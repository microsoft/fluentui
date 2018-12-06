import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { PersonaCoinExample } from './examples/PersonaCoin.Example';
const PersonaCoinExampleCode = require('!raw-loader!@uifabric/experiments/src/components/PersonaCoin/examples/PersonaCoin.Example.tsx') as string;

export class PersonaCoinPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" PersonaCoin"
        componentName=" PersonaCoin"
        exampleCards={
          <div>
            <ExampleCard title=" PersonaCoin Ramps" code={PersonaCoinExampleCode}>
              <PersonaCoinExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/PersonaCoin/PersonaCoin.types.ts')]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
