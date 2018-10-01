import * as React from 'react';
import { getStyles } from './SetupBanner.styles';
import { ISetupBannerAction, ISetupBannerProps, ISetupBannerStyles, SetupBannerActionType } from './SetupBanner.types';
import { mergeStyles, PrimaryButton, DefaultButton, Link } from 'office-ui-fabric-react';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export class SetupBanner extends React.Component<ISetupBannerProps, {}> {
  public render(): JSX.Element {
    const { className, headerText, onRenderBody, onRenderVisualization } = this.props;
    const getClassNames = classNamesFunction<{}, ISetupBannerStyles>();
    const classNames = getClassNames(getStyles);
    return (
      <div className={mergeStyles(classNames.root, className)}>
        <div className={classNames.visualizationPartition}>{onRenderVisualization()}</div>
        <div className={classNames.textPartition}>
          <div className={classNames.headerSection}>{headerText}</div>
          <div className={classNames.bodySection}>{onRenderBody()}</div>
          {this._renderActions()}
        </div>
      </div>
    );
  }

  private _renderActions(): JSX.Element {
    return (
      <div>
        {this.props.actions.map((action: ISetupBannerAction, actionIndex: number) => (
          <span key={actionIndex}>{this._renderAction(action)}</span>
        ))}
      </div>
    );
  }

  private _renderAction(action: ISetupBannerAction): JSX.Element | undefined {
    const getClassNames = classNamesFunction<{}, ISetupBannerStyles>();
    const classNames = getClassNames(getStyles);

    if (action.actionType === SetupBannerActionType.DefaultButton) {
      return <DefaultButton className={classNames.actionButton} onClick={action.action} text={action.text} />;
    } else if (action.actionType === SetupBannerActionType.Link) {
      return (
        <Link className={classNames.actionLink} onClick={action.action}>
          {action.text}
        </Link>
      );
    } else if (action.actionType === SetupBannerActionType.PrimaryButton) {
      return <PrimaryButton className={classNames.actionButton} onClick={action.action} text={action.text} />;
    }

    return undefined;
  }
}
