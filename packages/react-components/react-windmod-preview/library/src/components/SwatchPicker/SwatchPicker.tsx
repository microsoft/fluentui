'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderSwatchPicker,
  useSwatchPicker,
  useSwatchPickerContextValues,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { SwatchPickerProps } from './SwatchPicker.types';
import { useSwatchPickerStyles } from './useSwatchPickerStyles';

/**
 * A SwatchPicker lets a user pick one colour or image from a set. Windmod SwatchPicker: the
 * headless swatch picker decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const SwatchPicker: ForwardRefComponent<SwatchPickerProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-swatch-picker's styled useSwatchPicker, which leaves `shape`
  // undefined: each swatch resolves 'square' for itself.
  ({ size = 'medium', shape, spacing = 'medium', ...rest }, ref) => {
    // The headless state omits all three look props, so the context values must be built from the
    // state that carries them — otherwise the swatches read `undefined` instead of the picker's.
    const styled = useSwatchPickerStyles({
      ...useSwatchPicker(rest, ref),
      size,
      shape,
      spacing,
    });

    return renderSwatchPicker(styled, useSwatchPickerContextValues(styled));
  },
);

SwatchPicker.displayName = 'SwatchPicker';
