import * as React from 'react';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';
import { IWizardStepProps, IWizardStepAction, IWizardContentProps } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';
import { getNextStep } from './SetupWizard.Util';
import { setSubwayState } from '../../SubwayNav/examples/SubwayNav.Util';
import { Label, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

export interface IWizardExampleBaseState {
  steps: IWizardStepProps[];
  currentStepId: string;
}
export class WizardExampleBase<T extends IWizardExampleBaseState> extends React.Component<{}, T> {
  protected steps: IWizardStepProps[] = [];

  protected getTestSteps = (): IWizardStepProps[] => {
    const testHeader = <Label>Wizard Title</Label>;
    const testFooter = (
      <>
        <DefaultButton>Back</DefaultButton>
        <PrimaryButton onClick={this._goToNextStep}>Next</PrimaryButton>
        <DefaultButton>Exit Wizard</DefaultButton>
      </>
    );

    return [
      {
        id: '0',
        label: 'Step 0',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.Current,
        titleElement: testHeader,
        footerElement: testFooter,
        wizardContent: {
          content: this._getContentForStep('Step 0'),
          mainAction: this._getMainActionForStep('Step 0'),
          exitWizardAction: this._getExitWizardAction(),
          backClickAction: this._getBackClickAction()
        }
      },
      {
        id: '1',
        label: 'Step 1',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: testFooter,
        titleElement: testHeader,
        subSteps: [
          {
            id: '1-0',
            label: 'Step 1, Sub step 0',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            titleElement: testHeader,
            wizardContent: {
              content: this._getContentForStep('Step 1, Sub step 0'),
              mainAction: this._getMainActionForStep('Step 1, Sub step 0'),
              exitWizardAction: this._getExitWizardAction(),
              backClickAction: this._getBackClickAction()
            }
          },
          {
            id: '1-1',
            label: 'Step 1, Sub step 1',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            titleElement: testHeader,
            wizardContent: {
              content: this._getContentForStep('Step 1, Sub step 1'),
              mainAction: this._getMainActionForStep('Step 1, Sub step 1'),
              exitWizardAction: this._getExitWizardAction(),
              backClickAction: this._getBackClickAction()
            }
          },
          {
            id: '1-2',
            label: 'Step 1, Sub step 2',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            titleElement: testHeader,
            wizardContent: {
              content: this._getContentForStep('Step 1, Sub step 2'),
              mainAction: this._getMainActionForStep('Step 1, Sub step 2'),
              exitWizardAction: this._getExitWizardAction(),
              backClickAction: this._getBackClickAction()
            }
          }
        ]
      },
      {
        id: '2',
        label: 'Step 2',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: testFooter,
        titleElement: testHeader,
        wizardContent: {
          content: this._getContentForStep('Step 2'),
          mainAction: this._getMainActionForStep('Step 2'),
          exitWizardAction: this._getExitWizardAction(),
          backClickAction: this._getBackClickAction()
        }
      },
      {
        id: '3',
        label: 'Step 3',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: testFooter,
        titleElement: testHeader,
        wizardContent: {
          content: this._getContentForStep('Step 3'),
          mainAction: this._getMainActionForStep('Step 3'),
          exitWizardAction: this._getExitWizardAction(),
          backClickAction: this._getBackClickAction()
        }
      }
    ];
  };

  protected getWizCompleteTestSteps = (): IWizardStepProps[] => {
    const testHeader = <Label>Wizard Complete Test</Label>;
    const testFooter = (
      <>
        <DefaultButton>Back</DefaultButton>
        <PrimaryButton onClick={this._goToNextStep}>Next</PrimaryButton>
        <DefaultButton>Exit Wizard</DefaultButton>
      </>
    );

    return [
      {
        id: '0',
        label: 'Step 0',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.WizardComplete,
        titleElement: testHeader,
        footerElement: testFooter,
        wizardContent: {
          content: this._getContentForStep('Step 0'),
          mainAction: this._getMainActionForStep('Step 0'),
          exitWizardAction: this._getExitWizardAction(),
          backClickAction: this._getBackClickAction()
        }
      },
      {
        id: '1',
        label: 'Step 1',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.WizardComplete,
        footerElement: testFooter,
        titleElement: testHeader,
        wizardContent: {
          content: this._getContentForStep('Step 1'),
          mainAction: this._getMainActionForStep('Step 1'),
          exitWizardAction: this._getExitWizardAction(),
          backClickAction: this._getBackClickAction()
        }
      },
      {
        id: '2',
        label: 'Step 2',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.WizardComplete,
        footerElement: testFooter,
        titleElement: testHeader,
        wizardContent: {
          content: this._getContentForStep('Step 2'),
          mainAction: this._getMainActionForStep('Step 2'),
          exitWizardAction: this._getExitWizardAction(),
          backClickAction: this._getBackClickAction()
        }
      },
      {
        id: '3',
        label: 'Step 3',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.WizardComplete,
        footerElement: testFooter,
        titleElement: testHeader,
        wizardContent: {
          content: this._getContentForStep('Step 3'),
          mainAction: this._getMainActionForStep('Step 3'),
          exitWizardAction: this._getExitWizardAction(),
          backClickAction: this._getBackClickAction()
        }
      }
    ];
  };

  protected getWizCompleteContent = (titleStr: string): IWizardContentProps => {
    return {
      content: (
        <div>
          Congratulations.... <b>{titleStr}</b> is successfully complete
        </div>
      ),
      mainAction: this._getMainActionForStep('Wizard complete'),
      exitWizardAction: this._getExitWizardAction()
    };
  };

  private _getExitWizardAction = (): IWizardStepAction => {
    const action: IWizardStepAction = {
      title: 'Exit Wizard',
      action: (currentStep: IWizardStepProps): void => {
        console.log('Exit Wizard clicked - currentStep: ' + currentStep.label);
      }
    };

    return action;
  };

  private _getBackClickAction = (): IWizardStepAction => {
    const action: IWizardStepAction = {
      title: 'Go Back',
      action: (currentStep: IWizardStepProps): void => {
        console.log('Go Back clicked - currentStep: ' + currentStep.label);
      }
    };

    return action;
  };
  private _getMainActionForStep = (stepStr: string): IWizardStepAction => {
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
  };

  private _goToNextStep = (): void => {
    const { nextStep, parentId } = getNextStep(this.state.steps, this.state.currentStepId);

    // if we are at the end nextStep is undefined and no action is taken
    if (nextStep) {
      const { steps, currentStepId } = setSubwayState({ ...nextStep, parentId: parentId }, this.state.steps, this.state.currentStepId);
      this.setState({ steps: steps as IWizardStepProps[], currentStepId });

      console.log('Now at step : ' + nextStep.label);
    }
  };

  private _handleClickStep = (step: ISubwayNavNodeProps): void => {
    const { steps, currentStepId } = setSubwayState(step, this.state.steps, this.state.currentStepId);
    this.setState({ steps: steps as IWizardStepProps[], currentStepId });
  };

  private _getContentForStep = (stepStr: string): JSX.Element => {
    return <div>This is the content for step - {stepStr}</div>;
  };
}
