import * as React from 'react';
import { hiddenContentStyle } from '../../Styling';
import {
  initializeComponentRef,
  Async,
  divProperties,
  getNativeProps,
  getId,
  assign,
  hasOverflow,
  portalContainsElement,
  classNamesFunction,
  KeyCodes,
} from '../../Utilities';
import { TooltipOverflowMode } from './TooltipHost.types';
import { Tooltip } from './Tooltip';
import { TooltipDelay } from './Tooltip.types';
import type { ITooltipHostProps, ITooltipHostStyles, ITooltipHostStyleProps, ITooltipHost } from './TooltipHost.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx } from '../../utilities/dom';

export interface ITooltipHostState {
  /** @deprecated No longer used internally */
  isAriaPlaceholderRendered: boolean;
  isTooltipVisible: boolean;
}

const getClassNames = classNamesFunction<ITooltipHostStyleProps, ITooltipHostStyles>();

export class TooltipHostBase extends React.Component<ITooltipHostProps, ITooltipHostState> implements ITooltipHost {
  public static defaultProps = {
    delay: TooltipDelay.medium,
  };

  public static contextType = WindowContext;
  private static _currentVisibleTooltip: ITooltipHost | undefined;

  // The wrapping div that gets the hover events
  private _tooltipHost = React.createRef<HTMLDivElement>();

  private _classNames: { [key in keyof ITooltipHostStyles]: string };
  private _async: Async;
  private _dismissTimerId: number;
  private _openTimerId: number;
  private _defaultTooltipId = getId('tooltip');
  private _ignoreNextFocusEvent: boolean;

  // Constructor
  constructor(props: ITooltipHostProps) {
    super(props);

    initializeComponentRef(this);

    this.state = {
      isAriaPlaceholderRendered: false,
      isTooltipVisible: false,
    };
  }

  // Render
  public render(): JSX.Element {
    const {
      calloutProps,
      children,
      content,
      directionalHint,
      directionalHintForRTL,
      hostClassName: className,
      id,
      // eslint-disable-next-line deprecation/deprecation
      setAriaDescribedBy = true,
      tooltipProps,
      styles,
      theme,
    } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    const { isTooltipVisible } = this.state;
    const tooltipId = id || this._defaultTooltipId;

    const tooltipRenderProps = {
      id: `${tooltipId}--tooltip`,
      content,
      targetElement: this._getTargetElement(),
      directionalHint,
      directionalHintForRTL,
      calloutProps: assign({}, calloutProps, {
        onDismiss: this._hideTooltip,
        onFocus: this._onTooltipContentFocus,
        onMouseEnter: this._onTooltipMouseEnter,
        onMouseLeave: this._onTooltipMouseLeave,
      }),
      onMouseEnter: this._onTooltipMouseEnter,
      onMouseLeave: this._onTooltipMouseLeave,
      ...getNativeProps(this.props, divProperties, ['id']), // Make sure we use the id above
      ...tooltipProps,
    };

    // Get the content of the tooltip for use in the hidden div used for screen readers
    const tooltipContent = tooltipProps?.onRenderContent
      ? tooltipProps.onRenderContent(tooltipRenderProps, props => (props?.content ? <>{props.content}</> : null))
      : content;
    const showTooltip = isTooltipVisible && !!tooltipContent;
    const ariaDescribedBy = setAriaDescribedBy && isTooltipVisible && !!tooltipContent ? tooltipId : undefined;

    return (
      <div
        className={this._classNames.root}
        ref={this._tooltipHost}
        {...{ onFocusCapture: this._onTooltipFocus }}
        {...{ onBlurCapture: this._onTooltipBlur }}
        onMouseEnter={this._onTooltipMouseEnter}
        onMouseLeave={this._onTooltipMouseLeave}
        onKeyDown={this._onTooltipKeyDown}
        role="none"
        // WARNING: aria-describedby on this node provides no value, since it isn't allowed generic elements
        aria-describedby={ariaDescribedBy}
      >
        {children}
        {showTooltip && <Tooltip {...tooltipRenderProps} />}
        <div hidden={true} id={tooltipId} style={hiddenContentStyle as React.CSSProperties}>
          {tooltipContent}
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    this._async = new Async(this);
  }

  public componentWillUnmount(): void {
    if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip === this) {
      TooltipHostBase._currentVisibleTooltip = undefined;
    }

    this._async.dispose();
  }

