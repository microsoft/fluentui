import * as React from 'react';
import { FocusTrapZone } from '@fluentui/react';
import { useGlobal } from '../../../e2e/utils';
import { FTZTestGlobals } from './types';
import { rootClass } from './shared';

/**
 * It maintains a proper stack of FocusTrapZones as more are mounted/unmounted
 */
export const FocusStack = () => {
  // Whether to render each FocusTrapZone
  const [shouldRender, setShouldRender] = React.useState([true, false, false, false, false]);

  const updateFTZ = (num: 1 | 2 | 3 | 4, newValue: boolean) => {
    setShouldRender(prevValues => {
      const newValues = [...prevValues];
      newValues[num] = newValue;
      return newValues;
    });
  };

  useGlobal<FTZTestGlobals>('getFocusStack', () => FocusTrapZone.focusStack);

  return (
    <div className={rootClass}>
      <FocusTrapZone id="ftz0">
        ftz0
        <button onClick={() => updateFTZ(1, true)}>add ftz1</button>
        <button onClick={() => updateFTZ(3, true)}>add ftz3</button>
        <button onClick={() => updateFTZ(4, true)}>add ftz4</button>
      </FocusTrapZone>

      {shouldRender[1] && (
        <FocusTrapZone id="ftz1">
          ftz1
          <button onClick={() => updateFTZ(2, true)}>add ftz2</button>
        </FocusTrapZone>
      )}
      {shouldRender[2] && (
        <FocusTrapZone id="ftz2">
          ftz2
          <button onClick={() => updateFTZ(1, false)}>remove ftz1</button>
          <button onClick={() => updateFTZ(2, false)}>remove ftz2</button>
        </FocusTrapZone>
      )}
      {shouldRender[3] && (
        <FocusTrapZone id="ftz3" forceFocusInsideTrap={false}>
          ftz3
          <button onClick={() => updateFTZ(3, false)}>remove ftz3</button>
        </FocusTrapZone>
      )}
      {shouldRender[4] && (
        <FocusTrapZone id="ftz4" disabled>
          ftz4
        </FocusTrapZone>
      )}
    </div>
  );
};
