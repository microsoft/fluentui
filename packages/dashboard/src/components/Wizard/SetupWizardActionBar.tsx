import * as React from 'react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { ISetupWizardActionBarProps, ISetupWizardActionBarStyles } from './SetupWizardActionBar.types';
import { IWizardStepAction } from './Wizard.types';
import { getStyles } from './SetupWizardActionBar.styles';
import { Link } from 'office-ui-fabric-react';

class SetupWizardActionLink extends React.PureComponent<IWizardStepAction, {}> {
  public constructor(props: IWizardStepAction) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }
  public render(): JSX.Element {
    const { action, currentStep, title, ...linkProps } = this.props;

    return (
      <Link {...linkProps} onClick={this._handleClick}>
        {title}
      </Link>
    );
  }

  private _handleClick(): void {
    this.props.action(this.props.currentStep!);
  }
}

const getClassNames = classNamesFunction<ISetupWizardActionBarProps, ISetupWizardActionBarStyles>();

export class SetupWizardActionBar extends React.Component<ISetupWizardActionBarProps, {}> {
  constructor(props: ISetupWizardActionBarProps) {
    super(props);
  }

  public render(): JSX.Element {
    const classNames = getClassNames(getStyles!);

    return (
      <div className={classNames.root}>
        <SetupWizardActionLink {...this.props.backClickAction} className={classNames.backAction} currentStep={this.props.currentStep} />
        <SetupWizardActionLink {...this.props.mainAction} className={classNames.mainAction} currentStep={this.props.currentStep} />
        <SetupWizardActionLink {...this.props.exitWizardAction} className={classNames.exitAction} currentStep={this.props.currentStep} />
      </div>
    );
  }
}
