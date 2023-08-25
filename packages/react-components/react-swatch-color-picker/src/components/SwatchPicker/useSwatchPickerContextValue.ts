import * as React from 'react';
import type { SwatchPickerContextValues, SwatchPickerState } from './SwatchPicker.types';

export function useSwatchPickerContextValues_unstable(state: SwatchPickerState): SwatchPickerContextValues {
  const { shape, size } = state;

  const swatchPicker = React.useMemo(() => {
    return { shape, size };
  }, [shape, size]);

  return { swatchPicker };
}
