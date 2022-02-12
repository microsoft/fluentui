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
      <button id="before">before</button>
      <FocusTrapZone forceFocusInsideTrap={false}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <button id="fz1First">fz1First</button>
          <button id="fz1Mid">fz1Mid</button>
          <button id="fz1Last">fz1Last</button>
        </FocusZone>
        <button id="mid">mid</button>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <button id="fz2First">fz2First</button>
          <button id="fz2Mid">fz2Mid</button>
          <button id="fz2Last">fz2Last</button>
        </FocusZone>
      </FocusTrapZone>
      <button id="after">after</button>
    </div>
  );
};
