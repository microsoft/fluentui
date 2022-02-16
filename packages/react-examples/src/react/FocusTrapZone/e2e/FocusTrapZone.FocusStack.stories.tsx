import * as React from 'react';
import { FocusTrapZone } from '@fluentui/react';
import type { FTZTestWindow } from './shared';

/**
 * It maintains a proper stack of FocusTrapZones as more are mounted/unmounted
 */
export const FocusStack = () => {
  // Whether to show each FocusTrapZone
  const [showFTZ, setShowFTZ] = React.useState([true, false, false, false, false]);

  (window as FTZTestWindow).getFocusStack = () => FocusTrapZone.focusStack;
  (window as FTZTestWindow).setShown = (num, show) => {
    setShowFTZ(prevValue => {
      const newValue = [...prevValue];
      newValue[num] = show;
      return newValue;
    });
  };

  return (
    <div>
      <FocusTrapZone id="ftz0" forceFocusInsideTrap isClickableOutsideFocusTrap={false}>
        ftz0
      </FocusTrapZone>

      {/* these aren't rendered with map() due to slight prop differences */}
      {showFTZ[1] && (
        <FocusTrapZone id="ftz1" forceFocusInsideTrap isClickableOutsideFocusTrap={false}>
          ftz1
        </FocusTrapZone>
      )}
      {showFTZ[2] && (
        <FocusTrapZone id="ftz2" forceFocusInsideTrap isClickableOutsideFocusTrap={false}>
          ftz2
        </FocusTrapZone>
      )}
      {showFTZ[3] && (
        <FocusTrapZone id="ftz3" forceFocusInsideTrap={false} isClickableOutsideFocusTrap={false}>
          ftz3
        </FocusTrapZone>
      )}
      {showFTZ[4] && (
        <FocusTrapZone id="ftz4" forceFocusInsideTrap isClickableOutsideFocusTrap={false} disabled>
          ftz4
        </FocusTrapZone>
      )}
    </div>
  );
};
