'use client';

import type * as React from 'react';
import { useOverlayDrawer as useOverlayDrawerBase } from '@fluentui/react-headless-components-preview/drawer';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Slide } from '@fluentui/react-motion-components-preview';
import { slot } from '@fluentui/react-utilities';
import { Dialog } from '../../Dialog/Dialog/Dialog';
import type { DialogProps } from '../../Dialog/Dialog/Dialog.types';
import { DialogSurface } from '../../Dialog/DialogSurface/DialogSurface';
import type { OverlayDrawerProps, OverlayDrawerState } from './OverlayDrawer.types';

export const useOverlayDrawer = (props: OverlayDrawerProps, ref: React.Ref<HTMLDialogElement>): OverlayDrawerState => {
  const { size = 'small', surfaceMotion, ...rest } = props;
  const state = useOverlayDrawerBase(rest, ref);

  return {
    ...state,
    components: {
      dialog: Dialog,
      root: DialogSurface,
      surfaceMotion: Slide,
    },
    dialog: slot.always(
      {
        ...state.dialog,
        children: state.dialog.children as DialogProps['children'],
        surfaceMotion: null,
        unmountOnClose: false,
      },
      { elementType: Dialog },
    ),
    root: slot.always({ ...state.root, 'data-size': size }, { elementType: DialogSurface }),
    size,
    surfaceMotion: presenceMotionSlot(surfaceMotion, {
      elementType: Slide,
      defaultProps: {
        appear: state.unmountOnClose,
        outX: 'var(--fui-Drawer--motion-x)',
        outY: 'var(--fui-Drawer--motion-y)',
        unmountOnExit: state.unmountOnClose,
        visible: state.open,
      },
    }),
  };
};
