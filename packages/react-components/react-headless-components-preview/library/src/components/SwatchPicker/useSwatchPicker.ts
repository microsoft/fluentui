'use client';

import type * as React from 'react';
import { useSwatchPickerBase_unstable } from '@fluentui/react-swatch-picker';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';

export {
  useSwatchPickerContextValues,
  useSwatchPickerContextValue_unstable as useSwatchPickerContextValue,
} from '@fluentui/react-swatch-picker';

export const useSwatchPicker = (props: SwatchPickerProps, ref: React.Ref<HTMLDivElement>): SwatchPickerState => {
  const { focusMode = 'arrow' } = props;

  const baseState: SwatchPickerState = useSwatchPickerBase_unstable(props, ref);

  if (focusMode === 'arrow') {
    // eslint-disable-next-line react-hooks/immutability
    baseState.root['focusgroup'] = baseState.isGrid ? 'grid' : 'radiogroup';
  }

  return baseState;
};
