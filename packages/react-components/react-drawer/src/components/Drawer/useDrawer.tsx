import * as React from 'react';
import { getNativeElementProps, useControllableState } from '@fluentui/react-utilities';
import { Dialog, DialogSurface } from '@fluentui/react-dialog';

import type { DrawerProps, DrawerState } from './Drawer.types';

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
    size = 'small',
    open: initialOpen = false,
    defaultOpen: initialDefaultOpen = false,
    onOpenChange,
  } = props;

  const [open] = useControllableState({
    state: initialOpen,
    defaultState: initialDefaultOpen,
    initialState: false,
  });

  const customSizeStyle = React.useMemo(() => {
    if (typeof size === 'number') {
      return {
        style: {
          width: `${size}px`,
        },
      };
    }

    return null;
  }, [size]);

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
      open,
      onOpenChange,
      children: <></>,
    },

    dialogSurface: {
      children: props.children,
      ...customSizeStyle,
    },

    type,
    open,
    position,
    size,
  };
};
