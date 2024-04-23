import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusZoneHorizontalMenuExample } from '../../react-focus/FocusZone/FocusZone.HorizontalMenu.Example';

export const ShadowDOMFocusZoneHorizontalMenuExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusZoneHorizontalMenuExample />
    </Shadow>
  );
};
