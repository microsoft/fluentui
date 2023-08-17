import * as React from 'react';
import { getNativeElementProps, useControllableState, slot } from '@fluentui/react-utilities';
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
  const { open: innerOpen, defaultOpen, size, position } = useBaseDrawerDefaultProps(props);
  const { separator = false, motion: motionProp } = props;

  const [open] = useControllableState({
    state: innerOpen,
    defaultState: defaultOpen,
    initialState: false,
  });

  const motion = useMotion(
    motionProp || {
      presence: open,
      ref,
    },
  );

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getNativeElementProps('div', {
        ref: motion.ref,
        ...props,
      }),
      { elementType: 'div' },
    ),

    active: motion.active,
    motionState: motion.state,
    size,
    position,
    separator,
  };
};
