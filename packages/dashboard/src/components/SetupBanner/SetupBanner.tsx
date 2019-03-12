import * as React from 'react';
import {
  mergeStyles,
  DefaultButton,
  Link,
  PrimaryButton,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType as ElemType
} from 'office-ui-fabric-react';
import { FontSizes } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction, getRTL } from 'office-ui-fabric-react/lib/Utilities';

import { getStyles } from './SetupBanner.styles';
import { ISetupBannerAction, ISetupBannerProps, ISetupBannerStyles, SetupBannerActionType } from './SetupBanner.types';

export class SetupBanner extends React.Component<ISetupBannerProps, {}> {
  public render(): JSX.Element {
    const { className, headerText, onRenderBody, onRenderVisualization } = this.props;
    const getClassNames = classNamesFunction<{}, ISetupBannerStyles>();
    const classNames = getClassNames(getStyles(getRTL()));

    const visualizationPartition = onRenderVisualization
      ? typeof onRenderVisualization === 'object'
        ? onRenderVisualization
        : onRenderVisualization()
      : this._getVisualizationShimmer();
    const headerSection = headerText ? headerText : this._getHeaderShimmer();
    const bodySection = onRenderBody ? (typeof onRenderBody === 'object' ? onRenderBody : onRenderBody()) : this._getBodyShimmer();

    return (
      <div className={mergeStyles(classNames.root, className)}>
        <div className={classNames.visualizationPartition}>{visualizationPartition}</div>
        <div className={classNames.textPartition}>
          <div className={classNames.headerSection}>{headerSection}</div>
          <div className={classNames.bodySection}>{bodySection}</div>
          <div className={classNames.actionSection}>{this.props.actions.map(this._renderAction)}</div>
        </div>
      </div>
    );
  }

  private _getBodyShimmer(): JSX.Element {
    const getClassNames = classNamesFunction<{}, ISetupBannerStyles>();
    const classNames = getClassNames(getStyles);

    const shimmerElementsGroup = <ShimmerElementsGroup shimmerElements={[{ type: ElemType.line, height: 36 }]} />;

    return (
      <div className={classNames.bodyShimmer}>
        <Shimmer customElementsGroup={shimmerElementsGroup} />
      </div>
    );
  }

  private _getHeaderShimmer(): JSX.Element {
    const getClassNames = classNamesFunction<{}, ISetupBannerStyles>();
    const classNames = getClassNames(getStyles);

    const shimmerElementsGroup = <ShimmerElementsGroup shimmerElements={[{ type: ElemType.line, height: 42 }]} />;
    return (
      <div className={classNames.headerShimmer}>
        <Shimmer customElementsGroup={shimmerElementsGroup} />
      </div>
    );
  }

  private _getVisualizationShimmer(): JSX.Element {
    const getClassNames = classNamesFunction<{}, ISetupBannerStyles>();
    const classNames = getClassNames(getStyles);

    const shimmerElementsGroup = <ShimmerElementsGroup shimmerElements={[{ type: ElemType.line, height: 250 }]} />;
    return (
      <div className={classNames.visualizationShimmer}>
        <Shimmer customElementsGroup={shimmerElementsGroup} />
      </div>
    );
  }

  private _renderAction(action: ISetupBannerAction, actionIndex: number): JSX.Element | undefined {
    if (action.actionType === SetupBannerActionType.DefaultButton) {
      return <DefaultButton onClick={action.action} text={action.text} key={actionIndex} />;
    } else if (action.actionType === SetupBannerActionType.Link) {
      return (
        <Link onClick={action.action} key={actionIndex} styles={{ root: { fontSize: FontSizes.medium } }}>
          {action.text}
        </Link>
      );
    } else if (action.actionType === SetupBannerActionType.PrimaryButton) {
      return <PrimaryButton onClick={action.action} text={action.text} key={actionIndex} />;
    }

    return undefined;
  }
}
