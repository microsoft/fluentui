import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZoneDialogInPanelExample } from '../FocusTrapZone/FocusTrapZone.DialogInPanel.Example';

export const ShadowDOMFocusTrapZoneDialogInPanelExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <FocusTrapZoneDialogInPanelExample />
    </Shadow>
  );
};
