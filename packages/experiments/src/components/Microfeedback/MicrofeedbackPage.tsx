import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { MicrofeedbackBasicExample } from './examples/Microfeedback.Basic.Example';
const MicroFeedbackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/MicroFeedback/examples/Microfeedback.Basic.Example.tsx') as string;

export class MicrofeedbackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="MicroFeedback"
        componentName="MicroFeedback"
        exampleCards={
          <div>
            <ExampleCard title="Folder Cover" isOptIn={true} code={MicroFeedbackBasicExampleCode}>
              <MicrofeedbackBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/MicroFeedback/MicroFeedback.types.ts')]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use them to represent a folder which may contain visual content.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>To represent the concept of a folder as opposed to an actual folder item.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
