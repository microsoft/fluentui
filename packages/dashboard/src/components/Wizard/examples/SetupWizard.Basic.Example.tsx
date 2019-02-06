import * as React from 'react';
import { SetupWizard } from '../SetupWizard';
import { ISubwayNavStep, SubwayNavStepState } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav.types';
import { IWizardStepProps, IWizardStepAction, WizardStepActionResult } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';
import { IAction } from '../../Card/ActionBar/ActionBar.types';

export interface ISetupWizardExampleState {
  currStep: IWizardStepProps;
  currSubStep: IWizardStepProps | undefined;
  steps: IWizardStepProps[];
}

export class SetupWizardBasicExample extends React.Component<{}, ISetupWizardExampleState> {
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
        processContentAction: this._getMainActionForStep('Step 0')
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
        processContentAction: this._getMainActionForStep('Step 1')
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
        processContentAction: this._getMainActionForStep('Step 2')
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
        processContentAction: this._getMainActionForStep('Step 3')
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
          wizardSteps={this.steps}
        />
      </div>
    );
  }

  private _getMainActionForStep(stepStr: string): IWizardStepAction {
    const action: IWizardStepAction = {
      title: stepStr + ' Next',
      action: (): WizardStepActionResult => {
        console.log(stepStr + ' Next clicked');
        return WizardStepActionResult.Completed;
      }
    };

    return action;
  }

  private _getExitWizardAction(): IAction {
    const action: IAction = {
      title: 'Exit Wizard',
      action: (): void => {
        console.log('Exit Wizard clicked');
      }
    };

    return action;
  }

  private _getBackClickAction(): IAction {
    const action: IAction = {
      title: 'Go Back',
      action: (): void => {
        console.log('Go Back clicked');
      }
    };

    return action;
  }

  private _goToStep(parentStepToGo: ISubwayNavStep | undefined, subStepToGo: ISubwayNavStep | undefined): void {
    if (parentStepToGo === undefined) {
      // do nothing
      return;
    }

    if (parentStepToGo.key === this.state.currStep.key) {
      // Already in current step, go to Sub Step
      if (subStepToGo !== undefined) {
        this._goToSubStep(parentStepToGo, subStepToGo);
      }
    } else {
      let newSteps: IWizardStepProps[] = [];
      newSteps = this.state.steps;

      let currStep = this.state.currStep;
      let currSubStep = this.state.currSubStep;

      let foundStepToGo: boolean = false;

      newSteps.map((stepObj: IWizardStepProps) => {
        if (stepObj.key === this.state.currStep.key) {
          stepObj.state = SubwayNavStepState.Completed; /// Only for testing (get state from wizard content state?)
        } else if (stepObj.key === parentStepToGo.key) {
          stepObj.state = SubwayNavStepState.Current;
          currStep = stepObj;

          if (stepObj.subSteps !== undefined && stepObj.subSteps.length > 0) {
            stepObj.subSteps[0].state = SubwayNavStepState.Current;
            currSubStep = stepObj.subSteps[0];
          }
          foundStepToGo = true;
        } else if (!foundStepToGo && stepObj.state === SubwayNavStepState.NotStarted) {
          stepObj.state = SubwayNavStepState.Skipped;
        }
      });

      if (foundStepToGo) {
        this.setState({ steps: newSteps, currStep: currStep, currSubStep: currSubStep });
      }
    }
  }

  private _goToSubStep(parentStepToGo: ISubwayNavStep, subStepToGo: ISubwayNavStep): void {
    if (
      this.state.currStep.key === parentStepToGo.key &&
      this.state.currSubStep !== undefined &&
      this.state.currSubStep.key === subStepToGo.key
    ) {
      // Already in the step
      return;
    }

    let newSteps: IWizardStepProps[];
    let foundClickedSubStep: boolean = false;
    let currSubStep: IWizardStepProps | undefined = this.state.currSubStep;
    let currStep: IWizardStepProps = this.state.currStep;

    newSteps = this.state.steps;
    newSteps.map((stepObj: IWizardStepProps) => {
      if (stepObj.key === parentStepToGo.key) {
        // Found the parent step
        if (stepObj.subSteps !== undefined && stepObj.subSteps.length > 0) {
          stepObj.subSteps.map((subStepObj: IWizardStepProps) => {
            if (subStepObj.key === this.state!.currSubStep!.key) {
              subStepObj.state = SubwayNavStepState.Completed; //// Only for testing (Update from wizard content state?)
            } else if (subStepObj.key === subStepToGo.key) {
              stepObj.state = SubwayNavStepState.Current;
              subStepObj.state = SubwayNavStepState.Current;

              // Update curr substep
              currStep = stepObj;
              currSubStep = subStepObj;
              foundClickedSubStep = true;
            } else if (!foundClickedSubStep && subStepObj.state === SubwayNavStepState.NotStarted) {
              subStepObj.state = SubwayNavStepState.Skipped;
            }
          });
        }
      }
    });

    if (foundClickedSubStep) {
      this.setState({ steps: newSteps, currStep: currStep, currSubStep: currSubStep });
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

    this._goToStep(step, subStep);

    console.log(alertStr);
  }

  private _getContentForStep(stepStr: string): JSX.Element {
    return <div>This is the content for step - {stepStr}</div>;
  }
}
