import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import type { DrawerBodyProps, DrawerBodyState } from './DrawerBody.types';

/**
 * Create the state required to render DrawerBody.
 *
 * The returned state can be modified with hooks such as useDrawerBodyStyles_unstable,
 * before being passed to renderDrawerBody_unstable.
 *
 * @param props - props from this instance of DrawerBody
 * @param ref - reference to root HTMLElement of DrawerBody
 */
export const useDrawerBody_unstable = (props: DrawerBodyProps, ref: React.Ref<HTMLElement>): DrawerBodyState => {
  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
