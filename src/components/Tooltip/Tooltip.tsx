/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITooltipProps } from './Tooltip.Props';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { getNativeProps, divProperties } from '../../utilities/properties';
import './Tooltip.scss';

export class Tooltip extends BaseComponent<ITooltipProps, any> {

  // Specify default props values
  public static defaultProps = {
    directionalHint:  DirectionalHint.topCenter,
    calloutProps: {
      isBeakVisible: true,
      beakWidth: 16,
      gapSpace: 8,
      setInitialFocus: true,
      doNotLayer: false
    }
  };

  public render() {
    let { targetElement, content, calloutProps, directionalHint } = this.props;

    return (
      <Callout
        className='ms-Tooltip'
        targetElement={ targetElement }
        directionalHint={ directionalHint }
        {...calloutProps}
      >
        <div className='ms-Tooltip-content' { ...getNativeProps(this.props, divProperties) }>
          <p className='ms-Tooltip-subText'>
            { content }
          </p>
        </div>
      </Callout>
    );
  }
}