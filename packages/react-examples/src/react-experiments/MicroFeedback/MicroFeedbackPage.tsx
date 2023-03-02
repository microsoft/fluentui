import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { MicroFeedbackExample } from './MicroFeedback.Example';
import { MicroFeedbackCalloutExample } from './MicroFeedbackCallout.Example';
import { MicroFeedbackStackExample } from './MicroFeedbackStack.Example';

const MicroFeedbackExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/MicroFeedback/MicroFeedback.Example.tsx') as string;
const MicroFeedbackCalloutExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/MicroFeedback/MicroFeedbackCallout.Example.tsx') as string;
const MicroFeedbackStackExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/MicroFeedback/MicroFeedbackStack.Example.tsx') as string;

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
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/MicroFeedback/MicroFeedback.types.ts'),
            ]}
          />
        }
        overview={
          <div>
            MicroFeedback is a type of in-app item level feedback that is quick, easy to use, lightweight and most
            importantly contextual. MicroFeedback is about collecting small bits of information at specific points in
            your customer interaction within your product or service. It allows you to collect frequent and relevant
            feedback at various interaction point with customers. This control can be used where you want initial
            feedback and then a follow up question to narrow down reasons for the feedback. The data you gather can help
            you improve your product. The feedback data can be sent to a backend of your choice where you can process
            and report it.
          </div>
        }
        dos={
          <div>
            <ul>
              <li>Use MicroFeedback for gathering item level feedback.</li>
              <li>
                Use MicroFeedback followup where a question may provide information to narrow down user's preferences.
              </li>
              <li>Use MicroFeedback callbacks to send user feedback to a backend of your choice.</li>
              <li>MicroFeedback can be used in multiple places within an app to gather contextual feedback.</li>
              <li>
                Use the follow up to further narrow down why a user made a certain choice to improve your app or
                service.
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use MicroFeedback for overall application feedback.</li>
              <li>Don't use MicroFeedback where a user will have ambiguous choices.</li>
              <li>
                Don't use the MicroFeedback stack variant for items that span the entire page, use it in the taskpane
                instead.
              </li>
              <li>Don't give users more than three choices to pick from in the followup.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
