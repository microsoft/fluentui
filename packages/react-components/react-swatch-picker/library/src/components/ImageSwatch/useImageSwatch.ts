import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

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
  const { src, value, onClick, style, ...rest } = props;
  const size = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shape = useSwatchPickerContextValue_unstable(ctx => ctx.shape);
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
    size,
    shape,
  };
};
