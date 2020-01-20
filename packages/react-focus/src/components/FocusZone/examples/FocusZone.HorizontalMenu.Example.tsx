import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';

export const FocusZoneHorizontalMenuExample: React.FunctionComponent = () => {
  return (
    <FocusZone direction={FocusZoneDirection.domOrder} role="menu">
      <button role="menuitem">Item 1</button>
      <button role="menuitem">Item 2</button>
      <button role="menuitem">Item 3</button>
      <button role="menuitem">Item 4</button>
    </FocusZone>
  );
};
