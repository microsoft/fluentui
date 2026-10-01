'use client';

import type * as React from 'react';
import { useSwatchPickerBase_unstable } from '@fluentui/react-swatch-picker';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';

export {
  useSwatchPickerContextValues,
  useSwatchPickerContextValue_unstable as useSwatchPickerContextValue,
} from '@fluentui/react-swatch-picker';

export const useSwatchPicker = (props: SwatchPickerProps, ref: React.Ref<HTMLDivElement>): SwatchPickerState => {
  const { focusMode = 'arrow', layout = 'row' } = props;

  const baseState: SwatchPickerState = useSwatchPickerBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  baseState.root['data-layout'] = layout;

  if (focusMode === 'arrow') {
    const behavior = baseState.isGrid ? 'grid manual rowflow' : 'radiogroup';

    // While a value is selected, re-entry must land on the selected swatch (marked with
    // `focusgroupstart`) rather than the last focused one, so focus memory is turned off.
    // eslint-disable-next-line react-hooks/immutability
    baseState.root.focusgroup = baseState.selectedValue ? `${behavior} nomemory` : behavior;
  }

  return baseState;
};
