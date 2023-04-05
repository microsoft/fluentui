import * as React from 'react';
import { getNativeElementProps, useControllableState } from '@fluentui/react-utilities';
import { Dialog, DialogProps, DialogSurface } from '@fluentui/react-dialog';

import type { DrawerProps, DrawerState } from './Drawer.types';

/**
 * @internal
 * Create the state required to render DrawerDialog.
 * @param props - props from this instance of Drawer
 */
const useDrawerDialog = ({ open, onOpenChange, modal, children, style }: DrawerProps) => {
  const dialog = React.useMemo<DialogProps>(() => {
    return {
      open,
      onOpenChange,
      modalType: modal ? 'modal' : 'non-modal',
      children: <></>,
    };
  }, [modal, onOpenChange, open]);

  const dialogSurface = { children, style };

  return { dialog, dialogSurface };
};

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
    type = 'overlay',
    position = 'left',
    size = 'small',
    modal = true,
    open: initialOpen = false,
    defaultOpen: initialDefaultOpen = false,
  } = props;

  const [open] = useControllableState({
    state: initialOpen,
    defaultState: initialDefaultOpen,
    initialState: false,
  });

  const { dialog, dialogSurface } = useDrawerDialog({
    ...props,
    open,
    modal,
  });

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

    dialog,
    dialogSurface,

    type,
    open,
    position,
    size,
  };
};
