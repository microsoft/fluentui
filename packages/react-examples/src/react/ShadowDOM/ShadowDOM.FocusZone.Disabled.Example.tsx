import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusZoneDisabledExample } from '../../react-focus/FocusZone/FocusZone.Disabled.Example';

export const ShadowDOMFocusZoneDisabledExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusZoneDisabledExample />
    </Shadow>
  );
};
