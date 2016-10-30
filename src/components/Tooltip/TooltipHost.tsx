/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipHostProps } from './TooltipHost.Props';
import { Tooltip } from './index';

export class TooltipHost extends BaseComponent<ITooltipHostProps, any> {

  public static defaultProps = {
    delay: 1000
  };

  // The wrapping div that gets the hover events
  private _tooltipHost: HTMLElement;

  // Attach hover events
  public componentDidMount() {
    this._events.on(this._tooltipHost, 'mouseenter', this._tooltipShow);
    this._events.on(this._tooltipHost, 'mouseleave', this._tooltipHide);
  }

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
          { children }
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
  private _tooltipShow(ev: any) {
    setTimeout( () => {
      this.setState({
        isTooltipVisible: true
      });
    }, this.props.delay );
  }

  // Hide Tooltip
  private _tooltipHide(ev: any) {
    this.setState({
      isTooltipVisible: false
    });
  }
}