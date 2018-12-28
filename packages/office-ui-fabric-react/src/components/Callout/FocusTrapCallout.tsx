import * as React from 'react';

import { BaseComponent } from '../../Utilities';
import { Callout } from './Callout';
import { ICalloutProps } from './Callout.types';
import { FocusTrapZone, IFocusTrapZoneProps } from '../FocusTrapZone';

export interface IFocusTrapCalloutProps extends ICalloutProps {
  /*
   * Optional props to be passed on to FocusTrapZone
   */
  focusTrapProps?: IFocusTrapZoneProps;
}

export class FocusTrapCallout extends BaseComponent<IFocusTrapCalloutProps, {}> {
  public render() {
    return (
      <Callout {...this.props}>
        <FocusTrapZone {...this.props.focusTrapProps}>{this.props.children}</FocusTrapZone>
      </Callout>
    );
  }
}
