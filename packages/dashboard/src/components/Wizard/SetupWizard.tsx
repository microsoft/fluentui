import * as React from 'react';
import { SubwayNavStepState } from '../SubwayNav/SubwayNav.types';
import { ISetupWizardProps, ISetupWizardStyles } from './SetupWizard.types';
import { getSetupWizardStyles } from './SetupWizard.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IWizardStepProps } from './Wizard.types';
import { WizardActionBar } from './WizardActionBar';
import { Wizard } from './Wizard';

/** Component for Setup Wizard */
export class SetupWizard extends React.Component<ISetupWizardProps, {}> {
  constructor(props: ISetupWizardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ISetupWizardProps, ISetupWizardStyles>();
    const classNames = getClassNames(getSetupWizardStyles!);

    const stepContentToShow = this._getStepContentToShow();
    const titleSection = this._getWizardTitleSection();

    return (
      <div className={classNames.wizardContainer}>
        {titleSection}
        <Wizard steps={this.props.wizardSteps} />
        <div className={classNames.actionBarSection}>
          <WizardActionBar
            processContentAction={stepContentToShow!.wizardContent!.processContentAction}
            backClickAction={this.props.backClickAction}
            exitWizardAction={this.props.exitWizardAction}
          />
        </div>
      </div>
    );
  }

  // Get content to show
  private _getStepContentToShow(): IWizardStepProps | undefined {
    const { wizardSteps } = this.props;

    let stepToShow: IWizardStepProps | undefined = wizardSteps.find((wizStep: IWizardStepProps) => {
      return wizStep.state === SubwayNavStepState.Current;
    });

    if (stepToShow !== undefined && stepToShow.subSteps !== undefined && stepToShow.subSteps.length > 0) {
      stepToShow = stepToShow.subSteps.find((wizSubStep: IWizardStepProps) => {
        return wizSubStep.state === SubwayNavStepState.Current;
      });
    }

    return stepToShow;
  }

  // Get wizard title section
  private _getWizardTitleSection(): JSX.Element {
    const getClassNames = classNamesFunction<ISetupWizardProps, ISetupWizardStyles>();
    const classNames = getClassNames(getSetupWizardStyles!);

    if (this.props.wizardTitle !== undefined && this.props.wizardTitle.title !== undefined) {
      return (
        <div className={classNames.titleSection}>
          <div className={classNames.title}>{this.props.wizardTitle.title}</div>
        </div>
      );
    }

    return <React.Fragment />;
  }
}
