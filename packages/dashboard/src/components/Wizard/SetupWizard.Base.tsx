import * as React from 'react';
import { ISetupWizardProps, ISetupWizardStyles, ISetupWizardStyleProps } from './SetupWizard.types';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Wizard } from './Wizard';
import { getStepToShow } from './Wizard.utils';
import { IWizardStepProps } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';

const getClassNames = classNamesFunction<ISetupWizardStyleProps, ISetupWizardStyles>();

/** Component for Setup Wizard */
export class SetupWizardBase extends React.Component<ISetupWizardProps, {}> {
  constructor(props: ISetupWizardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const stepToShow = getStepToShow(this.props.wizardProps);

    return (
      <div className={classNames.wizardContainer}>
        {this._onRenderTitleSection(stepToShow)}
        <Wizard {...this.props.wizardProps} stepToShow={stepToShow} />
        {this._onRenderActionBar(stepToShow)}
      </div>
    );
  }

  // Get wizard title section
  private _onRenderTitleSection = (step: IWizardStepProps): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    if (step.titleElement) {
      return <div className={classNames.titleSection}>{step.titleElement}</div>;
    }
  };

  // Get wizard action bar
  private _onRenderActionBar = (step: IWizardStepProps): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    return <div className={classNames.actionBarSection}>{step.footerElement}</div>;
  };
}
