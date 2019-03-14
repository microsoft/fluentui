import * as React from 'react';
import { SetupWizard } from '../SetupWizard';
import { ISetupWizardState } from './SetupWizard.Util';
import { IWizardExampleBaseState, WizardExampleBase } from './WizardExample.Base';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISetupWizardState extends IWizardExampleBaseState {}

const getClassName = classNamesFunction<{}, { containerHeight: IStyle }>();

export class SetupWizardSubStepsExample extends WizardExampleBase<ISetupWizardState> {
  constructor(props: {}) {
    super(props);
    const steps = this.getTestSteps(false);
    this.state = {
      steps: steps,
      currentStepId: steps[0].id
    };
  }

  public render(): React.ReactNode {
    const containerHeight = { height: '80vh' };
    const classNames = getClassName({ containerHeight });

    return (
      <div className={classNames.containerHeight}>
        <SetupWizard
          wizardProps={{
            steps: this.state.steps
          }}
        />
      </div>
    );
  }
}
