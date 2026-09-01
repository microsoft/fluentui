'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import type {
  ImageSwatchBaseProps,
  ImageSwatchBaseState,
  ImageSwatchProps,
  ImageSwatchState,
} from './ImageSwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

/**
 * Create the base state required to render unstyled ImageSwatch.
 *
 * The returned state can be modified with hooks before being passed to renderImageSwatch_unstable.
 *
 * @param props - props from this instance of ImageSwatch
 * @param ref - reference to root HTMLDivElement of ImageSwatch
 */
export const useImageSwatchBase_unstable = (
  props: ImageSwatchBaseProps,
  ref: React.Ref<HTMLButtonElement>,
): ImageSwatchBaseState => {
  const { src, value, onClick, style, ...rest } = props;
  const isGrid = useSwatchPickerContextValue_unstable(ctx => ctx.isGrid);

  const requestSelectionChange = useSwatchPickerContextValue_unstable(ctx => ctx.requestSelectionChange);
  const selected = useSwatchPickerContextValue_unstable(ctx => ctx.selectedValue === value);

  const role = isGrid ? 'gridcell' : 'radio';
  const ariaSelected = isGrid
    ? {
        'aria-selected': selected,
      }
    : { 'aria-checked': selected };

  const onImageSwatchClick = useEventCallback(
    mergeCallbacks(onClick, (event: React.MouseEvent<HTMLButtonElement>) =>
      requestSelectionChange(event, {
        selectedValue: value,
        selectedSwatch: src,
      }),
    ),
  );

  return {
    components: {
      root: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        role,
        ...ariaSelected,
        onClick: onImageSwatchClick,
        ...rest,
        style: {
          backgroundImage: `url(${src})`,
          ...style,
        },
      }),
      { elementType: 'button' },
    ),
    value,
    selected,
  };
};

/**
 * Create the state required to render ImageSwatch.
 *
 * The returned state can be modified with hooks such as useImageSwatchStyles_unstable,
 * before being passed to renderImageSwatch_unstable.
 *
 * @param props - props from this instance of ImageSwatch
 * @param ref - reference to root HTMLDivElement of ImageSwatch
 */
export const useImageSwatch_unstable = (
  props: ImageSwatchProps,
  ref: React.Ref<HTMLButtonElement>,
): ImageSwatchState => {
  const sizeFromContext = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shapeFromContext = useSwatchPickerContextValue_unstable(ctx => ctx.shape);

  const { size: _size, shape: _shape, ...rest } = props;

  const baseState = useImageSwatchBase_unstable(rest, ref);

  return {
    ...baseState,
    size: sizeFromContext,
    shape: shapeFromContext,
  };
};
