import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { EmptySwatchProps, EmptySwatchState } from './EmptySwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

/**
 * Create the state required to render EmptySwatch.
 *
 * The returned state can be modified with hooks such as useEmptySwatchStyles_unstable,
 * before being passed to renderEmptySwatch_unstable.
 *
 * @param props - props from this instance of EmptySwatch
 * @param ref - reference to root HTMLDivElement of EmptySwatch
 */
export const useEmptySwatch_unstable = (
  props: EmptySwatchProps,
  ref: React.Ref<HTMLButtonElement>,
): EmptySwatchState => {
  const { size, shape, ...rest } = props;
  const _size = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const _shape = useSwatchPickerContextValue_unstable(ctx => ctx.shape);
  const isGrid = useSwatchPickerContextValue_unstable(ctx => ctx.isGrid);

  const role = isGrid ? 'gridcell' : 'radio';
  const a11yProps = isGrid ? {} : { 'aria-checked': false };
  return {
    components: {
      root: 'button',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        role,
        ...a11yProps,
        ...rest,
      }),
      { elementType: 'button' },
    ),
    size: size ?? _size,
    shape: shape ?? _shape,
  };
};
