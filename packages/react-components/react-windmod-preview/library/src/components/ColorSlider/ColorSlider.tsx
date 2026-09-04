'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderColorSlider,
  useColorPickerContextValue,
  useColorSlider,
} from '@fluentui/react-headless-components-preview/color-picker';

import type { ColorSliderProps } from './ColorSlider.types';
import { useColorSliderStyles } from './useColorSliderStyles';

/**
 * A ColorSlider picks one channel of a colour. Windmod ColorSlider: the headless slider decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The per-instance colour and geometry are inline custom properties the headless base hook writes —
 * see `ColorArea` for the rule the windmod layer follows around them.
 */
export const ColorSlider: ForwardRefComponent<ColorSliderProps> = React.forwardRef(
  ({ shape: shapeProp, ...rest }, ref) => {
    const shapeFromContext = useColorPickerContextValue(ctx => ctx.shape);

    const state = useColorSlider(rest, ref);
    const styled = useColorSliderStyles({
      ...state,
      // The trailing fallback, not the context default, is what resolves `shape` — see `ColorArea`.
      shape: shapeProp ?? shapeFromContext ?? 'rounded',
    });

    return renderColorSlider(styled);
  },
);

ColorSlider.displayName = 'ColorSlider';
