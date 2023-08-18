import * as React from 'react';
import { getNativeElementProps, useControllableState, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useMotion } from '@fluentui/react-motion-preview';
import type { DrawerInlineProps, DrawerInlineState } from './DrawerInline.types';
import { useBaseDrawerDefaultProps } from '../../util/useBaseDrawerDefaultProps';

/**
 * Create the state required to render DrawerInline.
 *
 * The returned state can be modified with hooks such as useDrawerInlineStyles_unstable,
 * before being passed to renderDrawerInline_unstable.
 *
 * @param props - props from this instance of DrawerInline
 * @param ref - reference to root HTMLElement of DrawerInline
 */
export const useDrawerInline_unstable = (
  props: DrawerInlineProps,
  ref: React.Ref<HTMLDivElement>,
): DrawerInlineState => {
  const { size, position } = useBaseDrawerDefaultProps(props);

  const [open] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const { separator = false, motion = open } = props;

  const drawerMotion = useMotion(motion);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, drawerMotion.ref),
        ...props,
      }),
      { elementType: 'div' },
    ),

    motion: drawerMotion,
    size,
    position,
    separator,
  };
};
