import { ICalloutProps } from './Callout.types';
import { IFocusTrapZoneProps } from '../../FocusTrapZone';

/**
 * {@docCategory Callout}
 */
export interface IFocusTrapCalloutProps extends ICalloutProps {
  /**
   * Optional props to be passed on to FocusTrapZone
   */
  focusTrapProps?: IFocusTrapZoneProps;
}
