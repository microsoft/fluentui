'use client';

import * as React from 'react';
import { ProhibitedFilled } from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import {
  useColorSwatch as useColorSwatchBase,
  useSwatchPickerContextValue,
} from '@fluentui/react-headless-components-preview/swatch-picker';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';

export const useColorSwatch = (props: ColorSwatchProps, ref: React.Ref<HTMLButtonElement>): ColorSwatchState => {
  const sizeFromContext = useSwatchPickerContextValue(context => context.size);
  const shapeFromContext = useSwatchPickerContextValue(context => context.shape);
  const { size = sizeFromContext ?? 'medium', shape = shapeFromContext ?? 'square', disabledIcon, ...rest } = props;
  const state = useColorSwatchBase({ ...rest, disabledIcon }, ref);

  return {
    ...state,
    size,
    shape,
    disabledIcon: slot.optional(disabledIcon, {
      defaultProps: { ...state.disabledIcon, children: <ProhibitedFilled /> },
      renderByDefault: true,
      elementType: 'span',
    }),
    root: {
      ...state.root,
      'data-size': size,
      'data-shape': shape,
    },
  };
};
