'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderColorArea,
  useColorArea,
  useColorPickerContextValue,
} from '@fluentui/react-headless-components-preview/color-picker';

import type { ColorAreaProps } from './ColorArea.types';
import { useColorAreaStyles } from './useColorAreaStyles';

/**
 * A ColorArea picks saturation and value together. Windmod ColorArea: the headless area decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The per-instance colour and thumb position are inline custom properties the headless base hook
 * writes; the windmod layer never writes to, re-orders or merges into that style — the module
 * reads them.
 */
export const ColorArea: ForwardRefComponent<ColorAreaProps> = React.forwardRef(({ shape: shapeProp, ...rest }, ref) => {
  const shapeFromContext = useColorPickerContextValue(ctx => ctx.shape);

  const state = useColorArea(rest, ref);
  const styled = useColorAreaStyles({
    ...state,
    // The context's own default value applies only with no picker at all, so a picker that leaves
    // `shape` unset publishes undefined and the trailing fallback is what resolves it.
    shape: shapeProp ?? shapeFromContext ?? 'rounded',
  });

  return renderColorArea(styled);
});

ColorArea.displayName = 'ColorArea';
