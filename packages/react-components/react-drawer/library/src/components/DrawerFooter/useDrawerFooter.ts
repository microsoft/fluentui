import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import type { DrawerFooterProps, DrawerFooterState } from './DrawerFooter.types';
import { useDrawerContext_unstable } from '../../contexts/drawerContext';

/**
 * Create the state required to render DrawerFooter.
 *
 * The returned state can be modified with hooks such as useDrawerFooterStyles_unstable,
 * before being passed to renderDrawerFooter_unstable.
 *
 * @param props - props from this instance of DrawerFooter
 * @param ref - reference to root HTMLElement of DrawerFooter
 */
export const useDrawerFooter_unstable = (props: DrawerFooterProps, ref: React.Ref<HTMLElement>): DrawerFooterState => {
  const { scrollState } = useDrawerContext_unstable();

  return {
    components: {
      root: 'footer',
    },

    root: slot.always(
      getIntrinsicElementProps('footer', {
        ref,
        ...props,
      }),
      { elementType: 'footer' },
    ),

    scrollState,
  };
};
