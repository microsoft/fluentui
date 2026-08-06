'use client';

import type * as React from 'react';
import { useSwatchPickerBase_unstable } from '@fluentui/react-swatch-picker';

import { useGridNavigation } from '../../hooks';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';

export {
  useSwatchPickerContextValues,
  useSwatchPickerContextValue_unstable as useSwatchPickerContextValue,
} from '@fluentui/react-swatch-picker';

export const useSwatchPicker = (props: SwatchPickerProps, ref: React.Ref<HTMLDivElement>): SwatchPickerState => {
  const { focusMode = 'arrow' } = props;

  const baseState: SwatchPickerState = useSwatchPickerBase_unstable(props, ref);

  const gridNavigationProps = useGridNavigation({
    circular: true,
    onFocus: baseState.root.onFocus,
    onKeyDown: baseState.root.onKeyDown,
  });
  const rowNavigationProps = { focusgroup: 'radiogroup' };

  if (focusMode === 'arrow') {
    // eslint-disable-next-line react-hooks/immutability
    baseState.root = {
      ...baseState.root,
      ...(baseState.isGrid ? gridNavigationProps : rowNavigationProps),
    };
  }

  return baseState;
};
