import * as React from 'react';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';
import { IWizardStepProps } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';
import { getNextStep, getPrevStep } from '../Wizard.utils';
import { setSubwayState } from '../Wizard.utils';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface IWizardExampleBaseState {
  steps: IWizardStepProps[];
  currentStepId: string;
}
export class WizardExampleBase<T extends IWizardExampleBaseState> extends React.Component<{}, T> {
  protected steps: IWizardStepProps[] = [];

  protected getTestSteps = (): IWizardStepProps[] => {
    const testFooter = (
      <>
        <DefaultButton onClick={this._goToPrevStep}>Back</DefaultButton>
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
        footerElement: testFooter,
        wizardContent: {
          contentTitleElement: this._getContentTitleElement('Step 0'),
          content: this._getContentForStep1('Step 0')
        }
      },
      {
        id: '1',
        label: 'Step 1',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: testFooter,
        subSteps: [
          {
            id: '1-0',
            label: 'Step 1, Sub step 0',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            wizardContent: {
              contentTitleElement: this._getContentTitleElement('Step 1, Sub step 0'),
              content: this._getContentForStep2('Step 1, Sub step 0')
            }
          },
          {
            id: '1-1',
            label: 'Step 1, Sub step 1',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            wizardContent: {
              contentTitleElement: this._getContentTitleElement('Step 1, Sub step 1'),
              content: this._getContentForStep1('Step 1, Sub step 1')
            }
          },
          {
            id: '1-2',
            label: 'Step 1, Sub step 2',
            onClickStep: this._handleClickStep,
            state: SubwayNavNodeState.NotStarted,
            footerElement: testFooter,
            wizardContent: {
              contentTitleElement: this._getContentTitleElement('Step 1, Sub step 2'),
              content: this._getContentForStep2('Step 1, Sub step 2')
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
        wizardContent: {
          contentTitleElement: this._getContentTitleElement('Step 2'),
          content: this._getContentForStep1('Step 2')
        }
      },
      {
        id: '3',
        label: 'Step 3',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.NotStarted,
        footerElement: testFooter,
        wizardContent: {
          contentTitleElement: this._getContentTitleElement('Step 3'),
          content: this._getContentForStep2('Step 3')
        }
      }
    ];
  };

  protected getWizCompleteTestSteps = (): IWizardStepProps[] => {
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
        footerElement: testFooter,
        wizardContent: {
          content: this._getContentForStep1('Step 0')
        }
      },
      {
        id: '1',
        label: 'Step 1',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.WizardComplete,
        footerElement: testFooter,
        wizardContent: {
          content: this._getContentForStep2('Step 1')
        }
      },
      {
        id: '2',
        label: 'Step 2',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.WizardComplete,
        footerElement: testFooter,
        wizardContent: {
          content: this._getContentForStep1('Step 2')
        }
      },
      {
        id: '3',
        label: 'Step 3',
        onClickStep: this._handleClickStep,
        state: SubwayNavNodeState.WizardComplete,
        footerElement: testFooter,
        wizardContent: {
          content: this._getContentForStep2('Step 3')
        }
      }
    ];
  };

  protected getWizCompleteStep = (titleStr: string): IWizardStepProps => {
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
      footerElement: testFooter
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

  private _goToPrevStep = (): void => {
    const { prevStep, parentId } = getPrevStep(this.state.steps, this.state.currentStepId);

    // if we are at the end nextStep is undefined and no action is taken
    if (prevStep) {
      const { steps, currentStepId } = setSubwayState({ ...prevStep, parentId: parentId }, this.state.steps, this.state.currentStepId);
      this.setState({ steps: steps as IWizardStepProps[], currentStepId });

      console.log('Now at step : ' + prevStep.label);
    }
  };

  private _handleClickStep = (step: ISubwayNavNodeProps): void => {
    const { steps, currentStepId } = setSubwayState(step, this.state.steps, this.state.currentStepId);
    this.setState({ steps: steps as IWizardStepProps[], currentStepId });

    console.log('Clicked step : ' + step.label);
  };

  private _getContentTitleElement = (stepStr: string): JSX.Element => {
    return (
      <div>
        <h1>{stepStr}</h1>
      </div>
    );
  };

  private _getContentForStep1 = (stepStr: string): JSX.Element => {
    return (
      <div className="docs-TextFieldExample">
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <h2>Enter your details</h2>
        <TextField label="First name" placeholder={'First name in ' + stepStr} styles={this.getStyles} />
        <TextField label="Last name" placeholder={'Last name in ' + stepStr} styles={this.getStyles} />
        <TextField label="Address" placeholder={'Address in ' + stepStr} styles={this.getStyles} />
        <TextField label="Details" placeholder={'Details in ' + stepStr} styles={this.getStyles} />
      </div>
    );
  };

  private _getContentForStep2 = (stepStr: string): JSX.Element => {
    return (
      <div className="docs-TextFieldExample">
        <TextField label="Make of the car" placeholder={'Make of the car in ' + stepStr} styles={this.getStyles} />
        <TextField label="Model name" placeholder={'Model in ' + stepStr} styles={this.getStyles} />
        <TextField label="Year" placeholder={'Year in ' + stepStr} styles={this.getStyles} />
        <TextField label="Color" placeholder={'Color in ' + stepStr} styles={this.getStyles} />
        <TextField label="Details" multiline rows={4} placeholder={'Details in ' + stepStr} styles={this.getStyles} />
        <h2>Click next to proceed...</h2>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
    );
  };

  private getStyles = () => {
    return {
      root: {
        maxWidth: '400px'
      }
    };
  };
}
