import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorPicker_unstable } from './useColorPicker';
import { renderColorPicker_unstable } from './renderColorPicker';
import { useColorPickerStyles_unstable } from './useColorPickerStyles.styles';
import type { ColorPickerProps } from './ColorPicker.types';

/**
 * ColorPicker component - TODO: add more docs
 */
export const ColorPicker: ForwardRefComponent<ColorPickerProps> = React.forwardRef((props, ref) => {
  const state = useColorPicker_unstable(props, ref);

  useColorPickerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useColorPickerStyles_unstable')(state);
  return renderColorPicker_unstable(state);
});

ColorPicker.displayName = 'ColorPicker';
