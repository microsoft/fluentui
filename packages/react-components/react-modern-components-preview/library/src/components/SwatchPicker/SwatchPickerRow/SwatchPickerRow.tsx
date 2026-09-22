'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SwatchPickerRowProps } from './SwatchPickerRow.types';
import { renderSwatchPickerRow } from './renderSwatchPickerRow';
import { useSwatchPickerRow } from './useSwatchPickerRow';
import { useSwatchPickerRowStyles } from './useSwatchPickerRowStyles.styles';

export const SwatchPickerRow: ForwardRefComponent<SwatchPickerRowProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPickerRow(props, ref);
  useSwatchPickerRowStyles(state);
  return renderSwatchPickerRow(state);
});

SwatchPickerRow.displayName = 'SwatchPickerRow';
