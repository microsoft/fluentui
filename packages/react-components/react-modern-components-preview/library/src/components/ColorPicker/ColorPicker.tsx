'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorPickerContextValues } from '@fluentui/react-headless-components-preview/color-picker';
import type { ColorPickerProps } from './ColorPicker.types';
import { renderColorPicker } from './renderColorPicker';
import { useColorPicker } from './useColorPicker';
import { useColorPickerStyles } from './useColorPickerStyles.styles';

export const ColorPicker: ForwardRefComponent<ColorPickerProps> = React.forwardRef((props, ref) => {
  const state = useColorPicker(props, ref);
  const contextValues = useColorPickerContextValues(state);
  useColorPickerStyles(state);

  return renderColorPicker(state, contextValues);
});

ColorPicker.displayName = 'ColorPicker';
