import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';
import { useColorSwatchState_unstable } from './useImageSwatchState';
import { useFocusWithin } from '@fluentui/react-tabster';

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
  const { selected = false, icon } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  const state: ImageSwatchState = {
    components: {
      root: 'button',
      icon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        ...props,
        role: props.role ?? 'gridcell',
        tabIndex: 0,
        'aria-selected': selected,
      }),
      { elementType: 'button' },
    ),
    icon: iconShorthand,
  };

  state.root.ref = useMergedRefs(state.root.ref, useFocusWithin<HTMLButtonElement>());
  state.selected = props.selected;

  useColorSwatchState_unstable(state, props);
  return state;
};
