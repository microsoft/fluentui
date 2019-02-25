import * as React from 'react';
import { ISetupWizardProps, ISetupWizardStyles, ISetupWizardStyleProps } from './SetupWizard.types';
import { getSetupWizardStyles } from './SetupWizard.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Wizard } from './Wizard';
import { getStepContentToShow, getCurrentStep } from './Wizard.utils';

const getClassNames = classNamesFunction<ISetupWizardStyleProps, ISetupWizardStyles>();

/** Component for Setup Wizard */
export class SetupWizardBase extends React.Component<ISetupWizardProps, {}> {
  constructor(props: ISetupWizardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const classNames = getClassNames(getSetupWizardStyles!);
    const stepContentToShow = getStepContentToShow(this.props.wizardProps);

    return (
      <div className={classNames.wizardContainer}>
        {this._onRenderTitleSection()}
        <Wizard {...this.props.wizardProps} contentToShow={stepContentToShow} />
        {this._onRenderActionBar()}
      </div>
    );
  }

  // Get wizard title section
  private _onRenderTitleSection = (): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const step = getCurrentStep(this.props.wizardProps.steps);

    return <div className={classNames.titleSection}>{step.titleElement}</div>;
  };

  // Get wizard action bar
  private _onRenderActionBar = (): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const step = getCurrentStep(this.props.wizardProps.steps);

    return <div className={classNames.actionBarSection}>{step.footerElement}</div>;
  };
}
