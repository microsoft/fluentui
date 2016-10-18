/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipProps } from './Tooltip.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

export interface ITooltipState {
  isTooltipVisible?: boolean;
}

export class Tooltip extends BaseComponent<ITooltipProps, ITooltipState> {

  // Specify default props values
  public static defaultProps = {
    calloutProps: {
      beakStyle: 'ms-Callout-smallbeak',
      gapSpace: 16,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.topCenter
    }
  };

  // Constructor
  constructor(props: ITooltipProps) {
    super(props);
  }

  public render() {
    let { calloutProps, targetElement } = this.props;
    let bodyContent;

    if (this.props.children) {
      bodyContent = (
        <div className='ms-Tooltip-body'>
          <p className='ms-Tooltip-subText'>
            { this.props.children }
          </p>
        </div>
      );
    }

    return (
        <Callout
          beakWidth={ 14 }
          className='ms-Tooltip'
          ref={this._resolveRef('_callout')}
          targetElement={ targetElement }
          {...calloutProps}
        >
          <div className='ms-Tooltip-content'>
              { bodyContent }
          </div>
        </Callout>
    );
  }
}