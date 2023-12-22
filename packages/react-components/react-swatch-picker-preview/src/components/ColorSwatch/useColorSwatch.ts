import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { useColorSwatchState_unstable } from './useColorSwatchState';
import { useFocusWithin } from '@fluentui/react-tabster';

/**
 * Create the state required to render ColorSwatch.
 *
 * The returned state can be modified with hooks such as useColorSwatchStyles_unstable,
 * before being passed to renderColorSwatch_unstable.
 *
 * @param props - props from this instance of ColorSwatch
 * @param ref - reference to root HTMLDivElement of ColorSwatch
 */
export const useColorSwatch_unstable = (
  props: ColorSwatchProps,
  ref: React.Ref<HTMLButtonElement>,
): ColorSwatchState => {
  const state: ColorSwatchState = {
    components: {
      root: 'button',
      icon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        ...props,
        role: 'gridcell',
        tabIndex: 0,
        'aria-selected': false,
      }),
      { elementType: 'button' },
    ),
  };

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLButtonElement>());

  useColorSwatchState_unstable(state, props);
  return state;
};
