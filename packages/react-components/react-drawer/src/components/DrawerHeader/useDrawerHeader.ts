import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DrawerHeaderProps, DrawerHeaderState } from './DrawerHeader.types';

/**
 * Create the state required to render DrawerHeader.
 *
 * The returned state can be modified with hooks such as useDrawerHeaderStyles_unstable,
 * before being passed to renderDrawerHeader_unstable.
 *
 * @param props - props from this instance of DrawerHeader
 * @param ref - reference to root HTMLElement of DrawerHeader
 */
export const useDrawerHeader_unstable = (props: DrawerHeaderProps, ref: React.Ref<HTMLElement>): DrawerHeaderState => {
  return {
    components: {
      root: 'header',
    },

    root: getNativeElementProps('header', {
      ref,
      ...props,
    }),
  };
};
