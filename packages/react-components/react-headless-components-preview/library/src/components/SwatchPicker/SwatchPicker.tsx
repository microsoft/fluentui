'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { SwatchPickerProps } from './SwatchPicker.types';
import { useSwatchPicker, useSwatchPickerContextValues } from './useSwatchPicker';
import { renderSwatchPicker } from './renderSwatchPicker';
import { composeComponent } from '../../utils/composeComponent';

/**
 * SwatchPicker represents a collection of swatches that can be selected. It is used
 * to display a set of colors or images for the user to choose from.
 */
export const SwatchPicker: ForwardRefComponent<SwatchPickerProps> = /*#__PURE__*/ composeComponent(
  'SwatchPicker',
  useSwatchPicker,
  renderSwatchPicker,
  useSwatchPickerContextValues,
);
