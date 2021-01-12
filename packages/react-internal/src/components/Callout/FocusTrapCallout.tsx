import * as React from 'react';

import { Callout } from './Callout';
import { IFocusTrapCalloutProps } from './FocusTrapCallout.types';
import { FocusTrapZone } from '../../FocusTrapZone';

/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 * @deprecated Use Callout which includes FocusTrapZone by default
 */
export const FocusTrapCallout: React.FunctionComponent<IFocusTrapCalloutProps> = (
  props: IFocusTrapCalloutProps,
): JSX.Element => {
  const focusTrapProps = props.focusTrapProps;
  return (
    <Callout {...props}>
      <FocusTrapZone disabled={props.hidden} isClickableOutsideFocusTrap={true} {...focusTrapProps}>
        {props.children}
      </FocusTrapZone>
    </Callout>
  );
};
