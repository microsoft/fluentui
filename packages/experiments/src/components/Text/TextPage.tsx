import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { TextRampExample } from './examples/Text.Ramp.Example';
const TextRampExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Text/examples/Text.Ramp.Example.tsx') as string;

export class TextPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Text"
        componentName="Text"
        exampleCards={
          <div>
            <ExampleCard title="Text Ramps" code={TextRampExampleCode}>
              <TextRampExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Text/Text.types.tsx')]} />
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
