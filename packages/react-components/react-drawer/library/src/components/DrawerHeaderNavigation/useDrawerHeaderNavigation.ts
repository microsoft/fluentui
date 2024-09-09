import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import type { DrawerHeaderNavigationProps, DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

/**
 * Create the state required to render DrawerHeaderNavigation.
 *
 * The returned state can be modified with hooks such as useDrawerHeaderNavigationStyles_unstable,
 * before being passed to renderDrawerHeaderNavigation_unstable.
 *
 * @param props - props from this instance of DrawerHeaderNavigation
 * @param ref - reference to root HTMLElement of DrawerHeaderNavigation
 */
export const useDrawerHeaderNavigation_unstable = (
  props: DrawerHeaderNavigationProps,
  ref: React.Ref<HTMLElement>,
): DrawerHeaderNavigationState => {
  return {
    components: {
      root: 'nav',
    },

    root: slot.always(
      getIntrinsicElementProps('nav', {
        ref,
        ...props,
      }),
      { elementType: 'nav' },
    ),
  };
};
