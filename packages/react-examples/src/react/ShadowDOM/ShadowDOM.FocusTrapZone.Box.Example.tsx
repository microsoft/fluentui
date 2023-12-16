import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZoneBoxExample } from '../FocusTrapZone/FocusTrapZone.Box.Example';

export const ShadowDOMFocusTrapZoneBoxExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusTrapZoneBoxExample />
    </Shadow>
  );
};
