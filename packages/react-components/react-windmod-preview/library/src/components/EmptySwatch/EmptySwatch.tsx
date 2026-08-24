'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderEmptySwatch,
  useEmptySwatch,
  useSwatchPickerContextValue,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { EmptySwatchProps, EmptySwatchState } from './EmptySwatch.types';
import { useEmptySwatchStyles } from './useEmptySwatchStyles';

/**
 * An EmptySwatch is the dashed placeholder slot inside a SwatchPicker. Windmod EmptySwatch: the
 * headless empty swatch decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const EmptySwatch: ForwardRefComponent<EmptySwatchProps> = React.forwardRef((props, ref) => {
  const { size: sizeProp, shape: shapeProp, ...rest } = props;
  const sizeFromContext = useSwatchPickerContextValue(ctx => ctx.size);
  const shapeFromContext = useSwatchPickerContextValue(ctx => ctx.shape);

  const state: EmptySwatchState = {
    ...useEmptySwatch(rest, ref),
    size: sizeProp ?? sizeFromContext ?? 'medium',
    shape: shapeProp ?? shapeFromContext ?? 'square',
  };

  return renderEmptySwatch(useEmptySwatchStyles(state));
});

EmptySwatch.displayName = 'EmptySwatch';
