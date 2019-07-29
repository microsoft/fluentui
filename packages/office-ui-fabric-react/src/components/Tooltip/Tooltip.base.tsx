import * as React from 'react';
import { classNamesFunction, divProperties, getNativeProps } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { ITooltipProps, ITooltipStyleProps, ITooltipStyles } from './Tooltip.types';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

const getClassNames = classNamesFunction<ITooltipStyleProps, ITooltipStyles>();

export class TooltipBase extends React.Component<ITooltipProps, any> {
  // Specify default props values
  public static defaultProps: Partial<ITooltipProps> = {
    directionalHint: DirectionalHint.topCenter,
    maxWidth: '364px',
    calloutProps: {
      isBeakVisible: true,
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false
    }
  };

  private _classNames: IProcessedStyleSet<ITooltipStyles>;

  public render(): JSX.Element {
    const {
      className,
      calloutProps,
      directionalHint,
      directionalHintForRTL,
      styles,
      id,
      maxWidth,
      onRenderContent = this._onRenderContent,
      targetElement,
      theme
    } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className: className || (calloutProps && calloutProps.className),
      beakWidth: calloutProps && calloutProps.beakWidth,
      gapSpace: calloutProps && calloutProps.gapSpace,
      maxWidth: maxWidth!
    });

    return (
      <Callout
        target={targetElement}
        directionalHint={directionalHint}
        directionalHintForRTL={directionalHintForRTL}
        {...calloutProps}
        {...getNativeProps(this.props, divProperties, ['id'])} // omitting ID due to it being used in the div below
        className={this._classNames.root}
      >
        <div
          className={this._classNames.content}
          id={id}
          role="tooltip"
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          {onRenderContent(this.props, this._onRenderContent)}
        </div>
      </Callout>
    );
  }

  private _onRenderContent = (props: ITooltipProps): JSX.Element => {
    return <p className={this._classNames.subText}>{props.content}</p>;
  };
}
