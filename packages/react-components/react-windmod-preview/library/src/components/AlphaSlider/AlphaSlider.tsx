'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderAlphaSlider,
  useAlphaSlider,
  useColorPickerContextValue,
} from '@fluentui/react-headless-components-preview/color-picker';

import type { AlphaSliderProps } from './AlphaSlider.types';
import { useAlphaSliderStyles } from './useAlphaSliderStyles';

/**
 * An AlphaSlider picks the alpha channel of a colour. Windmod AlphaSlider: the headless slider
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The per-instance colour and geometry are inline custom properties the headless base hook writes —
 * see `ColorArea` for the rule the windmod layer follows around them.
 */
export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = React.forwardRef(
  ({ shape: shapeProp, ...rest }, ref) => {
    const shapeFromContext = useColorPickerContextValue(ctx => ctx.shape);

    const state = useAlphaSlider(rest, ref);
    const styled = useAlphaSliderStyles({
      ...state,
      // The trailing fallback, not the context default, is what resolves `shape` — see `ColorArea`.
      shape: shapeProp ?? shapeFromContext ?? 'rounded',
    });

    return renderAlphaSlider(styled);
  },
);

AlphaSlider.displayName = 'AlphaSlider';
