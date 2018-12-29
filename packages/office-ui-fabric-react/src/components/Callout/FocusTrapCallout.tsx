import * as React from 'react';

import { Callout } from './Callout';
import { IFocusTrapCalloutProps } from './FocusTrapCallout.types';
import { FocusTrapZone } from '../../FocusTrapZone';

export const FocusTrapCallout: React.StatelessComponent<IFocusTrapCalloutProps> = (props: IFocusTrapCalloutProps): JSX.Element => {
  return (
    <Callout {...props}>
      <FocusTrapZone {...props.focusTrapProps}>{props.children}</FocusTrapZone>
    </Callout>
  );
};
