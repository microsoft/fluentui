import * as React from 'react';
import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { ISetupWizardActionBarProps, ISetupWizardActionBarStyles } from './SetupWizardActionBar.types';
import { IWizardStepAction } from './Wizard.types';
import { getStyles } from './SetupWizardActionBar.styles';
import { Link } from 'office-ui-fabric-react';

export class SetupWizardActionBar extends React.Component<ISetupWizardActionBarProps, {}> {
  constructor(props: ISetupWizardActionBarProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ISetupWizardActionBarProps, ISetupWizardActionBarStyles>();
    const classNames = getClassNames(getStyles!);

    return (
      <div className={classNames.root}>
        {this._renderActionLink(this.props.backClickAction, css(classNames.actionLink, classNames.backAction))}
        {this._renderActionLink(this.props.mainAction, css(classNames.actionLink, classNames.mainAction))}
        {this._renderActionLink(this.props.exitWizardAction, css(classNames.actionLink, classNames.exitAction))}
      </div>
    );
  }

  private _renderActionLink = (action: IWizardStepAction, className: string) => {
    return (
      <Link
        // tslint:disable-next-line jsx-no-lambda
        onClick={() => action.action(this.props.currentStep)}
        className={className}
        disabled={action.disabled !== undefined ? action.disabled : false}
      >
        {action.title}
      </Link>
    );
  };
}
