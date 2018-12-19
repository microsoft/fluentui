import * as React from 'react';
import {
  BaseComponent,
  divProperties,
  getNativeProps,
  getId,
  assign,
  hasOverflow,
  createRef,
  portalContainsElement,
  classNamesFunction
} from '../../Utilities';
import { ITooltipHostProps, TooltipOverflowMode, ITooltipHostStyles, ITooltipHostStyleProps, ITooltipHost } from './TooltipHost.types';
import { Tooltip } from './Tooltip';
import { TooltipDelay } from './Tooltip.types';

export interface ITooltipHostState {
  isTooltipVisible: boolean;
}

const getClassNames = classNamesFunction<ITooltipHostStyleProps, ITooltipHostStyles>();

export class TooltipHostBase extends BaseComponent<ITooltipHostProps, ITooltipHostState> implements ITooltipHost {
  public static defaultProps = {
    delay: TooltipDelay.medium
  };

  private static _currentVisibleTooltip: ITooltipHost | undefined;

  // The wrapping div that gets the hover events
  private _tooltipHost = createRef<HTMLDivElement>();
  private _classNames: { [key in keyof ITooltipHostStyles]: string };

  // The ID of the setTimeout that will eventually close the tooltip if the
  // the tooltip isn't hovered over.
  private _closingTimer = -1;

  // Constructor
  constructor(props: ITooltipHostProps) {
    super(props);

    this.state = {
      isTooltipVisible: false
    };
  }

  // Render
  public render(): JSX.Element {
    const {
      calloutProps,
      children,
      content,
      delay,
      directionalHint,
      directionalHintForRTL,
      hostClassName: className,
      id,
      setAriaDescribedBy = true,
      tooltipProps,
      styles,
      theme
    } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className
    });

    const { isTooltipVisible } = this.state;
    const tooltipId = id || getId('tooltip');
    const isContentPresent = !!(content || (tooltipProps && tooltipProps.onRenderContent && tooltipProps.onRenderContent()));
    const showTooltip = isTooltipVisible && isContentPresent;
    const ariaDescribedBy = setAriaDescribedBy && isTooltipVisible && isContentPresent ? tooltipId : undefined;

    return (
      <div
        className={this._classNames.root}
        ref={this._tooltipHost}
        {...{ onFocusCapture: this._onTooltipMouseEnter }}
        {...{ onBlurCapture: this._hideTooltip }}
        onMouseEnter={this._onTooltipMouseEnter}
        onMouseLeave={this._onTooltipMouseLeave}
        aria-describedby={ariaDescribedBy}
      >
        {children}
        {showTooltip && (
          <Tooltip
            id={tooltipId}
            delay={delay}
            content={content}
            targetElement={this._getTargetElement()}
            directionalHint={directionalHint}
            directionalHintForRTL={directionalHintForRTL}
            calloutProps={assign({}, calloutProps, {
              onMouseEnter: this._onTooltipMouseEnter,
              onMouseLeave: this._onTooltipMouseLeave
            })}
            onMouseEnter={this._onTooltipMouseEnter}
            onMouseLeave={this._onTooltipMouseLeave}
            {...getNativeProps(this.props, divProperties)}
            {...tooltipProps}
          />
        )}
      </div>
    );
  }

  public componentWillUnmount(): void {
    if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip === this) {
      TooltipHostBase._currentVisibleTooltip = undefined;
    }
  }

  public dismiss = (): void => {
    this._hideTooltip();
  };

  private _getTargetElement(): HTMLElement | undefined {
    if (!this._tooltipHost.current) {
      return undefined;
    }

    const { overflowMode } = this.props;

    // Select target element based on overflow mode. For parent mode, you want to position the tooltip relative
    // to the parent element, otherwise it might look off.
    if (overflowMode !== undefined) {
      switch (overflowMode) {
        case TooltipOverflowMode.Parent:
          return this._tooltipHost.current.parentElement!;

        case TooltipOverflowMode.Self:
          return this._tooltipHost.current;
      }
    }

    return this._tooltipHost.current;
  }

  // Show Tooltip
  private _onTooltipMouseEnter = (ev: any): void => {
    const { overflowMode } = this.props;

    if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip !== this) {
      TooltipHostBase._currentVisibleTooltip.dismiss();
    }
    TooltipHostBase._currentVisibleTooltip = this;

    if (overflowMode !== undefined) {
      const overflowElement = this._getTargetElement();
      if (overflowElement && !hasOverflow(overflowElement)) {
        return;
      }
    }

    if (ev.target && portalContainsElement(ev.target as HTMLElement, this._getTargetElement())) {
      // Do not show tooltip when target is inside a portal relative to TooltipHost.
      return;
    }

    this._toggleTooltip(true);
    this._clearDismissTimer();
  };

  // Hide Tooltip
  private _onTooltipMouseLeave = (ev: any): void => {
    if (this.props.closeDelay) {
      this._clearDismissTimer();

      this._closingTimer = this._async.setTimeout(() => {
        this._toggleTooltip(false);
      }, this.props.closeDelay);
    } else {
      this._toggleTooltip(false);
    }
    if (TooltipHostBase._currentVisibleTooltip === this) {
      TooltipHostBase._currentVisibleTooltip = undefined;
    }
  };

  private _clearDismissTimer = (): void => {
    this._async.clearTimeout(this._closingTimer);
  };

  // Hide Tooltip
  private _hideTooltip = (): void => {
    this._toggleTooltip(false);
  };

  private _toggleTooltip(isTooltipVisible: boolean): void {
    if (this.state.isTooltipVisible !== isTooltipVisible) {
      this.setState({ isTooltipVisible }, () => this.props.onTooltipToggle && this.props.onTooltipToggle(this.state.isTooltipVisible));
    }
  }
}
