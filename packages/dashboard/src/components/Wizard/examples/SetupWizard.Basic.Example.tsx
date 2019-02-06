import * as React from 'react';
import { SetupWizard } from '../SetupWizard';
import { ISubwayNavStep, SubwayNavStepState } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav.types';
import { IWizardStepProps, IWizardStepAction, WizardStepActionResult } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';
import { IAction } from '../../Card/ActionBar/ActionBar.types';

export class SetupWizardBasicExample extends React.Component<{}, {}> {
  private steps: IWizardStepProps[] = [];

  public render(): JSX.Element {
    return (
      <div className="ms-WizardExample">
        <SetupWizard
          wizardTitle={{ title: 'Sample wizard with 4 steps' }}
          exitWizardAction={this._getExitWizardAction()}
          backClickAction={this._getBackClickAction()}
          wizardSteps={this._getStepsForWizard()}
        />
      </div>
    );
  }

  // Get steps for wizard
  private _getStepsForWizard(): IWizardStepProps[] {
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

    return this.steps;
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

    console.log(alertStr);
  }

  private _getContentForStep(stepStr: string): JSX.Element {
    return <div>This is the content for step - {stepStr}</div>;
  }
}
