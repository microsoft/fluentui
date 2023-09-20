import * as React from 'react';
import type { SwatchPickerContextValues, SwatchPickerState } from './SwatchPicker.types';

export function useSwatchPickerContextValues_unstable(state: SwatchPickerState): SwatchPickerContextValues {
  const { shape, size, selectedId } = state;

  const swatchPicker = React.useMemo(() => {
    return { shape, size, selectedId };
  }, [shape, size, selectedId]);

  return { swatchPicker };
}
