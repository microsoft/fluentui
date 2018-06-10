import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  divProperties,
  getNativeProps,
  IClassNames
} from '../../Utilities';
import {
  ITooltipProps,
  ITooltipStyleProps,
  ITooltipStyles,
  TooltipDelay
} from './Tooltip.types';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

const getClassNames = classNamesFunction<ITooltipStyleProps, ITooltipStyles>();

@customizable('Tooltip', ['theme'])
export class TooltipBase extends BaseComponent<ITooltipProps, any> {
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

  private _classNames: IClassNames<ITooltipStyles>;

  public render(): JSX.Element {
    const {
      className,
      calloutProps,
      delay,
      directionalHint,
      directionalHintForRTL,
      getStyles,
      id,
      maxWidth,
      onRenderContent = this._onRenderContent,
      targetElement,
      theme
    } = this.props;

    this._classNames = getClassNames(getStyles!, {
      theme: theme!,
      className: className || (calloutProps && calloutProps.className),
      delay: delay!,
      maxWidth: maxWidth!
    });

    return (
      <Callout
        target={ targetElement }
        directionalHint={ directionalHint }
        directionalHintForRTL={ directionalHintForRTL }
        { ...calloutProps }
        { ...getNativeProps(this.props, divProperties) }
        className={ this._classNames.root }
      >
        <div
          className={ this._classNames.content }
          id={ id }
          role='tooltip'
          onMouseEnter={ this.props.onMouseEnter }
          onMouseLeave={ this.props.onMouseLeave }
        >
          { onRenderContent(this.props, this._onRenderContent) }
        </div>
      </Callout >
    );
  }

  private _onRenderContent = (props: ITooltipProps): JSX.Element => {
    return (
      <p className={ this._classNames.subText }>
        { props.content }
      </p>
    );
  }
}
