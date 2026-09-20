'use client';

import type * as React from 'react';
import {
  useDrawer as useDrawerBase,
  useDrawerBody as useDrawerBodyBase,
  useDrawerFooter as useDrawerFooterBase,
  useDrawerHeader as useDrawerHeaderBase,
  useDrawerHeaderNavigation as useDrawerHeaderNavigationBase,
  useDrawerHeaderTitle as useDrawerHeaderTitleBase,
  useInlineDrawer as useInlineDrawerBase,
  useOverlayDrawer as useOverlayDrawerBase,
} from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerProps as DrawerBaseProps } from '@fluentui/react-headless-components-preview/drawer';
import { presenceMotionSlot } from '@fluentui/react-motion';
import { Slide } from '@fluentui/react-motion-components-preview';
import { slot } from '@fluentui/react-utilities';
import { Dialog } from '../Dialog/Dialog';
import type { DialogProps } from '../Dialog/Dialog.types';
import { DialogSurface } from '../Dialog/DialogSurface';
import { InlineDrawer } from './InlineDrawer';
import { OverlayDrawer } from './OverlayDrawer';
import type {
  DrawerBodyProps,
  DrawerBodyState,
  DrawerFooterProps,
  DrawerFooterState,
  DrawerHeaderNavigationProps,
  DrawerHeaderNavigationState,
  DrawerHeaderProps,
  DrawerHeaderState,
  DrawerHeaderTitleProps,
  DrawerHeaderTitleState,
  DrawerProps,
  DrawerState,
  InlineDrawerProps,
  InlineDrawerState,
  OverlayDrawerProps,
  OverlayDrawerState,
} from './Drawer.types';

export const useDrawer = (props: DrawerProps, ref: React.Ref<HTMLElement>): DrawerState => {
  const state = useDrawerBase(props as DrawerBaseProps, ref) as DrawerState;
  const rootComponent = props.type === 'inline' ? InlineDrawer : OverlayDrawer;

  return {
    ...state,
    components: {
      ...state.components,
      root: rootComponent as typeof state.components.root,
    },
  };
};

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

export const useInlineDrawer = (props: InlineDrawerProps, ref: React.Ref<HTMLElement>): InlineDrawerState => {
  const { separator = false, size = 'small', surfaceMotion, ...rest } = props;
  const state = useInlineDrawerBase(rest, ref);

  return {
    ...state,
    components: {
      root: 'div',
      surfaceMotion: Slide,
    },
    root: {
      ...state.root,
      'data-size': size,
      'data-separator': separator ? '' : undefined,
    },
    separator,
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

export const useDrawerBody = (props: DrawerBodyProps, ref: React.Ref<HTMLDivElement>): DrawerBodyState =>
  useDrawerBodyBase(props, ref);

export const useDrawerHeader = (props: DrawerHeaderProps, ref: React.Ref<HTMLElement>): DrawerHeaderState =>
  useDrawerHeaderBase(props, ref);

export const useDrawerHeaderTitle = (
  props: DrawerHeaderTitleProps,
  ref: React.Ref<HTMLDivElement>,
): DrawerHeaderTitleState => useDrawerHeaderTitleBase(props, ref);

export const useDrawerHeaderNavigation = (
  props: DrawerHeaderNavigationProps,
  ref: React.Ref<HTMLElement>,
): DrawerHeaderNavigationState => useDrawerHeaderNavigationBase(props, ref);

export const useDrawerFooter = (props: DrawerFooterProps, ref: React.Ref<HTMLElement>): DrawerFooterState =>
  useDrawerFooterBase(props, ref);
