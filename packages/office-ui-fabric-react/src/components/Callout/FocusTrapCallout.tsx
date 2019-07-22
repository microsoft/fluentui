import * as React from 'react';

import { Callout } from './Callout';
import { IFocusTrapCalloutProps } from './FocusTrapCallout.types';
import { FocusTrapZone } from '../../FocusTrapZone';

/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 */
export const FocusTrapCallout: React.StatelessComponent<IFocusTrapCalloutProps> = (props: IFocusTrapCalloutProps): JSX.Element => {
  return (
    <Callout {...props}>
      <FocusTrapZone disabled={props.hidden} {...props.focusTrapProps}>
        {props.children}
      </FocusTrapZone>
    </Callout>
  );
};
