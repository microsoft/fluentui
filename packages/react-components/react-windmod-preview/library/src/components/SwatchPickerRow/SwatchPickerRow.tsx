'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderSwatchPickerRow,
  useSwatchPickerContextValue,
  useSwatchPickerRow,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { SwatchPickerRowProps } from './SwatchPickerRow.types';
import { useSwatchPickerRowStyles } from './useSwatchPickerRowStyles';

/**
 * A SwatchPickerRow groups one row of swatches inside a grid-layout SwatchPicker. Windmod
 * SwatchPickerRow: the headless row decorated with the Fluent visual contract.
 *
 * The spacing fallback is reachable both standalone and under a headless SwatchPicker, which
 * publishes no spacing to its children.
 */
export const SwatchPickerRow: ForwardRefComponent<SwatchPickerRowProps> = React.forwardRef((props, ref) => {
  const spacing = useSwatchPickerContextValue(ctx => ctx.spacing) ?? 'medium';

  return renderSwatchPickerRow(
    useSwatchPickerRowStyles({
      ...useSwatchPickerRow(props, ref),
      spacing,
    }),
  );
});

SwatchPickerRow.displayName = 'SwatchPickerRow';
