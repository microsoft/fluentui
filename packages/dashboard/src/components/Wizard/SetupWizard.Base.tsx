import * as React from 'react';
import { ISetupWizardProps, ISetupWizardStyles, ISetupWizardStyleProps } from './SetupWizard.types';
import { classNamesFunction, IProcessedStyleSet } from 'office-ui-fabric-react';
import { Wizard } from './Wizard';
import { getStepToShow } from './Wizard.utils';
import { IWizardStepProps } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';

const getClassNames = classNamesFunction<ISetupWizardStyleProps, ISetupWizardStyles>();

/** Component for Setup Wizard */
export class SetupWizardBase extends React.Component<ISetupWizardProps, {}> {
  private _classNames: IProcessedStyleSet<ISetupWizardStyles>;

  constructor(props: ISetupWizardProps) {
    super(props);
  }

  public render(): JSX.Element {
    this._classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const stepToShow = getStepToShow(this.props.wizardProps);

    return (
      <div className={this._classNames.wizardContainer}>
        {this._onRenderTitleSection()}
        <Wizard {...this.props.wizardProps} stepToShow={stepToShow} />
        {this._onRenderActionBar(stepToShow)}
      </div>
    );
  }

  // Get wizard title section
  private _onRenderTitleSection = (): React.ReactNode => {
    return <div className={this._classNames.titleSection}>{this.props.title}</div>;
  };

  // Get wizard action bar
  private _onRenderActionBar = (step: IWizardStepProps): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    return <div className={classNames.actionBarSection}>{step.footerElement}</div>;
  };
}
