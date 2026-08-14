'use client';

import type * as React from 'react';
import { useImageSwatchBase_unstable } from '@fluentui/react-swatch-picker';
import { stringifyDataAttribute } from '../../../utils/stringifyDataAttribute';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';

export const useImageSwatch = (props: ImageSwatchProps, ref: React.Ref<HTMLButtonElement>): ImageSwatchState => {
  const state: ImageSwatchState = useImageSwatchBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};
