import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZoneNestedExample } from '../FocusTrapZone/FocusTrapZone.Nested.Example';

export const ShadowDOMFocusTrapZoneNestedExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusTrapZoneNestedExample />
    </Shadow>
  );
};
