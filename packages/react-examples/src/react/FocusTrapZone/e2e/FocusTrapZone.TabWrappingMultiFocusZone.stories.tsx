import * as React from 'react';
import { FocusZone, FocusTrapZone, FocusZoneDirection, mergeStyles } from '@fluentui/react';

const rootClass = mergeStyles({
  button: { height: 30, width: 60 },
  '*:focus': { outline: '2px dashed red' },
});

/**
 * Tab and shift-tab wrap at extreme ends of the FTZ:
 *
 * can between multiple FocusZones with different button structures
 */
export const TabWrappingMultiFocusZone = () => {
  return (
    <div className={rootClass}>
      <FocusTrapZone forceFocusInsideTrap={false}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <button>fz1First</button>
          </div>
          <div>
            <button>fz1Mid</button>
          </div>
          <div>
            <button>fz1Last</button>
          </div>
        </FocusZone>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <div>
              <button>fz2First</button>
              <button>fz2Mid</button>
              <button>fz2Last</button>
            </div>
          </div>
        </FocusZone>
      </FocusTrapZone>
    </div>
  );
};
