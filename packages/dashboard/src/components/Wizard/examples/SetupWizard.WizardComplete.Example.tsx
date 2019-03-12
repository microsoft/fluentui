import * as React from 'react';
import { SetupWizard } from '../SetupWizard';
import { ISetupWizardState } from './SetupWizard.Util';
import { IWizardExampleBaseState, WizardExampleBase } from './WizardExample.Base';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISetupWizardState extends IWizardExampleBaseState {}

const getClassName = classNamesFunction<{}, { containerHeight: IStyle }>();

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
    const containerHeight = { height: '30vh' };
    const classNames = getClassName({ containerHeight });

    const wizardCompleteStep = this.getWizCompleteStep('Setup wizard example');

    return (
      <div className={classNames.containerHeight}>
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
