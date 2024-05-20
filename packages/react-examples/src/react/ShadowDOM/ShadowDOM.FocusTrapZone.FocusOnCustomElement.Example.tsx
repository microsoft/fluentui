import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZoneBoxCustomElementExample } from '../FocusTrapZone/FocusTrapZone.Box.FocusOnCustomElement.Example';

export const ShadowDOMFocusTrapZoneBoxCustomElementExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusTrapZoneBoxCustomElementExample />
    </Shadow>
  );
};
