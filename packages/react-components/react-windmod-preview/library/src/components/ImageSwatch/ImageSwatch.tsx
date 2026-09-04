'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderImageSwatch,
  useImageSwatch,
  useSwatchPickerContextValue,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { ImageSwatchProps } from './ImageSwatch.types';
import { useImageSwatchStyles } from './useImageSwatchStyles';

/**
 * An ImageSwatch is one selectable image inside a SwatchPicker. Windmod ImageSwatch: the headless
 * image swatch decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * Size and shape come from the picker context only; the underlying hook accepts neither as a
 * per-swatch override, unlike ColorSwatch and EmptySwatch.
 */
export const ImageSwatch: ForwardRefComponent<ImageSwatchProps> = React.forwardRef((props, ref) => {
  const size = useSwatchPickerContextValue(ctx => ctx.size) ?? 'medium';
  const shape = useSwatchPickerContextValue(ctx => ctx.shape) ?? 'square';

  const state = useImageSwatch(props, ref);
  const styled = useImageSwatchStyles({
    ...state,
    size,
    shape,
  });

  return renderImageSwatch(styled);
});

ImageSwatch.displayName = 'ImageSwatch';
