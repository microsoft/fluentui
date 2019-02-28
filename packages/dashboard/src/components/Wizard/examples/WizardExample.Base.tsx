import * as React from 'react';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';
import { IWizardStepProps } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';
import { getNextStep } from './SetupWizard.Util';
import { setSubwayState } from '../../SubwayNav/examples/SubwayNav.Util';
import { Label, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

export interface IWizardExampleBaseState {
  steps: IWizardStepProps[];
  currentStepId: string;
}
export class WizardExampleBase<T extends IWizardExampleBaseState> extends React.Component<{}, T> {
  protected steps: IWizardStepProps[] = [];

  protected getTestSteps = (withTitle: boolean): IWizardStepProps[] => {
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
        titleElement: withTitle ? testHeader : undefined,
        footerElement: testFooter,
        wizardContent: {
          content: this._getContentForStep('Step 0')
        }
      },
      {
        id: '1',
        label: 'Step 1',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: testFooter,
        titleElement: withTitle ? testHeader : undefined,
        subSteps: [
          {
            id: '1-0',
            label: 'Step 1, Sub step 0',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            titleElement: withTitle ? testHeader : undefined,
            wizardContent: {
              content: this._getContentForStep('Step 1, Sub step 0')
            }
          },
          {
            id: '1-1',
            label: 'Step 1, Sub step 1',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            titleElement: withTitle ? testHeader : undefined,
            wizardContent: {
              content: this._getContentForStep('Step 1, Sub step 1')
            }
          },
          {
            id: '1-2',
            label: 'Step 1, Sub step 2',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            titleElement: withTitle ? testHeader : undefined,
            wizardContent: {
              content: this._getContentForStep('Step 1, Sub step 2')
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
        titleElement: withTitle ? testHeader : undefined,
        wizardContent: {
          content: this._getContentForStep('Step 2')
        }
      },
      {
        id: '3',
        label: 'Step 3',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: testFooter,
        titleElement: withTitle ? testHeader : undefined,
        wizardContent: {
          content: this._getContentForStep('Step 3')
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
          content: this._getContentForStep('Step 0')
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
          content: this._getContentForStep('Step 1')
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
          content: this._getContentForStep('Step 2')
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
          content: this._getContentForStep('Step 3')
        }
      }
    ];
  };

  protected getWizCompleteStep = (titleStr: string): IWizardStepProps => {
    const testHeader = <Label>Wizard Complete</Label>;
    const testFooter = (
      <>
        <PrimaryButton>Go back to Admin center</PrimaryButton>
      </>
    );

    return {
      id: 'Complete wizard',
      label: 'Complete wizard',
      state: SubwayNavNodeState.WizardComplete,
      wizardContent: {
        content: (
          <div>
            Congratulations.... <b>{titleStr}</b> is successfully complete
          </div>
        )
      },
      footerElement: testFooter,
      titleElement: testHeader
    };
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

    console.log('Clicked step : ' + step.label);
  };

  private _getContentForStep = (stepStr: string): JSX.Element => {
    return <div>This is the content for step - {stepStr}</div>;
  };
}
