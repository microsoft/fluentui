import * as React from 'react';
import { ISetupWizardProps, ISetupWizardStyles } from './SetupWizard.types';
import { getSetupWizardStyles } from './SetupWizard.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { SetupWizardActionBar } from './SetupWizardActionBar';
import { Wizard } from './Wizard';
import { getStepContentToShow } from './Wizard.utils';

const getClassNames = classNamesFunction<ISetupWizardProps, ISetupWizardStyles>();

/** Component for Setup Wizard */
export class SetupWizard extends React.Component<ISetupWizardProps, {}> {
  constructor(props: ISetupWizardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const classNames = getClassNames(getSetupWizardStyles!);

    const stepContentToShow = getStepContentToShow(this.props);

    return (
      <div className={classNames.wizardContainer}>
        {this._getWizardTitleSection()}
        <Wizard steps={this.props.steps} stepToShow={stepContentToShow} />
        <SetupWizardActionBar
          mainAction={stepContentToShow.wizardContent!.mainAction}
          backClickAction={this.props.backClickAction}
          exitWizardAction={this.props.exitWizardAction}
          currentStep={stepContentToShow}
        />
      </div>
    );
  }

  // Get wizard title section
  private _getWizardTitleSection(): React.ReactNode {
    const classNames = getClassNames(getSetupWizardStyles!);
    return this.props.wizardTitle && <div className={classNames.titleSection}>{this.props.wizardTitle.title}</div>;
  }
}
