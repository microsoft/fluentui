/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  autobind,
  css,
  divProperties,
  getNativeProps,
  assign,
  isElementOverflowing
} from '../../Utilities';
import { ITooltipHostProps } from './TooltipHost.Props';
import { Tooltip } from './Tooltip';
import { TooltipDelay } from './Tooltip.Props';
import styles = require('./Tooltip.scss');

export interface ITooltipHostState {
  isTooltipVisible?: boolean;
  isOverflowing?: boolean;
}

export class TooltipHost extends BaseComponent<ITooltipHostProps, ITooltipHostState> {
  public static defaultProps = {
    delay: TooltipDelay.medium
  };

  // The wrapping div that gets the hover events
  private _tooltipHost: HTMLElement;

  // Constructor
  constructor(props: ITooltipHostProps) {
    super(props);

    this.state = {
      isTooltipVisible: false,
      isOverflowing: false
    };
  }

  public componentDidMount() {
    this._checkForOverflow();
  }

  public componentDidUpdate() {
    this._checkForOverflow();
  }

  public componentWillReceiveProps(props: ITooltipHostProps) {
    const { onlyShowIfOverflow } = this.props;

    if (onlyShowIfOverflow) {
      // Reset state, will be updated once component updated
      this.setState({
        isOverflowing: false
      });
    }
  }

  // Render
  public render() {
    const { calloutProps, hostClassName, content, children, directionalHint, delay, onlyShowIfOverflow } = this.props;
    const { isTooltipVisible, isOverflowing } = this.state;

    const showTooltip = isTooltipVisible
      && (!onlyShowIfOverflow || isOverflowing);

    return (
      <div
        className={ css('ms-TooltipHost', styles.host, hostClassName) }
        ref={ this._resolveRef('_tooltipHost') }
        { ...{ onFocusCapture: this._onTooltipMouseEnter } }
        { ...{ onBlurCapture: this._onTooltipMouseLeave } }
        onMouseEnter={ this._onTooltipMouseEnter }
        onMouseLeave={ this._onTooltipMouseLeave }
      >
        { children }
        { showTooltip && (
          <Tooltip
            delay={ delay }
            content={ content }
            targetElement={ this._tooltipHost }
            directionalHint={ directionalHint }
            calloutProps={ assign(calloutProps, { onDismiss: this._onTooltipCallOutDismiss }) }
            { ...getNativeProps(this.props, divProperties) }
          >
          </Tooltip>
        ) }
      </div>
    );
  }

  /** Check whether the host's content is overflowing */
  private _checkForOverflow() {
    const { onlyShowIfOverflow } = this.props;

    if (onlyShowIfOverflow) {
      const { isOverflowing } = this.state;
      const isNowOverflowing = isElementOverflowing(this._tooltipHost);

      if (isNowOverflowing !== isOverflowing) {
        this.setState({
          isOverflowing: isNowOverflowing
        });
      }
    }
  }

  // Show Tooltip
  @autobind
  private _onTooltipMouseEnter(ev: any) {
    this.setState({
      isTooltipVisible: true
    });
  }

  // Hide Tooltip
  @autobind
  private _onTooltipMouseLeave(ev: any) {
    this.setState({
      isTooltipVisible: false
    });
  }

  // Hide Tooltip
  @autobind
  private _onTooltipCallOutDismiss() {
    this.setState({
      isTooltipVisible: false
    });
  }
}
