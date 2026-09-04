'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderColorSwatch,
  useColorSwatch,
  useSwatchPickerContextValue,
} from '@fluentui/react-headless-components-preview/swatch-picker';
import { ProhibitedFilled } from '@fluentui/react-icons/headless/svg/prohibited';

import type { ColorSwatchProps } from './ColorSwatch.types';
import { useColorSwatchStyles } from './useColorSwatchStyles';

/**
 * A ColorSwatch is one selectable colour inside a SwatchPicker. Windmod ColorSwatch: the headless
 * colour swatch decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The per-instance colour is an inline style the headless base hook writes; the windmod layer
 * never writes to, re-orders or merges into it — the module reads the custom properties instead.
 */
export const ColorSwatch: ForwardRefComponent<ColorSwatchProps> = React.forwardRef((props, ref) => {
  const { size: sizeProp, shape: shapeProp, ...rest } = props;
  const sizeFromContext = useSwatchPickerContextValue(ctx => ctx.size);
  const shapeFromContext = useSwatchPickerContextValue(ctx => ctx.shape);

  // The headless hook builds the disabledIcon slot bare, so the default glyph is restored here.
  // renderByDefault materialises the slot when the prop is absent; slot.optional's own null check
  // still removes it for disabledIcon={null}. Only a disabled swatch renders the slot at all.
  const disabledIconSlot = slot.optional(props.disabledIcon, { renderByDefault: true, elementType: 'span' });

  const state = useColorSwatch(rest, ref);
  const styled = useColorSwatchStyles({
    ...state,
    size: sizeProp ?? sizeFromContext ?? 'medium',
    shape: shapeProp ?? shapeFromContext ?? 'square',
    disabledIcon: disabledIconSlot && {
      ...disabledIconSlot,
      children: disabledIconSlot.children ?? <ProhibitedFilled />,
    },
  });

  return renderColorSwatch(styled);
});

ColorSwatch.displayName = 'ColorSwatch';
