import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { SubwayMapBasicExample, SubwayMapWizardCompleteExample, SubwayMapBasicDifferentStatesExample, SubwayMapDisabledStepsExample, SubwayMapSubStepsExample } from './examples/index';

const SubwayMapExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayMap/examples/SubwayMap.Basic.Example.tsx') as string;
const SubwayMapDisabledStepsExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayMap/examples/SubwayMap.DisabledSteps.Example.tsx') as string;
const SubwayMapBasicDifferentStatesExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayMap/examples/SubwayMap.Basic.DifferentStates.Example.tsx') as string;
const SubwayMapSubStepsExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayMap/examples/SubwayMap.SubSteps.Example.tsx') as string;
const SubwayMapWizardCompleteExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SubwayMap/examples/SubwayMap.WizardComplete.Example.tsx') as string;

export class SubwayMapPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="SubwayMap"
        componentName="SubwayMap"
        exampleCards={
          <div>
            <ExampleCard title="Basic Subway Map Card with only steps" code={SubwayMapExampleCode}>
              <SubwayMapBasicExample />
            </ExampleCard>
            <ExampleCard title="Basic Subway Map Card with disabled steps" code={SubwayMapDisabledStepsExampleCode}>
              <SubwayMapDisabledStepsExample />
            </ExampleCard>
            <ExampleCard title="Basic Subway Map Card with different states" code={SubwayMapBasicDifferentStatesExampleCode}>
              <SubwayMapBasicDifferentStatesExample />
            </ExampleCard>
            <ExampleCard title="Subway Map Card with Sub steps" code={SubwayMapSubStepsExampleCode}>
              <SubwayMapSubStepsExample />
            </ExampleCard>
            <ExampleCard title="Subway Map Card with wizard complete" code={SubwayMapWizardCompleteExampleCode}>
              <SubwayMapWizardCompleteExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/SubwayMap/SubwayMap.types.ts')]} />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>The Subway Map control allows you to visualize the steps required for a given wizard.</p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use Subway Map control with PanelWizard, FullPageWizard or TenantSetupWizard.</li>
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
