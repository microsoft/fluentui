'use client';

import type * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { useSwatchPickerBase_unstable } from '@fluentui/react-swatch-picker';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';
import { useFocusgroupPolyfill } from '../../hooks/focusgroup';

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

    // eslint-disable-next-line react-hooks/immutability
    baseState.root.focusgroup = baseState.selectedValue ? `${behavior} nomemory` : behavior;
  }

  const focusgroupRef = useFocusgroupPolyfill(baseState.root.focusgroup);
  // eslint-disable-next-line react-hooks/immutability
  baseState.root.ref = useMergedRefs(baseState.root.ref, focusgroupRef);

  return baseState;
};
