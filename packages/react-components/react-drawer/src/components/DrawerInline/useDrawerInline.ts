import * as React from 'react';
import { getNativeElementProps, useControllableState, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useMotion } from '@fluentui/react-motion-preview';

import type { DrawerInlineProps, DrawerInlineState } from './DrawerInline.types';
import { useDrawerDefaultProps } from '../../util/useDrawerDefaultProps';

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
  const { size, position, ...defaultProps } = useDrawerDefaultProps(props);
  const { separator = false } = props;

  const [open] = useControllableState({
    state: defaultProps.open,
    defaultState: defaultProps.defaultOpen,
    initialState: false,
  });

  const motion = useMotion<HTMLDivElement>(open);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getNativeElementProps('div', {
        ...props,
        ref: useMergedRefs(ref, motion.ref),
      }),
      { elementType: 'div' },
    ),

    size,
    position,
    separator,
    motion,
  };
};
