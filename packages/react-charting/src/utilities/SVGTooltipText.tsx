import * as React from 'react';
import { ITooltipHost, ITooltipProps, Tooltip, TooltipDelay } from '@fluentui/react/lib/Tooltip';
import { Async, KeyCodes, getId, portalContainsElement } from '../Utilities';

interface ISVGTooltipTextProps {
  /**
   * Number of milliseconds to delay closing the tooltip, so that the user has time to hover over
   * the tooltip and interact with it. Hovering over the tooltip will count as hovering over the
   * host, so that the tooltip will stay open if the user is actively interacting with it.
   */
  closeDelay?: number;

  /**
   * Content to display in the Tooltip.
   */
  content?: string;

  /**
   * Length of delay before showing the tooltip on hover.
   * @defaultvalue TooltipDelay.medium
   */
  delay?: TooltipDelay;

  /**
   * Additional properties to pass through for Tooltip.
   */
  tooltipProps?: ITooltipProps;

  /**
   * Additional properties to pass through for SVG <text>.
   */
  textProps?: React.SVGAttributes<SVGTextElement>;

  /**
   * Max width of text
   */
  maxWidth?: number;

  /**
   * Max height of text
   */
  maxHeight?: number;

  /**
   * Pass false to make prevent the tooptip from receiving focus through keyboard
   * Eg: In Pie Chart, the focus should only land on the arcs and not on the text to
   * avoid repitition of the same datapoint
   * @defaultvalue true
   */
  shouldReceiveFocus?: boolean;

  /**
   * Pass true to show tooltip directly
   * Eg: In Pie Chart, the tooltip is shown when the arc is focussed, so the prop is set to true,
   * to directly show the tooltip from this component
   * @defaultvalue false
   */
  isTooltipVisibleProp?: boolean;

  /**
   * Function to wrap text within specified width and height
   * and return a boolean value indicating whether the text overflowed
   */
  wrapContent?: (content: string, id: string, maxWidth: number, maxHeight?: number) => boolean;
}

interface ISVGTooltipTextState {
  isTooltipVisible: boolean;
  isOverflowing: boolean;
}

/**
 * Component to render an SVG text element with an optional tooltip.
 * The tooltip appears on hovering and focusing the element when its content overflows.
 */
export class SVGTooltipText
  extends React.Component<ISVGTooltipTextProps, ISVGTooltipTextState>
  implements ITooltipHost
{
  public static defaultProps = {
    delay: TooltipDelay.medium,
  };

  private static _currentVisibleTooltip: ITooltipHost | undefined;

  /** The element that gets the hover events */
  private _tooltipHost = React.createRef<SVGTextElement>();

  private _async: Async;
  private _dismissTimerId: number;
  private _openTimerId: number;
  private _tooltipHostId = getId('tooltip-host');
  private _ignoreNextFocusEvent: boolean;

  constructor(props: ISVGTooltipTextProps) {
    super(props);

    this.state = {
      isTooltipVisible: false,
      isOverflowing: false,
    };

    this._async = new Async(this);
  }

  public render(): React.ReactNode {
    const { content, tooltipProps, textProps, shouldReceiveFocus = true } = this.props;
    const { isTooltipVisible } = this.state;
    const tooltipRenderProps: ITooltipProps = {
      content,
      targetElement: this._getTargetElement(),
      calloutProps: {
        onDismiss: this._hideTooltip,
        onMouseEnter: this._onTooltipMouseEnter,
        onMouseLeave: this._onTooltipMouseLeave,
      },
      onMouseEnter: this._onTooltipMouseEnter,
      onMouseLeave: this._onTooltipMouseLeave,
      ...tooltipProps,
    };

    const showTooltip =
      (!!this.props.isTooltipVisibleProp && this.state.isOverflowing && !!content) || (isTooltipVisible && !!content);

    return (
      <>
        <text
          {...textProps}
          id={this._tooltipHostId}
          ref={this._tooltipHost}
          onFocusCapture={this._onTooltipFocus}
          onBlurCapture={this._onTooltipBlur}
          onMouseEnter={this._onTooltipMouseEnter}
          onMouseLeave={this._onTooltipMouseLeave}
          onKeyDown={this._onTooltipKeyDown}
          data-is-focusable={shouldReceiveFocus && this.state.isOverflowing}
        >
          {content}
        </text>
        {showTooltip && <Tooltip {...tooltipRenderProps} />}
      </>
    );
  }

  public componentDidMount(): void {
    this._wrapContent();
  }

  public componentDidUpdate(prevProps: Readonly<ISVGTooltipTextProps>): void {
    if (this.props.maxWidth !== prevProps.maxWidth || this.props.maxHeight !== prevProps.maxHeight) {
      this._wrapContent();
    }
  }

  public componentWillUnmount(): void {
    if (SVGTooltipText._currentVisibleTooltip && SVGTooltipText._currentVisibleTooltip === this) {
      SVGTooltipText._currentVisibleTooltip = undefined;
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

    return this._tooltipHost.current as unknown as HTMLElement;
  };

  private _onTooltipFocus = (ev: React.FocusEvent<SVGElement>) => {
    if (this._ignoreNextFocusEvent) {
      this._ignoreNextFocusEvent = false;
      return;
    }

    this._onTooltipMouseEnter(ev);
  };

  private _onTooltipBlur = (ev: React.FocusEvent<SVGElement>) => {
    // The focused element gets a blur event when the document loses focus
    // (e.g. switching tabs in the browser), but we don't want to show the
    // tooltip again when the document gets focus back. Handle this case by
    // checking if the blurred element is still the document's activeElement,
    // and ignoring when it next gets focus back.
    // See https://github.com/microsoft/fluentui/issues/13541
    this._ignoreNextFocusEvent = document?.activeElement === ev.target;

    this._dismissTimerId = this._async.setTimeout(() => {
      this._hideTooltip();
    }, 0);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _onTooltipMouseEnter = (ev: any): void => {
    const { delay } = this.props;

    if (SVGTooltipText._currentVisibleTooltip && SVGTooltipText._currentVisibleTooltip !== this) {
      SVGTooltipText._currentVisibleTooltip.dismiss();
    }
    SVGTooltipText._currentVisibleTooltip = this;

    if (!this.state.isOverflowing) {
      return;
    }

    if (ev.target && portalContainsElement(ev.target as HTMLElement, this._getTargetElement())) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (SVGTooltipText._currentVisibleTooltip === this) {
      SVGTooltipText._currentVisibleTooltip = undefined;
    }
  };

  private _onTooltipKeyDown = (ev: React.KeyboardEvent<SVGElement>): void => {
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

  private _hideTooltip = (): void => {
    this._clearOpenTimer();
    this._clearDismissTimer();
    this._toggleTooltip(false);
  };

  private _toggleTooltip = (isTooltipVisible: boolean): void => {
    if (this.state.isTooltipVisible !== isTooltipVisible) {
      this.setState({ isTooltipVisible });
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

  private _wrapContent = () => {
    const { content, wrapContent, maxWidth = Number.POSITIVE_INFINITY, maxHeight } = this.props;

    let isOverflowing = false;
    if (content && wrapContent && wrapContent(content, this._tooltipHostId, maxWidth, maxHeight)) {
      isOverflowing = true;
    }

    if (this.state.isOverflowing !== isOverflowing) {
      this.setState({ isOverflowing });
    }
  };
}
