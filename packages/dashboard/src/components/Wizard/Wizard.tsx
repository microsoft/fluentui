import * as React from 'react';
import { IWizardStepProps, IWizardProps, IWizardStyles } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getWizardStyles } from './Wizard.styles';
import { SubwayNavStepState } from '../SubwayNav/SubwayNav.types';

/** Component for Wizard */
export class Wizard extends React.Component<IWizardProps, {}> {
  constructor(props: IWizardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { steps } = this.props;

    const navSteps = steps.map((step: IWizardStepProps) => {
      const navStep = {
        key: step.key,
        label: step.label,
        state: step.state,
        disabled: step.disabled,
        onClickStep: step.onClickStep,
        wizardContent: step.wizardContent,
        subSteps: step.subSteps
      };
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
            <SubwayNav steps={navSteps} />
          </div>
          <div className={classNames.contentSection}>
            <div>{wizardStepProps.wizardContent.contentTitle}</div>
            <div className={classNames.content}>{wizardStepProps.wizardContent.content}</div>
          </div>
        </div>
      );
    } else {
      // Empty element
      return <React.Fragment />;
    }
  }

  // Get content to show
  private _getStepContentToShow(): IWizardStepProps | undefined {
    const { steps } = this.props;

    let stepToShow: IWizardStepProps | undefined = steps.find((wizStep: IWizardStepProps) => {
      return wizStep.state === SubwayNavStepState.Current;
    });

    if (stepToShow !== undefined && stepToShow.subSteps !== undefined && stepToShow.subSteps.length > 0) {
      stepToShow = stepToShow.subSteps.find((wizSubStep: IWizardStepProps) => {
        return wizSubStep.state === SubwayNavStepState.Current;
      });
    }

    return stepToShow;
  }
}
