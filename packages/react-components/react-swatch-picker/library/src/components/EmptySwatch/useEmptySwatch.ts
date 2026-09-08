'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  EmptySwatchBaseProps,
  EmptySwatchBaseState,
  EmptySwatchProps,
  EmptySwatchState,
} from './EmptySwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';

/**
 * Create the base state required to render unstyled EmptySwatch.
 *
 * The returned state can be modified with hooks before being passed to renderEmptySwatch_unstable.
 *
 * @param props - props from this instance of EmptySwatch
 * @param ref - reference to root HTMLDivElement of EmptySwatch
 */
export const useEmptySwatchBase_unstable = (
  props: EmptySwatchBaseProps,
  ref: React.Ref<HTMLButtonElement>,
): EmptySwatchBaseState => {
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
        ...props,
      }),
      { elementType: 'button' },
    ),
  };
};

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
  const sizeFromContext = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shapeFromContext = useSwatchPickerContextValue_unstable(ctx => ctx.shape);
  const { size = sizeFromContext, shape = shapeFromContext, ...rest } = props;

  const baseState = useEmptySwatchBase_unstable(rest, ref);

  return {
    ...baseState,
    size,
    shape,
  };
};
