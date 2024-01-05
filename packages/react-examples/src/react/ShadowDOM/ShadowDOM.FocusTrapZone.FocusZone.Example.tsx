import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZoneFocusZoneExample } from '../FocusTrapZone/FocusTrapZone.FocusZone.Example';

export const ShadowDOMFocusTrapZoneFocusZoneExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusTrapZoneFocusZoneExample />
    </Shadow>
  );
};
