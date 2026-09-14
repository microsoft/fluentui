'use client';

import type * as React from 'react';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ContextSelector, Context } from '@fluentui/react-context-selector';
import type { SwatchPickerProps } from '../components/SwatchPicker/SwatchPicker.types';

/**
 * The context through which individual color controls communicate with the picker.
 */
export type SwatchPickerContextValue = Pick<SwatchPickerProps, 'size' | 'shape' | 'spacing' | 'selectedValue'> & {
  /**
   * Whether layout is grid.
   */
  isGrid: boolean;

  /**
   * Callback used by ColorSwatch to request a change on it's selected state
   * Should be used to select ColorSwatch
   *
   * @internal
   */
  requestSelectionChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    data: { selectedValue: string; selectedSwatch: string },
  ) => void;
};

export const swatchPickerContextDefaultValue: SwatchPickerContextValue = {
  requestSelectionChange: () => {
    /*noop*/
  },
  isGrid: false,
  size: 'medium',
  shape: 'square',
  spacing: 'medium',
  selectedValue: undefined,
};

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

const SwatchPickerContext = createContext<SwatchPickerContextValue | undefined>(
  undefined,
) as Context<SwatchPickerContextValue>;

export const SwatchPickerProvider = SwatchPickerContext.Provider;

export const useSwatchPickerContextValue_unstable = <T>(selector: ContextSelector<SwatchPickerContextValue, T>): T =>
  useContextSelector(SwatchPickerContext, (ctx = swatchPickerContextDefaultValue) => selector(ctx));
