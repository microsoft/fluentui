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
 * The per-instance colour and geometry are inline custom properties the headless base hook writes;
 * the windmod layer never writes to, re-orders or merges into that style — the module reads them.
 */
export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = React.forwardRef(
  ({ shape: shapeProp, ...rest }, ref) => {
    const shapeFromContext = useColorPickerContextValue(ctx => ctx.shape);

    return renderAlphaSlider(
      useAlphaSliderStyles({
        ...useAlphaSlider(rest, ref),
        // The context's own default value applies only with no picker at all, so a picker that leaves
        // `shape` unset publishes undefined and the trailing fallback is what resolves it.
        shape: shapeProp ?? shapeFromContext ?? 'rounded',
      }),
    );
  },
);

AlphaSlider.displayName = 'AlphaSlider';
