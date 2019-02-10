import * as React from 'react';
import { SubwayNavStepState } from '../SubwayNav/SubwayNav.types';
import { ISetupWizardProps, ISetupWizardStyles } from './SetupWizard.types';
import { getSetupWizardStyles } from './SetupWizard.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IWizardStepProps } from './Wizard.types';
import { SetupWizardActionBar } from './SetupWizardActionBar';
import { Wizard } from './Wizard';

/** Component for Setup Wizard */
export class SetupWizard extends React.Component<ISetupWizardProps, {}> {
  constructor(props: ISetupWizardProps) {
    super(props);
  }

  public render(): JSX.Element {
    if (this.props.steps.length === 0) {
      throw new Error('Wizard must have atleast one step.');
    }

    const getClassNames = classNamesFunction<ISetupWizardProps, ISetupWizardStyles>();
    const classNames = getClassNames(getSetupWizardStyles!);

    const stepContentToShow = this._getStepContentToShow();

    if (stepContentToShow.wizardContent === undefined) {
      throw new Error('Content missing in the step - ' + stepContentToShow.label);
    }

    const titleSection = this._getWizardTitleSection();

    return (
      <div className={classNames.wizardContainer}>
        {titleSection}
        <Wizard steps={this.props.steps} />
        <SetupWizardActionBar
          mainAction={stepContentToShow!.wizardContent!.mainAction}
          backClickAction={this.props.backClickAction}
          exitWizardAction={this.props.exitWizardAction}
        />
      </div>
    );
  }

  // Get content to show
  private _getStepContentToShow(): IWizardStepProps {
    const { steps } = this.props;

    let stepToShow: IWizardStepProps | undefined = steps.find((wizStep: IWizardStepProps) => {
      return wizStep.state === SubwayNavStepState.Current;
    });

    if (stepToShow === undefined) {
      // If no steps is set as "Current", just return the first step
      stepToShow = steps[0];
    }

    if (stepToShow !== undefined && stepToShow.subSteps !== undefined && stepToShow.subSteps.length > 0) {
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

  // Get wizard title section
  private _getWizardTitleSection(): React.ReactNode {
    const getClassNames = classNamesFunction<ISetupWizardProps, ISetupWizardStyles>();
    const classNames = getClassNames(getSetupWizardStyles!);

    if (this.props.wizardTitle !== undefined && this.props.wizardTitle.title !== undefined) {
      return (
        <div className={classNames.titleSection}>
          <div className={classNames.title}>{this.props.wizardTitle.title}</div>
        </div>
      );
    }
  }
}
