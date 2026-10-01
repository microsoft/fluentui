'use client';

import type * as React from 'react';
import { useImage as useImageBase } from '@fluentui/react-headless-components-preview/image';
import type { ImageProps, ImageState } from './Image.types';

/**
 * Create the state required to render Image.
 */
export const useImage = (props: ImageProps, ref: React.Ref<HTMLImageElement>): ImageState => {
  const { bordered = false, block = false, fit = 'default', shadow = false, shape = 'square', ...rest } = props;
  const state = useImageBase(rest, ref);
  const hasExplicitSize =
    (state.root.height !== undefined && state.root.height !== null) ||
    (state.root.width !== undefined && state.root.width !== null);
  const fitFill = fit !== 'default' && !hasExplicitSize;

  return {
    ...state,
    root: {
      ...state.root,
      'data-block': block ? '' : undefined,
      'data-bordered': bordered ? '' : undefined,
      'data-fit': fit,
      'data-fit-fill': fitFill ? '' : undefined,
      'data-shadow': shadow ? '' : undefined,
      'data-shape': shape,
    },
    block,
    bordered,
    fit,
    shadow,
    shape,
  };
};
