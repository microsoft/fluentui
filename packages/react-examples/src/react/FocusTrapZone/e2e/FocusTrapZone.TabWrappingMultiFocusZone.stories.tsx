import * as React from 'react';
import { FocusZone, FocusTrapZone, FocusZoneDirection } from '@fluentui/react';
import { rootClass } from './shared';

/**
 * Tab and shift-tab wrap at extreme ends of the FTZ:
 *
 * can tab between multiple FocusZones with different button structures
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
