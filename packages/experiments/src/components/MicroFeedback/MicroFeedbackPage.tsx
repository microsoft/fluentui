import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { MicroFeedbackExample } from './examples/MicroFeedback.Example';
import { MicroFeedbackCalloutExample } from './examples/MicroFeedbackCallout.Example';
import { MicroFeedbackStackExample } from './examples/MicroFeedbackStack.Example';

const MicroFeedbackExampleCode = require('!raw-loader!@uifabric/experiments/src/components/MicroFeedback/examples/MicroFeedback.Example.tsx') as string;
const MicroFeedbackCalloutExampleCode = require('!raw-loader!@uifabric/experiments/src/components/MicroFeedback/examples/MicroFeedbackCallout.Example.tsx') as string;
const MicroFeedbackStackExampleCode = require('!raw-loader!@uifabric/experiments/src/components/MicroFeedback/examples/MicroFeedbackStack.Example.tsx') as string;

export class MicroFeedbackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="MicroFeedback"
        componentName="MicroFeedback"
        exampleCards={
          <div>
            <ExampleCard title="Default" isOptIn={true} code={MicroFeedbackExampleCode}>
              <MicroFeedbackExample />
            </ExampleCard>
            <ExampleCard title="With Callout followup" isOptIn={true} code={MicroFeedbackCalloutExampleCode}>
              <MicroFeedbackCalloutExample />
            </ExampleCard>
            <ExampleCard title="With Stack followup" isOptIn={true} code={MicroFeedbackStackExampleCode}>
              <MicroFeedbackStackExample />
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
