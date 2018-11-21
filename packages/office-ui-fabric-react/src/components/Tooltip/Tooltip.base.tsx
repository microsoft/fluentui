import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { ITooltipProps, ITooltipStyleProps, ITooltipStyles, TooltipDelay, ITooltip } from './Tooltip.types';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

const getClassNames = classNamesFunction<ITooltipStyleProps, ITooltipStyles>();

export class TooltipBase extends BaseComponent<ITooltipProps, any> implements ITooltip {
  // Specify default props values
  public static defaultProps: Partial<ITooltipProps> = {
    directionalHint: DirectionalHint.topCenter,
    delay: TooltipDelay.medium,
    maxWidth: '364px',
    calloutProps: {
      isBeakVisible: true,
      beakWidth: 16,
      gapSpace: 0,
      setInitialFocus: true,
      doNotLayer: false
    }
  };

  private static _currentVisibleTooltip: ITooltip | undefined;
  private _classNames: IProcessedStyleSet<ITooltipStyles>;

  constructor(props: ITooltipProps) {
    super(props);

    this.dismiss = this.dismiss.bind(this);

    if (TooltipBase._currentVisibleTooltip && TooltipBase._currentVisibleTooltip !== this) {
      TooltipBase._currentVisibleTooltip.dismiss();
    }
  }

  public render(): JSX.Element {
    const {
      className,
      calloutProps,
      delay,
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
      delay: delay!,
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

  public componentDidMount(): void {
    TooltipBase._currentVisibleTooltip = this;
  }

  public componentWillUnmount(): void {
    if (TooltipBase._currentVisibleTooltip === this) {
      TooltipBase._currentVisibleTooltip = undefined;
    }
  }

  public dismiss(): void {
    if (this.props.dismiss) {
      this.props.dismiss();
    }
  }

  private _onRenderContent = (props: ITooltipProps): JSX.Element => {
    return <p className={this._classNames.subText}>{props.content}</p>;
  };
}
