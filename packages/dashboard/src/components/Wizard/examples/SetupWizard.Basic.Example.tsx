import * as React from 'react';
import { SetupWizard } from '../SetupWizard';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';
import { IWizardStepProps, IWizardStepAction } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';
import { ISetupWizardState, generateRandomId, getNextStep } from './SetupWizard.Util';
import { setSubwayState } from '../../SubwayNav/examples/SubwayNav.Util';

export class SetupWizardBasicExample extends React.Component<{}, ISetupWizardState> {
  private steps: IWizardStepProps[];

  constructor(props: {}) {
    super(props);

    this._handleClickStep = this._handleClickStep.bind(this);

    this.steps = [
      {
        id: generateRandomId(),
        label: 'Step 0',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.Current,
        wizardContent: {
          content: this._getContentForStep('Step 0'),
          mainAction: this._getMainActionForStep('Step 0')
        }
      },
      {
        id: generateRandomId(),
        label: 'Step 1',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        wizardContent: {
          content: this._getContentForStep('Step 1'),
          mainAction: this._getMainActionForStep('Step 1')
        }
      },
      {
        id: generateRandomId(),
        label: 'Step 2',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        wizardContent: {
          content: this._getContentForStep('Step 2'),
          mainAction: this._getMainActionForStep('Step 2')
        }
      },
      {
        id: generateRandomId(),
        label: 'Step 3',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        wizardContent: {
          content: this._getContentForStep('Step 3'),
          mainAction: this._getMainActionForStep('Step 3')
        }
      }
    ];
    this.state = {
      steps: this.steps,
      currentStepId: this.steps[0].id
    };
  }

  public render(): JSX.Element {
    return (
      <div className="ms-WizardExample">
        <SetupWizard
          wizardTitle={{ title: 'Sample wizard with 4 steps' }}
          exitWizardAction={this._getExitWizardAction()}
          backClickAction={this._getBackClickAction()}
          steps={this.state.steps}
        />
      </div>
    );
  }

  private _getMainActionForStep(stepStr: string): IWizardStepAction {
    const action: IWizardStepAction = {
      title: stepStr + ' Next',
      action: (currentStep: IWizardStepProps): void => {
        console.log(stepStr + ' Next clicked - currentStep: ' + currentStep.label);
        this._goToNextStep();
        // return WizardContentState.Completed;
        return;
      }
    };

    return action;
  }

  private _getExitWizardAction(): IWizardStepAction {
    const action: IWizardStepAction = {
      title: 'Exit Wizard',
      action: (currentStep: IWizardStepProps): void => {
        console.log('Exit Wizard clicked - currentStep: ' + currentStep.label);
      }
    };

    return action;
  }

  private _getBackClickAction(): IWizardStepAction {
    const action: IWizardStepAction = {
      title: 'Go Back',
      action: (currentStep: IWizardStepProps): void => {
        console.log('Go Back clicked - currentStep: ' + currentStep.label);
      }
    };

    return action;
  }

  private _goToNextStep(): void {
    const { nextStep, parentId } = getNextStep(this.state.steps, this.state.currentStepId);

    // if we are at the end nextStep is undefined and no action is taken
    if (nextStep) {
      const { steps, currentStepId } = setSubwayState({ ...nextStep, parentId: parentId }, this.state.steps, this.state.currentStepId);
      this.setState({ steps: steps as IWizardStepProps[], currentStepId });
    }
  }

  private _handleClickStep(step: ISubwayNavNodeProps): void {
    const { steps, currentStepId } = setSubwayState(step, this.state.steps, this.state.currentStepId);
    this.setState({ steps: steps as IWizardStepProps[], currentStepId });
  }

  private _getContentForStep(stepStr: string): JSX.Element {
    return <div>This is the content for step - {stepStr}</div>;
  }
}
