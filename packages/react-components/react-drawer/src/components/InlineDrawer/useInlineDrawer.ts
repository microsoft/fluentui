import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import { useMotion } from '@fluentui/react-motion-preview';

import type { InlineDrawerProps, InlineDrawerState } from './InlineDrawer.types';
import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';

/**
 * Create the state required to render InlineDrawer.
 *
 * The returned state can be modified with hooks such as useInlineDrawerStyles_unstable,
 * before being passed to renderInlineDrawer_unstable.
 *
 * @param props - props from this instance of InlineDrawer
 * @param ref - reference to root HTMLElement of InlineDrawer
 */
export const useInlineDrawer_unstable = (props: InlineDrawerProps, ref: React.Ref<HTMLElement>): InlineDrawerState => {
  const { size, position, open } = useDrawerDefaultProps(props);
  const { separator = false } = props;

  const motion = useMotion<HTMLElement>(open);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
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
