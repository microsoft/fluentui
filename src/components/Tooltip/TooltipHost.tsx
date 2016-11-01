/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipHostProps } from './TooltipHost.Props';
import { autobind } from '../../utilities/autobind';
import { Tooltip } from './index';

export class TooltipHost extends BaseComponent<ITooltipHostProps, any> {

  public static defaultProps = {
    delay: 800
  };

  // The wrapping div that gets the hover events
  private _tooltipHost: HTMLElement;
  private _tooltipDelay: number;

  // Constructor
  constructor(props: ITooltipHostProps) {
    super(props);

    this.state = {
      isTooltipVisible: false,
    };
  }

  // Render
  public render() {
    let { content, children } = this.props;
    let { isTooltipVisible } = this.state;

    return (
        <div className='ms-TooltipHost' ref={ this._resolveRef('_tooltipHost')} >
          <span
            { ...{ onFocusCapture: this._onTooltipMouseEnter } }
            { ...{ onBlurCapture: this._onTooltipMouseLeave } }
            onMouseEnter={ this._onTooltipMouseEnter }
            onMouseLeave={ this._onTooltipMouseLeave }
          >
            { children }
          </span>
          { isTooltipVisible ? (
           <Tooltip
              content ={ content }
              targetElement={ this._tooltipHost }
           >
           </Tooltip>
          ) : (null) }
        </div>
    );
  }

  // Show Tooltip
  @autobind
  private _onTooltipMouseEnter(ev: any) {
    // Clear any current timers (if hover then focus)
    this._async.clearTimeout(this._tooltipDelay);
    // Set a new delay.
    this._tooltipDelay = this._async.setTimeout( () => {
      this.setState({
        isTooltipVisible: true
      });
    }, this.props.delay );
  }

  // Hide Tooltip
  @autobind
  private _onTooltipMouseLeave(ev: any) {
    this._async.clearTimeout(this._tooltipDelay);
    this.setState({
      isTooltipVisible: false
    });
  }
}