import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';
import { createArray } from '@uifabric/utilities';

const ITEMS = createArray(5, index => ({
  key: index.toString(),
  name: 'Item-' + index
}));

export const FocusZoneHorizontalMenuExample: React.FunctionComponent = () => {
  return (
    <FocusZone direction={FocusZoneDirection.domOrder} role="menubar">
      {ITEMS.map(item => (
        <button key={item.name} role="menuitem">
          {item.name}
        </button>
      ))}
    </FocusZone>
  );
};
