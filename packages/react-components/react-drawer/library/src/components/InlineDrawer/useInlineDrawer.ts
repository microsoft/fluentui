import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import type { InlineDrawerProps, InlineDrawerState } from './InlineDrawer.types';
import { useDrawerDefaultProps } from '../../shared/useDrawerDefaultProps';

const STATIC_MOTION = {
  active: true,
  canRender: true,
  ref: React.createRef<HTMLDivElement>(),
  type: 'idle' as const,
};

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

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        ref,
      }),
      { elementType: 'div' },
    ),

    open,
    size,
    position,
    separator,

    // Deprecated props
    motion: STATIC_MOTION,
  };
};
