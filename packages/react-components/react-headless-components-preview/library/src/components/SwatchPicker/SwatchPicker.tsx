'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { SwatchPickerProps } from './SwatchPicker.types';
import { useSwatchPicker, useSwatchPickerContextValues } from './useSwatchPicker';
import { renderSwatchPicker } from './renderSwatchPicker';

/**
 * SwatchPicker represents a collection of swatches that can be selected. It is used
 * to display a set of colors or images for the user to choose from.
 */
export const SwatchPicker: ForwardRefComponent<SwatchPickerProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPicker(props, ref);
  const contextValues = useSwatchPickerContextValues(state);

  return renderSwatchPicker(state, contextValues);
});

SwatchPicker.displayName = 'SwatchPicker';
