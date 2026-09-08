'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorPickerProps } from './ColorPicker.types';
import { useColorPicker } from './useColorPicker';
import { useColorPickerContextValues } from './useColorPickerContextValues';
import { renderColorPicker } from './renderColorPicker';

/**
 * Coordinates headless color controls and reports their color changes.
 */
export const ColorPicker: ForwardRefComponent<ColorPickerProps> = React.forwardRef((props, ref) => {
  const state = useColorPicker(props, ref);
  const contextValues = useColorPickerContextValues(state);

  return renderColorPicker(state, contextValues);
});

ColorPicker.displayName = 'ColorPicker';
