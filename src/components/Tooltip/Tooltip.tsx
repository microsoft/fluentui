/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipProps } from './Tooltip.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import './Tooltip.scss';

export class Tooltip extends BaseComponent<ITooltipProps, any> {

  // Specify default props values
  public static defaultProps = {
    calloutProps: {
      isBeakVisible: true,
      beakWidth: 16,
      gapSpace: 8,
      setInitialFocus: true,
      doNotLayer: false,
      directionalHint: DirectionalHint.topCenter
    }
  };

  public render() {
    let { targetElement, content, calloutProps } = this.props;

    return (
      <Callout
        className='ms-Tooltip'
        targetElement={ targetElement }
        {...calloutProps}
      >
        <div className='ms-Tooltip-content'>
          <p className='ms-Tooltip-subText'>
            { content }
          </p>
        </div>
      </Callout>
    );
  }
}