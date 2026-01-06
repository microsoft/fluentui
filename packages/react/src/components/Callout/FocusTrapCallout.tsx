import * as React from 'react';

import { Callout } from './Callout';
import { FocusTrapZone } from '../../FocusTrapZone';
import type { IFocusTrapCalloutProps } from './FocusTrapCallout.types';

import type { JSXElement } from '@fluentui/utilities';

/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 */
export const FocusTrapCallout: React.FunctionComponent<IFocusTrapCalloutProps> = (
  props: IFocusTrapCalloutProps,
): JSXElement => {
  return (
    <Callout {...props}>
      <FocusTrapZone disabled={props.hidden} {...props.focusTrapProps}>
        {props.children}
      </FocusTrapZone>
    </Callout>
  );
};
