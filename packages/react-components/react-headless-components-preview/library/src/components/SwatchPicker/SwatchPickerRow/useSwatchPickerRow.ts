'use client';

import type * as React from 'react';
import { useSwatchPickerRowBase_unstable } from '@fluentui/react-swatch-picker';
import type { SwatchPickerRowProps, SwatchPickerRowState } from './SwatchPickerRow.types';

export const useSwatchPickerRow = (
  props: SwatchPickerRowProps,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerRowState => {
  const state: SwatchPickerRowState = useSwatchPickerRowBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgrouprow = '';

  return state;
};
