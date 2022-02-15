import * as React from 'react';
import { FocusZone, FocusTrapZone, FocusZoneDirection, mergeStyles } from '@fluentui/react';

const rootClass = mergeStyles({
  position: 'relative',
  button: { position: 'absolute', height: 30, width: 30 },
  '#a': { top: 0, left: 0 },
  '#b': { top: 0, left: 30 },
  '#c': { top: 0, left: 60 },
  '#d': { top: 30, left: 0 },
  '#e': { top: 30, left: 30 },
  '#f': { top: 30, left: 60 },
});

/**
 * Tab and shift-tab wrap at extreme ends of the FTZ:
 *
 * can tab across FocusZones with different button structures
 */
export const TabWrappingMultiFocusZone = () => {
  return (
    <div className={rootClass}>
      <FocusTrapZone forceFocusInsideTrap={false}>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <button id="a">a</button>
          </div>
          <div>
            <button id="b">b</button>
          </div>
          <div>
            <button id="c">c</button>
          </div>
        </FocusZone>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <div>
              <button id="d">d</button>
              <button id="e">e</button>
              <button id="f">f</button>
            </div>
          </div>
        </FocusZone>
      </FocusTrapZone>
    </div>
  );
};
