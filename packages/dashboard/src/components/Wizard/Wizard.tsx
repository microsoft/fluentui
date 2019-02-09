import * as React from 'react';
import { IWizardStepProps, IWizardProps, IWizardStyles } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getWizardStyles } from './Wizard.styles';
import { SubwayNavStepState, ISubwayNavStep } from '../SubwayNav/SubwayNav.types';

/** Component for Wizard */
export class Wizard extends React.Component<IWizardProps, {}> {
  constructor(props: IWizardProps) {
    super(props);
  }

  public render(): JSX.Element | null {
    const { steps } = this.props;

    const navSteps = steps.map((step: IWizardStepProps, index: number) => {
      const navStep: ISubwayNavStep = {
        key: step.key,
        label: step.label,
        state: step.state,
        disabled: step.disabled,
        onClickStep: step.onClickStep,
        isSubStep: step.isSubStep,
        subSteps: step.subSteps
      };

      if (index > 0 && this.props.allowSkipAhead === false && navStep.state === SubwayNavStepState.NotStarted) {
        // If allowSkipAhead is not allowed, then disable all steps that are "NotStarted"
        // Except for first step, it cannot be disabled.
        navStep.disabled = true;
      }
      return navStep;
    });

    const getClassNames = classNamesFunction<IWizardProps, IWizardStyles>();
    const classNames = getClassNames(getWizardStyles!);

    const stepContentToShow = this._getStepContentToShow();

    if (stepContentToShow !== undefined) {
      const wizardStepProps: IWizardStepProps = {
        key: stepContentToShow.key,
        label: stepContentToShow.label,
        state: stepContentToShow.state,
        disabled: stepContentToShow.disabled,
        onClickStep: () => {
          stepContentToShow!.onClickStep;
        },
        wizardContent: stepContentToShow.wizardContent,
        subSteps: stepContentToShow.subSteps
      };

      return (
        <div className={classNames.wizardContentNavContainer}>
          <div className={classNames.subwayNavSection}>
            <SubwayNav steps={navSteps} wizardComplete={this.props.wizardComplete} />
          </div>
          <div className={classNames.contentSection}>
            <div>{wizardStepProps.wizardContent.contentTitle}</div>
            <div className={classNames.content}>{wizardStepProps.wizardContent.content}</div>
          </div>
        </div>
      );
    }

    return null;
  }

  // Get content to show
  private _getStepContentToShow(): IWizardStepProps | undefined {
    const { steps } = this.props;

    if (steps.length > 0) {
      let stepToShow: IWizardStepProps | undefined = steps.find((wizStep: IWizardStepProps) => {
        return wizStep.state === SubwayNavStepState.Current;
      });

      if (stepToShow === undefined) {
        // If no steps is set as "Current", just return the first step
        stepToShow = steps[0];
      }

      if (stepToShow.subSteps !== undefined && stepToShow.subSteps.length > 0) {
        const subStepToShow = stepToShow.subSteps.find((wizSubStep: IWizardStepProps) => {
          return wizSubStep.state === SubwayNavStepState.Current;
        });

        if (subStepToShow !== undefined) {
          stepToShow = subStepToShow;
        } else {
          stepToShow = stepToShow.subSteps[0];
        }
      }

      return stepToShow;
    }

    return;
  }
}
