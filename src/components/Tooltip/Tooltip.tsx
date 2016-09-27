/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { TooltipContent } from './TooltipContent';
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
      beakStyle: 'ms-Callout-smallbeak',
      beakWidth: 16,
      gapSpace: 16,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.topCenter
    }
  };

  // Constructor
  constructor(props: ITooltipProps) {
    super(props);

    this.state = {
    };
  }

  public render() {
    let { calloutProps, targetElement } = this.props;

    return (
        <Callout
          className='ms-Tooltip'
          ref={this._resolveRef('_callout')}
          targetElement={ targetElement }
          {...calloutProps}
        >
          <TooltipContent { ...this.props }/>
        </Callout>
    );
  }
}