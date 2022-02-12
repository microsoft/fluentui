import * as React from 'react';
import { FocusZone, FocusTrapZone, FocusZoneDirection, mergeStyles } from '@fluentui/react';

const rootClass = mergeStyles({
  button: { height: 30, width: 60 },
});

/**
 * Tab and shift-tab wrap at extreme ends of the FTZ:
 *
 * can tab across a FocusZone with different button structures
 */
export const TabWrappingFocusZone = () => {
  return (
    <div className={rootClass}>
      <FocusTrapZone forceFocusInsideTrap={false}>
        <div>
          <button id="first">first</button>
        </div>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <button id="fzFirst">fzFirst</button>
          </div>
          <div>
            <div>
              <button id="fzMid1">fzMid1</button>
              <button id="fzMid2">fzMid2</button>
              <button id="fzLast">fzLast</button>
            </div>
          </div>
        </FocusZone>
      </FocusTrapZone>
    </div>
  );
};
