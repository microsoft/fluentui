import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';
import { swatchCSSVars } from './useImageSwatchStyles.styles';

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
  const { src, value, ...rest } = props;
  const size = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shape = useSwatchPickerContextValue_unstable(ctx => ctx.shape);

  const requestSelectionChange = useSwatchPickerContextValue_unstable(ctx => ctx.requestSelectionChange);
  const selected = useSwatchPickerContextValue_unstable(ctx => ctx.selectedValue === value);

  const onClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) =>
    requestSelectionChange(event, {
      selectedValue: value,
      selectedColor: src,
    }),
  );

  const rootVariables = {
    [swatchCSSVars.imageSrc]: `url(${src})`,
  };

  const state: ImageSwatchState = {
    components: {
      root: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        onClick,
        ...rest,
      }),
      { elementType: 'button' },
    ),
    value,
    selected,
    size,
    shape,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
