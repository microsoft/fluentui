import * as React from 'react';
import { getNativeElementProps, useControllableState } from '@fluentui/react-utilities';
import { Dialog, DialogProps, DialogSurface, DialogSurfaceProps } from '@fluentui/react-dialog';

import type { DrawerProps, DrawerState } from './Drawer.types';

/**
 * @internal
 * Create the state required to render DrawerDialog.
 * @param props - props from this instance of Drawer
 */
const useDrawerDialog = ({ size, open, onOpenChange, modal, children }: DrawerProps) => {
  const dialog = React.useMemo<DialogProps>(() => {
    return {
      open,
      onOpenChange,
      modalType: modal ? 'modal' : 'non-modal',
      children: <></>,
    };
  }, [modal, onOpenChange, open]);

  const dialogSurface = React.useMemo(() => {
    const surfaceProps: DialogSurfaceProps = {
      children,
    };

    if (typeof size === 'number') {
      surfaceProps.style = {
        width: `${size}px`,
      };
    }

    return surfaceProps;
  }, [children, size]);

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
    open: initialOpen = false,
    defaultOpen: initialDefaultOpen = false,
  } = props;

  const [open] = useControllableState({
    state: initialOpen,
    defaultState: initialDefaultOpen,
    initialState: false,
  });

  const { dialog, dialogSurface } = useDrawerDialog(props);

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
