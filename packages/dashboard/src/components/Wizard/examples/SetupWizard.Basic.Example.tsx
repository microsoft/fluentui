import * as React from 'react';
import { SetupWizard } from '../SetupWizard';
import { ISubwayNavStep, SubwayNavStepState } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav.types';
import { IWizardStepProps, IWizardStepAction } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';
import { ISetupWizardState, goToStep } from './SetupWizard.Util';

export class SetupWizardBasicExample extends React.Component<{}, ISetupWizardState> {
  private steps: IWizardStepProps[] = [];

  constructor(props: {}) {
    super(props);

    this._handleClickStep = this._handleClickStep.bind(this);

    let newKey = this._generateRandomId();
    const data0: IWizardStepProps = {
      key: newKey,
      label: 'Step 0',
      onClickStep: this._handleClickStep,
      state: SubwayNavStepState.Current,
      wizardContent: {
        content: this._getContentForStep('Step 0'),
        // contentState: SubwayNavStepState.Current,
        mainAction: this._getMainActionForStep('Step 0')
      }
    };

    newKey = this._generateRandomId();
    const data1: IWizardStepProps = {
      key: newKey,
      label: 'Step 1',
      onClickStep: this._handleClickStep,
      state: SubwayNavStepState.NotStarted,
      wizardContent: {
        content: this._getContentForStep('Step 1'),
        // contentState: SubwayNavStepState.NotStarted,
        mainAction: this._getMainActionForStep('Step 1')
      }
    };

    newKey = this._generateRandomId();
    const data2: IWizardStepProps = {
      key: newKey,
      label: 'Step 2',
      onClickStep: this._handleClickStep,
      state: SubwayNavStepState.NotStarted,
      wizardContent: {
        content: this._getContentForStep('Step 2'),
        // contentState: SubwayNavStepState.NotStarted,
        mainAction: this._getMainActionForStep('Step 2')
      }
    };

    newKey = this._generateRandomId();
    const data3: IWizardStepProps = {
      key: newKey,
      label: 'Step 3',
      onClickStep: this._handleClickStep,
      state: SubwayNavStepState.NotStarted,
      wizardContent: {
        content: this._getContentForStep('Step 3'),
        // contentState: SubwayNavStepState.NotStarted,
        mainAction: this._getMainActionForStep('Step 3')
      }
    };

    this.steps.push(data0);
    this.steps.push(data1);
    this.steps.push(data2);
    this.steps.push(data3);
  }

  public componentDidMount(): void {
    let currSubStep: IWizardStepProps | undefined = undefined;
    const currStep = this.steps[0];
    if (currStep.subSteps && currStep.subSteps.length > 0) {
      currSubStep = currStep.subSteps[0];
    }

    this.setState({
      steps: this.steps,
      currStep: currStep,
      currSubStep: currSubStep
    });
  }

  public render(): JSX.Element {
    return (
      <div className="ms-WizardExample">
        <SetupWizard
          wizardTitle={{ title: 'Sample wizard with 4 steps' }}
          exitWizardAction={this._getExitWizardAction()}
          backClickAction={this._getBackClickAction()}
          steps={this.steps}
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
    if (this.state.currSubStep !== undefined) {
      this._goToNextSubStep();
      return;
    }

    const currIndex = this.state.steps.findIndex((stepObj: IWizardStepProps) => {
      return stepObj.key === this.state.currStep.key;
    });

    if (this.state.steps.length - 1 === currIndex) {
      // Last step reached.
      return;
    }

    let { currStep } = this.state;

    let foundNextStep: boolean = false;
    let foundCurrStep: boolean = false;

    let newSteps: IWizardStepProps[] = [];
    newSteps = this.state.steps;

    newSteps.map((stepObj: IWizardStepProps) => {
      if (!foundNextStep) {
        if (foundCurrStep) {
          currStep = stepObj;
          foundNextStep = true;
        } else if (stepObj.key === currStep.key) {
          foundCurrStep = true;
        }
      }
    });

    if (foundNextStep) {
      const newState = goToStep(this.state, currStep, undefined);
      if (newState !== undefined) {
        this.setState(newState);
      }
    }
  }

  private _goToNextSubStep(): void {
    let { currSubStep, currStep } = this.state;

    if (currSubStep === undefined) {
      return;
    }

    let foundNextStep: boolean = false;
    let foundCurrStep: boolean = false;

    let newSteps: IWizardStepProps[] = [];
    newSteps = this.state.steps;

    const currIndex = newSteps.findIndex((stepObj: IWizardStepProps) => {
      return stepObj.key === this.state.currStep.key;
    });

    if (newSteps[currIndex].subSteps !== undefined) {
      newSteps[currIndex].subSteps!.map((subStepObj: IWizardStepProps) => {
        if (!foundNextStep) {
          if (foundCurrStep) {
            currSubStep = subStepObj;
            foundNextStep = true;
          } else if (subStepObj.key === currSubStep!.key) {
            foundCurrStep = true;
          }
        }
      });

      if (foundCurrStep && !foundNextStep) {
        // last substep reached.  So go to next main step
        if (newSteps.length - 1 === currIndex) {
          // Last step reached, cannot go next
          return;
        }

        foundNextStep = true;
        currStep = newSteps[currIndex + 1];

        if (newSteps[currIndex + 1]!.subSteps !== undefined && newSteps[currIndex + 1]!.subSteps!.length > 0) {
          currSubStep = newSteps[currIndex + 1]!.subSteps![0];
        }
      }
    }

    if (foundNextStep) {
      const newState = goToStep(this.state, currStep, currSubStep);
      if (newState !== undefined) {
        this.setState(newState);
      }
    }
  }

  /**
   * generate Random id
   */
  private _generateRandomId(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2) + new Date().getTime().toString(36)
    );
  }

  private _handleClickStep(step: ISubwayNavStep, subStep: ISubwayNavStep | undefined): void {
    let alertStr = 'Clicked ' + step.label;
    if (subStep !== undefined) {
      alertStr += ' and ' + subStep.label;
    }

    const newState = goToStep(this.state, step, subStep);
    if (newState !== undefined) {
      this.setState(newState);
    }

    console.log(alertStr);
  }

  private _getContentForStep(stepStr: string): JSX.Element {
    return <div>This is the content for step - {stepStr}</div>;
  }
}
