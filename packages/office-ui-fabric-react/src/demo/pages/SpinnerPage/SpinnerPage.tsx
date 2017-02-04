import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/demoComponents';

import { SpinnerBasicExample } from './examples/Spinner.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';

import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const SpinnerBasicExampleCode = require('./examples/Spinner.Basic.Example.tsx') as string;

export class SpinnerPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  public render() {
    return (
      <ComponentPage
        title='Spinner'
        componentName='SpinnerExample'
        exampleCards={
          <ExampleCard
            title='Various Spinner Types'
            code={ SpinnerBasicExampleCode }>
            <SpinnerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Spinner' />
        }
        overview={
          <div>
            <p>
              A Spinner is an outline of a circle which animates around itself indicating to the user that things are processing. A Spinner is shown when it's unsure how long a task will take making it the indeterminate version of a ProgressIndicator. They can be various sizes, located inline with content or centered. They generally appear after an action is being processed or committed. They are subtle and generally do not take up much space, but are transitions from the completed task.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
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
        related={
          <a href='https://dev.office.com/fabric-js/Components/Spinner/Spinner.html'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
