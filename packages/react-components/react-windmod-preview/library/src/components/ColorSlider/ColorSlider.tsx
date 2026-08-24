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
 * The per-instance colour and geometry are inline custom properties the headless base hook writes;
 * the windmod layer never writes to, re-orders or merges into that style — the module reads them.
 */
export const ColorSlider: ForwardRefComponent<ColorSliderProps> = React.forwardRef(
  ({ shape: shapeProp, ...rest }, ref) => {
    const shapeFromContext = useColorPickerContextValue(ctx => ctx.shape);

    return renderColorSlider(
      useColorSliderStyles({
        ...useColorSlider(rest, ref),
        // The context's own default value applies only with no picker at all, so a picker that leaves
        // `shape` unset publishes undefined and the trailing fallback is what resolves it.
        shape: shapeProp ?? shapeFromContext ?? 'rounded',
      }),
    );
  },
);

ColorSlider.displayName = 'ColorSlider';
