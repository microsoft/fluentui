import * as React from 'react';
import { FocusZone, FocusTrapZone, FocusZoneDirection } from '@fluentui/react';
import { rootClass } from './shared';

/**
 * Tab and shift-tab wrap at extreme ends of the FTZ:
 *
 * can tab between a button and a FocusZone
 */
export const TabWrappingButtonFocusZone = () => {
  return (
    <div className={rootClass}>
      <FocusTrapZone forceFocusInsideTrap={false}>
        <div>
          <button>first</button>
        </div>
        <FocusZone direction={FocusZoneDirection.horizontal}>
          <div>
            <button>fzFirst</button>
          </div>
          <div>
            <div>
              <button>fzMid1</button>
              <button>fzMid2</button>
              <button>fzLast</button>
            </div>
          </div>
        </FocusZone>
      </FocusTrapZone>
    </div>
  );
};
