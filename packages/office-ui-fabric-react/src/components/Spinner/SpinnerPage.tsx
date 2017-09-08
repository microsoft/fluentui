import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SpinnerBasicExample } from './examples/Spinner.Basic.Example';

const SpinnerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Spinner/examples/Spinner.Basic.Example.tsx') as string;

export class SpinnerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Spinner'
        componentName='SpinnerExample'
        exampleCards={
          <ExampleCard
            title='Various Spinner Types'
            code={ SpinnerBasicExampleCode }
          >
            <SpinnerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/Spinner.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Spinner is an outline of a circle which animates around itself indicating to the user that things are processing. A Spinner is shown when it's unsure how long a task will take making it the indeterminate version of a ProgressIndicator. They can be various sizes, located inline with content or centered. They generally appear after an action is being processed or committed. They are subtle and generally do not take up much space, but are transitions from the completed task.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use a Spinner when a task is not immediate.</li>
              <li>Use one Spinner at a time.</li>
              <li>Descriptive verbs are appropriate under a Spinner to help the user understand what's happening. Ie: Saving, processing, updating.</li>
              <li>Use a Spinner when confirming a change has been made or a task is being processed.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use a Spinner when performing immediate tasks.</li>
              <li>Don't show multiple Spinners at the same time.</li>
              <li>Don't include more than a few words when paired with a Spinner.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      >
      </ComponentPage>
    );
  }
}
