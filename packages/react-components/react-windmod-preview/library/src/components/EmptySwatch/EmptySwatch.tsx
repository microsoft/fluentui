'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderEmptySwatch,
  useEmptySwatch,
  useSwatchPickerContextValue,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { EmptySwatchProps } from './EmptySwatch.types';
import { useEmptySwatchStyles } from './useEmptySwatchStyles';

/**
 * An EmptySwatch is the dashed placeholder slot inside a SwatchPicker. Windmod EmptySwatch: the
 * headless empty swatch decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const EmptySwatch: ForwardRefComponent<EmptySwatchProps> = React.forwardRef(
  ({ size: sizeProp, shape: shapeProp, ...rest }, ref) => {
    const sizeFromContext = useSwatchPickerContextValue(ctx => ctx.size);
    const shapeFromContext = useSwatchPickerContextValue(ctx => ctx.shape);

    const state = useEmptySwatch(rest, ref);
    const styled = useEmptySwatchStyles({
      ...state,
      size: sizeProp ?? sizeFromContext ?? 'medium',
      shape: shapeProp ?? shapeFromContext ?? 'square',
    });

    return renderEmptySwatch(styled);
  },
);

EmptySwatch.displayName = 'EmptySwatch';
