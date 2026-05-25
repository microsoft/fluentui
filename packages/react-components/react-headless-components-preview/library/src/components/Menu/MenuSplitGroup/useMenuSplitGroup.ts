'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';
import type { MenuSplitGroupProps, MenuSplitGroupState } from '@fluentui/react-menu';

/**
 * Headless `useMenuSplitGroup`.
 * Renders a `role="group"` div and wires the consumer ref.
 */
export const useMenuSplitGroup = (props: MenuSplitGroupProps, ref: React.Ref<HTMLElement>): MenuSplitGroupState => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  return {
    components: {
      root: 'div',
    },
    setMultiline: NOOP_SET_MULTILINE,
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME: `ref` is wrongly typed as `Ref<HTMLElement>` instead of
        // `Ref<HTMLDivElement>` upstream; casting to keep behaviour aligned.
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
        role: 'group',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};

const NOOP_SET_MULTILINE = () => {
  /* no-op: multiline attribute is a styling concern handled by consumers. */
};
