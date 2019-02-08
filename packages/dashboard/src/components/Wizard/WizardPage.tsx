import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { SetupWizardBasicExample } from './examples/SetupWizard.Basic.Example';
import { SetupWizardSubStepsExample } from './examples/SetupWizard.SubSteps.Example';

const SetupWizardBasicExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Wizard/examples/SetupWizard.Basic.Example.tsx') as string;
const SetupWizardSubStepsExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Wizard/examples/SetupWizard.SubSteps.Example.tsx') as string;

export class WizardPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="SetupWizard"
        componentName="SetupWizard"
        exampleCards={
          <div>
            <ExampleCard title="Basic Setup Wizard" code={SetupWizardBasicExampleCode}>
              <SetupWizardBasicExample />
            </ExampleCard>
            <ExampleCard title="Setup Wizard with SubSteps" code={SetupWizardSubStepsExampleCode}>
              <SetupWizardSubStepsExample />
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
