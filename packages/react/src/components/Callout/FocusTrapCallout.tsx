import * as React from 'react';

import { Callout } from './Callout';
import { FocusTrapZone } from '../../FocusTrapZone';
import type { IFocusTrapCalloutProps } from './FocusTrapCallout.types';

/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 */
export const FocusTrapCallout: React.FunctionComponent<IFocusTrapCalloutProps> = (
  props: IFocusTrapCalloutProps,
): JSX.Element => {
  return (
    <Callout {...props}>
      <FocusTrapZone disabled={props.hidden} {...props.focusTrapProps}>
        {props.children}
      </FocusTrapZone>
    </Callout>
  );
};
