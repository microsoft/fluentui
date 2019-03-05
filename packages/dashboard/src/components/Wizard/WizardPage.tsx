import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { SetupWizardSubStepsExample } from './examples/SetupWizard.SubSteps.Example';
import { SetupWizardCompleteExample } from './examples/SetupWizard.WizardComplete.Example';
import { PanelWizardExample } from './examples/PanelWizard.Example';
import { FullParentWizardExample } from './examples/FullParentWizard.Example';

const SetupWizardSubStepsExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Wizard/examples/SetupWizard.SubSteps.Example.tsx') as string;
const SetupWizardCompleteExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Wizard/examples/SetupWizard.WizardComplete.Example.tsx') as string;
const PanelWizardExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Wizard/examples/PanelWizard.Example.tsx') as string;
const FullParentWizardExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Wizard/examples/FullParentWizard.Example.tsx') as string;

export class WizardPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Wizard"
        componentName="Wizard"
        exampleCards={
          <div>
            <ExampleCard title="Panel wizard" code={PanelWizardExampleCode}>
              <PanelWizardExample />
            </ExampleCard>
            <ExampleCard title="Setup Wizard with SubSteps" code={SetupWizardSubStepsExampleCode}>
              <SetupWizardSubStepsExample />
            </ExampleCard>
            <ExampleCard title="Setup Wizard Complete" code={SetupWizardCompleteExampleCode}>
              <SetupWizardCompleteExample />
            </ExampleCard>
            <ExampleCard title="Full parent wizard" code={FullParentWizardExampleCode}>
              <FullParentWizardExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/Wizard/Wizard.types.ts')]} />
        }
        overview={
          <div>
            <p>Setup Wizard control that allows user to complete predefined steps to achieve a setup/creation task.</p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use Wizard component to also build Panel Wizard and Full page wizard.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul />
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
