import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZoneBoxClickExample } from '../FocusTrapZone/FocusTrapZone.Box.Click.Example';

export const ShadowDOMFocusTrapZoneBoxClickExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusTrapZoneBoxClickExample />
    </Shadow>
  );
};
