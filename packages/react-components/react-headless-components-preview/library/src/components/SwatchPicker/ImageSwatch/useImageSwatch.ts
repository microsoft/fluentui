'use client';

import type * as React from 'react';
import { useImageSwatchBase_unstable } from '@fluentui/react-swatch-picker';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';

export const useImageSwatch = (props: ImageSwatchProps, ref: React.Ref<HTMLButtonElement>): ImageSwatchState => {
  const state: ImageSwatchState = useImageSwatchBase_unstable(props, ref);

  return {
    ...state,
    root: {
      ...state.root,
      focusgroupstart: toDataAttributeValue(state.selected),
      'data-selected': toDataAttributeValue(state.selected),
      'data-disabled': toDataAttributeValue(props.disabled),
      style: {
        backgroundImage: `url("${props.src.replace(/["\\\n\r\f]/g, char => `\\${char.charCodeAt(0).toString(16)} `)}")`,
        ...props.style,
      },
    },
  };
};
