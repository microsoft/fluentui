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
          <div className={classNames.actionSection}>
            {this.props.actions.map((action: ISetupBannerAction, actionIndex: number) => {
              return this._renderAction(action, actionIndex);
            })}
          </div>
        </div>
      </div>
    );
  }

  private _renderAction(action: ISetupBannerAction, actionIndex: number): JSX.Element | undefined {
    if (action.actionType === SetupBannerActionType.DefaultButton) {
      return <DefaultButton onClick={action.action} text={action.text} key={actionIndex} />;
    } else if (action.actionType === SetupBannerActionType.Link) {
      return (
        <Link onClick={action.action} key={actionIndex} styles={{ root: { fontSize: '14px' } }}>
          {action.text}
        </Link>
      );
    } else if (action.actionType === SetupBannerActionType.PrimaryButton) {
      return <PrimaryButton onClick={action.action} text={action.text} key={actionIndex} />;
    }

    return undefined;
  }
}
