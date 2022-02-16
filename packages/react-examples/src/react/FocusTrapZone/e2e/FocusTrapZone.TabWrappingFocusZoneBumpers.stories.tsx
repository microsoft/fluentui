import * as React from 'react';
import { FocusZone, FocusTrapZone, FocusZoneDirection, mergeStyles } from '@fluentui/react';

const rootClass = mergeStyles({
  button: { width: 60, height: 30 },
});

/**
 * Tab and shift-tab wrap at extreme ends of the FTZ:
 *
 * can trap focus when FTZ bookmark elements are FocusZones,
 * and those elements have inner elements focused that are not the first inner element
 */
export const TabWrappingFocusZoneBumpers = () => {
  return (
    <div className={rootClass}>
      <button>before</button>
      <FocusTrapZone forceFocusInsideTrap={false}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <button>fz1First</button>
          <button>fz1Mid</button>
          <button>fz1Last</button>
        </FocusZone>
        <button>mid</button>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <button>fz2First</button>
          <button>fz2Mid</button>
          <button>fz2Last</button>
        </FocusZone>
      </FocusTrapZone>
      <button>after</button>
    </div>
  );
};
