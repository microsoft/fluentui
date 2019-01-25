import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import {
  SubwayNavBasicExample,
  SubwayNavWizardCompleteExample,
  SubwayNavBasicDifferentStatesExample,
  SubwayNavDisabledStepsExample,
  SubwayNavSubStepsExample
} from '@uifabric/dashboard/lib/components/SubwayNav/examples';

const SubwayNavExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayNav/examples/SubwayNav.Basic.Example.tsx') as string;
const SubwayNavDisabledStepsExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayNav/examples/SubwayNav.DisabledSteps.Example.tsx') as string;
const SubwayNavBasicDifferentStatesExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayNav/examples/SubwayNav.Basic.DifferentStates.Example.tsx') as string;
const SubwayNavSubStepsExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayNav/examples/SubwayNav.SubSteps.Example.tsx') as string;
const SubwayNavWizardCompleteExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayNav/examples/SubwayNav.WizardComplete.Example.tsx') as string;

export class SubwayNavPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="SubwayNav"
        componentName="SubwayNav"
        exampleCards={
          <div>
            <ExampleCard title="Basic Subway Nav Card with only steps" code={SubwayNavExampleCode}>
              <SubwayNavBasicExample />
            </ExampleCard>
            <ExampleCard title="Basic Subway Nav Card with disabled steps" code={SubwayNavDisabledStepsExampleCode}>
              <SubwayNavDisabledStepsExample />
            </ExampleCard>
            <ExampleCard title="Basic Subway Nav Card with different states" code={SubwayNavBasicDifferentStatesExampleCode}>
              <SubwayNavBasicDifferentStatesExample />
            </ExampleCard>
            <ExampleCard title="Subway Nav Card with Sub steps" code={SubwayNavSubStepsExampleCode}>
              <SubwayNavSubStepsExample />
            </ExampleCard>
            <ExampleCard title="Subway Nav Card with wizard complete" code={SubwayNavWizardCompleteExampleCode}>
              <SubwayNavWizardCompleteExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/SubwayNav/SubwayNav.types.ts')]} />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>The Subway Nav control allows you to visualize the steps required for a given wizard.</p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use Subway Nav control with PanelWizard, FullPageWizard or TenantSetupWizard.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Only one level of sub steps is allowed.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
