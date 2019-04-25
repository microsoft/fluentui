import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { MicroFeedbackBasicExample } from './examples/MicroFeedback.Basic.Example';
const MicroFeedbackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/MicroFeedback/examples/MicroFeedback.Basic.Example.tsx') as string;

export class MicroFeedbackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="MicroFeedback"
        componentName="MicroFeedback"
        exampleCards={
          <div>
            <ExampleCard title="Default with Callout" isOptIn={true} code={MicroFeedbackBasicExampleCode}>
              <MicroFeedbackBasicExample />
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
              <li>Use this for gathering item level feedback.</li>
              <li>Use this where a follow up question may provide information on user's choice.</li>
              <li>Use this to send user feedback to a backend of your choice.</li>
              <li>More to come here.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>More to come here.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
