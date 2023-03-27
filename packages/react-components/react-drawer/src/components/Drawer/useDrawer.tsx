import * as React from 'react';
import { getNativeElementProps, useControllableState } from '@fluentui/react-utilities';
import { Dialog, DialogSurface } from '@fluentui/react-dialog';

import type { DrawerProps, DrawerState } from './Drawer.types';
import { usePresence } from './usePresence';

/**
 * Create the state required to render Drawer.
 *
 * The returned state can be modified with hooks such as useDrawerStyles_unstable,
 * before being passed to renderDrawer_unstable.
 *
 * @param props - props from this instance of Drawer
 * @param ref - reference to root HTMLElement of Drawer
 */
export const useDrawer_unstable = (props: DrawerProps, ref: React.Ref<HTMLElement>): DrawerState => {
  const {
    type = 'temporary',
    position = 'left',
    open: initialOpen = false,
    defaultOpen: initialDefaultOpen = false,
    onOpenChange,
  } = props;

  const [open] = useControllableState({
    state: initialOpen,
    defaultState: initialDefaultOpen,
    initialState: false,
  });

  const { visible, mounted, animating } = usePresence(open, { duration: 200 });

  return {
    components: {
      root: 'div',
      dialog: Dialog,
      dialogSurface: DialogSurface,
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),

    dialog: {
      open: open ? open : animating,
      onOpenChange,
      children: <></>,
    },

    dialogSurface: {
      children: props.children,
    },

    type,
    open,
    position,

    isVisible: visible,
    isMounted: mounted,
  };
};