  public show = (): void => {
    this._toggleTooltip(true);
  };

  public dismiss = (): void => {
    this._hideTooltip();
  };

  private _getTargetElement = (): HTMLElement | undefined => {
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
  };

  private _onTooltipFocus = (ev: React.FocusEvent<HTMLElement>) => {
    if (this._ignoreNextFocusEvent) {
      this._ignoreNextFocusEvent = false;
      return;
    }

    this._onTooltipMouseEnter(ev);
  };

  private _onTooltipContentFocus = (ev: React.FocusEvent<HTMLElement>) => {
    if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip !== this) {
      TooltipHostBase._currentVisibleTooltip.dismiss();
    }
    TooltipHostBase._currentVisibleTooltip = this;

    this._clearDismissTimer();
    this._clearOpenTimer();
  };

  private _onTooltipBlur = (ev: React.FocusEvent<HTMLElement>) => {
    // The focused element gets a blur event when the document loses focus
    // (e.g. switching tabs in the browser), but we don't want to show the
    // tooltip again when the document gets focus back. Handle this case by
    // checking if the blurred element is still the document's activeElement,
    // and ignoring when it next gets focus back.
    // See https://github.com/microsoft/fluentui/issues/13541
    this._ignoreNextFocusEvent = getDocumentEx(this.context)?.activeElement === ev.target;

    this._dismissTimerId = this._async.setTimeout(() => {
      this._hideTooltip();
    }, 0);
  };

  // Show Tooltip
  private _onTooltipMouseEnter = (ev: any): void => {
    const { overflowMode, delay } = this.props;
    const doc = getDocumentEx(this.context);

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

    if (ev.target && portalContainsElement(ev.target as HTMLElement, this._getTargetElement(), doc)) {
      // Do not show tooltip when target is inside a portal relative to TooltipHost.
      return;
    }

    this._clearDismissTimer();
    this._clearOpenTimer();

    if (delay !== TooltipDelay.zero) {
      const delayTime = this._getDelayTime(delay!); // non-null assertion because we set it in `defaultProps`

      this._openTimerId = this._async.setTimeout(() => {
        this._toggleTooltip(true);
      }, delayTime);
    } else {
      this._toggleTooltip(true);
    }
  };

  // Hide Tooltip
  private _onTooltipMouseLeave = (ev: any): void => {
    const { closeDelay } = this.props;

    this._clearDismissTimer();
    this._clearOpenTimer();

    if (closeDelay) {
      this._dismissTimerId = this._async.setTimeout(() => {
        this._toggleTooltip(false);
      }, closeDelay);
    } else {
      this._toggleTooltip(false);
    }

    if (TooltipHostBase._currentVisibleTooltip === this) {
      TooltipHostBase._currentVisibleTooltip = undefined;
    }
  };

  private _onTooltipKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    // eslint-disable-next-line deprecation/deprecation
    if ((ev.which === KeyCodes.escape || ev.ctrlKey) && this.state.isTooltipVisible) {
      this._hideTooltip();
      ev.stopPropagation();
    }
  };

  private _clearDismissTimer = (): void => {
    this._async.clearTimeout(this._dismissTimerId);
  };

  private _clearOpenTimer = (): void => {
    this._async.clearTimeout(this._openTimerId);
  };

  // Hide Tooltip
  private _hideTooltip = (): void => {
    this._clearOpenTimer();
    this._clearDismissTimer();
    this._toggleTooltip(false);
  };

  private _toggleTooltip = (isTooltipVisible: boolean): void => {
    if (this.state.isTooltipVisible !== isTooltipVisible) {
      this.setState(
        { isTooltipVisible },
        () => this.props.onTooltipToggle && this.props.onTooltipToggle(isTooltipVisible),
      );
    }
  };

  private _getDelayTime = (delay: TooltipDelay): number => {
    switch (delay) {
      case TooltipDelay.medium:
        return 300;
      case TooltipDelay.long:
        return 500;
      default:
        return 0;
    }
  };
}
