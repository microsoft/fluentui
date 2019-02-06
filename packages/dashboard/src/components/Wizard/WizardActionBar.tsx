import * as React from 'react';
import { classNamesFunction, css } from 'office-ui-fabric-react/lib/Utilities';
import { IAction } from '../Card/ActionBar/ActionBar.types';
import { IWizardActionBarProps, IWizardActionBarStyles } from './WizardActionBar.types';
import { getStyles } from './WizardActionBar.styles';
import { Link } from 'office-ui-fabric-react';

export class WizardActionBar extends React.Component<IWizardActionBarProps, {}> {
  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IWizardActionBarProps, IWizardActionBarStyles>();
    const classNames = getClassNames(getStyles!);

    return (
      <div className={classNames.root}>
        {this._renderActionLink(this.props.backClickAction, css(classNames.actionLink, classNames.backAction))}
        {this._renderActionLink(this.props.processContentAction, css(classNames.actionLink, classNames.mainAction))}
        {this._renderActionLink(this.props.exitWizardAction, css(classNames.actionLink, classNames.exitAction))}
      </div>
    );
  }

  private _renderActionLink = (action: IAction, className: string) => {
    return (
      <Link onClick={action.action} className={className}>
        {action.title}
      </Link>
    );
  };
}
