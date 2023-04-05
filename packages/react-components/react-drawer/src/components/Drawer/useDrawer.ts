import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useControllableState } from '@fluentui/react-utilities';
import { Dialog, DialogProps, DialogSurface } from '@fluentui/react-dialog';

import type { DrawerProps, DrawerState } from './Drawer.types';

/**
 * @internal
 * Create the state required to render DrawerDialog.
 * @param props - props from this instance of Drawer
 */
const useDrawerDialogProps = (props: DrawerProps) => {
  const { dialog, dialogSurface, open, onOpenChange, modal, children, style } = props;

  const dialogProps = React.useMemo(() => {
    return resolveShorthand(dialog, {
      required: true,
      defaultProps: {
        open,
        onOpenChange,
        modalType: modal ? 'modal' : 'non-modal',
        children,
      } as DialogProps,
    });
  }, [children, modal, onOpenChange, open, dialog]);

  const dialogSurfaceProps = React.useMemo(() => {
    return resolveShorthand(dialogSurface, {
      required: true,
      defaultProps: {
        children,
        style,
      },
    });
  }, [children, dialogSurface, style]);

  return {
    dialog: dialogProps,
    dialogSurface: dialogSurfaceProps,
  };
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

  const { dialog, dialogSurface } = useDrawerDialogProps({
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
