import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorPicker_unstable } from './useColorPicker';
import { renderColorPicker_unstable } from './renderColorPicker';
import { useColorPickerStyles_unstable } from './useColorPickerStyles.styles';
import type { ColorPickerProps } from './ColorPicker.types';
import { useColorPickerContextValues } from '../../contexts/colorPicker';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ColorPicker component
 */
export const ColorPicker: ForwardRefComponent<ColorPickerProps> = React.forwardRef((props, ref) => {
  const state = useColorPicker_unstable(props, ref);
  const contextValues = useColorPickerContextValues(state);

  useColorPickerStyles_unstable(state);
  useCustomStyleHook_unstable('useColorPickerStyles_unstable')(state);

  return renderColorPicker_unstable(state, contextValues);
});

ColorPicker.displayName = 'ColorPicker';
