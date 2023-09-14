import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';

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
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
