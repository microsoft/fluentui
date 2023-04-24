import * as React from 'react';
import { getNativeElementProps, useControllableState } from '@fluentui/react-utilities';
import { DialogProps } from '@fluentui/react-dialog';

import type { DrawerProps, DrawerState } from './Drawer.types';

const getModalType = (modal?: DrawerProps['modal'], lightDismiss?: DrawerProps['lightDismiss']) => {
  if (!modal) {
    return 'non-modal';
  }

  if (!lightDismiss) {
    return 'alert';
  }

  return 'modal';
};

/**
 * @internal
 * Create the state required to render DrawerDialog.
 * @param props - props from this instance of Drawer
 */
const useDrawerDialogProps = (props: DrawerProps) => {
  const { open, onOpenChange, modal, children, lightDismiss, ...otherProps } = props;

  const dialogProps = React.useMemo(() => {
    return {
      modalType: getModalType(modal, lightDismiss),
      open,
      onOpenChange,
      children,
    } as DialogProps;
  }, [children, lightDismiss, modal, onOpenChange, open]);

  const dialogSurfaceProps = React.useMemo(() => {
    return {
      ...otherProps,
      children,
    };
  }, [children, otherProps]);

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
    lightDismiss = true,
    separator = false,
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
    lightDismiss,
    open,
    modal,
  });

  return {
    components: {
      root: 'div',
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
    separator,
  };
};
