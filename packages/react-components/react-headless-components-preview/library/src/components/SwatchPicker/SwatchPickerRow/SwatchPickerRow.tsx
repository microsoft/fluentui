'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SwatchPickerRowProps } from './SwatchPickerRow.types';
import { useSwatchPickerRow } from './useSwatchPickerRow';
import { renderSwatchPickerRow } from './renderSwatchPickerRow';

export const SwatchPickerRow: ForwardRefComponent<SwatchPickerRowProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPickerRow(props, ref);
  return renderSwatchPickerRow(state);
});

SwatchPickerRow.displayName = 'SwatchPickerRow';
