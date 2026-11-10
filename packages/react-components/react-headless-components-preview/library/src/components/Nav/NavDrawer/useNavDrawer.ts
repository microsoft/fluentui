'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import { Drawer } from '../../Drawer';
import { useNav } from '../useNav';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';

/**
 * Create the state required to render NavDrawer.
 *
 * Combines headless Nav state with a headless Drawer as root.
 *
 * @param props - props from this instance of NavDrawer
 * @param ref - reference to the root element of NavDrawer, which is either a `dialog` or a `div` depending on the Drawer type
 */
export const useNavDrawer = (
  props: NavDrawerProps,
  ref: React.Ref<HTMLDialogElement | HTMLDivElement>,
): NavDrawerState => {
  // The Drawer root is a `dialog` or a `div`, while the Nav state and the Drawer slot are typed for the `div` case.
  const divRef = ref as React.Ref<HTMLDivElement>;
  const navState = useNav(props, divRef);

  const type = props.type ?? 'overlay';

  const root: NavDrawerState['root'] = slot.always(
    { ref: divRef, ...props },
    {
      elementType: Drawer,
    },
  );

  root['data-type'] = type;

  return {
    ...navState,
    components: {
      root: Drawer,
    },
    root,
  };
};
