'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorPickerProps } from './ColorPicker.types';
import { useColorPicker } from './useColorPicker';
import { useColorPickerContextValues } from './useColorPickerContextValues';
import { renderColorPicker } from './renderColorPicker';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Coordinates headless color controls and reports their color changes.
 */
export const ColorPicker: ForwardRefComponent<ColorPickerProps> = /*#__PURE__*/ composeComponent(
  'ColorPicker',
  useColorPicker,
  renderColorPicker,
  useColorPickerContextValues,
);
