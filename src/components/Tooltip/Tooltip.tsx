/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipProps } from './Tooltip.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import './Tooltip.scss';

export interface ITooltipState {
  isTooltipVisible?: boolean;
}

export class Tooltip extends BaseComponent<ITooltipProps, ITooltipState> {

  // Specify default props values
  public static defaultProps = {
    calloutProps: {
      isBeakVisible: true,
      gapSpace: 16,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.topCenter
    }
  };

  public componentDidMount() {
    this._events.on(this.props.targetElement, 'mouseenter', this._tooltipShow);
    this._events.on(this.props.targetElement, 'mouseleave', this._tooltipHide);
  }

  // Constructor
  constructor(props: ITooltipProps) {
    super(props);

    this.state = {
      isTooltipVisible: false,
    };
  }

  public render() {
    let { targetElement, tooltipContent, calloutProps, directionalHint } = this.props;
    let { isTooltipVisible } = this.state;

    return (
        <div>
          { isTooltipVisible ? (
            <Callout
              className='ms-Tooltip'
              ref={this._resolveRef('_callout')}
              targetElement={ targetElement }
              directionalHint={ directionalHint }
              {...calloutProps}
            >
              <div className='ms-Tooltip-content'>
                <div className='ms-Tooltip-body'>
                  <p className='ms-Tooltip-subText'>
                    { tooltipContent }
                  </p>
                </div>
              </div>
            </Callout>
          ) : (null) }
        </div>
    );
  }


  private _tooltipShow(ev: any) {
    this.setState({
      isTooltipVisible: true
    });
  }

    private _tooltipHide(ev: any) {
    this.setState({
      isTooltipVisible: false
    });
  }
}