/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipProps, TooltipDelay } from './Tooltip.Props';
import { Callout } from '../../Callout';
import { css } from '../../utilities/css';
import { DirectionalHint } from '../../common/DirectionalHint';
import { getNativeProps, divProperties } from '../../utilities/properties';
import './Tooltip.scss';

export class Tooltip extends BaseComponent<ITooltipProps, any> {

  // Specify default props values
  public static defaultProps = {
    directionalHint:  DirectionalHint.topCenter,
    delay: TooltipDelay.medium,
    calloutProps: {
      isBeakVisible: true,
      beakWidth: 16,
      gapSpace: 8,
      setInitialFocus: true,
      doNotLayer: false
    }
  };

  public render() {
    let { targetElement, content, calloutProps, directionalHint, delay } = this.props;

    return (
      <Callout
        className={ css('ms-Tooltip', `has-${TooltipDelay[delay]}Delay`) }
        targetElement={ targetElement }
        directionalHint={ directionalHint }
        {...calloutProps}
        { ...getNativeProps(this.props, divProperties) }
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