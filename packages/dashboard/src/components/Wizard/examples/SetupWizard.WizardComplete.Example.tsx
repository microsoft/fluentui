import * as React from 'react';
import { SetupWizard } from '../SetupWizard';
import { ISetupWizardState } from './SetupWizard.Util';
import { IWizardExampleBaseState, WizardExampleBase } from './WizardExample.Base';

export interface ISetupWizardState extends IWizardExampleBaseState {}

export class SetupWizardCompleteExample extends WizardExampleBase<ISetupWizardState> {
  constructor(props: {}) {
    super(props);
    const steps = this.getWizCompleteTestSteps();
    this.state = {
      steps: steps,
      currentStepId: steps[0].id
    };
  }

  public render(): React.ReactNode {
    const wizardCompleteStep = this.getWizCompleteStep('Setup wizard example');

    return (
      <div className="ms-WizardExample">
        <SetupWizard
          wizardProps={{
            steps: this.state.steps,
            wizardComplete: true,
            wizardCompleteStep: wizardCompleteStep
          }}
        />
      </div>
    );
  }
}
