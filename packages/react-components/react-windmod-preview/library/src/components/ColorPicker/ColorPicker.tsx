'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderColorPicker,
  useColorPicker,
  useColorPickerContextValues,
} from '@fluentui/react-headless-components-preview/color-picker';

import type { ColorPickerProps, ColorPickerState } from './ColorPicker.types';
import { useColorPickerStyles } from './useColorPickerStyles';

/**
 * A ColorPicker coordinates colour controls and reports their changes. Windmod ColorPicker: the
 * headless picker decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ColorPicker: ForwardRefComponent<ColorPickerProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // `shape` keeps no default: an unset one must reach the context as `undefined` so each control
  // resolves 'rounded' for itself, matching @fluentui/react-color-picker's styled picker.
  const { shape, ...rest } = props;

  // The headless state omits the look prop, so the context values must be built from the state
  // that carries it — otherwise the controls read `undefined` even when a shape was set.
  const state: ColorPickerState = {
    ...useColorPicker(rest, ref),
    shape,
  };
  const contextValues = useColorPickerContextValues(state);

  return renderColorPicker(useColorPickerStyles(state), contextValues);
});

ColorPicker.displayName = 'ColorPicker';
