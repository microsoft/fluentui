'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SwatchPickerProps } from './SwatchPicker.types';
import { renderSwatchPicker } from './renderSwatchPicker';
import { useSwatchPicker, useSwatchPickerContextValues } from './useSwatchPicker';
import { useSwatchPickerStyles } from './useSwatchPickerStyles.styles';

export const SwatchPicker: ForwardRefComponent<SwatchPickerProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPicker(props, ref);
  const contextValues = useSwatchPickerContextValues(state);
  useSwatchPickerStyles(state);
  return renderSwatchPicker(state, contextValues);
});

SwatchPicker.displayName = 'SwatchPicker';
